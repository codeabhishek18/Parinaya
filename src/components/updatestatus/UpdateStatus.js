import deleteprofile from "../deleteprofile/DeleteProfile.module.css"
import { db } from "../../firebase"
import { enqueueSnackbar } from "notistack"
import { doc, updateDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

const UpdateStatus = ({setShowStatus, id, status}) =>
{
    const navigate = useNavigate();

    const handleStatus = async () =>
    {
        await updateDoc(doc(db, 'profiles', id),{status : status === 'Pending' ? 'Matched' : 'Pending'});
        setShowStatus(false);
        navigate('/profiles')
        enqueueSnackbar('Status is updated', {variant: 'success'})   
    }

    return(
        <div className={deleteprofile.container}>
            <h2>Change status to {status === 'Pending' ? 'Matched' : 'Pending'} ?</h2>
            <div className={deleteprofile.footerbuttons}>
                <button className={deleteprofile.yes} onClick={handleStatus}>Yes</button>
                <button className={deleteprofile.no} onClick={()=> setShowStatus(false)}>No</button>
            </div>
        </div>
    )
}

export default UpdateStatus