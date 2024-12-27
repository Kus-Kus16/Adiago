import { useEffect, useState } from "react"
import './SimpleOrder.css'
import { Link } from "react-router-dom"

interface Order {
    id: number
    OrderDetails: [OrderDetail]
    orderDate: string
}

interface OrderDetail {
    id: number
    productId: number
    productName: string
    productPrice: number
    quantity: number
}

export function SimpleOrder({order}: {order: Order}) {
    const [value, setValue] = useState(0);

    useEffect( () => {
        let total = 0;
        order.OrderDetails.forEach( (detail) => {
            total += detail.productPrice * detail.quantity
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
                    <Link to={`/product/${detail.productId}`}>
                        <h3>{detail.productName}</h3>
                    </Link>
                    <div className="innerValues">
                        <p>Quantity: {detail.quantity}</p>
                        <p>Price: ${detail.productPrice}</p>
                    </div>
                </div>
            ) )}
            <span>Total Value: ${value}</span>
        </div>
    );
}

export type {Order}
export type {OrderDetail}