import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { personalReceiverVideoReducer } from '../../App/Features/PersonalPromiseData/ReceiverVideoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";
import axios from 'axios';

const VideoPreview = ({
    stream,
    width = 300,
    status
}) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);
    console.log("stream -->", stream);
    return !stream ? null : (
        <video className={`${status} w-full rounded`} ref={videoRef} width={width} autoPlay />
    );
};



const ReceivedPromisesCard = ({ promise }) => {
    const { _id, title, due_date, notes, senderContact, receiverContact, receiverText, status, sentVideo } = promise;
    const [video, setVideo] = useState('');
    const [error, setError] = useState(false);
    const [visual, setVisual] = useState('');

    const acceptPromise = async () => {
        if (visual === '') {
            setError(true);
        }
        else {
            const formData = new FormData();
            const response = await fetch(visual).then(response => response.blob())

            const myFile = new File(
                [response], 'visual.mp4', { type: 'video/webm' }
            )
            formData.append('file', myFile);
            formData.append("upload_preset", "yfhzkfb5");

            axios.post("https://api.cloudinary.com/v1_1/dtflws28q/video/upload", formData).then((response) => {
                console.log('url', response.data.secure_url);
                console.log(response);
                if (response.status === 200) {
                    const update = {
                        status: 'Accepted',
                        receiverVideo: response.data.secure_url
                    };

                    fetch(`https://evening-wave-04854.herokuapp.com/sent-promises/${_id}`, {
                        method: 'PATCH',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(update)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.modifiedCount) {
                                toast.success("You accepted a promise!");
                            }
                            console.log('updated data', data);
                        })
                }
            })

        }
    }

    const rejectPromise = () => {
        const update = {
            status: 'Rejected',
        };

        fetch(`https://evening-wave-04854.herokuapp.com/sent-promises/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(update)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    toast.success("This promise is rejected!");
                }
                console.log('updated data', data);
            })
    }

    return (


        <div className='w-11/12 sm:w-5/6 md:w-3/5 mx-auto border rounded-lg p-4 bg-gray-100 relative'>
            <div className=''>
                <video className='rounded w-96 mb-3' src={sentVideo} controls></video>
                {
                    promise.type && <p className='font-medium mb-1'>Type: <span className=' text-purple-500'>{promise.type}</span></p>
                }
                {
                    status === 'Pending' && <p className='font-medium mb-1'>Status: <span className=' text-sky-500'>{status}</span></p>
                }
                {
                    status === 'Accepted' && <p className='font-medium mb-1'>Status: <span className=' text-emerald-500'>{status}</span></p>
                }
                {
                    status === 'Rejected' && <p className='font-medium mb-1'>Status: <span className=' text-red-500'>{status}</span></p>
                }

                <p className='font-medium mb-1'>Title: <span className='font-normal'>{title}</span></p>
                <p className='font-medium mb-1'>Notes: <span className='font-normal'>{notes}</span></p>
                <p className='font-medium mb-1'>Sender Contact: <span className='font-normal'>{senderContact}</span></p>
                <p className='font-medium'>What Should Say: <span className='font-normal'>{receiverText}</span></p>
                {
                    (status === 'Pending') &&
                    <>
                        <p className='font-normal mb-2 text-[#6a17c9] mt-1'>Record a video to accept the promise</p>
                        <ReactMediaRecorder
                            video
                            render={({ status, previewStream, startRecording, stopRecording, mediaBlobUrl, error }) => (
                                <div>
                                    <p className='text-xl font-medium capitalize text-center mb-4'>{status}...</p>
                                    {
                                        status.toString() !== "stopped" &&
                                        <VideoPreview stream={previewStream} status={status} />
                                    }
                                    {
                                        (status.toString() === "stopped") &&
                                        <video className='rounded w-[325px] sm:w-[450px] md:w-[500px] mx-auto mt-4' src={mediaBlobUrl} autoplay controls loop />
                                    }
                                    {setVisual(mediaBlobUrl)}
                                    <div className='flex flex-col space-y-2 mt-4'>
                                        {
                                            (status.toString() === "stopped" || status.toString() === "idle") &&
                                            <button className='bg-[#3a3737] text-white w-[200px] mx-auto px-4 py-2 rounded-lg hover:bg-black tracking-wide' onClick={startRecording}>Start Recording</button>
                                        }
                                        {
                                            (status.toString() === "recording") &&
                                            <button className='bg-[#3a3737] text-white w-[200px] mx-auto px-4 py-2 rounded-lg hover:bg-black tracking-wide' onClick={stopRecording}>Stop Recording</button>
                                        }
                                        <p className='font-medium text-red-500'>{error}</p>
                                    </div>
                                </div>
                            )}
                        >
                        </ReactMediaRecorder>
                        {error && <p className='text-red-500'>Please record a video</p>}
                        <div className='flex space-x-4 mt-6 items-center justify-center'>
                            <button onClick={acceptPromise} className='bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1 rounded-lg'>Accept Promise</button>
                            <button onClick={rejectPromise} className='bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg'>Reject Promise</button>
                        </div>
                    </>
                }
                <p className='font-light absolute -bottom-[30px] text-gray-800'>Due Date: <span className='font-light'>{due_date}</span></p>
            </div>
        </div>


    );
};

export default ReceivedPromisesCard;