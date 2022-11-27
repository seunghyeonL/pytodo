import axios from 'axios';
import { apiURL, config } from '../api';
import { tokenVerify } from '../token';

import { useNavigate } from 'react-router-dom';

function Delete({ state, setState, setTodos, content_id }) {
    const navigate = useNavigate();

    const username = localStorage.getItem('username');

    const handleClick = (event) => {
        tokenVerify(state.accessToken, setState)
        .then(res => {
            axios.post(`${apiURL}/delete`, {username : username, content_id : String(content_id) }, config)
            .then(res => {
                setTodos(res.data.data)
            })
        })
        .catch(err => {
            // 'not authorized'모달창
            navigate('/login')
        })
        
    }

    return (
        <button onClick={handleClick}>삭제</button>
    )
}

export default Delete;