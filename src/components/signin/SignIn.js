import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../../firebase"

const SignIn = () =>
{
    const handleGoogleSignIn = () =>
    {
        signInWithPopup(auth, googleProvider)
        .then((result)=>
        {
            console.log('user signed in:', result);
        })
        .catch((error)=>
        {
            console.error('Error occured', error);
        })
    }

    return(
        <div>
            <button 
                style={{backgroundColor:'green', border:0, color:'white', padding:'10px', width:'100%', marginTop:'10px'}}
                onClick={handleGoogleSignIn}>Register for FREE</button>
        </div>
    )
}

export default SignIn