import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Navebar from '../../components/providerComponents/Navebar'
import OrdersCard from '../../components/providerComponents/OrdersCard'
import managerAxios from '../../utils/managerAxios'
import { managersId } from '../../features/managersAuthSlice'
import { TbNotesOff } from "react-icons/tb";

const Orders = () => {
    const Id = useSelector(managersId)
    const [orders, setOrders] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        managerAxios.get(`/provider/orders/${Id}`).then((res) => {
            setOrders(res.data);
        })
    }, [load]);
    return (
        <div>
            <Navebar />
            <h2 className='font-Volkhov text-4xl font-bold m-10 uppercase text-center'>orders</h2>
            <div className='w-full'>
                {orders.length > 0 ?
                    <div className='mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[80%] mx-auto'>

                        {
                            orders.map((element, i) => (
                                < OrdersCard key={i} data={element} load={load} setLoad={setLoad} type="manager" />
                            ))}
                    </div>
                    : <TbNotesOff className='text-9xl mx-auto' />}

            </div>

        </div>
    )
}

export default Orders
