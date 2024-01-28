import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SignInput from "../components/SignInput";
import signin from '../assets/signin.png';
import { useState } from "react";
import SignButton from "../components/SignButton";
import GoogleBtn from "../components/GoogleBtn";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

const schema = z.object({
    username: z.string().nonempty("Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });
function Signup() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
const url ='http://localhost:5000/api/auth/login'

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        const info = {
            Username: data.username,
            User_Password: data.password,
          };
        setLoading(true);
        const toastId = toast.info('Submitting form...');
        try {

          const response = await axios.post( url , info);     
          setLoading(false);
          toast.dismiss(toastId);
          toast.success(response);
          navigate('/')
      
        } catch (error) {
          setLoading(false);
          toast.dismiss(toastId);
          toast.error('error when ligin in');
      
          console.error(error);
        }
    };
  return (
    <div className="flex items-center ">
      <div className="w-full">
        <img src={signin} alt="" />
      </div>
      <form
        className="px-32 flex flex-col w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ToastContainer />
        <h1 className="font-bold text-3xl">Create your account</h1>
        <h4 className="font-semibold mb-3">Enter your account details</h4>
        <SignInput
          type="text"
          name="username"
          placeholder="Enter your username"
          id=""
          {...register("username")}
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}

        <SignInput
          type="password"
          name="password"
          placeholder="Enter your password"
          id=""
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <SignButton value="Register" disabled={loading} type="submit" />
        <GoogleBtn />

        <Link to='/signin' className="text-center mt-3"> Create an account</Link>
      </form>
    </div>
  );
}

export default Signup