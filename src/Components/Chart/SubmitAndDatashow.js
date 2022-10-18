import React, {  } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import auth from '../../firebase.init'
import { NewUrl } from './ChartDatapass'

const SubmitAndDatashow = ({ Data, setDelete, submitPost, pathnme, pathLocation }) => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()

    return (
        <>
            {
                (user || pathnme?.search) ? <div className=' md:flex items-center justify-between gap-6'>
                    <div className=' flex flex-col w-full my-10 md:my-0 md:w-[50%] p-5 bg-white rounded-md shadow-md xl:px-10'>
                        <h1 className=' text-purple-800 font-semibold '>Add Your Graph</h1>
                        <hr className='mb-4 mt-1 bg-purple-800 h-[1.5px] w-1/2 flex mx-auto' />
                        <form onSubmit={submitPost} className='flex flex-col'>
                            <input type="text" placeholder='Names' name='names' className='bg-gray-100 px-3 py-1 rounded shadow-md outline-none' />

                            <input type="number" placeholder='Number' name='number' className='bg-gray-100 mt-4 px-3 py-1 rounded shadow-md outline-none' step="0.00001" />
                            {
                                (pathLocation === "multipleBarChart") && <input type="number" placeholder='Number' name='number2' className='bg-gray-100 mt-4 px-3 py-1 rounded shadow-md outline-none' step="0.00001" />
                            }
                            <button type="submit" className="inline-block px-3 py-2 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out  mx-auto mt-5">Submit</button>
                        </form>
                    </div>

                    <div className=' bg-white w-full md:w-[50%] h-[13rem] rounded-md shadow-md overflow-auto scroll py-5 px-5'>
                        {
                            Data?.map(data => <div className=' bg-white mb-5 flex justify-between items-center px-5 py-1 rounded shadow-md ' key={data?._id}>
                                <p className=' font-medium'>{data?.label}</p>
                                <p>{data?.yValue}</p>

                                <p onClick={() => setDelete(data?._id)} className='text-white  cursor-pointer px-[6px] border-2 bg-red-400 rounded-full text-md '>X</p>

                            </div>)
                        }
                    </div>
                </div> : <div className='flex border border-gray-200 justify-center items-center bg-white shadow-md py-14 gap-10'>
                    <input type="submit" onClick={() => navigate("/login")} className=' px-3 py-2 bg-green-500 text-white font-medium leading-tight text-sm rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out btn btn-accent ' value={"Login in"} />
                    <a href={`/${pathLocation}/?user=${NewUrl()}`} className=' px-3 py-2 bg-green-500 text-white font-medium text-sm leading-tight rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out ' target="_blank">Guest</a>

                </div>
            }
        </>
    )
}

export default SubmitAndDatashow