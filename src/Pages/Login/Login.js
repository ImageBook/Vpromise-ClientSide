import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Spinner from '../Shared/Spinner';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const getEmail = event => {
        setEmail(event.target.value);
    }
    const getPassword = event => {
        setPassword(event.target.value);
    }
    const navigate = useNavigate();
    if (user) {
        navigate('/home');
    }
    if (loading) {
        return <>
            <div className='mt-20'>
            </div>
            <Spinner></Spinner>
        </>
    }
    let signInError;
    if (error) {
        signInError = <p className='text-red-500 font-medium text-center'>{error?.message}</p>
    }
    const handleSubmit = async event => {
        event.preventDefault();
        await signInWithEmailAndPassword(email, password);
    };

    return (
        <div className='bg h-screen'>
            <div className='flex flex-col items-center justify-center '>
                <p className='text-3xl lg:text-4xl font-semibold mb-10 mt-16 text-purple-500 text-center'>Welcome to Vpromise!</p>
                {/* <p>Now make your Promisers more secure and flexible by being with us. You're just one step away.</p> */}
                <form onSubmit={handleSubmit} className='w-11/12 sm:w-[400px] lg:w-[550px] border rounded-lg p-4 md:p-5 lg:p-8 bg-white'>
                    <p className='text-xl lg:text-[22px] tracking-wide mb-6 text-center'>Please Log In to Continue</p>
                    <input onBlur={getEmail} className='w-full h-14 bg-gray-100 px-3 py-2 mb-3 rounded-lg focus:outline-none' type="email" placeholder='Your Email' name="email" requried />
                    <input onBlur={getPassword} className='w-full h-14 bg-gray-100 px-3 py-2 mb-3 rounded-lg focus:outline-none' type="password" placeholder='Your Password' name="password" required />

                    {signInError}

                    <button type='submit' className='w-full h-12 bg-[#534292] hover:bg-[#4e37a1] rounded-lg text-[#fafafa] text-lg font-medium tracking-wide'>Log In</button>
                    <hr className='mt-10 mb-5 bg-black' />
                    <p className='text-center tracking-wide text-[17px]'>New to Vpromise? <Link className='underline text-purple-500' to='/signup'>Sign Up</Link> </p>
                </form>
            </div>
        </div>
    );
};

export default Login;