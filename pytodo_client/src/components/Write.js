import axios from 'axios';
import { useState } from 'react'
import { apiURL, config } from '../api';

function Write({ setTodos }) {
    const [inputInfo, setInputInfo] = useState('');
    const username = localStorage.getItem('username');
    
    const handleInput = (event) => {
        setInputInfo(event.target.value);
    }

    const handleSubmit = (event) => {
        axios.post(`${apiURL}/write`, {username : username, todo : inputInfo}, config)
            .then(res => {
                setInputInfo('');
                setTodos(res.data.data)
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