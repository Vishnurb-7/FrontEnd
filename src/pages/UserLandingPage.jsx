import React from 'react'
import Navbar from '../components/NavBar'
import Banner from '../components/Banner'
import ServiceCard from '../components/ServiceCard'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'






const UserLandingPage = () => {
  const navigate = useNavigate()
  const serviceClickHandler = (service) => {
    
    navigate(`/providers/${service}`)

  }




  return (
    <div>
      <Navbar />

      <Banner />
      <div id='services' className='w-full pt-20 md:pt-40'>
        <h1 className='uppercase font-Volkhov m-7 text-2xl md:text-4xl lg:text-5xl text-center'>services</h1>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1300px] mx-auto'>
          <ServiceCard key="1"
            serviceClick={(end = "Wedding planning") => serviceClickHandler(end)}
            url="/serviceImages/bride-groom-getting-married_52683-32275.png"
            text="WEDDING PLANNERS" />
          <ServiceCard key="2"
            serviceClick={(end = "Personal events") => serviceClickHandler(end)}
            url="/serviceImages/business-conference-illustration-with-speaker-stage-audience-cartoon-characters-scientific-presentation-academic-symposium-professional-briefing_575670-644.png"
            text="PERSONAL EVENTS" />
          <ServiceCard key="3"
            serviceClick={(end = "Commercial events") => serviceClickHandler(end)}
            url="/serviceImages/flat-design-people-business-training_23-2148903887.png"
            text="COMMERCIAL EVENTS" />
          <ServiceCard key="4"
            serviceClick={(end = "Birthday party") => serviceClickHandler(end)}
            url="/serviceImages/cartoon-kids-birthday-party_23-2149000579.png"
            text="BIRTHDAY PARTY" />

          <ServiceCard key="5"
            serviceClick={(end = "Live music & orchestra") => serviceClickHandler(end)}
            url="/serviceImages/famous-rock-band-playing-music-singing-stage_74855-5828.webp"
            text="LIVE MUSIC & ORCHESTRA " />
          <ServiceCard key="6"
            serviceClick={(end = "Entertainment shows") => serviceClickHandler(end)}
            url="/serviceImages/istockphoto-1160689812-170667a.jpg"
            text="ENTERTAINMENT SHOWS" />
          <ServiceCard key="7"
            serviceClick={(end = "Bridal makeup") => serviceClickHandler(end)}
            url="/serviceImages/makeup-1262282427-612x612.jpg"
            text="BRIDAL MAKEUP " />
          <ServiceCard key="8"
            serviceClick={(end = "Photography") => serviceClickHandler(end)}
            url="/serviceImages/topvector201100208.webp"
            text="PHOTOGRAPHY" />

          <ServiceCard key="9"
            serviceClick={(end = "Travels") => serviceClickHandler(end)}
            url="/serviceImages/travels.jpg"
            text="TRAVELS" />
          <ServiceCard key="10"
            serviceClick={(end = "Catering services") => serviceClickHandler(end)}
            url="/serviceImages/catering-1318687011-612x612.jpg"
            text="CATERING SERVICES" />
          <ServiceCard key="11"
            serviceClick={(end = "Decoration") => serviceClickHandler(end)}
            url="/serviceImages/banquet-hall-ballroom.webp"
            text="DECORATION" />
          <ServiceCard key="12"
            serviceClick={(end = "Security") => serviceClickHandler(end)}
            url="/serviceImages/police-man.jpg"
            text="SECURITY" />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default UserLandingPage
