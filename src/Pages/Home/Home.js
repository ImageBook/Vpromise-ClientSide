import React, { useState } from 'react';
import Navbar from '../Shared/Navbar';
import { Link } from 'react-router-dom';
import { MdPersonalInjury } from 'react-icons/md';
import { FcAcceptDatabase } from 'react-icons/fc';
import { GiReceiveMoney } from 'react-icons/gi';
import { FiSend } from 'react-icons/fi';
import { MdOutlineCallReceived } from 'react-icons/md';

const Home = () => {
    // const [promiseGiven, setPromiseGiven] = useState(false);
    // const [promiseReceived, setPromiseReceived] = useState(false);

    return (
        <div className='relative min-h-screen'>
            <Navbar></Navbar>
            <div className='my-14'>
                <p className='text-[22px] lg:text-3xl text-center mb-6'>Choose Your Promise Type</p>
                <div className='flex flex-col items-center justify-center mt-10 space-y-4'>
                    <Link className='border rounded-lg w-[250px] lg:w-[350px] py-2 bg-gray-50 hover:bg-gray-100 text-lg lg:text-xl text-[#79589F] text-center flex items-center justify-center space-x-2' to='/personal-promise'>
                        <MdPersonalInjury className='w-7 h-7'></MdPersonalInjury>
                        <p>Personal Promise</p>
                    </Link>
                    <Link className='border rounded-lg w-[250px] lg:w-[350px] py-2 bg-gray-50 hover:bg-gray-100 text-lg lg:text-xl text-center flex items-center justify-center space-x-2' to='/personal-promise'>
                        <FcAcceptDatabase className='w-7 h-7 text-[#79589F] '></FcAcceptDatabase>
                        <p className='text-[#79589F]'>Professional Promise</p></Link>
                    <Link className='border rounded-lg w-[250px] lg:w-[350px] py-2 bg-gray-50 hover:bg-gray-100 text-lg lg:text-xl text-[#79589F] text-center flex items-center justify-center space-x-2' to='/personal-promise'>
                        <GiReceiveMoney className='w-7 h-7 text-[#79589F] '></GiReceiveMoney>
                        <p>Financial Promise</p>
                    </Link>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <div className='absolute bottom-6'>
                    <div className='flex items-center justify-center space-x-6'>
                        <div className='flex flex-col items-center space-y-2'>
                            <div className='w-14 h-14 mx-auto rounded-full border border-purple-400 bg-purple-500 hover:bg-white text-white hover:text-purple-500 transtion duration-300 ease-in-out p-3 hover:cursor-pointer'>
                                <FiSend className='w-6 h-6 mx-auto mt-[2px] ml-[2px]'></FiSend>
                            </div>
                            <p className='font-medium text-lg text-[#6e4f91] hover:cursor-pointer'>Promise Given</p>
                        </div>
                        <div className='flex flex-col items-center space-y-2'>
                            <div className='w-14 h-14 mx-auto rounded-full border border-purple-400 bg-purple-500 hover:bg-white text-white hover:text-purple-500 transtion duration-300 ease-in-out p-3 hover:cursor-pointer'>
                                <MdOutlineCallReceived className='w-6 h-6 mx-auto mt-[2px]'></MdOutlineCallReceived>
                            </div>
                            <p className='font-medium text-lg text-[#6e4f91] hover:cursor-pointer'>Promise Received</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;