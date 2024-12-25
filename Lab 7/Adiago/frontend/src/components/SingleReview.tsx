interface Review {
    id: number
    username: string
    positive: boolean
    body: string
}


export function SingleReview({review}: {review: Review}) {
    return (
        <div className="reviewContainer">
            <h3>{review.username}</h3>
            <span>{review.positive ? "🖒" : "🖓"}</span>
            <p>{review.body}</p>
        </div>
    );
}
export type {Review};