import { deleteDoc, doc } from 'firebase/firestore'
import deleteprofile from './DeleteProfile.module.css'
import { db } from '../../firebase'
import { enqueueSnackbar } from 'notistack'

const DeleteProfile = ({setDeleteProfile, profileId, setProfileData}) =>
{
    const deleteDocument = async () =>
    {
        try
        {
            await deleteDoc(doc(db, 'profiles', profileId));
            enqueueSnackbar('Profile is deleted', {variant: 'warning'})
        }
        catch(error)
        {
            console.error('Error')
        }
    }

    const handleDelete =  () =>
    {
        deleteDocument();
        setDeleteProfile(false);
        setProfileData((prev)=> prev.filter((data)=> data.id !== profileId))
    }

    return(
        <div className={deleteprofile.container}>
            <h2>Are you sure?</h2>
            <div className={deleteprofile.footerbuttons}>
                <button className={deleteprofile.yes} onClick={handleDelete}>Yes</button>
                <button className={deleteprofile.no} onClick={()=> setDeleteProfile(false)}>No</button>
            </div>
        </div>
    )
}

export default DeleteProfile