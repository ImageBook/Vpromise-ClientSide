import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='py-3 bg-gray-100'>
            <div className='max-w-[1000px] mx-auto'>
                <div className='w-11/12 xl:w-full mx-auto'>
                    <div className='flex flex-row items-center justify-between space-y-2 md:space-y-0'>
                        <div>
                            <Link className='text-2xl font-bold text-[#8A6AAE] hover:text-[#6e4f91]' to='/home'>Vpromise</Link>
                        </div>
                        <div className='flex flex-col items-end'>
                            <div className='flex items-center space-x-2'>
                                <FaUserCircle className="w-8 h-8 md:w-10 md:h-10 text-[#8A6AAE] hover:text-[#835caf]"></FaUserCircle>
                                <p className='text-xl font-medium'>Md Ariful Islam</p>
                            </div>
                            <p className=''><span className='text-[#8A6AAE]'>+880 XXXX XXXXXX</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;