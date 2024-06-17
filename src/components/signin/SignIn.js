import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../../firebase"
import signin from './SignIn.module.css'
import Dashboard from "../dashboard/Dashboard"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { enqueueSnackbar } from "notistack"

const SignIn = () =>
{
    const navigate = useNavigate();
    const [ newUSer, setNewUser ] = useState({firstname: '', lastname: '', contact: ''}) 

    const handleChange = (e) =>
    {
        const {name, value} = e.target;
        setNewUser({...newUSer, [name] : value});
    }

    const handleGoogleSignIn = () =>
    {
        if(!newUSer.firstname)
            return enqueueSnackbar('First name is required')

        if(!newUSer.lastname)
            return enqueueSnackbar('First name is required')

        if(!newUSer.contact)
            return enqueueSnackbar('First name is required')
        
        localStorage.setItem('registeredData', JSON.stringify(newUSer));
        let gmail = ""

        signInWithPopup(auth, googleProvider)
        .then((result)=>
        {
            gmail= result.user.email;
            navigate('/register')
        })
        .catch((error)=>
        {
            console.error('Error occured', error);
        })
        localStorage.setItem('email', JSON.stringify(gmail))
    }

    return(
        <div className={signin.wrapper}>
            <Dashboard type="home"/>
        <div className={signin.container}>
            <div className={signin.auth}>
                <h1>Register for FREE!</h1>
                <input name="firstname" placeholder="First name" value={newUSer.firstname} onChange={handleChange} required/>
                <input name="lastname" placeholder="Last name" value={newUSer.lastname} onChange={handleChange} required/>
                <div className={signin.contact}>
                    <span>+91</span>
                    <input name="contact" placeholder="Contact number" value={newUSer.contact} onChange={handleChange} required/>
                </div>
                <button onClick={handleGoogleSignIn}>Register</button>
                <div className={signin.login}>
                    <p>Already a user?</p>
                    <button>Login</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default SignIn