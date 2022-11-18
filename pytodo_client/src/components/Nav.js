import {Link} from 'react-router-dom';
import {Main, Signup, Write, Todos, Browse, Login} from '../pages';
import axios from 'axios';

function Nav() {
    function handleClick(event) {
        //axios
    }
    return (
        <div>
            <Link to='/'>Main  </Link>
            <Link to='/Todos'>Todos  </Link>            
            <Link to='/browse'>Browse</Link>
            <Link to='/write'>Write</Link>
            <Link to='/Signup'>Signup  </Link>
            <Link to='/login'>Login</Link>
            <div onClick={handleClick}>logout</div>
        </div>
    );
}

export default Nav;