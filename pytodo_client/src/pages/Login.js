import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiURL, config } from '../api';

function Login({ setState }) {

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
        console.log(inputInfo);
        if (event.target.className === 'loginBtn') {
        axios.post(`${apiURL}/login`, { username: inputInfo.username, password: inputInfo.password }, config)
            .then(res => {                
                axios.post(`${apiURL}/token`, { username: inputInfo.username, password: inputInfo.password }, config)
                    .then(res => {
                        setState({ login : true, accessToken : res.data.access});
                        localStorage.setItem('refreshToken', res.data.refresh)
                        localStorage.setItem('username', inputInfo.username)
                    })
                navigate('/');
            })
            .catch(err => {
                console.log('wrong id or password');
                // 에러모달 띄우기
            })
        }

        if (event.target.className === 'signup') {
            navigate('/signup');
        }
    };

    return (
        <div>
            <div>로그인</div>
            <input type='text' placeholder='username' onChange={handleInput} />
            <input type='password' placeholder='password' onChange={handleInput} />
            <button className='signup' onClick={handleSubmit}>sign up</button>
            <button className='loginBtn' onClick={handleSubmit}>login</button>
        </div>
    )
}

export default Login;