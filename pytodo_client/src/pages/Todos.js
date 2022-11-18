import {useEffect, useState} from 'react'
import axios from 'axios'

function Todos() {
    const [init, setInit] = useState([{todo:'', pub_date:''}])

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/todos/18?user_id=2', config)
            .then(el => {
                setInit(el.data.data);
            })
    }, [])

    console.log(typeof(init[0].pub_date))

    return (
        
        <div>
            {init.map((el, idx) => {
                return (
                    <div key={idx}>
                    <div>todo : {el.todo}</div>
                    <div>pub_date : {el.pub_date}</div>
                    </div>
                );           
            })}
        </div>
    )
}

export default Todos;
