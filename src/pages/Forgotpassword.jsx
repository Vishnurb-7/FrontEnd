import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ForgotOTPModal from '../components/ForgotOTPModal';
import axios from '../utils/axios'

const Forgotpassword = () => {

    const [phone, setPhone] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [Optmodal, setOtpmodal] = useState(false)
    const addServiceClose = () => setOtpmodal(false);

    const submitHandler = async () => {
        const expr = /^(91)?[0-9]{10}$/;
        if (!phone.match(expr)) {
            setErrMsg("Enter valid phone number");
            return;
        }
        try {
            const response = await axios.post("/forgotPassword", {
                mobile: phone,
            });
            setOtpmodal(true)
        } catch (error) {
            if (error.response.status === 400) {
                setErrMsg("No user with this mobile number");
                return;
            }
            if (error.response.status === 500) {
                setErrMsg("Server error try after some time ");
                return;
            }

        }
    }

    return (
        <div className='w-full h-screen grid lg:grid-cols-3 md:grid-cols-5 bg-white'>
            <div className='md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center text-center'>
                {/* <img src="logo.png" alt="logo" width={330} /> */}
                <h1 className='text-3xl font-semibold font-sans '>Enter your phone number</h1>
                <input onChange={(e) => { setPhone(e.target.value) }} type="text" name='phone' value={phone} placeholder='Phone' className='w-[80%] h-16 mt-6 text-2xl bg-gray-200 border-2 border-black rounded-full text-center' />
                <p className="text-red-500">{errMsg}</p>

                <button onClick={submitHandler} className='w-[40%] h-12 mt-10 text-xl font-semibold border-2 border-black rounded-3xl text-center hover:scale-105 hover:bg-black hover:text-white'>Send OTP</button>

                <Link to={'/login'} className='mt-3 underline font-semibold text-gray-600'>Cancel?</Link>

            </div>
            <div className='hidden md:flex items-center flex-col md:col-span-3 lg:col-span-2 text-center'>
            <img src="../../public/logi.jpg" alt="LOGIN" className='w-1/2 h-2/3 my-auto' />
                <h1 className='font-Viaoda text-7xl text-gray-500 mb-10  top-2/3'>Make everything easy</h1>
            </div>
            <ForgotOTPModal onClose={addServiceClose} visible={Optmodal} phone={phone} />

        </div>
    )
}

export default Forgotpassword
