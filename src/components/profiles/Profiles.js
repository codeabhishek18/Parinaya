import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'
import profiles from './Profiles.module.css'
import Dashboard from '../dashboard/Dashboard'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/joy/CircularProgress'
import DeleteProfile from '../deleteprofile/DeleteProfile'

const Profiles = () =>
{
    const [ profileData, setProfileData ] = useState([]);
    const [ zoom, setZoom ] = useState(false);
    const [ currentDP, setCurrentDP ] = useState(null);
    const [ deleteProfile, setDeleteProfile ] = useState(false);
    const [ profileId, setProfileId ] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>
    {
        getProfileData();
    },[])

    const getProfileData = async () =>
    {
        const querySnapshot = await getDocs(collection(db, "profiles"));
        const profileList = querySnapshot.docs.map((doc)=> ({id: doc.id,...doc.data()}))
        setProfileData(profileList);
    }

    return(
        <div className={profiles.profilecards}>
        {profileData.length ? <div className={profiles.container}>
            <Dashboard/>
            {profileData.map((profile)=>
            (
                <div className={profiles.card} key={profile.id}>
                    <img src={profile.personalData.img} alt="img" onClick={()=> {setCurrentDP(profile.personalData.img); setZoom(true)}}/>
                    <button className={profile.status === 'Pending' ? `${profiles.warning} ${profiles.status}` : `${profiles.success} ${profiles.status}`}>{profile.status}</button>
                    <div className={profiles.content}>
                        <p><span>Full Name : </span>{profile.personalData.firstname +' ' +profile.personalData.lastname}</p>
                        <p><span>DOB : </span>{profile.personalData.dob}</p>
                        <p><span>Religion : </span>{profile.familyData.religion}</p>
                        <p><span>Caste : </span>{profile.familyData.caste}</p>
                    </div>
                    <div className={profiles.footer}>
                        <button className={profiles.view} onClick={()=> navigate(`/profiles/${profile.id}`)}>View</button>
                        <button className={profiles.edit} onClick={()=> navigate(`/edit/${profile.id}`)}>Edit</button>
                        <button className={profiles.delete} onClick={()=> {setProfileId(profile.id); setDeleteProfile(true)}}>Delete</button>
                    </div>
                </div>
            ))}

            {deleteProfile && <div className={profiles.deleteProfile}>
                <DeleteProfile setDeleteProfile={setDeleteProfile} profileId={profileId} setProfileData={setProfileData}/>
            </div>}

            {zoom && 
                <div className={profiles.zoomcontainer}>
                    <img className={profiles.zoom} src={currentDP} alt='img'/>
                    {zoom && <span className={profiles.imgclose} onClick={()=> setZoom(false)}>X</span>}
                </div>}
        </div> :
        <CircularProgress
            color="neutral"
            determinate={false}
            size="lg"
            value={30}
            variant="soft"/>}
        </div>
    )
}

export default Profiles