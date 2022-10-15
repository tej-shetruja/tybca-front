import React from 'react'
import { useNavigate } from 'react-router-dom'



const AddProduct = () => {
    const [name, setName] = React.useState("")
    const [link, setCompany] = React.useState("")
    const [error, setError] = React.useState(false)
    const navigate = useNavigate();

    const addProduct = async () => {

        console.warn(!name)
        if (!name || !link) {
            setError(true)
            return false
        }

        console.warn(name, link)
        const userid = JSON.parse(localStorage.getItem('user'))
        console.warn({ "UserID": userid._id })
        let result = await fetch('https://tybcap.herokuapp.com/add-product', {
            method: 'post',
            body: JSON.stringify({ name, link, userid }),
            headers: {
                'Content-Type': 'application/json',
                authorization: ` bearer ${JSON.parse(localStorage.getItem('token'))}`
            }

        });
        result = await result.json()
        console.warn(result)
        localStorage.setItem("addproduct", JSON.stringify(result));
        navigate('/')



    }

    return (
        <div className='product'>
            <h1> Add Program</h1>
            <input className="inputBox" type={"text"} placeholder="Enter Program Name "
                value={name} onChange={(e) => setName(e.target.value)} />
            {error && !name && <span className='invalid-input'>Enter valid Name</span>}


            <input className="inputBox" type={"text"} placeholder="Enter Program Link "
                value={link} onChange={(e) => setCompany(e.target.value)} />
            {error && !link && <span className='invalid-input'>Enter valid company Name</span>}

            <button onClick={addProduct} className="appbutton" type={"submit"}>Add Product</button>
        </div>
    )
}

export default AddProduct
