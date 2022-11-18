import {BrowserRouter, Routes, Route } from 'react-router-dom';
import {Main, Todos, Write, Login, Signup, Browse} from './pages';
import {Nav, Clock} from './components';

function App() {

  return (
    <div>      
      <BrowserRouter>
      <Nav />
      <Clock /> 
          <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/Todos' element={<Todos />}></Route>
          <Route path='/Write' element={<Write />}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='/Signup' element={<Signup />}></Route>
          <Route path='/Browse' element={<Browse />}></Route>
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
