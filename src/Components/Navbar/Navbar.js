import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { SiGraphql } from "react-icons/si";
import { BiHomeAlt } from "react-icons/bi";
import { HiChartBar, HiMenuAlt2 } from "react-icons/hi";
import { RiBarChartFill } from "react-icons/ri";
import { MdAutoGraph } from "react-icons/md";
import { AiOutlineBorderlessTable, AiOutlineDotChart } from "react-icons/ai";
import joinUs from '../../assect/JoinusImg.png'
const Navbar = () => {
    const [menu, setMenu] = useState(false)
    const { pathname } = useLocation()
    return (
        <div className=' flex justify-between items-center lg:flex-col h-full lg:justify-center'>
            <div className='lg:hidden cursor-pointer hover:shadow-lg h-8 w-8 fixed right-5 top-5 rounded-md z-[50000]'>
                <HiMenuAlt2 className=' text-lg text-gray-800 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ' onClick={() => setMenu(!menu)} />
            </div>
            <div className=' flex flex-col items-center lg:mb-10'>
                <SiGraphql className=' text-6xl text-teal-500' />
                <h1 className=' text-xl font-semibold text-gray-800'>Gra<span className=' text-teal-500'>Phi</span></h1>
            </div>
            <div>
                <h1 className=' font-medium text-left ml-[1px] hidden lg:block '>Menu</h1>
                <hr className=' bg-teal-700  hidden lg:block h-[2px] w-8/12  ' />
                <div className={`bg-white lg:bg-transparent lg:bg-opacity-0 bg-opacity-40 backdrop-blur lg:shadow-none lg:backdrop-blur-none shadow-md lg:relative  fixed top-0 left-0 py-5 w-80 lg:w-full pl-10 lg:pl-0 pt-10 z-[10000] lg:pt-5 rounded-md  ${menu ? 'block' : 'hidden lg:block'}`}>
                    <NavLink
                        to={'/'}
                        className={({ isActive }) => (` text-md font-medium bg-sky-900  rounded-3xl`)}
                    >
                        <div className='flex items-center  px-3 mb-8'>
                            <BiHomeAlt className=' mr-3 text-teal-500' />
                            <p className={`${pathname === "/" ? 'text-teal-500' : 'text-black'}`}>Home</p>
                        </div>
                    </NavLink>


                    <NavLink
                        to={'/SingleBarChart'}
                        className={({ isActive }) => (` text-md font-medium bg-sky-900  rounded-3xl ${isActive ? ' text-teal-500' : 'text-black'}`)}
                    >
                        <div className='flex items-center  px-3 mb-8'>
                            <HiChartBar className=' mr-3 text-teal-500' />
                            <p className=''>Simple Bar</p>
                        </div>
                    </NavLink>
                    <NavLink
                        to={'/horizontalBarChart'}
                        className={({ isActive }) => (` text-md font-medium bg-sky-900  rounded-3xl ${isActive ? ' text-teal-500' : 'text-black'}`)}
                    >
                        <div className='flex items-center  px-3 mb-8'>
                            <HiChartBar className=' mr-3 text-teal-500' />
                            <p className=''>Horizontal Bar</p>
                        </div>
                    </NavLink>

                    <NavLink
                        to={'/multipleBarChart'}
                        className={({ isActive }) => (` text-md font-medium bg-sky-900  rounded-3xl ${isActive ? ' text-teal-500' : 'text-black'}`)}
                    >
                        <div className='flex items-center  px-3 mb-8'>
                            <RiBarChartFill className=' mr-3 text-teal-500' />
                            <p className=''>Multiple Bar</p>
                        </div>
                    </NavLink>

                    <NavLink
                        to={'/simpleLineChart'}
                        className={({ isActive }) => (` text-md font-medium bg-sky-900  rounded-3xl ${isActive ? ' text-teal-500' : 'text-black'}`)}
                    >
                        <div className='flex items-center  px-3 mb-8'>
                            <MdAutoGraph className=' mr-3 text-teal-500' />
                            <p className=''>Line Chart</p>
                        </div>
                    </NavLink>

                    <NavLink
                        to={'/dualLineChart'}
                        className={({ isActive }) => (` text-md font-medium bg-sky-900  rounded-3xl ${isActive ? ' text-teal-500' : 'text-black'}`)}
                    >
                        <div className='flex items-center  px-3 mb-8'>
                            <AiOutlineDotChart className=' mr-3 text-teal-500' />
                            <p className=''>Dual Chart</p>
                        </div>
                    </NavLink>

                    <NavLink
                        to={'/graphChart'}
                        className={({ isActive }) => (` text-md font-medium bg-sky-900  rounded-3xl ${isActive ? ' text-teal-500' : 'text-black'}`)}
                    >
                        <div className='flex items-center  px-3 '>
                            <AiOutlineBorderlessTable className=' mr-3 text-teal-500' />
                            <p className=''>Graph Chart</p>
                        </div>
                    </NavLink>

                </div>
            </div>
            <div className=' hidden lg:block lg:mt-10'>
                <img className=' w-24' src={joinUs} alt="joinUs" />
                <h1 className=' font-medium '>Join with Us</h1>
            </div>
        </div>
    );
};

export default Navbar;