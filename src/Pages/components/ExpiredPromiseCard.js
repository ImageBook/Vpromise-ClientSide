import React from 'react';

const ExpiredPromiseCard = ({ promise }) => {
    const { _id, title, due_date, notes, senderContact, receiverContact, receiverText, status, sentVideo } = promise;

    return (
        <div className='w-11/12 sm:w-5/6 md:w-3/5 mx-auto border rounded-lg p-4 bg-gray-100 relative'>
            <div className=''>
                <video className='rounded w-96 mb-3' src={sentVideo} controls></video>
                {
                    promise.type && <p className='font-medium mb-1'>Type: <span className=' text-purple-500'>{promise.type}</span></p>
                }
                <p className='font-medium mb-1'>Status: <span className=' text-pink-500'>Expired</span></p>

                <p className='font-medium mb-1'>Title: <span className='font-normal'>{title}</span></p>
                <p className='font-medium mb-1'>Notes: <span className='font-normal'>{notes}</span></p>
                <p className='font-medium mb-1'>Sender Contact: <span className='font-normal'>{senderContact}</span></p>
                <p className='font-medium'>What Should Say: <span className='font-normal'>{receiverText}</span></p>
                <p className='font-light absolute -bottom-[30px] text-gray-800'>Due Date: <span className='font-light'>{due_date}</span></p>
            </div>
        </div>
    );
};

export default ExpiredPromiseCard;