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
    const URL = "http://localhost/Scandiweb/Index.php"
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
        SKU: "",
        Name: "",
        Price: "",
        ProductType: "",
        Attributes: [
            {Size: ""},
            {Weight: ""},
            {Dimensions: [{
                Height: "",
                Width: "",
                Length: ""
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
        Data.append("SKU", ProductData.SKU);
        Data.append("Name", ProductData.Name);
        Data.append("Price", ProductData.Price);
        Data.append("ProductType", ProductData.ProductType);
        Data.append("Size", ProductData.Attributes.Size);
        Data.append("Weight", ProductData.Attributes.Weight);
        Data.append("Dimensions", 
        ProductData?.Attributes?.Dimensions?.Height + "x" + ProductData?.Attributes?.Dimensions?.Width + "x" + ProductData?.Attributes?.Dimensions?.Length);
        
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
            if(ProductData.SKU === Products[i].SKU){
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
                            id="SKU"
                            name="SKU" 
                            value={ProductData.SKU}
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
                            id="Name"
                            name="Name"
                            value={ProductData.Name}
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
                            id="Price"
                            name="Price" 
                            value={ProductData.Price}
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
                            id="ProductType" 
                            name="ProductType"
                            className="form-control"
                            value={ProductData.ProductType}
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
                    {ProductData.ProductType === "DVD" && (
                        <DVD
                            runHandleChange={handleChange}
                            runHandleOnInput={handleOnInput}
                            runHandleInvalid={handleInvalid}
                            getDVDValue={ProductData.Attributes.Size}
                        />
                    )}

                    {ProductData.ProductType === "Book" && (
                        <Book
                            runHandleChange={handleChange}
                            runHandleOnInput={handleOnInput}
                            runHandleInvalid={handleInvalid}
                            getBookValue={ProductData.Attributes.Weight}
                        />
                    )}

                    {ProductData.ProductType === "Furniture" && (
                        <Furniture
                            runHandleChange={handleChange}
                            runHandleOnInput={handleOnInput}
                            runHandleInvalid={handleInvalid}
                            getFurnitureHeight={ProductData?.Attributes?.Dimensions?.Height}
                            getFurnitureWidth={ProductData?.Attributes?.Dimensions?.Width}
                            getFurnitureLength={ProductData?.Attributes?.Dimensions?.Length}
                        />
                    )}
                </div>
            </form>
        </div>
     );
}
 
export default Add_Product;