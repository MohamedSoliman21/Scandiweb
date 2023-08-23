import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

    const [navText, setNavText] = useState();
    const [IsHomePage, SetHomePage] = useState();
    const [IsAddPage, SetAddPage] = useState();
    const DelRef = React.useRef();

    
    const handlePageChange = () =>{
        if(window.location.pathname === "/Add_Product"){
            setNavText("Add Product")
            SetHomePage(false)
            SetAddPage(true)
        }
        else if (window.location.pathname === "/"){
            setNavText("Product List")
            SetHomePage(true)
            SetAddPage(false)
        }
    }

    useEffect(() =>{
        handlePageChange()
    }, [navText])

    return ( 
        <nav className="navbar">
            <p>{navText}</p>
            <div className="links">
                
                <div className="ProductListLinks" style={{display: IsHomePage ? "flex" : "none"}}>
                    <Link to='Add_Product'><button id="add-product-btn">ADD</button></Link>
                    <button id="delete-product-btn" onClick={()=> DelRef.current.DeleteSelected()}><a href=""></a>MASS DELETE</button>
                </div>

                
                <div className="AddProductLinks" style={{display: IsAddPage ? "flex" : "none"}}>
                    <button form="product_form" type="submit">Save</button>
                    <Link to='/'><button id="cancel-btn">Cancel</button></Link>
                </div>
            </div>
        </nav>
        
    )
}
 
export default Navbar;