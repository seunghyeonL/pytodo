import { useNavigate } from 'react-router-dom'

export function Logout({ setState }) {
    const navigate = useNavigate();

    const LogoutHandler = (event) => {
        setState({login : false, accessToken : ''});
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        navigate('/');
    }

    return (
        <button onClick={LogoutHandler}>Logout</button>
    )
    
}
