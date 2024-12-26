import { useEffect, useState } from "react";
import { Order } from "../components/SimpleOrder";
import { OrderDetail } from "../components/SimpleOrder";
import axiosInstance from "../api/axiosConfig";
import { SimpleProduct } from "../components/SimpleProduct";
import { Product } from "../components/DetailedProduct";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

export function Cart() {
    const [cart, setCart] = useState<Order>()
    const [products, setProducts] = useState<{ [key: number]: Product }>({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect( () => {
        const fetchCart = async () => {
            try {
                const response = await axiosInstance.get(`/cart/`);
                setCart(response.data) 
                
                const productData = await fetchProducts(response.data.OrderDetails.map((detail: OrderDetail) => detail.productId));
                setProducts(productData);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchProducts = async (productIds: number[]) => {
            const productMap : { [key: number]: Product } = {};

            await Promise.all(
                productIds.map(async (productId) => {
                    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
                    const data: Product = await response.json();
                    productMap[productId] = data;
                })
            );

            return productMap;
        }

        fetchCart();
    }, [] )

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

    if (!cart) {
        return <div className="empty">Your cart is empty.</div>
    }

    return (
        <div className="cartContainer">
            {cart.OrderDetails.map((detail) => {
                const product = products[detail.productId];
                return (
                    <div key={detail.id} className="cartDetailContainer">
                        <SimpleProduct
                            product={product}
                            onClick={() => navigateProduct(detail.productId)}
                        />
                    </div>
                );
            })}
        </div>
    );
}