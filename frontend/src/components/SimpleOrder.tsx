import { useEffect, useState } from "react"
import './SimpleOrder.css'
import { Link } from "react-router-dom"
import { Product } from "./DetailedProduct"

interface Order {
    id: number
    OrderDetails: [OrderDetail]
    orderDate: string
}

interface OrderDetail {
    id: number
    Product: Product
    quantity: number
}

export function SimpleOrder({order}: {order: Order}) {
    const [value, setValue] = useState(0);

    useEffect( () => {
        let total = 0;
        order.OrderDetails.forEach( (detail) => {
            total += detail.Product.price * detail.quantity
        } )

        setValue(total)
    }, [] )

    return (
        <div className="orderContainer">
            <div className="outerValues">
                <h2>Order no. {order.id}</h2>
                <p>Order date: {order.orderDate.substring(0,10)}</p>
            </div>
            {order.OrderDetails.map( (detail) => (
                <div className="orderDetailContainer" key={detail.id}>
                    <Link to={`/product/${detail.Product.id}`}>
                        <h3>{detail.Product.title}</h3>
                    </Link>
                    <div className="innerValues">
                        <p>Quantity: {detail.quantity}</p>
                        <p>Price: ${detail.Product.price}</p>
                    </div>
                </div>
            ) )}
            <span>Total Value: ${value}</span>
        </div>
    );
}

export type {Order}
export type {OrderDetail}