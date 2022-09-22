import React from 'react';
import { FaRegUser, FaRegBell } from "react-icons/fa";
import { BiMessageDots } from "react-icons/bi";
import { RiBarChart2Fill, RiUserHeartLine } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import flower from '../../assect/Flower2.png'
import flower2 from '../../assect/Flower3.png'
import cardbg from '../../assect/cardbg.png'
import graphImg from '../../assect/graphImg.png'
import HomeBarChart from '../Chart/HomeBarChart/HomeBarChart';

const Home = () => {
    return (
        <div className='  h-full pl-10 pr-5 py-10 pb-12 pt-20'>
            <div className=' flex w-full justify-between items-center '>
                <div className='relative ml-10'>
                    <img className=' w-16 absolute -top-4 -left-10 ' src={flower} alt="flower" />
                    <h1 className=' text-2xl font-medium'>WellCome Home</h1>
                </div>
                <div className=' flex items-center'>
                    <div className=' bg-red-100 hover:bg-opacity-50 hover:shadow-md cursor-pointer p-2 rounded-md mr-5'>
                        <BiMessageDots />
                    </div>
                    <div className=' bg-green-100 hover:bg-opacity-50 hover:shadow-md  cursor-pointer p-2 rounded-md mr-5'>
                        <FaRegBell />
                    </div>
                    <div className=' bg-blue-100 hover:bg-opacity-50 hover:shadow-md  cursor-pointer p-2 rounded-md mr-5'>
                        <FaRegUser />
                    </div>
                </div>
            </div>
            <div className=' mt-10 flex items-center justify-between gap-4 xl:gap-0'>
                <div className=' bg-purple-800 hover:shadow-lg cursor-pointer relative xl:w-[24vw] w-full py-8 rounded-md overflow-hidden '>
                    <FaUsers className=' mx-auto text-5xl text-yellow-400' />
                    <h1 className=' text-white text-5xl'>2058</h1>
                    <p className=' text-gray-300'>Join Member</p>
                    <img className='w-32 absolute xl:top-8 top-6 -left-10  opacity-30' src={flower2} alt="flower2" />
                    <img className='w-60 absolute top-0 -right-20  opacity-30' src={cardbg} alt="cardbg" />
                </div>

                <div className=' bg-blue-800 hover:shadow-lg cursor-pointer relative xl:w-[15vw] w-full py-8 rounded-md overflow-hidden '>
                    <RiBarChart2Fill className=' mx-auto text-5xl text-yellow-400' />
                    <h1 className=' text-white text-5xl'>07</h1>
                    <p className=' text-gray-300'>Graph Chart</p>
                    <img className='w-60 absolute top-0 -left-20  opacity-30' src={cardbg} alt="cardbg" />
                </div>
                <div className=' bg-pink-800 hover:shadow-lg cursor-pointer relative xl:w-[20vw] w-full py-8 rounded-md overflow-hidden transition-all '>
                    <AiFillLike className=' mx-auto text-5xl text-yellow-400' />
                    <h1 className=' text-white text-5xl'>5807</h1>
                    <p className=' text-gray-300'>Users Like</p>
                    <img className='w-80 absolute top-0 -right-10  opacity-30' src={cardbg} alt="cardbg" />
                </div>
            </div>
            <div className=' mt-10'>
                <div className=' flex items-center font-semibold'>
                    <div className=' h-8 w-8 rounded-full border-purple-700 border relative mr-3'>
                        <RiUserHeartLine className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-blue-800 ' />
                    </div>
                    <h1 className=' text-left'>Happy Users</h1>
                </div>
                <div className=' bg-white  rounded-lg shadow-xl  px-10 py-5'>
                    <HomeBarChart className='w-full h-[20rem]' />
                </div>
            </div>

        </div>
    );
};

export default Home;