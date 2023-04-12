import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/adminComponents/Sidebar'
import UserManagementTable from '../../components/adminComponents/UserManagementTable'
import axios from '../../utils/axios'


const UserManagement = () => {
  const [data, setdata] = useState([]);
  const [load, setload] = useState(false);

  useEffect(() => {
    try {

      axios.get("/admin/userData").then((response) => {

        if (response.status === 200) {

          setdata(response.data.data)
         
        } else {
          alert("SOMETHING WEONG!!!!!!!!!!!!!")
        }
      })
    } catch (error) {
    
      alert("SOMETHING WEONG!!!!!!!!!!!!!")
    }

  }, [load]);



  return (
    <div className='flex'>
          <Sidebar type="user" />
          <div className='w-full h-screen'>
        <div className='max-w-[1200px] mx-auto bg-white mt-20 rounded-3xl p-8'>
          { data &&  <UserManagementTable data={data} load={load} change={setload} />}


              </div>
          </div>
    </div>
  )
}

export default UserManagement