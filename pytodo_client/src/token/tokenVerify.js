import axios from 'axios';
import { apiURL, config } from '../api';

async function tokenVerify(accessToken, setState) {

    // access 토큰 유효성 확인
    // async function은 디폴트로 반환값을 Promise.resolve()로 감싸준다
    try {
        let accessVerify = await axios.post(`${apiURL}/token/verify`, { token : accessToken }, config);
        console.log('access token verified')
        if (!accessVerify.data.code) return 'access token verified';
    }
    catch (err) {
        // refresh 토큰 유효성 확인
        try {
            let refreshVerify = await axios.post(`${apiURL}/token/refresh`, { refresh : localStorage.getItem('refreshToken') }, config);

            if (refreshVerify.data.access) {
                setState({ login: true, accessToken: refreshVerify.data.access })
                console.log('get new accessToken')
                
                return 'get new accessToken';
            }
        }
        catch (err) {
            console.log('not authorized');
            // not authorized 모달창
            // reject는 따로 처리
            return Promise.reject('not authorized');
        }
    }
}

export default tokenVerify;