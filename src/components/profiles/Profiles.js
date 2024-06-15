import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'
import profiles from './Profiles.module.css'
import Dashboard from '../dashboard/Dashboard'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/joy/CircularProgress'

const Profiles = () =>
{
    const [ profileData, setProfileData ] = useState([]);
    const [ zoom, setZoom ] = useState(false);
    const [ currentDP, setCurrentDP ] = useState(null);
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
                    <div className={profiles.content}>
                        <p><span>Full Name : </span>{profile.personalData.firstname +' ' +profile.personalData.lastname}</p>
                        <p><span>DOB : </span>{profile.personalData.dob}</p>
                        <p><span>Religion : </span>{profile.familyData.religion}</p>
                        <p><span>Caste : </span>{profile.familyData.caste}</p>
                        <button className={profiles.view} onClick={()=> navigate(`/profiles/${profile.id}`)}>View</button>
                    </div>
                </div>
            ))}
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