import React from 'react'
import axios from 'axios'
const Login = () => {
    const googleapicalling =()=>{
        
        window.location.href = "http://localhost:5000/auth/google/callback","_self";
      }
  return (
    <div>
      <div className='flex justify-center bg-slate-600 h-screen items-center '>
        <div className='w-1/5 h-52  bg-slate-100 rounded-md'> 
          <p className='ml-20 mt-5 mb-20 font-medium'>GOOGLE LOGIN</p>
          <button className='bg-gray-600 ml-20 w-32 font-medium rounded-md' onClick={googleapicalling}>LOGIN</button>

        </div>

      </div>
    </div>
  )
}

export default Login
