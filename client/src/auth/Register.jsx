import { useState } from 'react'
import { register,login } from '../api/auth';
import { useAsyncError, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast"
const Register = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();

    const[formData , setFormData] = useState({
        name : "",
        email :"",
        password: ""
    })

    const handleSubmit = async (e)=>{
    e.preventDefault();  
    try{
        if(isLoggedIn){
            const res = await login(formData);
            localStorage.setItem("token" , res.data.token);
            toast.success("Login Successfull")
            navigate("/tasks")
        }
        else{
            await register(formData);
            setIsLoggedIn(true);
        }
    }
    catch(e){
        alert(e.response?.data?.message || e);
        console.log(e);
    }
}
    return (
        <div className='flex flex-col items-center justify-center bg-slate-900 h-screen '>
            <div className='w-auto md:w-150 h-auto border border-pink-50 rounded-lg p-10'>
                <h1 className='text-pink-50 text-3xl font-semibold text-center'>{!isLoggedIn ? "Lets Break the LIMITS⚡" : "Welcome Back"}</h1>

                <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-full p-10'>
                    {!isLoggedIn && (
                        <input type="text" placeholder='Username' 
                        className='w-full py-2 px-4 text-md  border border-pink-50 text-pink-50 rounded-lg'
                        value = {formData.name} 
                        onChange={(e) =>setFormData({...formData, name: e.target.value})} required/>
                    )}

                    <input type="text" 
                    placeholder='Email' 
                    className='w-full py-2 px-4 text-md  border border-pink-50 text-pink-50 rounded-lg'
                     value = {formData.email} 
                     onChange={(e) =>setFormData({...formData, email: e.target.value})} required/>

                    <input type="text"
                     placeholder='Password' 
                     className='w-full py-2 px-3 text-md border border-pink-50 text-pink-50  rounded-lg' 
                     onChange={(e) =>
                    setFormData({...formData, password: e.target.value})}  
                    required/>

                    <button type="submit" 
                    className='w-full py-2 px-3 text-md border border-1 rounded-lg bg-pink-500 text-white hover:bg-pink-600 hover:text-white hover:border-pink-600 hover:shadow-pink-500/30 transition-all duration-300 transform hover:-translate-y-1' 
                    >{!isLoggedIn ? 'Register' : 'Login'}
                    </button>

                    <p className='text-center text-pink-50'>{!isLoggedIn ? 'Already have an account?' : 'Don\'t have an Account?'} <span className='text-pink-500 cursor-pointer'
                     onClick={() => setIsLoggedIn(!isLoggedIn)}>{!isLoggedIn ? 'Login' : 'Register'}</span></p>
                </form>
            </div>
        </div>
    )
}

export default Register