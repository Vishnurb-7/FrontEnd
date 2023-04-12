import React,{useState} from 'react'
import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/toast';
import { useDispatch, useSelector } from 'react-redux'
import { managersAuthChange, managersData, managersRefreshToken } from '../../features/managersAuthSlice'
import instance from '../../utils/instance'
import { Link } from 'react-router-dom'

const Navebar = () => {

  const dispatch = useDispatch()
  const managers = useSelector(managersData)
  const token = useSelector(managersRefreshToken)

  const toast = useToast({
    position: 'top',
    title: 'Logout failed',
    containerStyle: {
      width: '500px',
      maxWidth: '100%',
    },
  })

  const navigate = useNavigate()

  const profileHandle = () => {
    navigate('/providerprofile')
  }
  const messageHandler = () => {
    navigate("/managersChat")
  }

  const [nav, setNav] = useState("nav")
  const handleNav = () => {
    setNav(!nav)
  }

  const handleLogout = async (e) => {
    const response = await instance.post('/provider/managersLogout', { email: managers, token: token })
    if (response.status === 204) {
      dispatch(managersAuthChange({ managers: "", accessToken: "", refreshToken: "", managerId: "" }))
      navigate("/providerLogin")
    } else {
      toast({
        variant: 'left-accent',
        status: 'error',
        isClosable: true
      })
    }
  }

  return (
    <div className='h-20 px-8 z-50 bg-white top-0 sticky shadow-md'>
    <div className='flex items-center h-20 max-w-[1240px] mx-auto justify-between'>
      {/* <h1 className='w-full text-3xl font-bold'>LOGO</h1> */}
      <img src="logo.png" alt="logo" width={80} height={100}/>
      <ul className='hidden md:flex'>
        {/* <li onClick={homeHandle} className='p-4 font-bold cursor-pointer'>HOME</li> */}


        <li onClick={profileHandle} className='p-4 font-bold cursor-pointer'>PROFILE</li>
        <li onClick={messageHandler} className='p-4 font-bold cursor-pointer'>MESSAGES</li>
        <li className='p-4 font-bold cursor-pointer'><Link to={'/orders'}>ORDERS</Link></li>
        {managers && <li onClick={(e) => { handleLogout(e) }} className='p-4 hover:bg-black hover:text-white rounded-xl font-bold cursor-pointer'>LOGOUT</li>}
      </ul>
      <div className='block md:hidden' onClick={handleNav}>
        {!nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}

      </div>
      <div className={!nav ? 'fixed left-0 top-0 w-[60%] border-r border-r-gray-900 h-full bg-white ease-in-out duration-500 md:hidden' : 'fixed left-[-100%]'}>
        {/* <h1 className='w-full text-3xl font-bold m-4'>LOGO</h1> */}
        <img src="logo.png" alt="logo" width={260} />
        <ul className='p-4 uppercase'>
          {/* <li onClick={homeHandle} className='p-4 border-b border-gray-600 font-bold cursor-pointer'>HOME</li> */}


          <li className='p-4 border-b border-gray-600 font-bold cursor-pointer rounded-xl mt-2 hover:shadow-inner hover:shadow-black'>PROFILE</li>
          <li onClick={messageHandler} className='p-4 border-b border-gray-600 font-bold cursor-pointer rounded-xl mt-2 hover:shadow-inner hover:shadow-black'>MESSAGES</li>
          <li className='p-4 border-b border-gray-600 font-bold cursor-pointer rounded-xl mt-2 hover:shadow-inner hover:shadow-black'><Link to={'/orders'}>ORDERS</Link></li>
          {managers && <li onClick={(e) => { handleLogout(e) }} className='p-4 mt-2 border-b border-gray-600 hover:bg-black hover:text-white rounded-xl font-bold cursor-pointer'>LOGOUT</li>}
        </ul>
      </div>
    </div>
  </div>
  )
}

export default Navebar