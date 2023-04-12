import React, { useEffect, useState } from 'react'
import { EventManagersTable} from '../../components/adminComponents/EventManagersTable'
import Sidebar from '../../components/adminComponents/Sidebar'
import axios from '../../utils/axios'


const EventManagers = () => {

  const [data, setdata] = useState([]);
  const [load, setload] = useState(false);

  useEffect(() => {
    try {

      axios.get("/admin/approvedManagers").then((response) => {
     
        if (response.status === 200) {

          setdata(response.data.data)
         
        } else {
         
        }
      })
    } catch (error) {
     

    }

  }, [load]);

  return (
    <div className='flex'>
          <Sidebar type="event" />
          <div className='w-full h-screen'>
              <div className='max-w-[1200px] mx-auto bg-white mt-20 rounded-3xl p-8'>
          <EventManagersTable data={data} load={load} change={ setload} />

              </div>
          </div>
    </div>
  )
}

export default EventManagers