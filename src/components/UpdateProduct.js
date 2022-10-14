import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'




const UpdateProduct = () => {
    const [name, setName] = React.useState("")
    const [link, setCompany] = React.useState("")
    const params =useParams();
    const navigate = useNavigate();

    useEffect(  () => {
        console.warn(params)
        getProductDetails();
    }, [] )

    const getProductDetails = async () =>{
        console.warn(params)
        let result = await fetch(`https://tybca.herokuapp.com/product/${params.id}`,{
            headers:{
                authorization: ` bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        setName(result.name)
        setCompany(result.link)
    }

    const UpdateProduct = async () => {
        console.warn(name, link)
        let result = await fetch( `https://tybca.herokuapp.com/product/${params.id}`,{
            method: 'put',
            body: JSON.stringify({name, link}),
            headers: {
                'Content-Type': 'application/json',
                authorization: ` bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        console.warn(result)
        navigate('/')


    }

    return (
        <div className='product'>
            <h1> Update Product</h1>
            <input className="inputBox" type={"text"} placeholder="Enter product Name "
                value={name} onChange={(e) => setName(e.target.value)} />


            <input className="inputBox" type={"text"} placeholder="Enter company Name "
                value={link} onChange={(e) => setCompany(e.target.value)} />


            <button onClick={UpdateProduct} className="appbutton" type={"submit"}>Update Product</button>
        </div>
    )
}

export default UpdateProduct