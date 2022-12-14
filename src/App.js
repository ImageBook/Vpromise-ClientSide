import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import PersonalPromise from './Pages/PersonalPromise/PersonalPromise';
import PersonalPromiseInfo from './Pages/PersonalPromiseInfo';
import ReceivedPromises from './Pages/ReceivedPromises';
import ReceiverDetails from './Pages/ReceiverDetails';
import SentPromises from './Pages/SentPromises';
import SignUp from './Pages/SignUp/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReceivedPromiseAccepted from './Pages/ReceivedPromiseAccepted';
import ReceivedPromiseRejected from './Pages/ReceivedPromiseRejected';
import OtpPage from './Pages/OtpPage';
import UpdateProfile from './Pages/UpdateProfile';
import ScrollToTop from './Pages/components/ScrollToTop'
import CheckUser from './Pages/components/CheckUser';
import ProfessionalPromise from './Pages/ProfessionalPromise';
import FinancialPromise from './Pages/FinancialPromise';
import ReceivedPromisesExpired from './Pages/ReceivedPromisesExpired';

function App() {

  return (
    <div className='font'>
      <ScrollToTop>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/signup' element={<SignUp></SignUp>}></Route>
          <Route path='/verify' element={<OtpPage></OtpPage>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/update-profile' element={<UpdateProfile></UpdateProfile>}></Route>
          <Route path='/personal-promise' element={<PersonalPromise></PersonalPromise>}></Route>
          <Route path='/professional-promise' element={<ProfessionalPromise></ProfessionalPromise>}></Route>
          <Route path='/financial-promise' element={<FinancialPromise></FinancialPromise>}></Route>
          <Route path='/personal-promise-info' element={<PersonalPromiseInfo></PersonalPromiseInfo>}></Route>
          <Route path='/receiver-details' element={<ReceiverDetails></ReceiverDetails>}></Route>
          <Route path='/sent-promises' element={<SentPromises></SentPromises>}></Route>
          <Route path='/received-promises/pending' element={<ReceivedPromises></ReceivedPromises>}></Route>
          <Route path='/received-promises/accepted' element={<ReceivedPromiseAccepted></ReceivedPromiseAccepted>}></Route>
          <Route path='/received-promises/rejected' element={<ReceivedPromiseRejected></ReceivedPromiseRejected>}></Route>
          <Route path='/received-promises/expired' element={<ReceivedPromisesExpired></ReceivedPromisesExpired>}></Route>
        </Routes>
      </ScrollToTop>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
