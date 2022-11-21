import axios from 'axios';
import { apiURL } from '../api/apiURL';

async function tokenVerify(accessToken, setState) {

    // access 토큰 유효성 확인
    let accessVerify = await axios.post(`${apiURL}/token/verify`, { token : accessToken });
    if(!accessVerify.code) return { data : '', message : 'ok'};

    // refresh 토큰 유효성 확인
    let refreshVerify = await axios.post(`${apiURL}/token/redirect`, { token : localStorage.getItem('refreshToken') });
    if(refreshVerify.access) {
        setState({ login : true, accesstoken : refreshVerify.access})
        return { data : refreshVerify.access, message : 'get new accessToken' };
    }    
    
    // not authorized 모달창
    // navigate('/login')
    return { data : '', message : 'not authorized' };
}

export default tokenVerify;