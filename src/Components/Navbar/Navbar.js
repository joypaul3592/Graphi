import React from 'react';
import { NavLink } from 'react-router-dom';
import { SiGraphql } from "react-icons/si";
import { BiHomeAlt } from "react-icons/bi";
import { HiChartBar } from "react-icons/hi";
import { RiBarChartFill } from "react-icons/ri";
import { MdAutoGraph } from "react-icons/md";
import { AiOutlineBorderlessTable } from "react-icons/ai";
import joinUs from '../../assect/JoinusImg.png'
const Navbar = () => {
    return (
        <div className=' flex justify-between items-center flex-col h-full py-10 pb-12'>
            <div>
                <SiGraphql className=' text-6xl text-teal-500' />
                <h1 className=' text-xl font-semibold text-gray-800'>Gra<span className=' text-teal-500'>Phi</span></h1>
            </div>
            <div>
                <h1 className=' font-medium text-left ml-[1px] '>Menu</h1>
                <hr className=' bg-teal-700 h-[2px] w-8/12  ' />
                <div className='  py-5'>
                    <NavLink
                        to={'/h'}
                        className={({ isActive }) => (` text-md font-medium bg-sky-900  rounded-3xl ${isActive ? ' text-teal-500' : 'text-black'}`)}
                    >
                        <div className='flex items-center  px-3 mb-8'>
                            <BiHomeAlt className=' mr-3 text-teal-500' />
                            <p className=''>Home</p>
                        </div>
                    </NavLink>


                    <NavLink
                        to={'/hi'}
                        className={({ isActive }) => (` text-md font-medium bg-sky-900  rounded-3xl ${isActive ? ' text-teal-500' : 'text-black'}`)}
                    >
                        <div className='flex items-center  px-3 mb-8'>
                            <HiChartBar className=' mr-3 text-teal-500' />
                            <p className=''>Simple Bar</p>
                        </div>
                    </NavLink>

                    <NavLink
                        to={'/hty'}
                        className={({ isActive }) => (` text-md font-medium bg-sky-900  rounded-3xl ${isActive ? ' text-teal-500' : 'text-black'}`)}
                    >
                        <div className='flex items-center  px-3 mb-8'>
                            <RiBarChartFill className=' mr-3 text-teal-500' />
                            <p className=''>Multiple Bar</p>
                        </div>
                    </NavLink>

                    <NavLink
                        to={'/sfg'}
                        className={({ isActive }) => (` text-md font-medium bg-sky-900  rounded-3xl ${isActive ? ' text-teal-500' : 'text-black'}`)}
                    >
                        <div className='flex items-center  px-3 mb-8'>
                            <MdAutoGraph className=' mr-3 text-teal-500' />
                            <p className=''>Line Chart</p>
                        </div>
                    </NavLink>

                    <NavLink
                        to={'/gs'}
                        className={({ isActive }) => (` text-md font-medium bg-sky-900  rounded-3xl ${isActive ? ' text-teal-500' : 'text-black'}`)}
                    >
                        <div className='flex items-center  px-3 mb-8'>
                            <AiOutlineBorderlessTable className=' mr-3 text-teal-500' />
                            <p className=''>Graph Chart</p>
                        </div>
                    </NavLink>

                </div>
            </div>
            <div>
                <img className=' w-24' src={joinUs} alt="joinUs" />
                <h1 className=' font-medium '>Join with Us</h1>
            </div>
        </div>
    );
};

export default Navbar;