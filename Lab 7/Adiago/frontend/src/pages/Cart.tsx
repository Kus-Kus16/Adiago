import { useEffect, useState } from "react";
import { Order } from "../components/SimpleOrder";
import { OrderDetail } from "../components/SimpleOrder";
import axiosInstance from "../api/axiosConfig";
import { SimpleProduct } from "../components/SimpleProduct";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { CartButtons } from "../components/CartButtons";

export function Cart() {
    const [cart, setCart] = useState<Order>()
    const [details, setDetails] = useState<OrderDetail []>([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(true);

    const navigate = useNavigate();

    useEffect( () => {
        const fetchCart = async () => {
            try {
                const response = await axiosInstance.get(`/cart`);
                const data: Order = response.data;

                setCart(data) 
                setDetails(data.OrderDetails)
            } catch (error) {
                console.error(error);
            }
        }       

        fetchCart();
        setLoading(false);
    }, [refresh] )

    const navigateProduct = (productId: number) => {
        navigate(`/product/${productId}`)
    };

    if (loading) {
        return (
            <div className="loadingContainer">
                <ThreeDots color="#003077" height={80} width={80} />
            </div>
        );
    }

    if (!cart || !cart.OrderDetails || cart.OrderDetails.length.toString() === '0') {
        return <div className="empty">Your cart is empty.</div>
    }

    return (
        <div className="cartContainer">
            {details.map((detail) => (
                <div key={detail.id} className="cartDetailContainer">
                    <SimpleProduct
                        product={detail.Product}
                        onClick={() => navigateProduct(detail.Product.id)}
                    />
                    <CartButtons
                        productId={detail.Product.id}
                        productQuantity={detail.quantity}
                        productRefresh={() => setRefresh(!refresh)}
                    />
                </div>   
            ) )}
        </div>
    );
}