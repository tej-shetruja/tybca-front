
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        getProduct();
    }, [])


    const getProduct = async () => {
        let result = await fetch('https://tybca.herokuapp.com/products', {
            headers: {
                authorization: ` bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        setProducts(result)
    }
    //console.warn({ "Products": products })

    const deleteProduct = async (id) => {
        let result = await fetch(`https://tybca.herokuapp.com/product/${id}`, {
            method: "Delete",
            headers: {
                authorization: ` bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        if (result) {
            alert("record is deleted")
            getProduct();
        }
    }

    const serchHandle = async (event) => {

        let key = event.target.value;
        if (key) {
            let result = await fetch(`https://tybca.herokuapp.com/search/${key}`, {
                headers: {
                    authorization: ` bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        } else {
            getProduct()
        }

    }

    const addproduct = async () => {
        navigate('/add')
    }
    return (
        <div className="product-list">
            <h1>product list</h1>
            <input type={"text"} className="search-product-box" placeholder="search product"
                onChange={serchHandle}
            />

            <table width={"100%"} >
                <tr>
                    <td className="li1" width={"2%"}>S.no</td>
                    <td className="li1" width={"10%"}>Name</td>
                    <td className="li1">Link</td>
                    <td className="li1" width={"15%"}>Operation</td>
                </tr>
                {
                    products.length > 0 ? products.map((item, index) =>
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.link}</td>
                            <td>
                                <button onClick={() => deleteProduct(item._id)} >Delete</button>
                                <Link to={"/update/" + item._id}>Update</Link>
                            </td>

                        </tr>

                    )
                        : <h1>no result found</h1>
                }
            </table>
            {/*<button onClick={() => addproduct()} className="appbutton2">Add Product</button>*/}

        </div>

    )
}

export default ProductList;