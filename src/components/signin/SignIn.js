import { signInWithPopup } from "firebase/auth"
import { auth, db, googleProvider } from "../../firebase"
import signin from './SignIn.module.css'
import Dashboard from "../dashboard/Dashboard"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { enqueueSnackbar } from "notistack"
import { doc, getDoc } from "firebase/firestore"

const SignIn = () =>
{
    const navigate = useNavigate();
    const [ newUSer, setNewUser ] = useState({firstname: '', lastname: '', contact: ''}) 

    const handleChange = (e) =>
    {
        const {name, value} = e.target;
        setNewUser({...newUSer, [name] : value});
    }

    const handleGoogleSignIn = async () =>
    {
        if(!newUSer.firstname)
            return enqueueSnackbar('First name is required')

        if(!newUSer.lastname)
            return enqueueSnackbar('Last name is required')

        if(!newUSer.contact)
            return enqueueSnackbar('Contact number is required')
        
        try
        {
            const result = await signInWithPopup(auth, googleProvider);
            const userid = result.user.uid;
            const docRef = doc(db, 'profiles', userid);
            const snapshot = await getDoc(docRef);
            if(snapshot.exists())
            {
                return enqueueSnackbar('Account already exists, please login')
            }
            else
            {
                navigate('/register');
                localStorage.setItem('registeredData', JSON.stringify({...newUSer, uid: result.user.uid ,email: result.user.email}));
            }
        }
        catch(error)
        {
            console.error('Error occured', error);
        }
    }

    const handleGoogleLogin = async () =>
    {
        const result = await signInWithPopup(auth, googleProvider);
        const userid = result.user.uid;
        const docRef = doc(db, 'profiles', userid);
        const snapshot = await getDoc(docRef);
        if(snapshot.exists())
        {
            navigate('/profiles');
            return enqueueSnackbar('Welcome back', {variant: 'success'});
        }
        else
        {
            return enqueueSnackbar('No account found, register now');
        }
    }

    return(
        <div className={signin.wrapper}>
            <Dashboard type="home"/>
        <div className={signin.container}>
            <div className={signin.auth}>
                <h1>Register for FREE!</h1>
                <input name="firstname" placeholder="First name" value={newUSer.firstname} onChange={handleChange} />
                <input name="lastname" placeholder="Last name" value={newUSer.lastname} onChange={handleChange} />
                <div className={signin.contact}>
                    <span>+91</span>
                    <input name="contact" placeholder="Contact number" value={newUSer.contact} onChange={handleChange} />
                </div>
                <button onClick={handleGoogleSignIn}>Register</button>
                <div className={signin.login}>
                    <p>Already a user?</p>
                    <button onClick={handleGoogleLogin}>Login</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default SignIn