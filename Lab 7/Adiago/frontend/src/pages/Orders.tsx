import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import './Orders.css'
import { Order, SimpleOrder } from "../components/SimpleOrder";
import { ThreeDots } from "react-loader-spinner";

export function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get(`/orders`);
                setOrders(response.data);
                
            } catch (error) {
                console.error(error);
            }
        }

        fetchOrders();
        setLoading(false);
    }, [] )

    if (loading) {
        return (
            <div className="loadingContainer">
                <ThreeDots color="#003077" height={80} width={80} />
            </div>
        );
    }

    return (
        <div className="ordersContainer">
            {orders.length > 0 ? (
                orders.map( (order: Order) => (
                    <SimpleOrder order={order} key={order.id}/>
                ) 
            )) : (
                <div className="empty">You have not placed any orders.</div>
            )}
        </div>
    );
}