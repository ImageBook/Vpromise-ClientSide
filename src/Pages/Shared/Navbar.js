import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';

const Navbar = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const doSignOut = () => {
        signOut(auth);
        navigate('/');
    }

    return (
        <div className='py-3 bg-gray-100'>
            <div className='max-w-[1000px] mx-auto'>
                <div className='w-11/12 xl:w-full mx-auto hidden lg:block'>
                    <div className='flex flex-row items-center justify-between space-y-2 md:space-y-0'>
                        <div>
                            <Link className='text-2xl font-bold text-[#8A6AAE] hover:text-[#6e4f91]' to='/home'>Vpromise</Link>
                        </div>
                        {/* <div className='flex items-center space-x-3'>
                            <p className='text-xl font-medium tracking-wide'>MENU</p>
                        </div> */}
                        <div className='flex items-center space-x-6'>
                            <div className='flex flex-col items-end'>
                                <div className='flex items-center space-x-2'>
                                    <FaUserCircle className="w-8 h-8 text-[#8A6AAE] hover:text-[#835caf]"></FaUserCircle>
                                    <p className='text-xl font-medium'>{user?.displayName}</p>
                                </div>
                            </div>
                            {
                                user && <div><button onClick={doSignOut} className='bg-[#79589f] px-4 py-2 rounded-lg text-white tracking-wide hover:bg-[#8A6AAE]'>Log Out</button></div>
                            }
                        </div>
                    </div>
                </div>
                <div className='lg:hidden'>
                    <div className='w-11/12 mx-auto'>
                        <div className='flex items-center justify-around'>
                            <div className='flex items-center space-x-2'>
                                <FaUserCircle className="w-8 h-8 text-[#8A6AAE] hover:text-[#835caf]"></FaUserCircle>
                                <p className='text-xl font-medium'>{user?.displayName}</p>
                            </div>
                            {
                                user && <div><button onClick={doSignOut} className='bg-[#79589f] px-4 py-2 rounded-lg text-white tracking-wide hover:bg-[#8A6AAE]'>Log Out</button></div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;