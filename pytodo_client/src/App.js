import {BrowserRouter, Routes, Route } from 'react-router-dom';
import {Main, Todos, Login, Signup, Browse} from './pages';
import {Nav, Clock} from './components';
import { useState, useEffect } from 'react'

function App() {
  const [state, setState] = useState({ login : false, accessToken : '' });

  // useEffect({
    
  // })

  return (
    <div>      
      <BrowserRouter>
      <Nav state={state} setState={setState}/>
      <Clock /> 
          <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/todos' element={<Todos />}></Route> 
          <Route path='/login' element={<Login setState={setState}/>}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/browse' element={<Browse />}></Route>
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
