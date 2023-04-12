import { useToast } from '@chakra-ui/toast';
import React, { useRef, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsImages } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { managersData } from '../../features/managersAuthSlice';
import BeatLoader from "react-spinners/BeatLoader";
import { Button } from '@chakra-ui/react';
import managerAxios from '../../utils/managerAxios';



const AddImage = ({ visible, onClose }) => {


  const [image, SetImage] = useState("");
  const [error, setError] = useState(false);
  const [load, setLoad] = useState(false);
  const imageInput = useRef(null);
  const managers = useSelector(managersData)
  const toast = useToast()

  let Allowed_File_Type = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
    "video/mp4"

  ]

  const imageHandler = () => {
    setError(false)
  if (Allowed_File_Type.includes(image.type||video.type)) {
      setLoad(true)
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "EventManagement");
      data.append("cloud_name", "dnh79zoop");
      try {
        fetch("https://api.cloudinary.com/v1_1/dnh79zoop/image/upload", {
          method: "post",
          body: data,
        }).then((res) => res.json())
          .then(async (data) => {
         
            const imageUrl = data.url;
            const videoUrl = data.url

            const response = await managerAxios.post("/provider/addImageOrVideo", { imageUrl, managers,videoUrl })
            if (response.status === 201) {
              toast({
                position: "top",
                variant: 'left-accent',
                status: 'success',
                isClosable: true,
                title: 'Media added successfully',

              })
              onClose()
              SetImage("")
              setLoad(false)
            } else {
              setError("select one")
              setLoad(false)
              toast({
                position: "top",
                variant: 'left-accent',
                status: 'error',
                isClosable: true,
                title: 'Media adding failed',

              })
            }
          })
      } catch (error) {
        setError("select one")
        setLoad(false)
        toast({
          position: "top",
          variant: 'left-accent',
          status: 'error',
          isClosable: true,
          title: 'Media adding failed',

        })
      }


    } else {
      setError(true)
    }
  }

  const resetShare = () => {
    SetImage(null);
  };

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose()
  };

  if (!visible) return null;
  return (
    <div id='container' onClick={handleOnClose} className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center'>

      <div className='bg-white w-[500px]  rounded-3xl flex flex-col m-2'>
        <div className='flex flex-row-reverse border-b-2 border-black text-4xl p-4'>
          <button onClick={onClose} ><AiFillCloseCircle /></button>
        </div>
        <div className='h-full w-full flex items-center justify-center flex-col'>
          <h1 className='text-3xl font-semibold mb-8'>Add Image</h1>


          <div className="w-[400px] h-[350px] flex  border-zinc-300 border-2 rounded-2xl items-center justify-center">
            {image ? (
              <div
                className="previewImage w-[370px] h-[320px] bg-contain bg-center bg-no-repeat "
                style={{
                  backgroundImage: `url(${URL.createObjectURL(image)})`,
                }}
              >
                <FaTimes onClick={resetShare} />
              </div>
            ) : (
              <div
                className="w-[370px] h-[320px] flex flex-col bg-[#f6f6f6] cursor-pointer rounded-2xl items-center justify-center"
                onClick={() => imageInput.current.click()}
              >
                <BsImages className="text-[30px]" />
                <h1>Add photos</h1>
              </div>
            )}
          </div>
          <input
            onChange={(e) => {
              SetImage(e.target.files[0]);

            }}
            type="file"
            id="file"
            ref={imageInput}
            style={{ display: "none" }}
            accept="image/x-png,image/gif,image/jpeg,video/mp4"

          />


          {error && <p className='text-red-500'>Select one image</p>}
          {!load ?
            <button onClick={imageHandler} className='bg-green-500 hover:bg-green-600 mb-7 rounded-3xl h-16 w-[60%] text-lg font-medium mt-6 p-4 uppercase'>save</button> :
            <Button className=' rounded-3xl h-16 w-[60%] mb-7 text-2xl font-bold mt-6 p-4 uppercase' height={16} rounded={23} isLoading colorScheme='green' spinner={<BeatLoader size={16} color='white' />}>Click me</Button>
          }

        </div>
      </div>


    </div>
  )
}

export default AddImage
