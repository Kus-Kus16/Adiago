import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../components/DetailedProduct";
import { DetailedProduct } from "../components/DetailedProduct";
import './SingleProduct.css'
import { ThreeDots } from "react-loader-spinner";
import { Review, SingleReview } from "../components/SingleReview";
import axiosInstance from "../api/axiosConfig";

export function SingleProduct() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<Product>();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [refresh, setRefresh] = useState(true);

    const [opinionType, setOpinionType] = useState(true);
    const [opinion, setOpinion] = useState("");

    useEffect( () => {
        const fetchProduct = async () => {
            try {
                const response = await axiosInstance.get(`/products/${id}`);
                const data: Product = response.data;

                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, [] )

    useEffect( () => {
        const fetchReviews = async () => {
            try {
                const response = await axiosInstance.get(`/reviews/${id}`);
                setReviews(response.data) 
            } catch (error) {
                console.error(error);
            }
        }

        fetchReviews();
    }, [refresh] )

    const handleAddReview = async (e: React.FormEvent) => {
        e.preventDefault();

        const reqBody = {
            "positive": opinionType,
            "content": opinion
        };

        try {
            await axiosInstance.post(`/reviews/add/${id}`, reqBody);
            alert("Your review has been posted.")

        } catch (error: any) {
            if (error.response && error.response.status === 409) {
                try {
                    await axiosInstance.patch(`/reviews/patch/${id}`, reqBody);
                    alert("Your old review has beed edited.")

                } catch (error) {
                    console.log(error);
                }
            }
            else {
                console.log(error);
            }
        }

        setRefresh(!refresh);
    }

    const handleRemoveReview = async () => {
        try {
            await axiosInstance.delete(`/reviews/remove/${id}`);
            alert("Your review has been deleted.")

        } catch (error: any) {
            console.log(error);
        }

        setRefresh(!refresh);
    }

    if (loading) {
        return (
            <div className="loadingContainer">
                <ThreeDots color="#003077" height={80} width={80} />
            </div>
        );
    }

    if (!product) {
        return <div className="empty">Product not found!</div>
    }

    return (
        <div className="productContainer">
            <DetailedProduct product={product}/>
            <div className="reviewsContainer">
                <div className="addReviewContainer">
                    <form onSubmit={handleAddReview}>
                        <textarea placeholder="Your review" value={opinion} onChange={(event) => setOpinion(event.target.value)}></textarea>
                        <div className="reviewButtonsContainer">
                            <button type="button" id="opinionButton" onClick={() => setOpinionType(!opinionType)}
                                style={{color: opinionType ? 'green' : 'red'}}>{opinionType ? "🖒" : "🖓"}</button>
                            <button type="submit">Post</button>
                        </div>
                    </form>
                </div>
                <div className="allReviewsContainer">
                    {reviews.length > 0 ? ( reviews.map( (element) => (
                        <SingleReview 
                            key={element.id}
                            review={{
                                id: element.id,
                                User: element.User,
                                positive: element.positive,
                                content: element.content
                            }}
                            onClick={handleRemoveReview}
                        />
                    ))
                    ) : (
                        <div className="empty">
                            This product does not have any reviews.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}