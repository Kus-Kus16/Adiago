import { useEffect, useState } from "react";
import { Product } from "../components/DetailedProduct";
import { SimpleProduct } from "../components/SimpleProduct";
import './Products.css'
import { useLocation, useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import axiosInstance from "../api/axiosConfig";

export function Products() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [viewedProducts, setViewedProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState(new Array<string>);

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [selectedCategories, setSelectedCategories] = useState(Array<boolean>);
    const [selectedStars, setSelectedStars] = useState(Array<boolean>(5).fill(true));
    const [selectedPrice, setSelectedPrice] = useState(-1);

    const location = useLocation();
    const requestedCategory = new URLSearchParams(location.search).get("cat") || "";    

    const navigate = useNavigate();

    const navigateProduct = (productId: number) => {
        navigate(`/product/${productId}`)
    };

    useEffect( () => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get(`/products`);
                let arrayProducts: Product[] = response.data;

                setProducts(arrayProducts);
                
                const uniqueCategories = new Set<string>()
                arrayProducts.forEach( (product) => {
                    uniqueCategories.add(product.category)
                } )

                const arrayCategories = Array.from(uniqueCategories);
                const newSelectedCategories = arrayCategories.map( category =>  
                    category.toLowerCase().includes(requestedCategory.toLowerCase()) ? true : false
                );

                arrayCategories.forEach( (category, index) => {
                    if (!newSelectedCategories[index]) {
                        arrayProducts = arrayProducts.filter(product =>
                            product.category != category
                        );
                    }
                } )
                console.log(arrayCategories);
                console.log(newSelectedCategories);

                setCategories(arrayCategories);
                setSelectedCategories(newSelectedCategories);
                setViewedProducts(arrayProducts);

                setLoading(false);
            } catch (error) {
                console.error(error);
            }
            
        };

        fetchProducts();
    }, [] )

    const submitSearch = () => {
        let productsList = [...products];  

        categories.forEach( (category, index) => {
            if (!selectedCategories[index]) {
                productsList = productsList.filter(product =>
                    product.category != category
                );
            }
        } )

        for (let stars = 0; stars < 5; stars++) {
            if (!selectedStars[stars]) {
                productsList = productsList.filter(product =>
                    !(product.rating >= stars && product.rating <= stars + 1)
                );
            } 
        }

        productsList = productsList.filter(product => {
            switch (selectedPrice) {
                case 0:
                    return product.price < 15;
                case 1:
                    return product.price >= 15 && product.price <= 50;
                case 2:
                    return product.price >= 50 && product.price <= 75;
                case 3:
                    return product.price >= 75 && product.price <= 100;
                case 4:
                    return product.price > 100;
                default:
                    return true;
            }
        });

        

        if (search) {
            productsList = productsList.filter(product => 
                product.title.toLowerCase().includes(search.toLowerCase()) || 
                product.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        submitSort(productsList);
    }

    const submitSort = (filteredProducts: Product[]) => {
        let productsList = [...filteredProducts];

        switch (sort) {
            case "nameASC":
                productsList.sort((prod1, prod2) => prod1.title.localeCompare(prod2.title));
                break;
            case "nameDESC":
                productsList.sort((prod1, prod2) => prod2.title.localeCompare(prod1.title));
                break;
            case "priceASC":
                productsList.sort((prod1, prod2) => prod1.price - prod2.price);
                break;
            case "priceDESC":
                productsList.sort((prod1, prod2) => prod2.price - prod1.price);
                break;
            case "ratingDESC":
                productsList.sort((prod1, prod2) => prod2.rating - prod1.rating);
                break;
            default:
                break;
        }

        setViewedProducts(productsList);
    }

    useEffect( () => {
        if (sort === "") {
            submitSearch();
        }
        else {
            submitSort(viewedProducts);
        }
    }, [sort] )

    const submitCategories = (position: number) => {
        const updatedSelected = selectedCategories.map( (item,index) => 
            index === position ? !item : item
        );
        setSelectedCategories(updatedSelected);
    }

    const submitStars = (position: number) => {
        const updatedSelected = selectedStars.map( (item,index) => 
            index === position ? !item : item
        );
        setSelectedStars(updatedSelected);
    }

    const submitPrice = (index: number) => {
        if (selectedPrice === index) {
            setSelectedPrice(-1);
        } else {
            setSelectedPrice(index)
        }
    }

    return (
        <div className="productsContainer">
            <div className="filteringContainer">
                <div className="searchInput">
                    <input type="text" placeholder="Search" value={search} 
                        onChange={(event) => {setSearch(event.target.value)}}
                        onKeyDown={(event) => { if (event.key === 'Enter') { submitSearch(); } }} />
                    <button onClick={submitSearch}></button>
                </div>
                <div className="selectInput">
                    <span>Sort by:</span>
                    <select name="select" id="select" defaultValue={""} onChange={(event) => {setSort(event.target.value)}}>
                        <option value="">Best match</option>
                        <option value="nameASC">Name: ascending</option>
                        <option value="nameDESC">Name: descending</option>
                        <option value="priceASC">Price: ascending</option>
                        <option value="priceDESC">Price: descending</option>
                        <option value="ratingDESC">Rating: descending</option>
                    </select>
                </div>
                <div className="categoryInput">
                    <span>Categories:</span>
                    {categories.map( (category: string, index: number) => (
                        <div className="categoryDiv" key={index}>
                            <label htmlFor={`categoryCheckbox${index}`}>
                                {category[0].toUpperCase() + category.substring(1)}
                            </label>
                            <input type="checkbox" id={`categoryCheckbox${index}`} 
                                checked={selectedCategories[index]} onChange={() => submitCategories(index)}/>
                        </div>
                    ) )
                    }
                </div>
                <div className="starsInput">
                    <span>Rating:</span>
                    {Array.from({length: 5}).map( (_, index: number) => (
                        <div className="starDiv" key={index}>
                            <label htmlFor={`starCheckbox${index}`}>{"★".repeat(index) + "☆".repeat(5-index)}</label>
                            <input type="checkbox" id={`starCheckbox${index}`} 
                                checked={selectedStars[index]} onChange={() => submitStars(index)}/>
                        </div>
                    ) )
                    }
                </div>
                <div className="priceInput">
                    <span>Price:</span>
                    {Array.from({length: 5}).map( (_, index: number) => (
                        <div className="priceDiv" key={index}>
                            <label htmlFor={`priceRadio${index}`}>    {
                                (() => {
                                    switch (index) {
                                        case 0:
                                            return "Less than $15";
                                        case 1:
                                            return "$15 - $50";
                                        case 2:
                                            return "$50 - $75";
                                        case 3:
                                            return "$75 - $100";
                                        case 4:
                                            return "More than $100";
                                    }
                                })()
                            }</label>
                            <input type="checkbox" id={`priceRadio${index}`} 
                                value={index} checked={selectedPrice === index} onChange={() => submitPrice(index)}/>
                        </div>
                    ) )
                    }
                </div>
            </div>
            
            <div className="listContainer">
            {viewedProducts.length > 0 ? ( viewedProducts.map( (product) => (
                <SimpleProduct 
                    key={product.id}
                    product={product}
                    onClick={() => navigateProduct(product.id)}
                />
            ))
            ) : (
                loading ?                         
                (<div className="loadingContainer">
                    <ThreeDots color="#003077" height={80} width={80} />
                </div>) :
                "Found no products mathing given criteria."
            )
            }
            </div>
        </div>
    );
}