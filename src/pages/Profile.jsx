import React, { useState } from 'react'
import Footer from '../components/Footer'
import Navebar from '../components/NavBar'

const Profile = () => {

  const [userData, setUserData] = useState({
    email: "example@gmail.com",
    phone: "8138476464",
    password: ".......",
    confirmPassword: ".......",
  });

  const valueSetting = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className='w-full '>
          <Navebar />
          <div className='max-w-[900px] h-[600px] bg-white mt-10 mb-10 ml-2 mr-2 lg:mx-auto flex items-center p-14 flex-col'>
              <h1 className='uppercase text-3xl font-semibold mb-5'>Profile</h1>

              <input onChange={valueSetting} type="email" name='email' placeholder='Email' value={userData.email} className='text-center text-xl mt-9 border-b-2 border-gray-500' />
              <input onChange={valueSetting} type="text" name='phone' placeholder='Phone' value={userData.phone} className='text-center text-xl mt-9 border-b-2 border-gray-500' />
              <input onChange={valueSetting} type="password" name='password' placeholder='Password' value={userData.password} className='text-center text-xl mt-9 border-b-2 border-gray-500' />
              <input onChange={valueSetting} type="password" name='confirmPassword' placeholder='Confirm Password' value={userData.confirmPassword} className='text-center text-xl mt-9 border-b-2 border-gray-500' />
              <button type='submit' className='uppercase mt-10 w-24 h-11 rounded-xl bg-green-500 hover:bg-green-600 hover:shadow-2xl'>save</button>
          </div>
          <Footer/>
    </div>
  )
}

export default Profile