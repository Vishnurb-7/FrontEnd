import { useToast } from '@chakra-ui/toast';
import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios'
import { userAuthChange } from '../features/userAuthSlice';


const LoginWithGoogle = () => {
  // const [user, setUser] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast({
    position: 'top',
    title: 'Login with Google failed',
    containerStyle: {
      width: '500px',
      maxWidth: '100%',
    },
  })

  const handleCallBackResponse = async (response) => {
    const userObject = jwtDecode(response.credential);


    const data = { email: userObject.email };
    try {
      const response = await axios.post("/googleLogin", data);



      if (response.status === 201) {
        const { accessToken, refreshToken, user, id } = response.data

        const disp = dispatch(userAuthChange({ accessToken, refreshToken, user, id }))
        if (disp) {

          navigate('/')
        }

      } else {
        toast({
          variant: 'left-accent',
          status: 'error',
          isClosable: true
        })
      }


    } catch (error) {
      toast({
        variant: 'left-accent',
        status: 'error',
        isClosable: true
      })
      // setValidation((prevState) => ({
      //   ...prevState,
      //   signupError: {
      //     value: false,
      //     message: "Login failed",
      //   },
      // }));
      // return false;
      // setError(true);
    }


  }





  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "1046487536601-b55jhi0uh6edbfujs6pm5n68nmcu19r6.apps.googleusercontent.com",
      callback: handleCallBackResponse
    })
    google.accounts.id.renderButton(
      document.getElementById("loginDiv"),
      { theme: "outline", size: "large", width: 310, text: "continue_with", shape: "pill", }
    )
  }, []);
  return (
    <div id='loginDiv' className='mt-8'>

    </div>
  )
}

export default LoginWithGoogle
