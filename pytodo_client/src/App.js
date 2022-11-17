import {BrowserRouter, Routes, Route } from 'react-router-dom';
import {Main, Page1, Page2} from './pages';
import {Nav} from './components';

function App() {
  return (
    <div>      
      <BrowserRouter>
      <Nav></Nav>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/page1' element={<Page1 />}></Route>
          <Route path='/page2' element={<Page2 />}></Route>
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
