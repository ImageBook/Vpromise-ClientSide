import React, { useEffect, useState } from 'react';
import Navbar from '../Shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { MdPersonalInjury } from 'react-icons/md';
import { FcAcceptDatabase } from 'react-icons/fc';
import { GiReceiveMoney } from 'react-icons/gi';
import { FiSend } from 'react-icons/fi';
import { MdOutlineCallReceived } from 'react-icons/md';
import axios from 'axios';
import auth from '../../firebase.init';
import { onAuthStateChanged } from 'firebase/auth';

const Home = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');

    useEffect(()=>{
        const userLoggedInCheck =  localStorage.getItem('isLoggedIn')
        if(userLoggedInCheck!='1'){
            navigate('/login')
        }
    },[])

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // console.log('user', user);
            setName(user.phoneNumber);
        }
    });

    const goToSentPromises = () => {
        navigate('/sent-promises');
    }
    const goToReceivedPromises = () => {
        navigate('/received-promises/pending');
    }

    const goPersonalPromise = () => {
        navigate('/personal-promise');
    }
    const goProfessionalPromise = () => {
        navigate('/professional-promise');
    }
    const goFinancialPromise = () => {
        navigate('/financial-promise');
    }

    return (
        <div className='relative min-h-screen'>
            <Navbar></Navbar>
            <div className='my-14'>
                <p className='text-[22px] lg:text-3xl text-center mb-6'>Choose Your Promise Type</p>
                <div className='flex flex-col items-center justify-center mt-10 space-y-4'>
                    <button onClick={goPersonalPromise} className='border rounded-lg w-[270px] lg:w-[350px] py-2 bg-gray-50 hover:bg-gray-100 text-lg lg:text-xl text-[#79589F] text-center flex items-center justify-center space-x-2' >
                        <MdPersonalInjury className='w-7 h-7 -ml-6'></MdPersonalInjury>
                        <p>Personal Promise</p>
                    </button>
                    <button onClick={goProfessionalPromise} className='border rounded-lg w-[270px] lg:w-[350px] py-2 bg-gray-50 hover:bg-gray-100 text-lg lg:text-xl text-center flex items-center justify-center space-x-2'>
                        <FcAcceptDatabase className='w-7 h-7 text-[#79589F] ml-2'></FcAcceptDatabase>
                        <p className='text-[#79589F]'>Professional Promise</p></button>
                    <button onClick={goFinancialPromise} className='border rounded-lg w-[270px] lg:w-[350px] py-2 bg-gray-50 hover:bg-gray-100 text-lg lg:text-xl text-[#79589F] text-center flex items-center justify-center space-x-2'>
                        <GiReceiveMoney className='w-7 h-7 text-[#79589F] -ml-6'></GiReceiveMoney>
                        <p>Financial Promise</p>
                    </button>
                </div>
            </div>

            <div className='flex items-center justify-center'>
                <div className='absolute bottom-[60px] lg:bottom-6'>
                    <div className='flex items-center justify-center space-x-8'>
                        <div className='flex flex-col items-center space-y-2'>
                            <div onClick={goToSentPromises} className='w-14 h-14 mx-auto rounded-full border border-purple-400 bg-purple-500 hover:bg-white text-white hover:text-purple-500 transtion duration-300 ease-in-out p-3 hover:cursor-pointer'>
                                <FiSend className='w-6 h-6 mx-auto mt-[2px] ml-[2px]'></FiSend>
                            </div>
                            <p onClick={goToSentPromises} className='font-medium text-lg text-center text-[#6e4f91] hover:cursor-pointer'>Promise <br /> Given</p>
                        </div>
                        <div className='flex flex-col items-center space-y-2'>
                            <div onClick={goToReceivedPromises} className='w-14 h-14 mx-auto rounded-full border border-purple-400 bg-purple-500 hover:bg-white text-white hover:text-purple-500 transtion duration-300 ease-in-out p-3 hover:cursor-pointer'>
                                <MdOutlineCallReceived className='w-6 h-6 mx-auto mt-[2px]'></MdOutlineCallReceived>
                            </div>
                            <p onClick={goToReceivedPromises} className='font-medium text-lg text-[#6e4f91] hover:cursor-pointer text-center'>Promise <br /> Received</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;