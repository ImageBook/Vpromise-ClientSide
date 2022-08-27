import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import ReceivedPromisesCard from './components/ReceivedPromisesCard';
import Navbar from './Shared/Navbar';

const ReceivedPromises = () => {
    const [promises, setPromises] = useState([]);
    const [userData, setUserData] = useState({});
    const [user] = useAuthState(auth);
    const email = user?.email;
    const phone = userData.phone;

    useEffect(() => {
        fetch(`http://localhost:5000/user/${email}`)
            .then(res => res.json())
            .then(data => {
                setUserData(data);
            })
    }, [email]);

    useEffect(() => {
        fetch(`http://localhost:5000/received-promises/${phone}`)
            .then(res => res.json())
            .then(data => {
                console.log('promise info', data);
                setPromises(data);
            })
    }, [phone]);

    return (
        <div>
            <Navbar></Navbar>
            <p className='text-[22px] lg:text-3xl text-center mb-10 mt-14'>Your Received Promises</p>
            <div className='max-w-[1000px] mx-auto'>
                <div className='flex flex-col items-center justify-center gap-5 mb-10'>
                    {
                        [...promises].reverse().map(promise => <ReceivedPromisesCard key={promise._id} promise={promise} ></ReceivedPromisesCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ReceivedPromises;