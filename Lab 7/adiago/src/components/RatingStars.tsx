import {Rating} from "./DetailedProduct"
import './RatingStars.css'

export function RatingStars({rating}: {rating: Rating}) {
    const rate = rating.rate;

    const fullStars = Math.floor(rate);
    const stars = "★".repeat(fullStars) + "☆".repeat(5-fullStars);

    return (
        <div className="starsContainer">
            <span>{stars}</span>
            <p>Rating count: {rating.count}</p>
        </div>
    );

}