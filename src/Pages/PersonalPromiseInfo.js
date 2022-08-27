import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactMediaRecorder } from "react-media-recorder";
import { personalSenderVideoReducer } from '../App/Features/PersonalPromiseData/SenderVideoSlice';


const PersonalPromiseInfo = () => {
    const personalData = useSelector((state) => state.personalPromiseReducer.data);
    // console.log(personalData);
    const { title, date, notes } = personalData;
    const [visual, setVisual] = useState('');
    const navigate = useNavigate();
    // const [recordCheck, setRecordCheck] = useState(false);
    // const [playCheck, setPlayCheck] = useState(false);
    // const [downloadCheck, setDownloadCheck] = useState(false);

    const dispatch = useDispatch();
    // let url;
    // if(visual !== ''){
    //     url = URL.createObjectURL(visual);
    // }
    const data = {
        visual: visual
    }
    // let warning = false;


    function blobToDataURL(blob, callback) {
        var fileReader = new FileReader();
        fileReader.onload = function (e) { callback(e.target.result); }
        fileReader.readAsDataURL(blob);
    }

    const receiverDetails = () => {
        if (visual !== '') {
            // console.log('video', visual);
            blobToDataURL(visual);
            dispatch(personalSenderVideoReducer(data));
            navigate('/receiver-details');
        }
        // else {
        //     warning = true;
        // }
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
                <div className='w-11/12 sm:w-5/6 md:w-3/5 mx-auto p-4'>
                    <div className='flex items-center justify-center mt-16 mb-10'>
                        <ReactMediaRecorder
                            video
                            render={({ status, startRecording, stopRecording, mediaBlobUrl, error }) => (
                                <div>
                                    <p className='text-xl font-medium capitalize text-center mb-4'>{status}...</p>
                                    <video className='rounded w-[325px] sm:w-[450px] md:w-[500px] mx-auto' src={mediaBlobUrl} controls autoPlay loop />
                                    {mediaBlobUrl && setVisual(mediaBlobUrl)}
                                    <div className='flex flex-col space-y-2 mt-4'>
                                        <button className='bg-[#3a3737] text-white w-[200px] mx-auto px-4 py-2 rounded-lg hover:bg-black tracking-wide' onClick={startRecording}>Start Recording</button>
                                        <button className='bg-[#3a3737] text-white w-[200px] mx-auto px-4 py-2 rounded-lg hover:bg-black tracking-wide' onClick={stopRecording}>Stop Recording</button>
                                        <p className='font-medium text-red-500'>{error}</p>
                                        {/* {
                                            (!mediaBlobUrl && warning) && 
                                            <p className='text-center text-red-500 font-medium'>Please record a video</p>
                                        } */}
                                    </div>
                                </div>
                            )}
                        >
                        </ReactMediaRecorder>
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center mb-20'>
                <p className='text-lg mb-3 md:w-[500px] mx-auto text-center'>Proceed furthur by recording a video and click on the below button</p>
                <button onClick={receiverDetails} className='bg-[#79589f] px-8 py-2 rounded-lg text-white tracking-wide hover:bg-[#8A6AAE]'>Next</button>
            </div>
            {/* <div>
                <video src={visual} controls autoplay></video>
            </div> */}
        </div>
    );
};

export default PersonalPromiseInfo;