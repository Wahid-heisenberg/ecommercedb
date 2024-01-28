import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SignInput from "../components/SignInput";
import signin from '../assets/signin.png';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import SignButton from "../components/SignButton";
import GoogleBtn from "../components/GoogleBtn";
import { useState } from "react";
const schema = z.object({
    username: z.string().nonempty("Username is required"),
    password: z.string().nonempty("Password is required").min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z.string().nonempty("Confirm Password is required").min(6, { message: 'Password must be at least 6 characters long' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
function Signin() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
const url ='http://localhost:5000/api/auth/register'
    const onSubmit = async (data) => {
        const info = {
            Username: data.username,
            User_Password: data.password,
            Confirm_Password :data.confirmPassword
          };
        setLoading(true);
        const toastId = toast.info('Submitting form...');
        try {

          const response = await axios.post( url , info);     
          setLoading(false);
          toast.dismiss(toastId);
          toast.success(response);
          console.log(response)
        //   localStorage.setItem('access_token',response.cookies.access_token)
          navigate('/')
      
        } catch (error) {
          setLoading(false);
          toast.dismiss(toastId);
          toast.error('error signup ');
      
          console.error(error);
        }
    };

    return (
        <div className='flex items-center '>
            <div className='w-full'>
                <img src={signin} alt="" />
            </div>
            <form className="px-32 flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
            <ToastContainer />
                <h1 className='font-bold text-3xl'>
                    Create your account
                </h1>
                <h4 className='font-semibold mb-3'>Enter your account details</h4>
                <SignInput
                    type="text"
                    name="username"
                    placeholder='Enter your username'
                    id=""
                    {...register("username")}
                />
                {errors.username && <p className="text-red-500">{errors.username.message}</p>}

                <SignInput
                    type="password"
                    name="password"
                    placeholder='Enter your password'
                    id=""
                    {...register("password")}
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                <SignInput
                    type="password"
                    name="confirmPassword"
                    placeholder='Confirm your password'
                    id=""
                    {...register("confirmPassword")}
                />
                {errors.confirmPassword && <p className="text-red-500 mb-3">{errors.confirmPassword.message}</p>}
                {errors.confirmPassword && errors.confirmPassword.type === "refine" && (
                    <p className="text-red-500 mb-3">{errors.confirmPassword.message}</p>
                )}

                <SignButton value='Create account'  />
                <GoogleBtn />

                <Link to='/signup' className='text-center mt-3'> Already have an account</Link>
            </form>
        </div>
    )
}

export default Signin
