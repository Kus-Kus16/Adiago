import { useEffect, useState } from "react";
import { Order } from "../components/SimpleOrder";
import { OrderDetail } from "../components/SimpleOrder";
import axiosInstance from "../api/axiosConfig";
import { SimpleProduct } from "../components/SimpleProduct";
import { Product } from "../components/DetailedProduct";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { CartButtons } from "../components/CartButtons";

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
            try {
                const response = await fetch(`https://fakestoreapi.com/products`);
                const data: Product[] = await response.json();
        
                const productMap = data
                    .filter((product) => productIds.includes(product.id))
                    .reduce((map, product) => {
                        map[product.id] = product;
                        return map;
                    }, {} as { [key: number]: Product });
        
                return productMap;
            } catch (error) {
                console.error("Failed to fetch products:", error);
                return {};
            }
        };
        

        fetchCart();
    }, [] )

    const navigateProduct = (productId: number) => {
        navigate(`/product/${productId}`)
    };

    const removeProduct = (productId: number) => {
        setCart((prevCart) => {
            if (!prevCart) return undefined;

            const updatedOrderDetails = prevCart.OrderDetails.filter(
                (detail) => detail.productId !== productId
            );

            console.log({ ...prevCart, OrderDetails: updatedOrderDetails });
            return { ...prevCart, OrderDetails: updatedOrderDetails } as Order;
        });
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
            {cart.OrderDetails.map((detail) => {
                const product = products[detail.productId];
                return (
                    <div key={detail.id} className="cartDetailContainer">
                        <SimpleProduct
                            product={product}
                            onClick={() => navigateProduct(detail.productId)}
                        />
                        <CartButtons
                            productId={detail.productId}
                            productQuantity={detail.quantity}
                            productRefresh={() => removeProduct(detail.productId)}
                        />
                    </div>
                );
            })}
        </div>
    );
}