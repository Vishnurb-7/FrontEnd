import React from 'react'
import { useNavigate } from 'react-router-dom';
import image from '../../public/Banner4.jpg';
import SearchBox from './SearchBox';


const Banner2 = ({ type }) => {

    const navigate = useNavigate();

    const userHandle = () => {
        navigate('/login')
    }
    const eventHandle = () => {
        navigate('/providerProfile')
    }

    return (

        <div className={`w-[100%] h-screen bg-cover`} style={{ backgroundImage: `url(${image})` }}>

         
  
            <div className='flex flex-cols-2 h-[70%] w-[60%] ml-[20%]'>

                <div className='w-full h-full md:mt-48 text-black flex justify-center items-center font-Viaoda text-3xl md:text-6xl lg:text-5xl text-center'>From Venue Selection to Event Execution, We’re With You Every Step of the Way!</div>
                   
            </div>

            <div className='mb-24 w-50 flex items-center justify-center'>
            <SearchBox />
            </div>   

            <div className={`${type === 'admin' ? "hidden" : "flex"}  w-full  justify-center gap-8`}>
 
                <button onClick={userHandle} className='w-56 h-16 rounded-2xl border-2 shadow-2xl shadow-black border-white text-2xl text-sky-700  font-Viaoda font-semibold hover:scale-105 hover:bg-black  hover:bg-opacity-50 hover:-translate-y-1 hover:duration-300'>User</button>
                <button onClick={eventHandle} className='w-56 h-16 rounded-2xl border-2 border-white text-xl text-sky-700  font-Viaoda font-semibold shadow-2xl shadow-black hover:bg-black  hover:bg-opacity-50 hover:scale-105 hover:-translate-y-1 hover:duration-300'>Event Management</button>
            </div>

            <div className={`${(type === 'admin' || type === "landing") ? "hidden" : "flex"}  w-full  justify-center`}><img src="/scroll.webp" alt="scroll" className='z-50 w-20 h-20 md:w-20 md:h-30 lg:w-40 lg:h-40' /></div>
        </div>

    )
}

export default Banner2