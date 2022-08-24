import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Spinner from '../Shared/Spinner';

const SignUp = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [phoneNumber, setPhoneNumber] = useState('');
    useEffect(() => {
        // console.log('user', user);
        const email = user?.user?.email;
        const name = user?.user?.displayName;
        // console.log('email', email);
        // console.log('name', name);
        const currentUser = {
            email: email,
            name: name,
            phone: phoneNumber
        };
        console.log('current user', currentUser)
        fetch(`http://localhost:5000/user/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(currentUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log('login data', data);
            })
    }, [user?.user?.email, phoneNumber, user]);

    const navigate = useNavigate();

    if (loading || updating) {
        return <>
            <div className='mt-20'></div>
            <Spinner></Spinner>
        </>
    }

    let signInError;
    if (error || updateError) {
        signInError = <p className='text-red-500 font-medium text-center'>{error?.message || updateError?.message}</p>
    }
    if (user) {
        navigate('/home');
        // console.log('user', user);
    }

    const onSubmit = async data => {
        // console.log(data.number);
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
        setPhoneNumber(data.number);
    }

    return (
        <div className='bg h-screen'>
            <div className='flex flex-col items-center justify-center '>
                <p className='text-3xl lg:text-4xl font-semibold mb-10 mt-16 text-white text-center'>Welcome to Vpromise!</p>
                <form onSubmit={handleSubmit(onSubmit)} className='w-11/12 sm:w-[400px] lg:w-[550px] border rounded-lg p-4 md:p-5 lg:p-8 bg-white'>
                    <p className='text-xl lg:text-[22px] tracking-wide mb-6 text-center'>Please Sign Up to Vpromise</p>
                    {/* Name */}
                    <input {...register("name", {
                        required: {
                            value: true,
                            message: 'Name is required'
                        }
                    })} className='w-full h-14 bg-gray-100 px-3 py-2 mb-3 rounded-lg focus:outline-none' type="name" name="name" id="" placeholder='Name' />
                    <p>
                        {errors.name?.type === 'required' && <span className='text-red-500'>{errors.name.message}</span>}
                    </p>
                    {/* Number */}
                    <input onChange={(e) => setPhoneNumber(e.target.value)} {...register("number", {
                        required: {
                            value: true,
                            message: 'Phone Number is required'
                        },
                        pattern: {
                            value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                            message: "Invalid Phone Number",
                        },
                    })} className='w-full h-14 bg-gray-100 px-3 py-2 mb-3 rounded-lg focus:outline-none' type="text" placeholder='Phone Number' name="number" />
                    <p>
                        {errors.number?.type === 'required' && <span className='text-red-500'>{errors.number.message}</span>}
                        {errors.number?.type === 'pattern' && <span className='text-red-500'>{errors.number.message}</span>}
                    </p>
                    {/* Email */}
                    <input {...register("email", {
                        required: {
                            value: true,
                            message: 'Email is required'
                        },
                        pattern: {
                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                            message: 'Provide a Valid Email'
                        }
                    })} className='w-full h-14 bg-gray-100 px-3 py-2 mb-3 rounded-lg focus:outline-none' type="email" name="email" id="" placeholder='Email' />
                    <p>
                        {errors.email?.type === 'required' && <span className='text-red-500'>{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className='text-red-500'>{errors.email.message}</span>}
                    </p>
                    {/* Password */}
                    <input {...register("password", {
                        required: {
                            value: true,
                            message: 'Password is required'
                        },
                        minLength: {
                            value: 6,
                            message: 'Password must be 6 characters or longer.'
                        }
                    })} className='w-full h-14 bg-gray-100 px-3 py-2 mb-3 rounded-lg focus:outline-none' type="password" name="password" id="" placeholder='Password' />
                    <p>
                        {errors.password?.type === 'required' && <span className='text-red-500'>{errors.password.message}</span>}
                        {errors.password?.type === 'minLength' && <span className='text-red-500'>{errors.password.message}</span>}
                    </p>

                    {signInError}

                    <button type='submit' className='w-full h-12 bg-[#534292] hover:bg-[#4e37a1] rounded-lg text-[#fafafa] text-lg font-medium tracking-wide'>Sign Up</button>
                    <hr className='mt-10 mb-5 bg-black' />
                    <p className='text-center tracking-wide text-[17px]'>Have an account? <Link className='underline text-purple-500' to='/'>Log In</Link> </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;