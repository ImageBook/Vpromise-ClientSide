import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Spinner from '../Shared/Spinner';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const Login = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});
    const [flag, setFlag] = useState(false);
    const [number, setNumber] = useState('');
    const [confirmObj, setConfirmObj] = useState('');
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userLoggedInCheck = localStorage.getItem('isLoggedIn');
        if (userLoggedInCheck === '1') {
            navigate('/');
        }
    }, [])



    const setUpRecaptcha = (number) => {
        const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
        recaptchaVerifier.render();
        return signInWithPhoneNumber(auth, number, recaptchaVerifier);
    }

    const handleVerify = async (e) => {
        e.preventDefault();
        await confirmObj.confirm(parseInt(otp));
        const user = {
            phone: number
        }
        fetch(`https://evening-wave-04854.herokuapp.com/user/${number}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log('login data', data);
            })
        localStorage.setItem('isLoggedIn', '1');

        fetch(`https://evening-wave-04854.herokuapp.com/user/${number}`)
            .then(res => res.json())
            .then(data => {
                if (data.email) {
                    navigate('/');
                }
                else {
                    navigate('/signup');
                }
            })

        // if (userData.name) {
        //     navigate('/');
        // }
        // else {
        //     navigate('/signup');
        // }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // await signInWithEmailAndPassword(email, password);
        const response = await setUpRecaptcha(number);
        // console.log(response);
        setConfirmObj(response);
        setFlag(true);
    };

    return (
        <div className='bg h-screen'>
            <div className='flex flex-col items-center justify-center '>
                {
                    !flag && <p className='text-3xl lg:text-4xl font-semibold mb-10 mt-16 text-white text-center'>Welcome to Vpromise!</p>
                }
                {/* <p>Now make your Promisers more secure and flexible by being with us. You're just one step away.</p>  */}
                {
                    !flag &&
                    <form onSubmit={handleSubmit} className='w-11/12 sm:w-[400px] lg:w-[550px] border rounded-lg p-4 md:p-5 lg:p-8 bg-white'>
                        <p className='text-xl lg:text-[22px] tracking-wide mb-6 text-center'>Please Log In to Continue</p>
                        <PhoneInput className='w-full h-14 bg-gray-100 px-3 py-2 mb-5 rounded-lg focus:outline-none'
                            international
                            defaultCountry="IN"
                            placeholder="Phone Number"
                            value={number}
                            onChange={setNumber} required />
                        <div id="recaptcha-container"></div>


                        <button type='submit' className='w-full h-12 bg-[#534292] hover:bg-[#4e37a1] rounded-lg text-[#fafafa] text-lg font-medium tracking-wide'>Log In</button>
                        <hr className='mt-10 mb-5 bg-black' />
                        <p className='text-center tracking-wide text-[17px]'>New to Vpromise? <Link className='underline text-purple-500' to='/signup'>Sign Up</Link> </p>
                    </form>
                }
                {
                    flag &&
                    <div className='w-11/12 sm:w-[400px] lg:w-[550px] border rounded-lg p-4 md:p-5 lg:p-8 bg-white mt-20 lg:mt-32'>
                        <p className='text-center text-lg'>A verification code has been sent to your number</p>
                        <p className='text-center text-lg mb-4 font-medium'>Enter OTP Code</p>
                        <form onSubmit={handleVerify} className=''>
                            <input onChange={(e) => setOtp(e.target.value)} className='w-full h-14 bg-gray-100 px-3 py-2 mb-3 rounded-lg focus:outline-none' placeholder='OTP' type="text" required />
                            <button type='submit' className='w-full h-12 bg-[#534292] hover:bg-[#4e37a1] rounded-lg text-[#fafafa] text-lg font-medium tracking-wide'>Verify</button>
                        </form>
                    </div>
                }
            </div>
        </div>
    );
};

export default Login;