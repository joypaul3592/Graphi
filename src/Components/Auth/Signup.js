import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { MdOutlineCancel } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
import Loading from './Loading';

const SignUp = () => {
  const location = useLocation()
  const naviget = useNavigate()
  const [password, setPassword] = useState(false)

  const [createUserWithEmailAndPassword, createUser, loading, createError,] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
  const [updateProfile] = useUpdateProfile(auth);
  const navigate = useNavigate();

  // password check
  const [handel, setHandel] = useState('')
  const [handelError, setHandelError] = useState('')
  const passwordHandel = (event) => {
    const password = event.target.value
    if (password.length >= 6) {
      setHandel(event.target.value)
      setHandelError('')
    }
    else {
      setHandelError('6 Digit Password')
      setHandel('')
    }
  }



  // email input value & validation
  const [emailError, setEmailError] = useState('')
  const emailClick = (event) => {
    const EmailRegex = /\S+@\S+\.\S+/;
    const emailValue = EmailRegex.test(event.target.value);
    if (emailValue) {
      setEmailError('')
    } else {
      setEmailError('Please give the valid Email')
    }
  }


  const from = location.state?.from?.pathname || "/";


  // handel submit 
  const handelsubmit = async (event) => {
    event.preventDefault()
    const displayName = event.target.Names.value;
    const email = event.target.email.value;
    const password = handel;
    if (displayName && email && password) {
      await createUserWithEmailAndPassword(email, password);
      await updateProfile({ displayName });
    }
    else {
      return;
    }
  }




  // user sign up succesful
  useEffect(() => {
    if (createUser) {
      naviget(-1);
      toast.success('SignUp Successful!!')
      toast.success('Verification Code Sent to the Email!!')
    }
  }, [createUser])

  // User sign up error
  useEffect(() => {
    if (createError?.code) {
      toast("Opp!! Allrady Have An Account")
    }
  }, [createError])


  if (loading || googleLoading) {
    return <Loading></Loading>
  }


  return (
    <div>
      <div className='mb-24 mx-5 '>
        <div className="w-full lg:w-1/2 md:w-3/4 mx-auto bg-opacity-10 shadow-lg relative">
          <div className=" p-5 mt-[8rem]   bg-opacity-60 backdrop-blur-lg rounded-lg ">
            <h1 className='text-4xl font-semibold mb-5 font-mono cursor-pointer'>Register</h1>
            <form onSubmit={handelsubmit} className='text-black'>

              <div className="flex flex-col text-left mb-8">
                <label className=' text-xl ml-2 mb-2' htmlFor="Names">Name</label>
                <input className='py-2 placeholder:text-base rounded-lg shadow-md border-0 outline-0 px-4 text-xl' type="text" id="Names" placeholder='Enter Your Name' required />
              </div>



              <div className="flex flex-col text-left mb-8">
                <label className=' text-xl ml-2 mb-2' htmlFor="email">Email</label>
                <input onChange={emailClick} className='py-2 rounded-lg shadow-md border-0 placeholder:text-base outline-0 px-4 text-xl' name="email" type="email" id="email" placeholder='Enter Your Email' required />
              </div>
              {
                emailError ? <p className='text-left mb-7 text-red-600 flex'><MdOutlineCancel className='w-5 mr-2'></MdOutlineCancel> {emailError}</p> : ''
              }

              <div className="flex flex-col text-left mb-8">
                <label className=' text-xl  ml-2 mb-2' htmlFor="password">Password</label>
                <div className="relative">
                  <input onChange={passwordHandel} className='w-full py-2 rounded-lg placeholder:text-base shadow-md border-0 outline-0 px-4 text-xl ' placeholder='Enter Your Password' type={password ? 'text' : 'password'} name="password" id="password" required />

                  <div onClick={() => setPassword(!password)} className='w-6 absolute right-4 top-[25%]'>
                    {
                      password ? <AiFillEye ></AiFillEye> : <AiFillEyeInvisible></AiFillEyeInvisible>
                    }

                  </div>
                </div>
              </div>

              {
                handelError ? <p className='text-left mb-7 text-red-600 flex '><MdOutlineCancel className='w-5 mr-2'></MdOutlineCancel> {handelError}</p> : ''
              }

              <div className='mb-2'>

                <input type="submit" className='w-1/3 bg-teal-500 shadow-md py-1 text-xl rounded text-white cursor-pointer' value='Register' />
              </div>


              <p className='mb-4 font-medium'>Allrady have an account? <span onClick={() => navigate('/login')} className=' text-teal-500 cursor-pointer '>Log In</span></p>

              <div onClick={() => signInWithGoogle()} className=" cursor-pointer flex items-center justify-center w-11/12 md:w-7/12 mx-auto bg-slate-50 rounded-lg shadow-md mb-5" >
                <img className='w-[45px] mr-2' src="https://pngimg.com/uploads/google/google_PNG19635.png" alt="" />
                <h3 className=' font-semibold'>Continue With Google</h3>
              </div>

            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SignUp;
