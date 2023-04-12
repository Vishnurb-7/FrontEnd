import { Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import managerAxios from '../../utils/managerAxios';
import userAxios from '../../utils/userAxios';

const OrdersCard = ({ data, load, setLoad, type }) => {

    const [edit, setEdit] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [description, setDescription] = useState("");

    useEffect(() => {
        try {
            if (type === "manager") {
                managerAxios.get(`/provider/chatUsers/${data.userId}`).then((res) => {
                    setUserInfo(res.data)
                    setDescription(data.description)
                })
            } else {
                userAxios.get(`/chatManagers/${data.managerId}`).then((res) => {
                    setUserInfo(res.data)
                    setDescription(data.description)
                })
            }
        } catch (error) {
            alert("NETWORK PROBLEM!!!!")

        }
    }, [load]);

    const handleSave = () => {
        try {
            managerAxios.post('/provider/orderDescription', { id: data._id, description }).then((response) => {

                setLoad(!load)
                setEdit(false)
                setDescription("")
            })
        } catch (error) {
            alert("SERVER ERROR!!!!")
        }
    }

    return (
        <div className=' rounded-2xl p-3 bg-white shadow-inner shadow-black hover:scale-105 hover:shadow-2xl hover:duration-300 max-h-[400px] overflow-y-scroll no-scrollbar'>
            <h1 className='text-2xl font-semibold text-center'>{type === "manager" ? userInfo?.email : userInfo?.companyname}</h1>
            <h3 className='text-xl font-semibold underline'>selected services</h3>
            <ul className='m-4'>
                {data?.estimate && data.estimate.map((element) => (
                    <li className='list-decimal list-inside'>{element.service}</li>
                ))}


            </ul>
            <h3 className='text-xl font-semibold underline'>description</h3>
            <p className='mt-3 m-3'>{data?.description ? data.description : "Add Description"}</p>

            {type == "manager" && <div> < Button onClick={() => setEdit(!edit)}>Edit Description</Button>

                {edit && <div className='flex flex-col gap-2 mt-2'>
                    <textarea onChange={(e) => setDescription(e.target.value)} className='border border-black rounded-2xl p-4 text-lg' name="description" id="" cols="" rows="4" value={description}></textarea>
                    <button onClick={handleSave} className='p-4 bg-green-500 hover:bg-green-600 rounded-2xl'>save</button>
                </div>}
            </div>

            }

        </div >

    )
}

export default OrdersCard
