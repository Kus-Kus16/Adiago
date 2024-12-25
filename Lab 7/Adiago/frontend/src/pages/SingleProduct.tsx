import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../components/DetailedProduct";
import { DetailedProduct } from "../components/DetailedProduct";
import './SingleProduct.css'

export function SingleProduct() {
    const {id} = useParams();
    const [product, setProduct] = useState<Product>();

    useEffect( () => {
        const fetchProduct = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data: Product[] = await response.json(); 

                setProduct( data.find( (product: Product) => product.id === Number(id) ) );
                
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, [] )

    if (!product) {
        return <div>Product not found!</div>
    }

    return (
        <div className="productContainer">
            <DetailedProduct product={product}/>
            <div className="reviewsContainer">
                
            </div>
        </div>
    );
}