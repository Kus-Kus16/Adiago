import { useState } from "react";
import axiosInstance from "../api/axiosConfig";
import './CartButtons.css'

export function CartButtons({productId, productQuantity, productRefresh}: {productId: number, productQuantity: number, productRefresh: () => void}) {
    const [quantity, setQuantity] = useState(productQuantity);

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => (prevQuantity + 1))
    }

    const decreaseQuantity = () => {
        setQuantity((prevQuantity) => (prevQuantity - 1))
    }

    const handleSave = async () => {
        try {
            const reqBody = {
                "productId": productId,
                "quantity": quantity
            };

            await axiosInstance.patch(`/cart/patch`, reqBody);
            alert("Change saved!");
            productRefresh();
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/cart/remove/${productId}`);
            alert("Product removed from cart.");
            productRefresh();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="cartButtonsContainer">
            <div className="upperButtonsContainer">
                <input type="number" value={quantity} 
                    onChange={(event) => setQuantity(Number(event.target.value))} 
                    onKeyDown={(event) => { if (event.key === 'Enter') { handleSave() } }}
                />
                <button onClick={increaseQuantity}>+</button>
                <button onClick={decreaseQuantity} disabled={quantity === 0}>-</button>
            </div>
            <div className="lowerButtonsContainer">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}