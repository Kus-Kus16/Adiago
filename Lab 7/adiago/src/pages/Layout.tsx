import { Link, Outlet } from "react-router-dom";
import './Layout.css'

export function Layout() {
    return(
        <div className="layoutContainer">
            <nav className="menu">
                <img id="menuLogo" src="/AdiagoWhite.png" alt="Logo" />
                <ul className="menuLinks">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Our Products</Link></li>
                    <li><Link to="/orders">Orders</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>

            <main className="mainContainer">
                <Outlet/>
            </main>
        </div>
    );
}