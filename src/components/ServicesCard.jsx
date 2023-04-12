import React from 'react'


const ServicesCard = (props) => {

  return (
      <div className='mb-7 lg:w-[300px] lg:h-[200px] md:w-[250px] md:h-[125px] w-[200px] h-[80px] rounded-2xl shadow-lg shadow-black flex items-center justify-center bg-no-repeat bg-cover' style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)),url("eventBG.png")'}}>
          <h3 className='font-medium text-xs md:text-2xl text-white uppercase text-center'>{ props.text}</h3>

    </div>
  )
}

export default ServicesCard
