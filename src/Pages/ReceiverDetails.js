import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Shared/Navbar';
import { useForm } from "react-hook-form";

const ReceiverDetails = () => {
    const videoData = useSelector((state) => state.personalSenderVideoReducer.data);
    const { visual } = videoData;

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <div>
            <Navbar></Navbar>
            {/* <video className='' src={visual} controls autoplay></video> */}
            <p className='text-[22px] lg:text-3xl text-center mb-10 mt-14 px-2'>Provide Receiver Details</p>
            <div className='max-w-[1000px] mx-auto'>
                <div className='w-11/12 sm:w-5/6 md:w-3/5 mx-auto border rounded-lg p-4 bg-gray-100'>
                    <form className='flex flex-col items-center justify-center space-y-1'>
                        <div className='flex flex-col items-start mb-1'>
                            <p className='font-light mb-1'>Receiver Phone Number</p>
                            <input onChange={(e) => setPhoneNumber(e.target.value)} {...register("number", {
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
                            <textarea className='w-[300px] md:w-[350px] lg:w-[400px] h-32 bg-white px-3 py-2 mb-3 rounded-lg focus:outline-none' type="text" name="message" placeholder='Message' required />
                        </div>
                        <button className='bg-[#79589f] px-4 py-2 rounded-lg text-white tracking-wide hover:bg-[#8A6AAE]'>Send Promise</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReceiverDetails;