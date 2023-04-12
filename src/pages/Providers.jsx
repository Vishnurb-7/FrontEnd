import { useToast } from '@chakra-ui/toast'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Navebar from '../components/NavBar'
import ProvidersCard from '../components/ProvidersCard'
import userAxios from '../utils/userAxios'


const Providers = () => {
  const navigate = useNavigate()
  const { service } = useParams();
  const [data, setData] = useState("");
  const [location, setLocation] = useState("Kottayam");
  const [ setDone] = useState(false);
  const toast = useToast()


  const [, setCurrLocationJs] = useState({});



  useEffect(() => {
    const city = getLocationJs()
  }, []);


  useEffect(() => {
    userAxios.get(`/findManagers?service=${service}&place=${location}`).then((response) => {
   
      if (response.status === 201) {
        if (response.data.length == 0) {

          toast({
            position: "top",
            variant: 'left-accent',
            status: 'info',
            isClosable: true,
            title: 'No companies available',

          })
        } else { setData(response.data) }

      } else {

        toast({
          position: "top",
          variant: 'left-accent',
          status: 'info',
          isClosable: true,
          title: 'No companies are available',

        })
      }
    })

  }, [location]);



  const getLocationJs = async () => {

    await navigator.geolocation.getCurrentPosition((position) => {

      const { latitude, longitude } = position.coords;
      setCurrLocationJs({ latitude, longitude });


      const requestOptions = {
        method: 'GET',
      };



      fetch(` https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}=${longitude}&apiKey=e6210d6b01824d03b10001fe49941b68`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setLocation(result.features[0].properties.county)
          return result.features[0].properties.county
          setDone(true)
        })
        .catch(error => alert("server error"));

    });
  };

  const moreHandler = (id) => {
    navigate(`/provider/${id}`)
  }
  return (
    <div className='w-full'>
      <Navebar />
      <div className='lg:max-w-[1600px] md:max-w-[900px] max-w-[400px] mx-auto'>
        <div className='flex justify-between items-center'>
          <h2 className='font-Volkhov text-4xl font-bold m-10 uppercase'>{service}</h2>
          <select className='text-xl font-medium p-2 h-14 mr-10 border-2 border-black rounded-full bg-transparent' onChange={(e) => setLocation(e.target.value)} value={location} name="location" id="">

            <option value="Alappuzha" >Alappuzha</option>
            <option value="Ernakulam">Ernakulam</option>
            <option value="Idukki">Idukki</option>
            <option value="Kannur">Kannur</option>
            <option value="Kasaragod">Kasaragod</option>
            <option value="Kollam">Kollam</option>
            <option value="Kottayam">Kottayam</option>
            <option value="Kozhikode">Kozhikode</option>
            <option value="Malappuram">Malappuram</option>
            <option value="Palakkad">Palakkad</option>
            <option value="Pathanamthitta">Pathanamthitta</option>
            <option value="Thiruvananthapuram">Thiruvananthapuram</option>
            <option value="Thrissur">Thrissur</option>
            <option value="Wayanad">Wayanad</option>
          </select>


        </div>
        {

          data.length != 0 ?
            (
              <div className='grid lg:grid-cols-3 md:grid-cols-2'>
                {data.map((company, i) =>
                  <ProvidersCard key={i} data={company} moreClick={moreHandler} />
                )}
              </div>
            ) :
            <div className='h-[460px] w-full flex items-center justify-center text-7xl font-bold font-Viaoda'>No companies found ?</div>



        }




      </div>
      <Footer />
    </div>
  )
}

export default Providers
