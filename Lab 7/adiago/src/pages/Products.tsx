import { useEffect, useState } from "react";
import { Product } from "../components/DetailedProduct";
import { SimpleProduct } from "../components/SimpleProduct";

export function Products() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect( () => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data: Product[] = await response.json(); 
                setProducts(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, [] )

    return (
        <div>
        {products.map( (product) => (
            <SimpleProduct 
                key={product.id}
                product={product}
            />
        ))}
        </div>
    );
}