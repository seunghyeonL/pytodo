import axios from 'axios';
import { useState } from 'react'
import { apiURL, config } from '../api';
import { tokenVerify } from '../token';
import { useNavigate } from 'react-router-dom';

function Write({ state, setState, setTodos, setModalState }) {
    const [inputInfo, setInputInfo] = useState('');
    const username = localStorage.getItem('username');

    const navigate = useNavigate();
    
    const handleInput = (event) => {
        setInputInfo(event.target.value);
    }

    const handleSubmit = (event) => {
        tokenVerify(state.accessToken, setState)
        .then(res => {
            axios.post(`${apiURL}/write`, {username : username, todo : inputInfo}, config)
            .then(res => {
                setInputInfo('');
                setTodos(res.data.data);
            })
            .catch(err =>{
                setModalState({isOpen:true, text:err})
            })
        })
        .catch(err => {
            // 'not authorized'모달창
            setModalState({isOpen:true, text:err})
            navigate('/login')
        })
        
    }

    return (
        <div>
            <textarea placeholder='todo 입력' onChange={handleInput} value={inputInfo}></textarea>
            <button onClick={handleSubmit}>완료</button>
        </div>
    )
}

export default Write;