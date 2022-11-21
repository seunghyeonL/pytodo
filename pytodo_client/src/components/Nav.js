import {Link} from 'react-router-dom';
import {Main, Signup, Write, Todos, Browse, Login} from '../pages';
import { Logout } from './Logout'
import axios from 'axios';

function Nav({state, setState}) {
    return (
        <div>
            <Link to='/'>Main  </Link>  
            {!state.login ?                 
                (<span>
                    <Link to='/Signup'>Signup  </Link>
                    <Link to='/login'>Login</Link>
                </span>)
            :                
                (<span>
                    <Link to='/browse'>Browse</Link>
                    <Logout setState={setState}/>
                </span>)
            }

        </div>
    );
}

export default Nav;