import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className='bg h-screen'>
            <div className='flex flex-col items-center justify-center '>
                <p className='text-3xl lg:text-4xl font-semibold mb-10 mt-16 text-purple-500 text-center'>Welcome to Vpromise!</p>
                {/* <p>Now make your Promisers more secure and flexible by being with us. You're just one step away.</p> */}
                <form className='w-11/12 sm:w-[400px] lg:w-[550px] border rounded-lg p-4 md:p-5 lg:p-8 bg-white'>
                    <p className='text-xl lg:text-[22px] tracking-wide mb-6 text-center'>Please Log In to Continue</p>
                    <input className='w-full h-14 bg-gray-100 px-3 py-2 mb-3 rounded-lg focus:outline-none' type="email" placeholder='Your Email' name="email" requried />
                    <input className='w-full h-14 bg-gray-100 px-3 py-2 mb-3 rounded-lg focus:outline-none' type="password" placeholder='Your Password' name="password" required />
                    <button className='w-full h-12 bg-[#534292] hover:bg-[#4e37a1] rounded-lg text-[#fafafa] text-lg font-medium tracking-wide'>Log In</button>
                    <hr className='mt-10 mb-5 bg-black' />
                    <p className='text-center tracking-wide text-[17px]'>New to Vpromise? <Link className='underline text-purple-500' to='/signup'>Sign Up</Link> </p>
                </form>
            </div>
        </div>
    );
};

export default Login;