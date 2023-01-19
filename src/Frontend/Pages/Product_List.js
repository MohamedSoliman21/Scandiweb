import axios from "axios";
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Link } from "react-router-dom"
import LoadingSpinner from "../Components/LoadingSpinner";

const Product_List = (props, ref) => {

    const URL = "http://localhost/Scandiweb/Index.php";
    const [isLoading, setIsLoading] = useState(true);
    const [Products, setProducts] = useState([]);
    const [isChecked, setIsChecked] = useState([]);
    const [SelectedProducts, setSelectedProducts] = useState({
        Product_SKU: []
    });

    let SelectedProductsID = SelectedProducts.Product_SKU;

    const handleCheckBox = (e)=>{
        const {value, checked}= e.target;
        
        if(checked)
        {
            setIsChecked([...isChecked, value]);
            SelectedProductsID.push(value);
        } else{
            setIsChecked(isChecked.filter( (e)=>e!== value));
            SelectedProductsID.push(SelectedProductsID.splice(SelectedProductsID.indexOf(value), 1).pop());
            SelectedProductsID.pop()
        }
      } 
      
    useEffect(() => {
        const GetProducts = async () =>{
            try {
              const {data: response} = await axios.get(URL);
              setProducts(response);
            } catch (error) {
              console.error(error.message);
            }
            setIsLoading(false);
        }
        const Timer = setTimeout(() => {
        GetProducts();
        }, 1000);

        return () => clearTimeout(Timer);

    }, [Products.length])

    const DeleteSelected = (e) =>{
        for(var i = 0; i < SelectedProductsID.length; i++){
            axios.post("http://localhost/Scandiweb/Index.php/?delete=" + SelectedProductsID[i])
            setProducts((current) =>
            current.filter((Product) => Product.id !== SelectedProductsID[i])
            );
        }
    }
    // useImperativeHandle(ref, () => ({DeleteSelected}), [])

    return ( 
        <div className="product_list">
            <nav className="navbar">
                <p>Product List</p>
                <div className="links">
                    <div className="ProductListLinks">
                        <Link to='Add_Product'><button id="add-product-btn">ADD</button></Link>
                        <button id="delete-product-btn" onClick={DeleteSelected}>MASS DELETE</button>
                    </div>
                </div>
            </nav>

            {isLoading && <div id="LoadingSpinner"><LoadingSpinner /> </div>}
            {!isLoading && (
            <div>
            {Object.values(Products)
            .map((Product) => {
                return (
                <div id="product-preview" className="product-preview" key={Product.ID}>
                    <input 
                    value={Product.ID}
                        type='checkbox'
                        id="delete-checkbox" 
                        className="delete-checkbox"
                        onChange={(e)=>handleCheckBox(e)}/>

                    <div className="product-details">
                        <p>{ Product.SKU }</p>
                        <p>{ Product.Name }</p>
                        <p>{ Product.Price + " $" }</p>
                        <p>{ Product.Attributes }</p>
                    </div>
                </div>
                )
            })}
            </div>
            )}
        </div>
     );
}
 
export default Product_List;