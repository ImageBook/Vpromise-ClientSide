import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../firebase.init';
import ReceivedPromisesCard from './components/ReceivedPromisesCard';
import Navbar from './Shared/Navbar';

const ReceivedPromises = () => {
    const [promises, setPromises] = useState([]);

    const [phone, setPhone] = useState('');

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setPhone(user.phoneNumber);
            }
        });

    }, []);


    useEffect(() => {
        fetch(`https://evening-wave-04854.herokuapp.com/received-promises/${phone}`)
            .then(res => res.json())
            .then(data => {
                console.log('promise info', data);
                setPromises(data);
            })
    }, [phone]);

    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    const year = today.getFullYear();
    if (day < 10) {
        day = `0${day}`;
    }
    if (month < 10) {
        month = `0${month}`;
    }

    today = `${year}-${month}-${day}`;

    const pendingPromises = promises.filter(promise => promise.due_date >= today);

    return (
        <div>
            <Navbar></Navbar>
            <p className='text-[22px] lg:text-3xl text-center mb-10 mt-14'>Your Received Promises</p>
            <div className='max-w-[1000px] mx-auto'>
                <div className='w-11/12 sm:w-5/6 md:w-3/5 mx-auto'>
                    <div className='flex items-center justify-around mb-6'>
                        <Link to='/received-promises/pending' className='text-lg font-medium text-sky-500'>Pending</Link>
                        <Link to='/received-promises/accepted' className='text-lg font-medium'>Accepted</Link>
                        <Link to='/received-promises/rejected' className='text-lg font-medium'>Rejected</Link>
                        <Link to='/received-promises/expired' className='text-lg font-medium'>Expired</Link>
                    </div>
                </div>
            </div>
            <div className='max-w-[1000px] mx-auto'>
                <div className='flex flex-col items-center justify-center gap-y-14 mb-20'>
                    {
                        pendingPromises.length === 0 && <p>You don't have any pending promises</p>
                    }
                    {
                        [...pendingPromises].reverse().map(promise => <ReceivedPromisesCard key={promise._id} promise={promise} ></ReceivedPromisesCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ReceivedPromises;