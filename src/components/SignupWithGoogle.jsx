import jwtDecode from 'jwt-decode';
import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';



const SignupWithGoogle = ({onError}) => {
   

    const navigate =  useNavigate()

    const handleCallBackResponse = async (response) => { 
    
        const userObject = jwtDecode(response.credential);

        const data = { email: userObject.email }
        try {
            const result = await axios.post('/googleSignup', data)
           
            if (result.status === 200) { 

                navigate('/')
            } else {
                onError()
                
            }
        } catch (error) {
            onError()
          
        }


        // setUser(userObject.email)


    }

    
    // if (user != "" || user == null) {
    //         navigate('/')

    // }



    useEffect(() => {
        google.accounts.id.initialize({
            client_id: "1046487536601-b55jhi0uh6edbfujs6pm5n68nmcu19r6.apps.googleusercontent.com",
            callback : handleCallBackResponse
        })
        google.accounts.id.renderButton(
            document.getElementById("loginDiv"),
            {theme:"outline",size:"large",width:310,text: "continue_with", shape: "pill",}
        )
    }, []);
  return (
    <div id='loginDiv' className='mt-8'>

    </div>
  )
}

export default SignupWithGoogle