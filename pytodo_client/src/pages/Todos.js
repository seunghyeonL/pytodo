import { useEffect, useState } from 'react'
import { apiURL, config } from '../api'
import { Write, Delete } from '../components'

import axios from 'axios'

function Todos({state, setState}) {
    const [todos, setTodos] = useState([])

    const quries = (new URL(window.location)).searchParams;

    const username = localStorage.getItem('username');
    const year = quries.get('year');
    const month = quries.get('month');
    const date = quries.get('date');
    const now = new Date()

    useEffect(() => {

        axios.get(`${apiURL}/daytodos/${username}?year=${year}&month=${month}&day=${date}`, config)
            .then(el => {
                console.log(el.data.data);
                setTodos(el.data.data);
            })
    }, [])

    return (
        <div>
            {todos.length === 0 ?
                <div></div>
                :
                <div>
                    {todos.map((el, idx) => {
                        return (
                            <div key={idx}>
                                <div>todo : {el.todo}</div>
                                <div>pub_date : {el.pub_date}</div>
                                {
                                    now.getFullYear() === Number(year) && now.getMonth() + 1 === Number(month) && now.getDate() === Number(date) ?
                                        <Delete state={state} setState={setState} setTodos={setTodos} content_id={el.content_id}/> :
                                        <div></div>
                                }
                            </div>
                        );
                    })}
                </div>
            }
            {
                now.getFullYear() === Number(year) && now.getMonth() + 1 === Number(month) && now.getDate() === Number(date) ?
                    <Write state={state} setState={setState} setTodos={setTodos} /> :
                    <div></div>
            }
        </div>
    )
}

export default Todos;
