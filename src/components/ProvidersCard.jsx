import React from 'react'
import { GrStar } from 'react-icons/gr'


const ProvidersCard = ({data,moreClick}) => {
  const viewClickHandler = () => { 
    moreClick(data._id)
  }
  return (
    <div className='bg-white  p-2 rounded-xl mb-7 ml-1 lg:w-[500px] lg:h-[400px] w-[365px] h-[480px]  pt-5 flex-col shadow-inner shadow-slate-900 drop-shadow-2xl'>
      <div className='w-full grid lg:grid-cols-5'>
        {data.profilePhoto ?
          <div className='lg:col-span-2 bg-cover bg-no-repeat bg-center rounded-md' style={{ backgroundImage: `url(${data.profilePhoto})` }}></div> :
          <div className='lg:col-span-2 bg-cover bg-no-repeat bg-center rounded-md' style={{ backgroundImage: 'url("../img-scelton.png")' }}></div>
        }
              <div className='lg:col-span-3 flex justify-center flex-col items-center lg:block'>
          <h3 className='font-semibold text-3xl mt-6 ml-4 text-center lg:text-left'>{ data.companyname}</h3>
                  <p className='ml-4 mt-6 text-xl font-lightn text-center lg:text-left'>2 years of experience</p>
                  <div className='w-32 h-9 mt-4 ml-4 rounded-full border-2 border-black flex flex-row items-center text-xl font-medium p-3 justify-center'>5 <GrStar className='text-2xl'/>Rating </div>
              </div>
              
      </div>
      <div className='m-5 overflow-y-scroll no-scrollbar w-[90%] lg:h-[110px]'>{ data.description}</div>
          <div className='w-full flex items-center justify-center'>
              
          <button onClick={viewClickHandler} className='w-36 h-12 text-xl font-semibold shadow-inner shadow-white hover:scale-105 drop-shadow-2xl  bg-blue-400 rounded-full'>View more</button>
          </div>
    </div>
  )
}

export default ProvidersCard
