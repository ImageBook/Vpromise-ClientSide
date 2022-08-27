import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactMediaRecorder } from "react-media-recorder";
import { personalSenderVideoReducer } from '../App/Features/PersonalPromiseData/SenderVideoSlice';
import axios from 'axios';


const PersonalPromiseInfo = () => {
    const personalData = useSelector((state) => state.personalPromiseReducer.data);
    // console.log(personalData);
    const { title, date, notes } = personalData;
    // const [visual, setVisual] = useState('');
    const [video, setVideo] = useState('');
    const [url, setUrl] = useState("");
    const navigate = useNavigate();
    // const [recordCheck, setRecordCheck] = useState(false);
    // const [playCheck, setPlayCheck] = useState(false);
    // const [downloadCheck, setDownloadCheck] = useState(false);

    const dispatch = useDispatch();


    const receiverDetails = () => {
        const formData = new FormData();
        formData.append('file', video);
        formData.append("upload_preset", "yfhzkfb5");

        axios.post("https://api.cloudinary.com/v1_1/dtflws28q/video/upload", formData).then((response) => {
            console.log('url', response.data.secure_url);
            console.log(response)
            if (response.status === 200) {
                // setUrl(response.data.secure_url);
                const data = {
                    visual: response.data.secure_url
                };
                console.log(data);
                dispatch(personalSenderVideoReducer(data));
            }
        })
        navigate('/receiver-details');
    }


    return (
        <div>
            <Navbar></Navbar>
            <p className='text-[22px] lg:text-3xl text-center mb-10 mt-14 px-2'>Summary of your Personal Promise Info</p>
            <div className='max-w-[1000px] mx-auto'>
                <div className='w-11/12 sm:w-5/6 md:w-3/5 mx-auto border rounded-lg p-4 bg-gray-100'>
                    <div className='flex flex-col items-start space-y-1'>
                        <p className='text-lg font-medium'>Title of the promise: <span className='font-normal text-[#6e4f91]'>{title}</span></p>
                        <p className='text-lg font-medium'>Due date: <span className='font-normal text-[#6e4f91]'>{date}</span></p>
                        <p className='text-lg font-medium'>The message: <span className='font-normal text-[#6e4f91]'>{notes}</span></p>
                        <div className='pt-1 flex items-center justify-center'>
                            <Link className='bg-[#3a3737] text-white px-4 py-1 rounded-lg hover:bg-black tracking-wide' to='/personal-promise'>Edit Info</Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='flex items-center justify-center mt-16 mb-28'>
                <button className='bg-[#79589f] px-8 py-2 rounded-lg text-white tracking-wide hover:bg-[#8A6AAE]'>Click to Record Video</button>
            </div> */}
            <div className='max-w-[1000px] mx-auto'>
                <div className=' '>
                    <form onSubmit={receiverDetails} className='w-11/12 sm:w-5/6 md:w-3/5 mx-auto p-4 flex flex-col items-start justify-center mt-10 mb-10 bg-gray-100 rounded-lg'>
                        <p className='text-lg mb-2'>Upload your promise video</p>
                        <input onChange={(event) => setVideo(event.target.files[0])} type="file" required />
                        <button type='submit' className='bg-[#79589f] px-8 py-2 rounded-lg text-white tracking-wide hover:bg-[#8A6AAE] mt-4'>Next</button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default PersonalPromiseInfo;