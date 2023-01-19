import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import DVD from "../Components/Products/DVD";
import Book from "../Components/Products/Book";
import Furniture from "../Components/Products/Furniture";
import axios from "axios";

const Add_Product = () => {

    const [IsDuplicate, setIsDuplicate] = useState()
    const [Products, setProducts] = useState([]);
    const navigate = useNavigate();
    const URL = "/Scandiweb/Index.php"
    const [PType, setPType] = useState("");

    const options = [
        {id: 1, value: 'DVD'},
        {id: 2, value: 'Book'},
        {id: 3, value: 'Furniture'}
        
    ];

    useEffect(() => {
        GetProducts()
    }, [])

    const GetProducts = () => {
        axios.get(URL).then((response) => {
            setProducts(response.data)
        })
    }
    
    const [ProductData, setProductData] = useState({
        sku: "",
        name: "",
        price: "",
        productType: "",
        attributes: [
            {size: ""},
            {weight: ""},
            {dimensions: [{
                height: "",
                width: "",
                length: ""
            }]
        }]
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
        setPType(value)
    }

    const handleInvalid = (e) => {
        const { id, value, type, checked } = e.target;
        setProductData((prevData) => {
            return {
            ...prevData,
            [id]: type === "checkbox" ? checked : value,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        let config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        let Data = new URLSearchParams();
        Data.append("SKU", ProductData.sku);
        Data.append("Name", ProductData.name);
        Data.append("Price", ProductData.price);
        Data.append("ProductType", ProductData.productType);
        Data.append("Size", ProductData.attributes.Size);
        Data.append("Weight", ProductData.attributes.Weight);
        Data.append("Dimensions", 
        ProductData?.attributes?.Dimensions?.Height + "x" + ProductData?.attributes?.Dimensions?.Width + "x" + ProductData?.attributes?.Dimensions?.Length);
        
        if(IsDuplicate === false){
            axios.post(URL, ProductData, config)
            .then((result) => {
                if(result.status === 200){
                    navigate("/");
                }
            })
        } 
    }

    useEffect(() => {
        for(let i = 0;  i < Products.length; i++){
            if(ProductData.sku === Products[i].SKU){
                setIsDuplicate(true)
                break
            }
            else {
                setIsDuplicate(false)
            }
        } 
    }, )

    return ( 
        <div className="add_product">
            <nav className="navbar">
                <p>Add Product</p>
                <div className="links">
                    <div className="AddProductLinks">
                        <button id="save-btn" form="product_form" type="submit">Save</button>
                        <Link to='/'><button id="cancel-btn">Cancel</button></Link>
                    </div>
                </div>
            </nav>

            <form 
            id="product_form" 
            method="post" 
            onSubmit={handleSubmit}>
                {IsDuplicate && <div id="Warning">SKU Already Exists</div>}

                <div className="row">
                    <div className="col-10">
                        <label htmlFor="sku">SKU</label>
                    </div>

                    <div className="col-75">
                        <input 
                            type="text" 
                            id="sku"
                            name="SKU" 
                            value={ProductData.sku}
                            className="form-control"
                            onChange={handleChange}
                            required></input>
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
                            name="Name"
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
                            name="Price" 
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
                            name="ProductType"
                            className="form-control"
                            value={ProductData.productType}
                            onChange={handleSelectChange}
                            required>
                                <option value="">Choose a Type</option>
                                {options.map(option => (
                                    <option 
                                        id={option.id}
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
                            getDVDValue={ProductData.attributes.Size}
                        />
                    )}

                    {ProductData.productType === "Book" && (
                        <Book
                            runHandleChange={handleChange}
                            runHandleOnInput={handleOnInput}
                            runHandleInvalid={handleInvalid}
                            getBookValue={ProductData.attributes.Weight}
                        />
                    )}

                    {ProductData.productType === "Furniture" && (
                        <Furniture
                            runHandleChange={handleChange}
                            runHandleOnInput={handleOnInput}
                            runHandleInvalid={handleInvalid}
                            getFurnitureHeight={ProductData?.attributes?.Dimensions?.Height}
                            getFurnitureWidth={ProductData?.attributes?.Dimensions?.Width}
                            getFurnitureLength={ProductData?.attributes?.Dimensions?.Length}
                        />
                    )}
                </div>
            </form>
        </div>
     );
}
 
export default Add_Product;