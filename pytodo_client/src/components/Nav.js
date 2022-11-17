import {Link} from 'react-router-dom';
import {Main, Page1, Page2} from '../pages';

function Nav() {
    return (
        <div>
            <Link to='/'>main  </Link>
            <Link to='/page1'>page1  </Link>
            <Link to='/page2'>page2  </Link>
        </div>
    );
}

export default Nav;