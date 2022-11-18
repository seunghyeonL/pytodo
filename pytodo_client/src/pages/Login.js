import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    };

    const navigate = useNavigate();

    const [inputInfo, setInputInfo] = useState({
        username: '',
        password: ''
    });

    const handleInput = (event) => {
        if (event.target.placeholder === 'username') {
            setInputInfo({ ...inputInfo, username: event.target.value });
        }
        if (event.target.placeholder === 'password') {
            setInputInfo({ ...inputInfo, password: event.target.value });
        }
    };

    const handleSubmit = (event) => {
        console.log(event.target);
        if (event.target.className === 'username') {
        axios.post('http://localhost:8080/login', { username: inputInfo.username, password: inputInfo.password }, config)
            .then(el => {
                navigate('/');
            });
        }

        if (event.target.className === 'signup') {
            navigate('/signup');
        }
    };

    return (
        <div>
            <div>로그인</div>
            <input type='username' placeholder='username' onChange={handleInput} />
            <input type='password' placdholder='password' onChange={handleInput} />
            <button className='signup' onClick={handleSubmit}>sign up</button>
            <button className='loginBtn' onClick={handleSubmit}>login</button>
        </div>
    )
}

export default Login;