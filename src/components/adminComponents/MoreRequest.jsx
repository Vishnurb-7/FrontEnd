import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';
import axios from '../../utils/axios';

const MoreRequest = ({ visible, onClose, data }) => {

    const approveHandler = () => {
        try {
            const value = { id: data[0]._id };

            axios.post("/admin/approve",value).then((response) => {

              if (response.status === 200) {
              
                  onClose();
              } else {
                alert("SOMETHING WRONG!!!!!!!!!!!!!")
              }
            })
          } catch (error) {
           
            alert("SOMETHING WRONG!!!!!!!!!!!!!")
          }
}


    const rejectHandler = () => {
        try {
            const value = { id: data[0]._id };

            axios.post("/admin/reject",value).then((response) => {

              if (response.status === 200) {
                
                  onClose();
              } else {
                alert("SOMETHING WRONG!!!!!!!!!!!!!")
              }
            })
          } catch (error) {
    
            alert("SOMETHING WRONG!!!!!!!!!!!!!")
          }
    }


    const handleOnClose = (e) => {
       if(e.target.id ==="container") onClose()
    };

    if (!visible) return null;
  return (
      <div id='container' onClick={handleOnClose} className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center'>

              <div className='bg-white w-[1000px] h-[700px] flex flex-col rounded-3xl m-2'>
                  <div className='flex flex-row-reverse text-4xl p-4 border-b-2 border-black'>
                      <button onClick={onClose} ><AiFillCloseCircle/></button>
              </div>
              <div className='h-full w-full grid grid-cols-5'>
                  <div className='w-full h-full p-4 col-span-2 '>

                      <div className='bg-gray-700 w-full h-full flex justify-center items-center'>
                          <img src={data[0].certificate} alt="certificate" className='w-[95%]' />
                      </div>
                  </div>
                  <div className='col-span-3 flex flex-col pt-7'>
                      <h1 className='text-center text-3xl font-semibold uppercase'>{ data[0].companyname}</h1>
                      <p className='mt-10 shadow-2xl pl-4 h-60 mr-4 overflow-y-scroll no-scrollbar text-lg'>{ data[0].description}</p>
                      <div className='mt-10 flex flex-row'>
                          <h2 className='text-xl font-medium uppercase'>category  :</h2>
                          <h2 className='ml-2 text-xl'>{data[0].category}</h2>
                      </div> 
                      <div className='mt-10 flex flex-row'>
                          <h2 className='text-xl font-medium uppercase'>location  :</h2>
                          <h2 className='ml-2 text-xl'>{data[0].place}</h2>
                      </div>
                      <div className='mt-10 flex flex-row justify-end gap-4 mr-8'>
                          <button onClick={() => { approveHandler() }} className='py-3 px-10 rounded-full bg-green-500 hover:bg-green-600 text-xl font-medium uppercase'>approve</button>
                          <button onClick={() => { rejectHandler() }} className='py-3 px-10 rounded-full bg-red-400 hover:bg-red-600 text-xl font-medium uppercase'>reject</button>
                      </div>
                  </div>
              </div>
              </div>


    </div>
  )
}

export default MoreRequest