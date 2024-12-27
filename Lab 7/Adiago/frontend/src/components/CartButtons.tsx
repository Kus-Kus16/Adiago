import { useState } from "react";
import axiosInstance from "../api/axiosConfig";

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
            alert("Change saved!")
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/cart/remove/${productId}`);
            alert("Product removed from cart.")
            productRefresh();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="cartButtonsContainer">
            <span>{quantity}</span>
            <button onClick={increaseQuantity}>+</button>
            <button onClick={decreaseQuantity} disabled={quantity === 0}>-</button>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}