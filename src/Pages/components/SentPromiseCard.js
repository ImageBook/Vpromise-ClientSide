import React from 'react';

const SentPromiseCard = () => {
    return (
        <div className='w-11/12 sm:w-5/6 md:w-3/5 mx-auto border rounded-lg p-4 bg-gray-100'>
            <div className=''>
                <video className='rounded w-96 mb-3' src={sentVideo} controls></video>
                <p className='font-medium mb-1'>Status: <span className=' text-amber-500'>{status}</span></p>
                <p className='font-medium mb-1'>Title: <span className='font-normal'>{title}</span></p>
                <p className='font-medium mb-1'>Notes: <span className='font-normal'>{notes}</span></p>
                <p className='font-medium mb-1'>Due Date: <span className='font-normal'>{due_date}</span></p>
                <p className='font-medium mb-1'>Receiver Contact: <span className='font-normal'>{receiverContact}</span></p>
                <p className='font-medium mb-1'>Receiver Should Say: <span className='font-normal'>{receiverText}</span></p>
            </div>
        </div>
    );
};

export default SentPromiseCard;