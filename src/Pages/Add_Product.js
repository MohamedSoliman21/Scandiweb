import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import DVD from "../Components/Products/DVD";
import Book from "../Components/Products/Book";
import Furniture from "../Components/Products/Furniture";
import Notification from "../Components/Notification";

const Add_Product = () => {

    const [IsDuplicate, setIsDuplicate] = useState(true)
    const [formDataResponse, setFormDataResponse] = useState({});
    const [Products, setProducts] = useState([]);
    const navigate = useNavigate();

    const options = [
        {id: 1, value: 'DVD', attribute: 'size (MB)'},
        {id: 3, value: 'Furniture', attribute: ['length (CM)' , 'width (CM)' , 'height (CM)']},
        {id: 2, value: 'Book', attribute: 'weight (KG)'}
    ];

    useEffect(() =>{
        fetch('http://localhost:8000/Products')
        .then(res => {
            return res.json();
        })
        .then((data) => {
            setProducts(data);
        });
    }, []);
    
    const [ProductData, setProductData] = useState({
        sku: "",
        name: "",
        price: "",
        productType: "",
        size: "",
        height: "",
        width: "",
        length: "",
        weight: ""
      });

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setProductData((prevData) => {
            return {
            ...prevData,
            [id]: type === "checkbox" ? checked : value,
            };
        });
    }
    
    const handleSelectChange = (e) => {
        const { id, value, type, checked } = e.target;
        setProductData((prevData) => {
            return {
            ...prevData,
            [id]: type === "checkbox" ? checked : value,
            };
        });
    }
    
    const handleInvalid = (e) => {
        const { id, type, checked } = e.target;
        setProductData((prevData) => {
            return {
            ...prevData,
            [id]: type === "checkbox" ? checked : <Notification message="Please, provide the data of indicated type"/>,
            };
        });
    }
    
    const handleOnInput = (e) => {
        const { id, value, type, checked, customValidity } = e.target;
        setProductData((prevData) => {
            return {
            ...prevData,
            [id]: type === "checkbox" ? checked : value,
            [customValidity]: "",
            };
        });
    }

    const handleData = (e) => {
        const Data = new URLSearchParams();
        Data.append("sku", ProductData.sku);
        Data.append("name", ProductData.name);
        Data.append("price", ProductData.price);
        Data.append("productType", ProductData.productType);
        Data.append("height", ProductData.height);
        Data.append("width", ProductData.height);
        Data.append("length", ProductData.height);
        Data.append("size", ProductData.size);
        Data.append("weight", ProductData.weight);

        for(let i = 0;  i < Products.length; i++){
            console.log(Products.length)
            console.log(IsDuplicate)
            console.log(Products[i].sku)
            if(ProductData.sku == Products[i].sku){
                console.log(Products.length)
                setIsDuplicate(true)
                break
            }
            else {
                setIsDuplicate(false)
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleData()

        if(IsDuplicate !== true){
            fetch("http://localhost:8000/Products/", { 
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(ProductData),
            }).then((response) => response.json())
            .then((result) => {
                setFormDataResponse(result);
                navigate("/");
            })
        } 
    }

    return ( 
        <div className="add_product">
            <nav className="navbar">
                <p>Add Product</p>
                <div className="links">
                    <div className="AddProductLinks">
                        <button form="ProductForm" type="submit" onClick={handleData}>Save</button>
                        <Link to='/'><button id="cancel-btn">Cancel</button></Link>
                    </div>
                </div>
            </nav>

            <form id="product_form" method="get" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-10">
                        <label htmlFor="sku">SKU</label>
                    </div>
                    <div className="col-75">
                        <input 
                            type="text" 
                            id="sku"
                            name="sku" 
                            value={ProductData.sku}
                            className="form-control"
                            onChange={handleChange}
                            required></input>
                    </div>
                    <div>
                    <div className="text-danger" role="alert">
                        {formDataResponse.error_message}
                    </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-10">
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="text" 
                            id="name"
                            name="name"
                            value={ProductData.name}
                            className="form-control"
                            onChange={handleChange}
                            ></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-10">
                        <label htmlFor="Price">Price</label>
                    </div>
                    <div className="col-75">
                        <input 
                            type="number"
                            min="0" 
                            id="price"
                            name="price" 
                            value={ProductData.price}
                            className="form-control"
                            onChange={handleChange}
                            onInvalid= {handleInvalid}
                            onInput={handleOnInput}
                            required></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-10">
                        <label htmlFor="productType">Type Switcher</label>
                    </div>
                    <div className="col-75">
                        <select 
                            id="productType" 
                            name="productType"
                            className="form-control"
                            value={ProductData.productType}
                            onChange={handleSelectChange}
                            required>
                                <option value="">Choose a Type</option>
                                {options.map(option => (
                                    <option 
                                        id={option.value}
                                        key={option.value} 
                                        name={option.value} 
                                        value={option.value}>
                                        {option.value}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                <div id="DynamicAttributes">
                    {ProductData.productType === "DVD" && (
                        <DVD
                            runHandleChange={handleChange}
                            runHandleOnInput={handleOnInput}
                            runHandleInvalid={handleInvalid}
                            getDVDValue={ProductData.size}
                        />
                    )}

                    {ProductData.productType === "Book" && (
                        <Book
                            runHandleChange={handleChange}
                            runHandleOnInput={handleOnInput}
                            runHandleInvalid={handleInvalid}
                            getBookValue={ProductData.weight}
                        />
                    )}

                    {ProductData.productType === "Furniture" && (
                        <Furniture
                            runHandleChange={handleChange}
                            runHandleOnInput={handleOnInput}
                            runHandleInvalid={handleInvalid}
                            getFurnitureHeight={ProductData.height}
                            getFurnitureWidth={ProductData.width}
                            getFurnitureLength={ProductData.length}
                        />
                    )}
                </div>
            </form>
        </div>
     );
}
 
export default Add_Product;