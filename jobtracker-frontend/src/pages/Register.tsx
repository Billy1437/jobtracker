import React, { useState } from 'react'
import axios from 'axios';
import {auth} from "../firebase/config"
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const Register = () => {
    const [loading,setLoading] = useState(false);
    const [,setgoogleLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email : "",
        password: "",
        confirmPassword: ""
    })

    const navigate = useNavigate()

    const serverUrl = import.meta.env.VITE_SERVER_URL
    

    const [error,setError] = useState('');


    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, 
            [e.target.name] : e.target.value
        })

    }

    const handleGoogleLogin = async () => {

        setgoogleLoading(true)
        setError('');

        const provider = new GoogleAuthProvider;

        try{
            const result = await signInWithPopup(auth,provider)
            const user = result.user

            // send user data to backend

            const response = await axios.post(`${serverUrl}/api/auth/google-login`, {
                googleId : user.uid,
                name : user.displayName,
                email : user.email,

            })
             
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            navigate('/homepage')

        }catch(error:any){
            console.error('Google login failed',error);
            setError(error.response?.data?.message || 'Google login failed');

        }
        finally{
            setgoogleLoading(false);
        }

    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match");
            setLoading(false);
            return;
        }

        try{
            const response = await axios.post(`${serverUrl}/api/auth/register`, {
                name: formData.name,
                email: formData.email,
                password: formData.password
            })
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user',JSON.stringify(response.data.user))

            navigate("/homepage")

        }catch(error:any){
            setError(error.response?.data?.message || 'Registration failed')
        }finally{
            setLoading(false)
            
        }

    }
   
  return (
    <div className='min-h-screen flex items-center px-4 sm:px-6 md:px-8 justify-center bg-gray-50'>
        <div className='max-w-md w-full sm:space-y-8 space-y-6'>
            <div>
                <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                    Create your account
                </h2>
            </div>

            <form action="" onSubmit={handleSubmit} className='mt-8 space-y-4 sm:space-y-6'>

                {error && (
                    <div className='bg-red-100 border border-red-400 text-red-400 px-3 py-2 rounded'>
                        {error}
                    </div>
                )}

                <div className='rounded-md shadow-sm space-y-2'>
                    <div>
                        <input type="text" name='name' required
                        className='relative block w-full px-3 py-2 border border-gray-300 placeholder:gray-500 text-gray-900
                        rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        placeholder='Enter your full name'
                        value={formData.name}
                        onChange={handleChange}
                         />
                    </div>
                    <div>
                        <input type="email" name='email' required
                        className='relative block w-full px-3 py-2 border border-gray-300 placeholder:gray-500 text-gray-900
                        rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        placeholder='Enter your email'
                        value={formData.email}
                        onChange={handleChange}
                         />
                    </div>
                    <div>
                        <input type="password" name='password' required
                        className='relative block w-full px-3 py-2 border border-gray-300 placeholder:gray-500 text-gray-900
                        rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        placeholder='Enter your password' 
                        value={formData.password}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input type="password" name='confirmPassword' required
                        className='relative block w-full px-3 py-2 border border-gray-300 placeholder:gray-500 text-gray-900
                        rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        placeholder='Confirm your password' 
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <button type='submit' disabled={loading} 
                    className='"group relative w-full flex justify-center py-2 px-4 border border-transparent 
                    text-sm font-medium rounded-md text-white bg-indigo-600 
                    hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
                    >{loading ? 'Creating account...' : 'Sign Up'}</button>
                </div>

                <div className='mt-6'>
                    <div className='relative'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-300' />
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='px-2 bg-gray-50 text-gray-500'>Or continue with</span>
                        </div>
                    </div>
                

                <div className='mt-6'>
                    <button type='button' className='w-full inline-flex justify-center py-2 px-4 border 
                    border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                    onClick={handleGoogleLogin}>
                        <img src='google.svg' className='w-5 h-5 mr-2' alt="" />
                        Sign up with google
                    
                    </button>
                </div>
                </div>

                <div className='text-center'>
                    <span className='text-sm text-gray-600'>Already have an account?{' '}
                        <a href="/" className='font-medium text-indigo-600 hover:text-indigo-500'>Sign In
                        </a>
                    </span>
                </div>
                

                                
            </form>

        </div>

    </div>
  )
}

export default Register