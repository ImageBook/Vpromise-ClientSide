import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Shared/Navbar';
import { useForm } from "react-hook-form";
import { async } from '@firebase/util';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReceiverDetails = () => {
    const personalData = useSelector((state) => state.personalPromiseReducer.data);
    const { title, date, notes } = personalData;
    const videoData = useSelector((state) => state.personalSenderVideoReducer.data);
    const { visual } = videoData;
    const [user] = useAuthState(auth);
    const [modal, setModal] = useState(false);
    const [userData, setUserData] = useState({});
    // const [url, setUrl] = useState('');
    const email = user?.email;
    // console.log('visual', visual);

    const navigate = useNavigate();
    const goToSentPromises = () => {
        navigate('/sent-promises');
    }

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    useEffect(() => {
        fetch(`https://evening-wave-04854.herokuapp.com/user/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log('user info', data);
                setUserData(data);
            })
    }, [email]);


    const onSubmit = async data => {
        const phone = userData.phone;
        // get form data of video and post to cloudinary
        // const formData = new FormData();
        // formData.append('file', visual);
        // formData.append("upload_preset", "yfhzkfb5");

        // axios.post("https://api.cloudinary.com/v1_1/dtflws28q/video/upload", formData).then((response) => {
        //     console.log(response);
        //     console.log('url', response.data.secure_url);
        //     setUrl(response.data.secure_url);
        // })

        const promise = {
            title: title,
            due_date: date,
            notes: notes,
            senderContact: phone,
            receiverContact: data.number,
            receiverText: data.message,
            status: 'Pending',
            senderEmail: email,
            sentVideo: visual
        };
        // post to database
        fetch('https://evening-wave-04854.herokuapp.com/sent-promises', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(promise)
        })
            .then(res => res.json())
            .then(data => {
                console.log('data', data);
                setModal(true);
                reset();
            })

    }

    return (
        <div className='relative'>
            <Navbar></Navbar>
            {/* <video className='' src={visual} controls autoplay></video> */}
            <p className='text-[22px] lg:text-3xl text-center mb-10 mt-14 px-2'>Provide Receiver Details</p>
            <div className='max-w-[1000px] mx-auto relative'>
                <div className='w-11/12 sm:w-5/6 md:w-3/5 mx-auto border rounded-lg p-4 bg-gray-100'>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center space-y-1'>
                        <div className='flex flex-col items-start mb-1'>
                            <p className='font-light mb-1'>Receiver Phone Number</p>
                            <input {...register("number", {
                                required: {
                                    value: true,
                                    message: 'Phone Number is required'
                                },
                                pattern: {
                                    value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                                    message: "Invalid Phone Number",
                                },
                            })} className='w-[300px] md:w-[350px] lg:w-[400px] h-14 bg-white px-3 py-2 mb-3 rounded-lg focus:outline-none' type="text" name="number" placeholder='Number' required />
                            <p>
                                {errors.number?.type === 'required' && <span className='text-red-500'>{errors.number.message}</span>}
                                {errors.number?.type === 'pattern' && <span className='text-red-500'>{errors.number.message}</span>}
                            </p>
                        </div>
                        <div className='flex flex-col items-start mb-1'>
                            <p className='font-light mb-1'>What Receiver should say in the video</p>
                            <textarea {...register("message", {
                                required: {
                                    value: true,
                                    message: 'Message is required'
                                }
                            })} className='w-[300px] md:w-[350px] lg:w-[400px] h-32 bg-white px-3 py-2 mb-3 rounded-lg focus:outline-none' type="text" name="message" placeholder='Message' required />
                        </div>
                        <button type='submit' className='bg-[#79589f] px-4 py-2 rounded-lg text-white tracking-wide hover:bg-[#8A6AAE]'>Send Promise</button>
                    </form>
                </div>
                {
                    modal &&
                    <div data-aos="fade-up"
                        data-aos-duration="500"
                        data-aos-offset="200" className=' flex items-center justify-center'>
                        <div className='absolute top-1/3'>
                            <div className='flex flex-col items-center justify-center w-11/12 sm:w-full mx-auto rounded bg-[#79589f] px-5 py-3'>
                                <p className='font-medium text-lg lg:text-xl leading-tight mb-1 mt-3 text-center text-green-500'>Your promise is successfully sent!</p>
                                <p className='text-lg lg:text-xl mb-3 text-center text-gray-200'>Do you want to see your sent promises?</p>
                                <div className='flex items-center mb-4 space-x-4'>
                                    <button onClick={goToSentPromises} className='bg-emerald-500 text-white hover:bg-emerald-600 transition duration-500 ease-in-out px-5 py-1 rounded-lg font-medium text-lg tracking-wide'>Yes</button>
                                    <button onClick={() => setModal(false)} className='bg-red-500 text-white hover:bg-red-600 transition duration-500 ease-in-out px-3 py-1 rounded-lg font-medium text-lg tracking-wide'>Later</button>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </div>

        </div>
    );
};

export default ReceiverDetails;