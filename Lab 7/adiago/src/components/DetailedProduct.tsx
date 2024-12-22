import { RatingStars } from "./RatingStars"
import './DetailedProduct.css'
import { useState } from "react"

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
    const [amount, setAmount] = useState(0);

    const increaseAmount = () => {
        setAmount((prevAmount) => (prevAmount + 1))
    }
    const decreaseAmount = () => {
        setAmount((prevAmount) => (Math.max(prevAmount - 1, 0)))
    }
    const sendToCart = () => {
        setAmount(0);
        alert("Added to cart!")
        // TODO
    }

    return (
        <div className="detailedProductContainer">
            <img src={product.image} alt="productImage" />
            <div className="textsContainer">
                <h2 className="title">{product.title}</h2>
                <h4 className="category">{product.category}</h4>
                <RatingStars rating={product.rating} />
                <p className="price">${product.price}</p>
                <p className="description">{product.description}</p>
            </div>
            <div className="buttonsContainer">
                <button onClick={increaseAmount}>+</button>
                <span>{amount}</span>
                <button onClick={decreaseAmount}>-</button>
                <button onClick={sendToCart}>Add to Cart</button>
            </div>
        </div>
    );
}
export type {Product};
export type {Rating};