import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { authChange } from '../../features/authSlice';
import instance from '../../utils/instance';

const AdminLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
 

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [error, setError] = useState(false);
  const [admin, setadmin] = useState({ name: "", password: "", });

  const valueSetting = (e) => {
    setadmin((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const passwordTypeChange = () => {
    if (!passwordVisible) {
      setPasswordVisible(true);
      setPasswordType("text");
    } else {
      setPasswordVisible(false);
      setPasswordType("password");
    }
  };

  const loginHandler = async () => { 
    setError(false)
    const data = { name: admin.name, password: admin.password, };
    try {
      const response = await instance.post("/admin/adminLogin", data);
   

      const { accessToken, refreshToken, adminName } = response.data

      if (response.status === 201) {
        dispatch(authChange({accessToken,refreshToken,adminName}))
        navigate("/adminlanding")
      } else {
        setError(true);
      }
    } catch (error) {
    
      setError(true);
    }

  }

  return (
      <div className='w-full h-[1007px] grid lg:grid-cols-3 md:grid-cols-5 bg-white'>
          <div className='md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center'>
              <h1 className='font-Viaoda text-7xl mb-10'>Login</h1>
              <input onChange={valueSetting} type="text" name='name' value={admin.name} placeholder='Email' required className='w-[90%] h-20 mt-10 text-3xl border-2 border-black rounded-3xl text-center'/>
        <input onChange={valueSetting} type={passwordType} name='password' value={admin.password} placeholder='Password' required className='w-[90%] h-20 mt-10 text-3xl border-2 border-black rounded-3xl text-center' />
        <p className="relative w-full ">
          <i className="absolute right-10 bottom-6 bg-white z-10 pl-2" onClick={passwordTypeChange}>
            {passwordVisible ? (
              <FiEye size={38} opacity={0.6} />
            ) : (
              <FiEyeOff size={38} opacity={0.6} />
            )}
          </i>
        </p>
        { error && <p className='text-red-600'>Invalid username or password</p>}
              <button onClick={loginHandler} className='w-[60%] h-20 mt-10 text-3xl font-semibold border-2 border-black rounded-3xl text-center  hover:bg-black hover:text-white'>Login</button>
          </div>
          <div className='hidden md:flex items-center flex-col md:col-span-3 lg:col-span-2'>
          <img src="../../public/adminLogin.jpg" alt="LOGIN" className='w-[75%]' />
          <h1 className='font-Viaoda text-7xl text-black-500 absolute  top-24'>Make everything easy</h1>
          </div>


    </div>
  )
}

export default AdminLogin