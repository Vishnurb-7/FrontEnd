import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/adminComponents/Sidebar'
import TransactionTable from '../../components/adminComponents/TransactionTable'
import axios from '../../utils/axios'



const TransactionHistory = () => {
    const [data, setdata] = useState([]);
    // const [load, setload] = useState(false);

    useEffect(() => {
        try {

            axios.get("/admin/transactions").then((response) => {

                if (response.status === 201) {
                    setdata(response.data)
                } else {
                    alert("SOMETHING WEONG??????????")
                }
            })
        } catch (error) {
            alert("SOMETHING WEONG!!!!!!!!!!!!!")
        }

    }, []);



    return (
        <div className='flex'>
            <Sidebar type="transaction" />
            <div className='w-full h-screen'>
                <div className='max-w-[1200px] mx-auto bg-white mt-20 rounded-3xl p-8'>
                    {data.length > 0 && <TransactionTable data={data} />}


                </div>
            </div>
        </div>
    )
}

export default TransactionHistory