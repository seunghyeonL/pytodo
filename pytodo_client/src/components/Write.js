import { useState } from 'react'

function Write() {
    const [inputInfo, setInputInfo] = useState('')
    
    const handleInput = (event) => {
        setInputInfo(event.target.value);
    }

    const handleSubmit = (event) => {

    }

    return (
        <div>
            <textarea placeholder='todo 입력' onChange={handleInput}></textarea>
            <button >완료</button>
        </div>
    )
}

export default Write;