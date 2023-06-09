
import React from 'react'

const ServiceCard = (props) => {
  const clickhandler = (e) => {

    props.serviceClick()
}
  return (
    <div onClick={clickhandler}  className='bg-slate-300  hover:scale-105 ease-in-out duration-500 rounded-xl mb-7 mx-auto lg:w-[300px] lg:h-[400px] md:w-[230px] md:h-[300px] w-[170px] h-[250px] flex items-center pt-5 flex-col shadow-2xl'>
          <div className='w-[80%] h-[65%] rounded-full bg-center bg-cover' style={{backgroundImage:`url(${props.url})`}}></div>
          <h2 className='font-Volkhov mt-8 text-lg md:text-xl text-center'>{ props.text }</h2>

    </div>
  )
}

export default ServiceCard