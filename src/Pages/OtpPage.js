import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OtpPage = () => {
    const [otp, setOtp] = useState('');
    const responseinfo = useSelector((state) => state.signInOtpReducer.data);
    // console.log(personalData);
    const { response } = responseinfo;
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();
        await response.confirm(parseInt(otp));
        navigate('/home');
    }

    return (
        <div className='bg h-screen'>
            <div className='flex flex-col items-center justify-center'>
                <div className='w-11/12 sm:w-[400px] lg:w-[550px] border rounded-lg p-4 md:p-5 lg:p-8 bg-white mt-20 lg:mt-32'>
                    <p className='text-center text-lg'>A verification code has been sent to your number</p>
                    <p className='text-center text-lg mb-4 font-medium'>Enter OTP Code</p>
                    <form onSubmit={handleVerify} className=''>
                        <input onChange={(e) => setOtp(e.target.value)} className='w-full h-14 bg-gray-100 px-3 py-2 mb-3 rounded-lg focus:outline-none' placeholder='OTP' type="text" required />
                        <button type='submit' className='w-full h-12 bg-[#534292] hover:bg-[#4e37a1] rounded-lg text-[#fafafa] text-lg font-medium tracking-wide'>Verify</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OtpPage;