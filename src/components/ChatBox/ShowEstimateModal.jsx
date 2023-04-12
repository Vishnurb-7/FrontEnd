import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useToast } from '@chakra-ui/toast';
import { Table,  TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { paymentChange } from '../../features/paymentSlice';
import { useNavigate } from 'react-router-dom';
import userAxios from '../../utils/userAxios';

const ShowEstimateModal = ({ visible, onClose, userId, managerId }) => {

    const [estimate, setEstimate] = useState([]);
    const toast = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnClose = (e) => {
        if (e.target.id === "container") onClose()
    };



    useEffect(() => {
   
        try {
            userAxios.post('/estimateData', { userId, managerId }).then((response) => {

                if (response.status === 201) {
                    setEstimate(response.data)
                    
                } else {
                    toast({
                        position: "top",
                        variant: 'left-accent',
                        status: 'error',
                        isClosable: true,
                        title: 'No Estimate Available...!',

                    })
                    onClose()
                }
            })
        } catch (error) {
            toast({
                position: "top",
                variant: 'left-accent',
                status: 'error',
                isClosable: true,
                title: 'No Estimate Available...!',

            })
            onClose()
        }
    }, [managerId, visible]);

    const payHandler = async (amount, estimateId) => {
        await dispatch(paymentChange({ amount, estimateId }))
        navigate("/payment")
    }
    const total = (item) => {
        return item?.estimate.reduce((sum, amount) => {
            return (Number(sum) + Number(amount.price))
        }, 0)
    }

    if (!visible) return null;
    return (
        <div id='container' onClick={handleOnClose} className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center'>

            <div className='bg-white w-[700px] pb-5 min-h-[500px] flex flex-col rounded-3xl m-2'>
                <div className='flex flex-row-reverse text-4xl p-4 border-b-2 border-black'>
                    <button onClick={onClose} ><AiFillCloseCircle /></button>
                </div>
                <div className='h-full w-full flex items-center justify-center flex-col'>
                    <h1 className='text-3xl font-semibold mb-8'>Your Estimate</h1>



                    {estimate.length > 0 && (estimate.map((item) => (
                        <>
                            < TableContainer width={350}>
                                <Table variant='simple'>
                                    <Thead>
                                        <Tr>
                                            <Th>Services</Th>
                                            <Th>  </Th>
                                            <Th isNumeric>price</Th>
                                        </Tr>
                                    </Thead>

                                    <Tbody>
                                        {item?.estimate.map((e) =>
                                            < Tr >
                                                <Td>
                                                    {e.service}
                                                </Td>
                                                <Td>  </Td>
                                                <Td>
                                                    {e.price}
                                                </Td>
                                            </Tr>
                                        )
                                        }

                                    </Tbody>
                                    <Tfoot>
                                        < Tr >
                                            <Th>Total</Th>
                                            <Th></Th>
                                            <Th>{item?.estimate && total(item)}</Th>
                                        </Tr>
                                        < Tr >
                                            <Th>Advance</Th>
                                            <Th></Th>
                                            <Th>{Math.floor(item?.estimate && total(item) / 2)}</Th >
                                        </Tr>

                                    </Tfoot>




                                </Table>


                            </TableContainer>
                            {item?.paid == false ?
                                < button
                                    onClick={() => payHandler(
                                        Math.floor(item?.estimate && total(item) / 2), item?._id
                                    )}
                                    className='bg-green-500 hover:bg-green-600 rounded-3xl h-16 w-[60%] text-xl font-bold text-white mt-6 p-4 uppercase flex items-center justify-center'>Pay &nbsp;
                                    <span className='font-extrabold font-Viaoda text-3xl'>₹{Math.floor(item?.estimate && total(item) / 2)}</span>
                                </button>
                                :
                                <h1 className='mt-6 font-semibold text-xl text-green-500'>Already payment completed!</h1>}
                        </>
                    )))}

                </div>
            </div>


        </div >
    )
}

export default ShowEstimateModal