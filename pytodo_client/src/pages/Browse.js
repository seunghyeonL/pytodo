import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {makeCalendar} from '../calendar'

function Browse() {
    const navigate = useNavigate()

    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth()+1);

    const week = ['일', '월', '화', '수', '목', '금', '토']

    const dates = makeCalendar(year, month)

    const handleChange = (event) => {
        if(event.target.className === 'year') setYear(Number(event.target.value));
        if(event.target.className === 'month') setMonth(Number(event.target.value));
    }

    const handleClick = (event) => {
        let date = event.target.textContent
        navigate(`/todos?year=${year}&month=${month}&date=${date}`)
    }

    return (
        <>
        <div>
            <input 
                type="number" 
                className='year' 
                placeholder='year' 
                value={year}
                onChange={handleChange}
            ></input>
            <input 
                type="number" 
                className='month' 
                placeholder = 'month' 
                value={month}
                onChange={handleChange}
            ></input>
        </div>
        <div>
        {week.map((el, idx) => {
            return (
                <span key={idx}>{el}   </span>
            )
        })}
        </div>
        {dates.map((days, idx) => {
            return(
                <span key={idx}>
                    {days.map((el, idx) => {
                        return (
                        <div key={idx} onClick={handleClick}>{el}  </div>                      
                        )
                    })}
                </span>
            )
        })}
        </>
    )
    
}

export default Browse;