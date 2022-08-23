import React, { useState } from 'react';
import Navbar from '../Shared/Navbar';
import { Link } from 'react-router-dom';

const Home = () => {
    const [promiseGiven, setPromiseGiven] = useState(false);
    const [promiseReceived, setPromiseReceived] = useState(false);

    return (
        <div className='relative min-h-screen'>
            <Navbar></Navbar>
            <div className='my-14'>
                <p className='text-[22px] lg:text-3xl text-center mb-6'>Choose Your Promise Type</p>
                <div className='flex flex-col items-center justify-center mt-10 space-y-4'>
                    <Link className='border rounded-lg w-[250px] lg:w-[350px] py-2 bg-gray-50 hover:bg-gray-100 text-lg lg:text-xl text-[#79589F] text-center' to='/'>Personal Promise</Link>
                    <Link className='border rounded-lg w-[250px] lg:w-[350px] py-2 bg-gray-50 hover:bg-gray-100 text-lg lg:text-xl text-[#79589F] text-center' to='/'>Professional Promise</Link>
                    <Link className='border rounded-lg w-[250px] lg:w-[350px] py-2 bg-gray-50 hover:bg-gray-100 text-lg lg:text-xl text-[#79589F] text-center' to='/'>Financial Promise</Link>
                </div>
            </div>
            <div className=''>
                <div className='flex flex-col space-y-2 justify-center items-center'>
                    <button onClick={() => setPromiseGiven(!promiseGiven)} className='absolute bottom-24 border rounded-lg w-auto px-4 py-2 bg-[#79589f] hover:bg-[#4F3074] text-white lg:text-lg text-center'>Promises Given</button>
                    <button onClick={() => setPromiseReceived(!promiseReceived)} className='absolute bottom-8 border rounded-lg w-auto px-4 py-2 bg-[#79589f] hover:bg-[#4F3074] text-white lg:text-lg text-center'>Promises Received</button>
                </div>
            </div>
            <div data-aos="fade-right" data-aos-duration="3000" className=''>
                <div className={(promiseGiven ? "absolute right-0 top-0 w-[300px] mx-auto min-h-screen bg-gray-200 pt-10 px-3" : "hidden") + ""}>
                    <p className='text-xl'>Promises Given</p>
                    
                </div>
            </div>
        </div>
    );
};

export default Home;