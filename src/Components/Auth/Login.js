import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthState, useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineCancel } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import auth from '../../firebase.init';


const Login = () => {


  const [signInWithEmailAndPassword, loguser, loading, error,] = useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
  const [user] = useAuthState(auth)

  const location = useLocation()
  const naviget = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Error
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [state, setState] = useState(false)


  // email input value & validation
  const emailClick = (e) => {
    const EmailRegex = /\S+@\S+\.\S+/;
    const emailValue = EmailRegex.test(e.target.value);
    if (emailValue) {
      setEmail(e.target.value);
      setEmailError('')
    } else {
      setEmailError('Please give the valid Email')
      setEmail('');
    }
  }


  // Password input value 
  const passwordClick = (e) => {
    const passwordValue = e.target.value;
    if (passwordValue.length >= 6) {
      setPassword(passwordValue);
      setPassError('')
    } else {
      setPassword('');
      setPassError('Please Give Minimum 6 Chrecter')
    }
  }




  const toggleBtn = () => {
    setState(prevState => !prevState)
  }


  // handel Login

  const handelLogin = (e) => {
    if (email !== '' && password !== '') {
      signInWithEmailAndPassword(email, password)
      setEmailError('')
      setPassError('')
    } else {
      setEmailError('Please Fill The Input')
      setPassError('Please Give Me the Password')
    }
    e.preventDefault()
  }


  // requirAuth
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      const url = `https://secure-depths-99773.herokuapp.com/login`;
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: user.email
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem('accessToken', data.token)
          naviget(from, { replace: true });
        });
    }
  }, [user])




  // succesfull 
  useEffect(() => {
    if (loguser || googleUser) {
      toast.success('LogIn Successful')
    }
  }, [loguser, googleUser])


  // User sign up error
  useEffect(() => {
    if (error?.code) {
      toast("Opps!! No User Found")
    }
  }, [error])


  // password reset
  const resetPassword = async () => {
    if (email === '') {
      setEmailError('Please Give Me A Varified Email')
    } else {
      await sendPasswordResetEmail(email);
      toast('Sent Email')
      setEmailError('')
    }

  }





  return (
    <div className="login-container">
      <div className='mb-24 mx-5 '>
        <div className="w-full lg:w-1/2 md:w-3/4 mx-auto bg-opacity-90 shadow-lg relative">

          <div className=" p-5 mt-[8rem]   bg-opacity-60 backdrop-blur-lg rounded-lg ">
            <h1 className='text-4xl font-semibold mb-5'>log In</h1>
            <div className="h-[1px] w-full bg-black opacity-20 mb-10"></div>
            <div className="flex flex-col text-left mb-8">
              <label className=' text-xl ml-2 mb-2' htmlFor="email">Email</label>
              <input onChange={emailClick} className='py-2 rounded-lg shadow-md border-0 outline-0 px-4 text-xl' type="email" name="email" id="email" required />
            </div>
            {
              emailError ? <p className='text-left mb-7 text-red-600 flex'><MdOutlineCancel className='w-5 mr-2'></MdOutlineCancel> {emailError}</p> : ''
            }

            <div className="flex flex-col text-left mb-8">
              <label className=' text-xl  ml-2 mb-2' htmlFor="password">Password</label>
              <div className="relative">
                <input onChange={passwordClick} className='w-full py-2 rounded-lg shadow-md border-0 outline-0 px-4 text-xl ' type={state ? 'text' : 'password'} name="password" id="password" required />

                <div onClick={toggleBtn} className='w-6 absolute right-4 top-[25%]'>
                  {
                    state ? <AiFillEye ></AiFillEye> : <AiFillEyeInvisible></AiFillEyeInvisible>
                  }

                </div>
              </div>
            </div>
            {
              passError ? <p className='text-left mb-7 text-red-600 flex'><MdOutlineCancel className='w-5 mr-2'></MdOutlineCancel> {passError}</p> : ''
            }
            <div className="btn-container mt-10 mb-3">
              <button onClick={handelLogin} className='w-1/3 bg-teal-500 shadow-md py-1 text-xl rounded text-white'>Log In</button>
            </div>
            <p className='mb-4 font-medium'>Create New Account? <span onClick={() => naviget('/signup')} className=' text-teal-500 cursor-pointer '>Register</span></p>
            <div onClick={() => signInWithGoogle()} className=" cursor-pointer flex items-center justify-center w-11/12 md:w-7/12 mx-auto bg-slate-50 rounded-lg shadow-md mb-5" >
              <img className='w-[45px] mr-2' src="https://pngimg.com/uploads/google/google_PNG19635.png" alt="" />
              <h3 className=' font-semibold'>Continue With Google</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;