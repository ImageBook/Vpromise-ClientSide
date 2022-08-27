import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import Navbar from './Shared/Navbar';

const SentPromises = () => {
    const [user] = useAuthState(auth);
    const email = user?.email;
    const [promise, setPromise] = useState({});
    const { title, due_date, notes, senderContact, receiverContact, receiverText, status, sentVideo } = promise;

    useEffect(() => {
        fetch(`https://evening-wave-04854.herokuapp.com/sent-promises/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log('promise info', data);
                setPromise(data);
            })
    }, [email]);

    return (
        <div>
            <Navbar></Navbar>
            <p className='text-[22px] lg:text-3xl text-center mb-10 mt-14 px-2'>Your Sent Promises</p>
            <div className='max-w-[1000px] mx-auto'>
                <div className='flex flex-col items-center justify-center gap-5'>
                    <div className='w-11/12 sm:w-5/6 md:w-3/5 mx-auto border rounded-lg p-4 bg-gray-100'>
                        <div>
                            <video className='rounded w-96' src={sentVideo} controls></video>
                            <p>Status: {status}</p>
                            <p>Title: {title}</p>
                            <p>Notes: {notes}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SentPromises;