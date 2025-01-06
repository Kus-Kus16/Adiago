import './SingleReview.css'

interface Review {
    id: number
    User: User
    positive: boolean
    content: string
}

interface User{
    username: string
    email: string
}

export function SingleReview({review, onClick}: {review: Review, onClick: () => void}) {
    
    return (
        <div className="reviewContainer">
            <div className='reviewTitleContainer'>
                <h3>{review.User.username || review.User.email}</h3>
                <span style={{color: review.positive ? 'green' : 'red'}}>{review.positive ? "🖒" : "🖓"}</span>
            </div>
            <button onClick={onClick}></button>
            <p>{review.content}</p>
        </div>
    );
}
export type {Review};