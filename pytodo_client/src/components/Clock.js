import { useState, useEffect } from 'react';

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        setInterval(() => {
            setTime(new Date());
        }, 1000)
    }, [])

    return (
        <div>
            <h1>Clock</h1>
            <span>{time.toLocaleTimeString()}</span>
        </div>
    )

}

export default Clock;