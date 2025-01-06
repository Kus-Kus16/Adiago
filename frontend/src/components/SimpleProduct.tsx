import { RatingStars } from "./RatingStars"
import {Product} from "./DetailedProduct"
import './SimpleProduct.css'

export function SimpleProduct({product, onClick}: {product: Product; onClick: () => void}) {

    return (
        <div className="simpleProductContainer" onClick={onClick}>
            <img className="productImage" src={product.image} alt="productImage" />
            <div className="textsContainer">
                <p className="price">${product.price}</p>
                <h2 className="title">{product.title}</h2>
                <RatingStars rating={product.rating} count={product.ratingCount}/>
            </div>
        </div>
    );
}
