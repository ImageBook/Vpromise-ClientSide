import { async } from '@firebase/util';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import auth from '../firebase.init';
import Navbar from './Shared/Navbar';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
    const [phone, setPhone] = useState('');
    const [sentPromises, setSentPromises] = useState([]);
    const [receivedPromises, setReceivedPromises] = useState([]);
    const [usernName, setUserName] = useState('');
    const [UserEmail, setUserEmail] = useState('');
    const [userData, setUserData] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setPhone(user.phoneNumber);
            }
        });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/user/${phone}`)
            .then(res => res.json())
            .then(data => {
                setUserData(data);
            })
    }, [phone]);

    useEffect(() => {
        fetch(`http://localhost:5000/sent-promises/${phone}`)
            .then(res => res.json())
            .then(data => {
                console.log('promise info', data);
                setSentPromises(data);
            })
    }, [phone]);

    useEffect(() => {
        fetch(`http://localhost:5000/received-promise/${phone}`)
            .then(res => res.json())
            .then(data => {
                console.log('promise info', data);
                setReceivedPromises(data);
            })
    }, [phone]);

    const { name, email } = userData;

    const handleSubmit = (event) => {
        event.preventDefault();
        const update = {
            name: usernName,
            email: UserEmail
        };
        fetch(`http://localhost:5000/user/${phone}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(update)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    toast.success("Your Profile is updated");
                    // event.target.reset();
                }
            })
    }

    return (
        <div>
            <Navbar></Navbar>
            <p className='text-[22px] lg:text-3xl text-center mb-6 mt-14'>Your Profile</p>
            <p className='text-xl text-center mb-1'>Total sent promises: <span className='text-purple-500 font-semibold'>{sentPromises.length}</span></p>
            <p className='text-xl text-center mb-6'>Total received promises: <span className='text-purple-500 font-semibold'>{receivedPromises.length}</span></p>
            <div className='max-w-[1000px] mx-auto'>
                <div className='w-11/12 sm:w-5/6 md:w-3/5 mx-auto border rounded-lg p-4 bg-gray-100'>
                    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
                        <div className='flex flex-col items-start mb-1'>
                            <p className='font-light mb-1'>Phone Number</p>
                            <input className='w-[300px] md:w-[350px] lg:w-[400px] h-14 bg-white px-3 py-2 mb-3 rounded-lg focus:outline-none' type="text" name="title" value={phone} />
                        </div>
                        <div className='flex flex-col items-start mb-1'>
                            <p className='font-light mb-1'>Your Name</p>
                            <input onChange={(e) => setUserName(e.target.value)} className='w-[300px] md:w-[350px] lg:w-[400px] h-14 bg-white px-3 py-2 mb-3 rounded-lg focus:outline-none' type="text" name="name" placeholder={name} required />
                        </div>
                        <div className='flex flex-col items-start mb-1'>
                            <p className='font-light mb-1'>Your Email</p>
                            <input onChange={(e) => setUserEmail(e.target.value)} className='w-[300px] md:w-[350px] lg:w-[400px] h-14 bg-white px-3 py-2 mb-3 rounded-lg focus:outline-none' type="email" name="email" placeholder={email} required />
                        </div>
                        <button type='submit' className='bg-[#79589f] px-8 py-2 rounded-lg text-white tracking-wide hover:bg-[#8A6AAE]'>Update Profile</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;