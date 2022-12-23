import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {

    const [navText, setNavText] = useState("Product List");
    const [IsHomePage, SetHomePage] = useState(true);
    const [IsAddPage, SetAddPage] = useState(false);
    
    const handlePageChange = (e) =>{
        if(window.location.pathname !== "/Add_Product"){
            setNavText("Add Product")
            SetHomePage(false)
            SetAddPage(true)
        }
        else if (window.location.pathname !== "/"){
            setNavText("Product List")
            SetHomePage(true)
            SetAddPage(false)
        }
    }

    return ( 
       
        <nav className="navbar">
            <p>{navText}</p>
            <div className="links">
                <div className="ProductListLinks" style={{display: IsHomePage ? "flex" : "none"}}>
                    <Link to='Add_Product'><button id="add-product-btn" onClick={handlePageChange}>ADD</button></Link>
                    <button id="delete-product-btn" onClick={props.DeleteSelected}><a href=""></a>MASS DELETE</button>
                </div>
                <div className="AddProductLinks" style={{display: IsAddPage ? "flex" : "none"}}>
                    <button form="ProductForm" type="submit">Save</button>
                    <Link to='/'><button id="cancel-btn" onClick={handlePageChange}>Cancel</button></Link>
                </div>
            </div>
        </nav>
        
    )
}
 
export default Navbar;