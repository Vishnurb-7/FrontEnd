import React , { useEffect, useState } from 'react'
import Navebar from '../components/NavBar'
import Footer from '../components/Footer'
import ServicesCard from '../components/ServicesCard'
import GalaryCard from '../components/GalaryCard'
import { useNavigate,useParams } from 'react-router-dom'
import { useToast } from '@chakra-ui/toast'
import { useSelector } from 'react-redux'
import { currentUserId } from '../features/userAuthSlice'
import userAxios from '../utils/userAxios'


const SingleProvider = () => {

  const [data, setData] = useState("");
  const navigate = useNavigate()
  const toast = useToast()
  const { id } = useParams();
  const userId = useSelector(currentUserId)
  console.log("provider datasssss",data);


  useEffect(() => {
    try {
      userAxios.get(`/managerProfile?id=${id}`).then((response) => {
        console.log(response);
        if (response.status === 201) {
          if (response.data) {
            setData(response.data)
          } else {
            navigate("/userlanding")
            toast({
              position: "top",
              variant: 'left-accent',
              status: 'info',
              isClosable: true,
              title: 'No companies are available',

            })
          }

        } else {
          navigate("/userlanding")
          toast({
            position: "top",
            variant: 'left-accent',
            status: 'info',
            isClosable: true,
            title: 'No companies are available',

          })
        }

      })
    } catch (error) {
      navigate("/userlanding")
      toast({
        position: "top",
        variant: 'left-accent',
        status: 'info',
        isClosable: true,
        title: 'No companies are available',

      })
    }


  }, []);

  const buttonhandle = async () => {
    try {

      const response = await userAxios.post('/chat', {
        senderId: userId, receiverId: data._id
      })
      if (response.status === 200) {
        navigate('/chat')
      } else {
        alert("server error")
      }
    } catch (error) {
      alert("server error")
    }

  }

  return (
    <div>
      <Navebar />
      <div className='w-full h-[300px] lg:h-[500px] bg-slate-300 flex justify-center'>
        {data.coverPhoto && <div className='w-full h-full bg-cover bg-no-repeat' style={{ backgroundImage: `url(${data.coverPhoto})` }}></div>}
        <div className='lg:w-[400px] h-[230px] w-[230px] lg:h-[400px] rounded-full bg-slate-300 border-8 border-[#E1EDF8] absolute top-[260px] lg:top-[395px]'>
          {data.profilePhoto && <div className='w-full h-full bg-cover bg-no-repeat bg-center rounded-full' style={{ backgroundImage: `url(${data.profilePhoto})` }}></div>}
        </div>
      </div>
      <div className='w-full mt-72 flex flex-col items-center justify-center mx-auto max-w-[900px]'>
        <h2 className='lg:text-5xl text-3xl font-semibold font-Volkhov mb-16'>{data.companyname}</h2>
        <p className='text-center text-lg'>{data.description}</p>
      </div>
      <div className='mx-auto pl-2 pr-2 max-w-[400px] md:max-w-[900px] lg:max-w-[1500px] mt-16'>
        <h3 className='text-3xl font-semibold font-Volkhov mb-10'>Services we provided</h3>

        {/* <ServicesCard text="wedding planning" /> */}
        {data.category ?
          <div className='grid grid-flow-col gap-3 overflow-x-scroll show-scrollbar mb-10 col-span-3'>

            {data.category.map((elements) => {
              return <ServicesCard text={elements} />
            })}
          </div>
          : <h1>Services not available</h1>}

      </div>
      <div className='mx-auto pl-2 pr-2 max-w-[400px] md:max-w-[900px] lg:max-w-[1500px] mt-16'>
        <h3 className='text-3xl font-semibold font-Volkhov mb-10'>Galary</h3>

        {data.gallery ?
          <div className='grid grid-flow-col gap-3 overflow-x-scroll show-scrollbar mb-10 col-span-2'>
            {data.gallery.map((elements) => {
              return <GalaryCard image={elements} />
            })}


          </div>
          : <h1>Services not available</h1>}

      </div>
      <div className='mx-auto pl-2 pr-2 max-w-[400px] md:max-w-[900px] lg:max-w-[1500px] mt-16 flex flex-col items-center'>
        <h3 className='text-3xl font-semibold font-Volkhov mb-10'>Connect Us</h3>
        <div>
          <h2 className='font-medium text-2xl text-center mb-4 underline'>Address</h2>
          <p className='text-center'>{data.companyname}</p>
          <p className='text-center'>{data != "" && data.place.join(" , ")}</p>
          <p className='text-center underline'><a href={"mailto:" + data.email}>{data.email}</a></p>
          <p className='text-center underline'><a href={"tel:" + data.mobile}>{data.mobile}</a></p>

        </div>

      </div>
      <button onClick={buttonhandle} className='uppercase w-[160px] h-[60px]  text-white text-xl font-semibold shadow-2xl hover:shadow-black hover:bg-green-800 duration-300 bg-green-700 rounded-full fixed top-32 right-10'>Chat with us</button>
      <Footer />
    </div>
  )
}

export default SingleProvider
