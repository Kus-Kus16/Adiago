import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    
    const navigateProducts = () => {
        navigate("/products");
    };
    
    const navigateOrders = () => {
        navigate("/orders");
    };
    
    const navigateCart = () => {
        navigate("/cart");
    };
    
    const navigateLogin = () => {
        navigate("/login");
    };

    return (
        <main>
            <h1>Welcome to Adiago!</h1>
            <div>
                <button onClick={navigateProducts}>Our Products</button>
                <button onClick={navigateLogin}>Login</button>
                <button onClick={navigateCart}>Cart</button>
                <button onClick={navigateOrders}>Orders</button>
            </div>
        </main>
    );
}

export default Home;