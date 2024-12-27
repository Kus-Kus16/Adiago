import './RatingStars.css'

export function RatingStars({rating, count}: {rating: number, count: number}) {
    const fullStars = Math.floor(rating);
    const stars = "★".repeat(fullStars) + "☆".repeat(5-fullStars);

    return (
        <div className="starsContainer">
            <span>{stars}</span>
            <p>Rating count: {count}</p>
        </div>
    );

}