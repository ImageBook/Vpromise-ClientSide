import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { personalReceiverVideoReducer } from '../../App/Features/PersonalPromiseData/ReceiverVideoSlice';

const ReceivedPromisesCard = ({ promise }) => {
    const { _id, title, due_date, notes, senderContact, receiverContact, receiverText, status, sentVideo } = promise;
    const [video, setVideo] = useState('');
    const [error, setError] = useState('');

    const acceptPromise = () => {
        if (video === '') {
            setError(true);
        }
        else {
            const formData = new FormData();
            formData.append('file', video);
            formData.append("upload_preset", "yfhzkfb5");

            axios.post("https://api.cloudinary.com/v1_1/dtflws28q/video/upload", formData).then((response) => {
                console.log('url', response.data.secure_url);
                console.log(response);
                if (response.status === 200) {
                    const update = {
                        status: 'Accepted',
                        receiverVideo: response.data.secure_url
                    };

                    fetch(`http://localhost:5000/sent-promises/${_id}`, {
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

        fetch(`http://localhost:5000/sent-promises/${_id}`, {
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
                        <p className='font-normal mb-2 text-[#6a17c9] mt-1'>Upload a video to accept the promise</p>
                        <input onChange={(event) => setVideo(event.target.files[0])} className='mb-3 block' type="file" />
                        {error && <p className='text-red-500 mb-2'>Please upload a video to accept the promise</p>}
                        <div className='flex space-x-4'>
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