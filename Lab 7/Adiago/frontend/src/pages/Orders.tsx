import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import './Orders.css'
import { Order, SimpleOrder } from "../components/SimpleOrder";

export function Orders() {
    const [orders, setOrders] = useState([])

    useEffect( () => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get(`/orders/`);
                setOrders(response.data) 
                console.log(response.data);
                
            } catch (error) {
                console.error(error);
            }
        }

        fetchOrders();
    }, [] )

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