import { RatingStars } from "./RatingStars"
import './DetailedProduct.css'
import { useState } from "react"
import axiosInstance from "../api/axiosConfig"

interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: Rating
}

interface Rating {
    rate: number
    count: number
}

export function DetailedProduct({product}: {product: Product}) {
    const [amount, setAmount] = useState(1);

    const increaseAmount = () => {
        setAmount((prevAmount) => (prevAmount + 1))
    }

    const decreaseAmount = () => {
        setAmount((prevAmount) => (Math.max(prevAmount - 1, 0)))
    }

    const sendToCart = async () => {
        const reqBody = {
            "productId": product.id,
            "productName": product.title,
            "productPrice": product.price,
            "quantity": amount
        };
    
        try {
            await axiosInstance.post('/cart/add', reqBody);
            alert("Product added to cart.");
            setAmount(0);

        } catch (error: any) {
            console.log(error);
        }

    }

    return (
        <div className="detailedProductContainer">
            <img className="productImage" src={product.image} alt="productImage" />
            <div className="textsContainer">
                <div className="upperTexts">
                    <h2 className="title">{product.title}</h2>
                    <h4 className="category">{product.category[0].toUpperCase() + product.category.substring(1)}</h4>
                    <RatingStars rating={product.rating} />
                </div>
                <div className="lowerTexts">
                    <p className="price">${product.price}</p>
                    <p className="description">{product.description}</p>
                    <div className="buttonsContainer">
                        <button onClick={increaseAmount}>+</button>
                        <span>{amount}</span>
                        <button onClick={decreaseAmount} disabled={amount === 0}>-</button>
                        <button onClick={sendToCart} disabled={amount === 0}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export type {Product};
export type {Rating};