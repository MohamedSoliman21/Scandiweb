import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Product_List = () => {

    const [Products, setProducts] = useState([]);
    const [isChecked, setIsChecked] = useState([]);
    const [SelectedProducts, setSelectedProducts] = useState({
        product_id: []
    });
    const Info = ["Size: ", "Weight: ", "Dimensions: "]

    const [ProductInfo, SetProductInfo] = useState([
        { name: "DVD", start: "Size: ", end: " MB" },
        { name: "Book", start: "Weight: ", end: " KG" },
        { name: "Furniture", start: "Dimensions: ", end: "" } 
    ])

    let SelectedProductsID = SelectedProducts.product_id;

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
      
    useEffect(() =>{
        fetch('http://localhost:8000/Products')
        .then(res => {
            return res.json();
        })
        .then((data) => {
            const filteredData = data.filter(empty => empty !=="" && empty !== null)

            for(let i = 0; i < filteredData.length; i++){
                if(filteredData[i].productType === "DVD"){
                    filteredData[i].start = "Size: "
                    filteredData[i].middle = filteredData[i].size
                    filteredData[i].end = " MB"
                } else if(filteredData[i].productType === "Book"){
                    filteredData[i].start = "Weight: "
                    filteredData[i].middle = filteredData[i].weight
                    filteredData[i].end = " KG"
                } else if(filteredData[i].productType === "Furniture"){
                    filteredData[i].start = "Dimensions: "
                    filteredData[i].middle = filteredData[i].height + "x" +  filteredData[i].width + "x" + filteredData[i].length
                    filteredData[i].end = ""
                }
            }
            setProducts(filteredData);
        });
    }, []);

    const DeleteSelected = () =>{
        for(var i = 0; i < SelectedProductsID.length; i++){
            fetch('http://localhost:8000/Products/' + SelectedProductsID [i],{
                method: 'DELETE'
            })
        }
        window.location.reload();
    }

    return ( 
        
        <div className="product_list">
            <nav className="navbar">
                <p>Product List</p>
                <div className="links">
                    <div className="ProductListLinks">
                        <Link to='Add_Product'><button id="add-product-btn">ADD</button></Link>
                        <button id="delete-product-btn" onClick={DeleteSelected}><a href=""></a>MASS DELETE</button>
                    </div>
                </div>
            </nav>

            {Products && Products
            .sort((a,b) => a.sku > b.sku ? 1 : -1) 
            .map(product => {
                return (
                <div className="product-preview" key={product.id}>
                    <input 
                    key={product.id}
                    value={product.id}
                        type='checkbox'
                        id=".delete-checkbox" 
                        className=".delete-checkbox"
                        onChange={(e)=>handleCheckBox(e)}/>
                    <div className="product-details">
                        <p>{ product.sku }</p>
                        <p>{ product.name }</p>
                        <p>{ product.price + " $" }</p>
                        <p>{ product.start + product.middle + product.end }</p>
                        
                    </div>
                </div>
                )
            })} 
        </div>
     );
}
 
export default Product_List;