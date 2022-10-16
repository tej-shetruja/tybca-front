import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const navigate = useNavigate();
    useEffect( () => {
        const auth = localStorage.getItem('user');
        if (auth)
        {
                navigate('/')
        }
    })
    const handleLogin = async () => {
        console.warn("email, password",email, password)
        let result = await fetch('https://tybca.herokuapp.com/login', {
            method: 'post',
            body: JSON.stringify({email, password }),
            headers: {
                'Content-Type': 'application/json'
            }

        });
        result = await result.json()
        console.warn(result)
        if(result.auth){
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate("/")

        }else{
            alert("Please eneter correct detail")
        }
    }

    return (
        <div className='login'>
            <h1>Login </h1>
            <input className='inputBox' type={"text"} placeholder='enter mail' onChange={(e)=> setEmail(e.target.value)} value={email} />
            {error && !email && <span className='invalid-input'>Enter E-mail</span>}

            <input className='inputBox' type={"password"} placeholder='emetr password' onChange={(e)=> setPassword(e.target.value)} value={password} />
            {error && !password && <span className='invalid-input'>Enter vpassword</span>}

            <button onClick={handleLogin} type="button" className="appbutton">Login</button>
            <Link to="/signup" className='link1'>Create a new account</Link>
            
        </div>
    )
}

export default Login
