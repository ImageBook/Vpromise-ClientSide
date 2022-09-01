import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Spinner from '../Shared/Spinner';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signInOtpReducer } from '../../App/Features/PersonalPromiseData/OtpResponseSlice';


const SignUp = () => {
    // const [
    //     createUserWithEmailAndPassword,
    //     user,
    //     loading,
    //     error,
    // ] = useCreateUserWithEmailAndPassword(auth);
    // const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const { register, formState: { errors }, handleSubmit } = useForm();
    // const [phoneNumber, setPhoneNumber] = useState('');
    const [number, setNumber] = useState('');
    const [confirmObj, setConfirmObj] = useState('');
    const [flag, setFlag] = useState(false);
    const [otp, setOtp] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');


    // const dispatch = useDispatch();


    // useEffect(() => {
    //     // console.log('user', user);
    //     const email = user?.user?.email;
    //     const name = user?.user?.displayName;
    //     // console.log('email', email);
    //     // console.log('name', name);
    //     const currentUser = {
    //         email: email,
    //         name: name,
    //         phone: phoneNumber
    //     };
    //     console.log('current user', currentUser)
    //     fetch(`https://evening-wave-04854.herokuapp.com/user/${email}`, {
    //         method: 'PUT',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(currentUser)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log('login data', data);
    //         })
    // }, [user?.user?.email, phoneNumber, user]);

    const navigate = useNavigate();

    // if (loading || updating) {
    //     return <>
    //         <div className='mt-20'></div>
    //         <Spinner></Spinner>
    //     </>
    // }

    // let signInError;
    // if (error || updateError) {
    //     signInError = <p className='text-red-500 font-medium text-center'>{error?.message || updateError?.message}</p>
    // }
    // if (user) {
    //     navigate('/home');
    //     // console.log('user', user);
    // }



    const setUpRecaptcha = (number) => {
        const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
        recaptchaVerifier.render();
        return signInWithPhoneNumber(auth, number, recaptchaVerifier)
    }

    const handleVerify = async (e) => {
        e.preventDefault();
        await confirmObj.confirm(parseInt(otp));
        const currentUser = {
            email: email,
            name: name,
            phone: number
        };
        fetch(`https://evening-wave-04854.herokuapp.com/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(currentUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log('login data', data);
            })
        navigate('/');
    }

    const onSubmit = async data => {
        // setPhoneNumber(data.number);
        setName(data.name);
        setEmail(data.email);
        const response = await setUpRecaptcha(number);
        setConfirmObj(response);
        setFlag(true);
        // await createUserWithEmailAndPassword(data.email, data.password);
        // await updateProfile({ displayName: data.name });
    }

    return (
        <div className='bg h-screen'>
            <div className='flex flex-col items-center justify-center '>
                {
                    !flag && <p className='text-3xl lg:text-4xl font-semibold mb-10 mt-16 text-white text-center'>Welcome to Vpromise!</p>
                }
                {!flag &&
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
                        <PhoneInput className='w-full h-14 bg-gray-100 px-3 py-2 mb-3 rounded-lg focus:outline-none'
                            international
                            defaultCountry="IN"
                            placeholder="Phone Number"
                            value={number}
                            onChange={setNumber} required />
                        <div id="recaptcha-container"></div>
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

                        {/* {signInError} */}

                        <button type='submit' className='w-full h-12 bg-[#534292] hover:bg-[#4e37a1] rounded-lg text-[#fafafa] text-lg font-medium tracking-wide'>Sign Up</button>
                        <hr className='mt-10 mb-5 bg-black' />
                        <p className='text-center tracking-wide text-[17px]'>Have an account? <Link className='underline text-purple-500' to='/'>Log In</Link> </p>
                    </form>
                }
                {
                    flag &&
                    <div className='w-11/12 sm:w-[400px] lg:w-[550px] border rounded-lg p-4 md:p-5 lg:p-8 bg-white mt-20 lg:mt-32'>
                        <p className='text-center text-lg'>A verification code has been sent to your number</p>
                        <p className='text-center text-lg mb-4 font-medium'>Enter OTP Code</p>
                        <form onSubmit={handleVerify} className=''>
                            <input onChange={(e) => setOtp(e.target.value)} className='w-full h-14 bg-gray-100 px-3 py-2 mb-3 rounded-lg focus:outline-none' placeholder='OTP' type="text" required />
                            <button type='submit' className='w-full h-12 bg-[#534292] hover:bg-[#4e37a1] rounded-lg text-[#fafafa] text-lg font-medium tracking-wide'>Verify</button>
                        </form>
                    </div>
                }

            </div>
        </div>
    );
};

export default SignUp;