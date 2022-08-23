import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import PersonalPromise from './Pages/PersonalPromise/PersonalPromise';
import PersonalPromiseInfo from './Pages/PersonalPromiseInfo';
import SignUp from './Pages/SignUp/SignUp';

function App() {
  return (
    <div className='font'>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/personal-promise' element={<PersonalPromise></PersonalPromise>}></Route>
        <Route path='/personal-promise-info' element={<PersonalPromiseInfo></PersonalPromiseInfo>}></Route>
      </Routes>
    </div>
  );
}

export default App;
