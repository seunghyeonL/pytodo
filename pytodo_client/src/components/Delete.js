import axios from 'axios';
import { apiURL, config } from '../api';

function Delete({ setTodos, content_id }) {
    const username = localStorage.getItem('username');

    const handleClick = (event) => {
        axios.post(`${apiURL}/delete`, {username : username, content_id : String(content_id) }, config)
            .then(res => {
                setTodos(res.data.data)
            })
    }

    return (
        <button onClick={handleClick}>삭제</button>
    )
}

export default Delete;