import { useNavigate } from "react-router-dom";
import './Home.css'

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
        <div className="homeContainer">
            <h1>Welcome to Adiago!</h1>
            <div className="homeButtonsContainer">
                <button onClick={navigateProducts}>Products</button>
                <button onClick={navigateLogin}>Login</button>
                <button onClick={navigateCart}>Cart</button>
                <button onClick={navigateOrders}>Orders</button>
            </div>
        </div>
    );
}

export default Home;