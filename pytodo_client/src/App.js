import {BrowserRouter, Routes, Route } from 'react-router-dom';
import {Main, Todos, Login, Signup, Browse} from './pages';
import {Nav, Clock, Modal} from './components';
import { useState, useEffect } from 'react'
import { tokenVerify } from './token';

function App() {
  const [state, setState] = useState({ login : false, accessToken : '' });
  const [modalState, setModalState] = useState({isOpen : false, text : ''});

  useEffect(() => {
    tokenVerify(state.accessToken, setState).catch(err => console.log(err))
  }, [])

  return (
    <div>      
      <BrowserRouter>
      <Nav state={state} setState={setState}/>
      <Modal modalState={modalState} setModalState={setModalState}/>
      <Clock /> 
          <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/todos' element={<Todos state={state} setState={setState} setModalState={setModalState}/>}></Route> 
          <Route path='/login' element={<Login setState={setState} setModalState={setModalState}/>}></Route>
          <Route path='/signup' element={<Signup setModalState={setModalState}/>}></Route>
          <Route path='/browse' element={<Browse setModalState={setModalState}/>}></Route>
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
