import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Layout } from "./pages/Layout";
import { Products } from "./pages/Products";
import { SingleProduct } from "./pages/SingleProduct";
import { Login } from "./pages/Login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="" element={<Home/>} />
                    <Route path="products" element={<Products/>} />
                    <Route path="product/:id" element={<SingleProduct/>} />
                    {/* <Route path="cart" element={<Cart/>} />
                    <Route path="orders" element={<Orders/>} /> */}
                    <Route path="login" element={<Login/>} />
                    {/* <Route path="*" element={<NoPage/>} /> */}
                </Route>
            </Routes>
        </BrowserRouter>      
    );
}

export default App
