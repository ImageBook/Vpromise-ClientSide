import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { personalPromiseReducer } from '../App/Features/PersonalPromiseData/PersonalDataSlice';
import Navbar from '../Pages/Shared/Navbar';
import { useForm } from "react-hook-form";

const FinacialPromise = () => {
    return <div>
        <Navbar></Navbar>
        <FinancialPromise2 />
    </div>
}

const FinancialPromise2 = () => {
    const [title, setTitle] = useState(null);
    const [date, setDate] = useState(null);
    const [notes, setNotes] = useState(null);
    const navigate = useNavigate();
    // const { register, formState: { errors }, handleSubmit } = useForm();

    const dispatch = useDispatch();

    const handleSubmit = event => {
        // console.log(event);
        const data = {
            title: title,
            date: date,
            notes: notes,
            type: 'Financial Promise'
        };
        event.preventDefault();
        dispatch(personalPromiseReducer(data));
        navigate('/personal-promise-info');
        // console.log(title, date, notes);
        event.target.reset();
    }
    // console.log('title', title)
    return (
        <div>
            {/* <Navbar></Navbar> */}
            <p className='text-[22px] lg:text-3xl text-center mb-6 mt-14'>Financial Promise</p>
            <div className='max-w-[1000px] mx-auto'>
                <div className='w-11/12 sm:w-5/6 md:w-3/5 mx-auto border rounded-lg p-4 bg-gray-100'>
                    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
                        <div className='flex flex-col items-start mb-1'>
                            <p className='font-light mb-1'>Title of the Promise</p>
                            <input onChange={(e) => setTitle(e.target.value)} className='w-[300px] md:w-[350px] lg:w-[400px] h-14 bg-white px-3 py-2 mb-3 rounded-lg focus:outline-none' type="text" name="title" placeholder='Title' required />
                        </div>
                        <div className='flex flex-col items-start mb-1'>
                            <p className='font-light mb-1'>Due date</p>
                            <input onChange={(e) => setDate(e.target.value)} className='w-[300px] md:w-[350px] lg:w-[400px] h-14 bg-white px-3 py-2 mb-3 rounded-lg focus:outline-none' type="date" name="date" placeholder='Due Date' required />
                        </div>
                        <div className='flex flex-col items-start mb-1'>
                            <p className='font-light mb-1'>Notes</p>
                            <textarea onChange={(e) => setNotes(e.target.value)} className='w-[300px] md:w-[350px] lg:w-[400px] h-32 bg-white px-3 py-2 mb-3 rounded-lg focus:outline-none' type="text" name="notes" placeholder='Notes' required />
                        </div>
                        <button type='submit' className='bg-[#79589f] px-8 py-2 rounded-lg text-white tracking-wide hover:bg-[#8A6AAE]'>Next</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FinacialPromise;