import React, { useState } from 'react';
import { FaRegUser, FaRegBell, FaSignOutAlt } from "react-icons/fa";
import { BiMessageDots, BiLogInCircle } from "react-icons/bi";
import { RiBarChart2Fill, RiUserHeartLine } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import { MdAssignment } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import flower from '../../assect/Flower2.png'
import flower2 from '../../assect/Flower3.png'
import cardbg from '../../assect/cardbg.png'
import HomeBarChart from '../Chart/HomeBarChart/HomeBarChart';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';


const Home = () => {
    const [show, setShow] = useState(false)
    const [user]=useAuthState(auth)
    const navigate=useNavigate()
    const logout = () => {
        signOut(auth);
      };
    return (
        <div className=' h-full  flex w-full justify-center items-center'>
            <div className=' w-full lg:pl-10 px-5  relative'>
                <div className=' flex w-full justify-between items-center '>
                    <div className='relative md:ml-10 ml-5'>
                        <img className=' md:w-16 w-10 absolute -top-4 -left-10 ' src={flower} alt="flower" />
                        <h1 className=' md:text-2xl text-md font-medium'>WellCome Home</h1>
                    </div>
                    <div className=' flex items-center'>
                        <div className=' bg-red-100 hover:bg-opacity-50 hover:shadow-md cursor-pointer p-2 rounded-md mr-5'>
                            <BiMessageDots />
                        </div>
                        <div className=' bg-green-100 hover:bg-opacity-50 hover:shadow-md  cursor-pointer p-2 rounded-md mr-5'>
                            <FaRegBell />
                        </div>
                        <div onClick={() => setShow(!show)} className=' bg-blue-100 hover:bg-opacity-50 hover:shadow-md  cursor-pointer p-2 rounded-md mr-5'>
                            <FaRegUser />
                        </div>
                    </div>
                </div>
                <div className=' w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-between gap-4'>
                    <div className=' bg-purple-800 hover:shadow-lg cursor-pointer relative  py-8 rounded-md overflow-hidden '>
                        <FaUsers className=' mx-auto text-5xl text-yellow-400' />
                        <h1 className=' text-white text-5xl'>2058</h1>
                        <p className=' text-gray-300'>Join Member</p>
                        <img className='w-32 absolute xl:top-8 top-6 -left-10  opacity-30' src={flower2} alt="flower2" />
                        <img className='w-60 absolute top-0 -right-20  opacity-30' src={cardbg} alt="cardbg" />
                    </div>

                    <div className=' bg-blue-800 hover:shadow-lg cursor-pointer relative  py-8 rounded-md overflow-hidden '>
                        <RiBarChart2Fill className=' mx-auto text-5xl text-yellow-400' />
                        <h1 className=' text-white text-5xl'>07</h1>
                        <p className=' text-gray-300'>Graph Chart</p>
                        <img className='w-60 absolute top-0 -left-20  opacity-30' src={cardbg} alt="cardbg" />
                    </div>
                    <div className=' bg-pink-800 hover:shadow-lg cursor-pointer relative  py-8 rounded-md overflow-hidden transition-all '>
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
                    <div className=' w-full'>
                        <div className=' bg-white  rounded-lg shadow-xl  px-10 py-5'>
                            <HomeBarChart className='w-2/3 h-[20rem]' />
                        </div>
                    </div>
                </div>
                <div className={`bg-white bg-opacity-30 backdrop-blur-lg text-white px-6 py-4 absolute top-9 rounded transition-all duration-300 delay-300 ease-out flex flex-col items-start  ${show ? 'block right-10 ease-in duration-300' : 'hidden -right-10 ease-in duration-300'}`}>
                    {
                        user ?    <button onClick={()=>logout()} className=' flex items-center hover:text-purple-500'><FaSignOutAlt className='mr-2 text-purple-500' />Log out</button>:<>
                        <button onClick={()=>navigate("/login")} className=' flex items-center hover:text-purple-500'><BiLogInCircle className='mr-2 text-purple-500' />Log In</button>
                    <button onClick={()=>navigate("/signup")} className=' flex items-center mt-3 hover:text-purple-500'><MdAssignment className='mr-2 text-purple-500 ' />Sign Up</button></>
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;