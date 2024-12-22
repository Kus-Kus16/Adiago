import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Layout } from "./pages/Layout";
import { Products } from "./pages/Products";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="" element={<Home/>} />
                    <Route path="products" element={<Products/>} />
                    {/* <Route path="product/:id" element={<ProductPage/>} />
                    <Route path="cart" element={<Cart/>} />
                    <Route path="orders" element={<Orders/>} />
                    <Route path="login" element={<Login/>} />
                    <Route path="*" element={<NoPage/>} /> */}
                </Route>
            </Routes>
        </BrowserRouter>      
    );
}

export default App
