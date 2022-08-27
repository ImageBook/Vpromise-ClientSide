import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import SentPromiseCard from './components/SentPromiseCard';
import Navbar from './Shared/Navbar';

const SentPromises = () => {
    const [user] = useAuthState(auth);
    const email = user?.email;
    const [promise, setPromise] = useState([]);
    // const { title, due_date, notes, senderContact, receiverContact, receiverText, status, sentVideo } = promise;

    useEffect(() => {
        fetch(`http://localhost:5000/sent-promises/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log('promise info', data);
                setPromise(data);
            })
    }, [email]);

    return (
        <div>
            <Navbar></Navbar>
            <p className='text-[22px] lg:text-3xl text-center mb-10 mt-14'>Your Sent Promises</p>
            <div className='max-w-[1000px] mx-auto'>
                <div className='flex flex-col items-center justify-center gap-5 mb-10'>
                    {
                        [...promise].reverse().map(p => <SentPromiseCard key={p._id} p={p} ></SentPromiseCard>)
                    }
                    {/* <div className='w-11/12 sm:w-5/6 md:w-3/5 mx-auto border rounded-lg p-4 bg-gray-100'>
                        <div className=''>
                            <video className='rounded w-96 mb-3' src={sentVideo} controls></video>
                            <p className='font-medium mb-1'>Status: <span className=' text-amber-500'>{status}</span></p>
                            <p className='font-medium mb-1'>Title: <span className='font-normal'>{title}</span></p>
                            <p className='font-medium mb-1'>Notes: <span className='font-normal'>{notes}</span></p>
                            <p className='font-medium mb-1'>Due Date: <span className='font-normal'>{due_date}</span></p>
                            <p className='font-medium mb-1'>Receiver Contact: <span className='font-normal'>{receiverContact}</span></p>
                            <p className='font-medium mb-1'>Receiver Should Say: <span className='font-normal'>{receiverText}</span></p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default SentPromises;