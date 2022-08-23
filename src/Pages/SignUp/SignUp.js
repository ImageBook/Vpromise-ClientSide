import React from 'react';
import {Link} from 'react-router-dom';

const SignUp = () => {
    return (
        <div className='bg h-screen'>
            <div className='flex flex-col items-center justify-center '>
                <p className='text-3xl lg:text-4xl font-semibold mb-10 mt-16 text-purple-500 text-center'>Welcome to Vpromise!</p>
                <form className='w-11/12 sm:w-[400px] lg:w-[550px] border rounded-lg p-4 md:p-5 lg:p-8 bg-white'>
                    <p className='text-xl lg:text-[22px] tracking-wide mb-6 text-center'>Please Sign Up to Vpromise</p>
                    <input className='w-full h-14 bg-gray-100 px-3 py-2 mb-3 rounded-lg focus:outline-none' type="text" placeholder='Name' name="name" required />
                    <input className='w-full h-14 bg-gray-100 px-3 py-2 mb-3 rounded-lg focus:outline-none' type="email" placeholder='Email' name="email" requried />
                    <input className='w-full h-14 bg-gray-100 px-3 py-2 mb-3 rounded-lg focus:outline-none' type="tel" placeholder='Phone Number' name="number" requried />
                    <input className='w-full h-14 bg-gray-100 px-3 py-2 mb-3 rounded-lg focus:outline-none' type="password" placeholder='Password' name="password" required />
                    <input className='w-full h-14 bg-gray-100 px-3 py-2 mb-3 rounded-lg focus:outline-none' type="password" placeholder='Confirm Password' name="confirmPassword" required />
                    <button className='w-full h-12 bg-[#534292] hover:bg-[#4e37a1] rounded-lg text-[#fafafa] text-lg font-medium tracking-wide'>Sign Up</button>
                    <hr className='mt-10 mb-5 bg-black' />
                    <p className='text-center tracking-wide text-[17px]'>Have an account? <Link className='underline text-purple-500' to='/'>Log In</Link> </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;