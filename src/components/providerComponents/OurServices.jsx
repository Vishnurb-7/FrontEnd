import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import { managersData } from '../../features/managersAuthSlice'
import { useSelector } from 'react-redux'
import managerAxios from '../../utils/managerAxios'


const OurServices = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const managers = useSelector(managersData)

  const deleteHandler = async () => {
    try {
      const response = await managerAxios.post('/provider/removeService', { data: props.text, managers })
      if (response.status === 201) {
        props.delete == false ? props.isDelete(true) : props.isDelete(false)
        toast({
          position: "top",
          variant: 'left-accent',
          status: 'success',
          isClosable: true,
          title: 'Service removed successfully',

        })

      } else {

        toast({
          position: "top",
          variant: 'left-accent',
          status: 'error',
          isClosable: true,
          title: 'Service removing failed',

        })
      }
    } catch (error) {

    }
  }

  return (
    <div className='hover:scale-105 hover:duration-300 relative m-5 lg:w-[300px] lg:h-[200px] md:w-[250px] md:h-[125px] w-[200px] h-[80px] rounded-2xl shadow-lg shadow-black flex items-center justify-center bg-no-repeat bg-cover' style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)),url("eventBG.png")' }}>
      <AiFillCloseCircle onClick={onOpen} className='text-white text-3xl absolute top-2 right-2 hover:scale-110 hover:text-red-500' />
      <h3 className='font-semibold text-xs md:text-2xl text-white uppercase text-center'>{props.text}</h3>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete {props.text}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={() => { deleteHandler(); onClose() }} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    </div>
  )
}

export default OurServices
