import React from 'react'
import image from '../../public/Banner2.jpg';


const Banner = (props) => {

  return (

    <div className={`${props.type=='admin' && "lg:h-[1007px] md:h-[1007px] h-[1007px]"} w-[100%] h-[500px] md:h-[727px] lg:h-[927px] bg-cover`} style={{ backgroundImage: `url(${image})` }}>
      <div className='grid grid-cols-2 h-[70%]'>

          <div className='w-full h-full text-white flex justify-center items-center font-Viaoda text-3xl md:text-6xl lg:text-8xl text-center'>From Venue Selection to Event Execution, We’re With You Every Step of the Way!</div>
      <div></div>    
      </div>

      {/* <div className={`${props.type=='admin' ? "hidden" : "flex"}  w-full  justify-center`}><img src="../../public/scroll.webp" alt="scroll" className='z-50 w-20 h-20 md:w-20 md:h-30 lg:w-40 lg:h-40' /></div> */}
      </div>

  )
}

export default Banner