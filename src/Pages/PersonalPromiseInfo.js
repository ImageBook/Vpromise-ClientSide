import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Shared/Navbar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactMediaRecorder } from "react-media-recorder";

// const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
//     const videoRef = useRef<HTMLVideoElement>(null);
  
//     useEffect(() => {
//       if (videoRef.current && stream) {
//         videoRef.current.srcObject = stream;
//       }
//     }, [stream]);
//     if (!stream) {
//       return null;
//     }
//     return <video ref={videoRef} width={500} height={500} autoPlay controls />;
//   };

const PersonalPromiseInfo = () => {
    const personalData = useSelector((state) => state.personalPromiseReducer.data)
    // console.log(personalData);
    const { title, date, notes } = personalData;
    const [visual, setVisual] = useState('');

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
                    <div className='flex items-center justify-center mt-16 mb-28'>
                        <ReactMediaRecorder
                            video
                            render={({ status, startRecording, stopRecording, mediaBlobUrl, error }) => (
                                <div>
                                    <p className='text-xl font-medium capitalize text-center mb-4'>{status}...</p>
                                    <video className='rounded w-[325px] sm:w-[450px] md:w-[500px] mx-auto' src={mediaBlobUrl} controls autoPlay loop />
                                    {console.log('video', mediaBlobUrl)}
                                    {mediaBlobUrl && setVisual(mediaBlobUrl)}
                                    <div className='flex flex-col space-y-2 mt-4'>
                                        <button className='bg-[#79589f] w-[200px] mx-auto px-4 py-2 rounded-lg text-white tracking-wide hover:bg-[#8A6AAE]' onClick={startRecording}>Start Recording</button>
                                        <button className='bg-[#79589f] w-[200px] mx-auto px-4 py-2 rounded-lg text-white tracking-wide hover:bg-[#8A6AAE]' onClick={stopRecording}>Stop Recording</button>
                                        <p className='font-medium text-red-500'>{error}</p>
                                    </div>
                                </div>
                            )}
                        >
                        </ReactMediaRecorder>
                    </div>
                </div>
            </div>
            {/* <div>
                <video src={visual} controls autoplay></video>
            </div> */}
        </div>
    );
};

export default PersonalPromiseInfo;