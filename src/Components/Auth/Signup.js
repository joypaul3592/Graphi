import React from 'react';
import { useForm } from 'react-hook-form';

import { useSendEmailVerification, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from './Loading';
import Sociallogin from './Sociallogin';




const SignUp = () => {

  const [updateProfile, updating, updateerror] = useUpdateProfile(auth);
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [sendEmailVerification, sending] = useSendEmailVerification(auth);
  const { register, formState: { errors }, handleSubmit } = useForm();


  const onSubmit = async data => {
    console.log(data);
    const name = data.name;
    // await sendEmailVerification();
    await createUserWithEmailAndPassword(data.email, data.password)
    await updateProfile({ displayName: name });
  }
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  // const [token] = useToken(user || guser);
  // console.log(token);


  if (loading || updating) {
    return <Loading></Loading>
  }
  if (user) {
    navigate(from, { replace: true });

  }


  let errormessage;
  if (error) {
    errormessage = (error?.message)
    toast(errormessage)
  }
  return (
    <div className='mt-36'>
      <div className='mx-auto flex items-center justify-center'>

        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-5xl  justify-center font-bold">SignUp </h2>
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Name</span>

                </label>
                <input type="text"
                  placeholder="Name Here"
                  className="input  input-bordered input-info w-full max-w-xs"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required"
                    }
                  })} />
                <label className="label">
                  {errors.name?.type === 'required' && <span className="label-text-alt  text-red-500">{errors.name.message}</span>}



                </label>
                <label className="label">
                  <span className="label-text">Email</span>

                </label>
                <input type="email"
                  placeholder="Email Here"
                  className="input input input-bordered input-info w-full max-w-xs"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required"
                    },
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Please Enter Valid Email' // JS only: <p>error message</p> TS only support string
                    }
                  })} />
                <label className="label">
                  {errors.email?.type === 'required' && <span className="label-text-alt  text-red-500">{errors.email.message}</span>}
                  {errors.email?.type === 'pattern' && <span className="label-text-alt  text-red-500">{errors.email.message}</span>}


                </label>
                <label className="label">
                  <span className="label-text">Password</span>

                </label>
                <input type="password"
                  placeholder="Password Here"
                  className="input input input-bordered input-info w-full max-w-xs"
                  {...register("password", {
                    required: {

                      value: true,
                      message: "password is required"
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message: "1 capital letter 1number "

                    }
                  })} />
                <label className="label">
                  {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                  {errors.password?.type === 'pattern' && <span className="label-text-alt  text-red-500">{errors.password.message}</span>}


                </label>
              </div>

              <input type="submit" className='btn btn-accent w-full text-white' value={"SignUp Now"} />
            </form>
          </div>
          <p>Already Have an Account  <Link to={'/login'} className='text-secondary'>Login Here</Link></p>
          <div className="divider">OR</div>
          <div className="grid h-20 card rounded-box place-items-center">
            <Sociallogin></Sociallogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;