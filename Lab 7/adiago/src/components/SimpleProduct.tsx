import { RatingStars } from "./RatingStars"
import {Product} from "./DetailedProduct"
import './SimpleProduct.css'

export function SimpleProduct({product}: {product: Product}) {

    return (
        <div className="simpleProductContainer">
            <img src={product.image} alt="productImage" />
            <div className="textsContainer">
                <p className="price">${product.price}</p>
                <h2 className="title">{product.title}</h2>
                <RatingStars rating={product.rating} />
            </div>
        </div>
    );
}
