import React from 'react';
import Navbar from './Shared/Navbar';
import { useSelector } from 'react-redux';
// import { data } from 'autoprefixer';

const PersonalPromiseInfo = () => {
    const personalData = useSelector((state) => state.personalPromiseReducer.data)
    // console.log(personalData);
    const { title, date, notes } = personalData;

    return (
        <div>
            <Navbar></Navbar>
            <p>{title}</p>
            <p>{date}</p>
            <p>{notes}</p>
        </div>
    );
};

export default PersonalPromiseInfo;