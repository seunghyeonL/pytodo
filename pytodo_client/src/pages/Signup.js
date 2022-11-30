import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiURL, config } from '../api';

function Signup({setModalState}) {
    const navigate = useNavigate();
  
    const [inputInfo, setInputInfo] = useState({
      username: '',
      password: '',
      passwordCheck: ''
    });
  
    const [checkText, setCheckText] = useState({
      username: '',
      password: '',
      passwordCheck: '',
      submit: ''
    });

    const regPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,15}$/;
    const regUsername = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{2,10}$/;
  
    const handleInput = (event) => {
      if (event.target.placeholder === 'username') {
        setInputInfo({ ...inputInfo, username: event.target.value });
      }
      if (event.target.placeholder === 'password') {
        setInputInfo({ ...inputInfo, password: event.target.value });
      }
      if (event.target.placeholder === 'password check') {
        setInputInfo({ ...inputInfo, passwordCheck: event.target.value });
      }
    };
  
    const handleOnBlur = (event) => {
      if (event.target.placeholder === 'username') {
        if (regUsername.test(event.target.value)) {
          axios
            .get(`${apiURL}/check?username=${inputInfo.username}`, config)
            .then((res) => {
              if (res.data.message === 'username available!') {
                setCheckText({ ...checkText, username: '사용 가능한 아이디 입니다.' });
              } else {
                setCheckText({ ...checkText, username: '중복된 아이디 입니다.' });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setCheckText({ ...checkText, username: '아이디는 2~10글자 사이로 입력해주세요.' });
        }
      }

    };
  
    const handlePwBlur = (event) => {
      if (event.target.placeholder === 'password') {
        if (event.target.value === '') setCheckText({ ...checkText, password: '' });
        else if (regPw.test(event.target.value)) setCheckText({ ...checkText, password: '사용 가능한 비밀번호 입니다.' });
        else setCheckText({ ...checkText, password: '알파벳, 숫자, 특수문자를 포함한 8~15글자를 입력해주세요.' });
      }
      if (event.target.placeholder === 'password check') {
        if (event.target.value === '') setCheckText({ ...checkText, passwordCheck: '' });
        else if (inputInfo.password === event.target.value) setCheckText({ ...checkText, passwordCheck: '비밀번호가 일치합니다.' });
        else setCheckText({ ...checkText, passwordCheck: '비밀번호가 일치하지 않습니다.' });
      }
    };
  
    const handleSubmit = () => {
      if (
        checkText.username === '사용 가능한 아이디 입니다.' &&
        checkText.password === '사용 가능한 비밀번호 입니다.' &&
        checkText.passwordCheck === '비밀번호가 일치합니다.'
      ) {
        const sending = inputInfo;
        delete sending.passwordCheck;
        axios.post(
            `${apiURL}/signup`, sending, config).then((res) => {
          // 로그인창으로 리다이렉트
          setModalState({isOpen : true, text : '회원가입 되었습니다.'})
          navigate('/Login');
        }).catch(err => {
          setModalState({isOpen:true, text : err})
        });
      } else {
        setCheckText({ ...checkText, submit: '입력사항을 모두 올바르게 입력해주세요.' });
      }
    };
  
    return (
      <div>        
        <div>
          <div>
            <input type='text' placeholder='username' onChange={handleInput} onBlur={handleOnBlur} />
            {checkText.username === '사용 가능한 아이디 입니다.'
              ? (
                <span className='green'>{checkText.username}</span>
                )
              : (
                <span>{checkText.username}</span>
                )}
            <br></br>
            <input type='password' placeholder='password' onChange={handleInput} onBlur={handlePwBlur} />
            {checkText.password === '사용 가능한 비밀번호 입니다.'
              ? (
                <span className='green'>{checkText.password}</span>
                )
              : (
                <span>{checkText.password}</span>
                )}
            <br></br>
            <input type='password' placeholder='password check' onChange={handleInput} onBlur={handlePwBlur} />
            {checkText.passwordCheck === '비밀번호가 일치합니다.'
              ? (
                <span className='green'>{checkText.passwordCheck}</span>
                )
              : (
                <span>{checkText.passwordCheck}</span>
                )}
            <br></br>
          </div>
          <br />
          <button onClick={handleSubmit}>Sign Up</button>
        </div>
      </div>
    );
}

export default Signup;