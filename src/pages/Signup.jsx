import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from '../utils/axios';
import UserOtpModal from '../components/UserOtpModal';
import SignupWithGoogle from '../components/LoginWithGoogle';
const Signup = () => {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [Optmodal, setOtpmodal] = useState(false)
  const [GsignupErr, setGsignupErr] = useState(false);
  const addServiceClose = () => setOtpmodal(false);
  const handleError = () => setGsignupErr(true)

  const passwordTypeChange = () => {
    if (!passwordVisible) {
      setPasswordVisible(true);
      setPasswordType("text");
    } else {
      setPasswordVisible(false);
      setPasswordType("password");
    }
  };

  const [userData, setUserData] = useState({
    email: "",
    phone: "",
    password: "", 
  });

  const [validation, setValidation] = useState({
    email: {
      status: true,
      message: "",
    },
    phone: {
      status: true,
      message: "",
    },
    password: {
      status: true,
      message: "",
    },
    signupError: {
      status: true,
      message: "",
    },
  });

  const valueSetting = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const emailCheck = () => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!userData.email.match(validRegex)) {
      setValidation((prevState) => ({
        ...prevState,
        email: {
          value: false,
          message: "is this really your email ?",
        },
      }));
  

      return false;
    } else {
      setValidation((prevState) => ({
        ...prevState,
        email: {
          value: true,
          message: "",
        },
      }));
      return true;
    }
  };

  const PhoneCheck = () => {
    const expr = /^(91)?[0-9]{10}$/;
    if (!userData.phone.match(expr)) {
      setValidation((prevState) => ({
        ...prevState,
        phone: {
          value: false,
          message: "is this really your phone ?",
        },
      }));
 

      return false;
    } else {
      setValidation((prevState) => ({
        ...prevState,
        phone: {
          value: true,
          message: "",
        },
      }));
      return true;
    }
  };

  const passwordCheck = () => {
    if (userData.password.length < 8) {
      setValidation((prevState) => ({
        ...prevState,
        password: {
          value: false,
          message: "password  must be more than 8 character",
        },
      }));
 
      return false;
    } else {
      setValidation((prevState) => ({
        ...prevState,
        password: {
          value: true,
          message: "",
        },
      }));
      return true;
    }
  };


  const navigate = useNavigate()
  const loginHandle = () => {
  navigate('/login')
  }


  const signupHandler = async() => { 
    const data = { email: userData.email,phone:userData.phone, password: userData.password, };
    try {
      const response = await axios.post("/signup", data);
    



      if (response.status === 201) {
        setOtpmodal(true)
        // dispatch(authChange({accessToken,refreshToken,adminName}))
        setValidation((prevState) => ({
          ...prevState,
          signupError: {
            value: true,
            message: "",
          },
        }));
        return true;

      } else {
        setValidation((prevState) => ({
          ...prevState,
          signupError: {
            value: false,
            message: "Something wrong happened",
          },
        }));
        return false;
      }


    } catch (error) {
  
      // setError(true);
    }
  }

  return (
    <div className='w-full h-[1007px] grid lg:grid-cols-3 md:grid-cols-5 bg-white'>
    <div className='md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center'>
        <h1 className='font-Viaoda text-7xl mb-10'>Signup</h1>
        <input onChange={valueSetting} onBlur={emailCheck} type="text" name='email' value={userData.email} placeholder='Email' className='w-[90%] h-20 mt-10 text-3xl border-2 border-black rounded-3xl text-center' />
        {!validation.email.status && (
        <p className=" text-red-600">{validation.email.message}</p>
        )}
        <input
          type="text"
          name='phone'
          value={userData.phone}
          onChange={valueSetting}
          onBlur={PhoneCheck}
          placeholder='Phone'
          className='w-[90%] h-20 mt-10 text-3xl border-2 border-black rounded-3xl text-center'
        />
        {!validation.phone.status && (
        <p className=" text-red-600">{validation.phone.message}</p>
      )}
        <input onChange={valueSetting} onBlur={passwordCheck} type={passwordType} name='password' value={userData.password} placeholder='Password' className='w-[90%] h-20 mt-10 text-3xl border-2 border-black rounded-3xl text-center' />
        <p className="relative w-full ">
          <i className="absolute right-10 bottom-6 bg-white z-10 pl-2" onClick={passwordTypeChange}>
            {passwordVisible ? (
              <FiEye size={38} opacity={0.6} />
            ) : (
              <FiEyeOff size={38} opacity={0.6} />
            )}
          </i>
        </p>
        {!validation.password.status && (
        <p className=" text-red-600">{validation.password.message}</p>
      )}
        <button onClick={signupHandler} className='w-[60%] h-20 mt-10 text-3xl font-semibold border-2 border-black rounded-3xl text-center'>Signup</button>
        {!validation.signupError.status && (
        <p className=" text-red-600">{validation.signupError.message}</p>
      )}
        <p className='mt-5'>Already a member?<a className='text-blue-900 font-semibold cursor-pointer' onClick={loginHandle}>Login</a></p>
        {/* <button className='w-[60%] h-20 mt-10 flex flex-row items-center pl-3 text-2xl font-medium border-2 border-black rounded-3xl text-center'><span className='w-[20%] h-20 flex items-center justify-center'><FcGoogle/></span>Login with google</button> */}
        <SignupWithGoogle onError={handleError} />
        {GsignupErr == true &&(
        <p className=" text-red-600 mt-4">Signup failed! Try again</p>
        )}
    </div>
    <div className='hidden md:flex items-center flex-col md:col-span-3 lg:col-span-2'>
    <img src="../../public/logi.jpg" alt="LOGIN" className='w-[75%]' />
        <h1 className='font-Viaoda text-7xl text-black-500 absolute top-2/3'>Make everything easy</h1>
      </div>

      <UserOtpModal onClose={addServiceClose} visible={Optmodal} phone={ userData.phone} />


</div>
  )
}

export default Signup