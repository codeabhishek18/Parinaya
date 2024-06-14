import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'
import profiles from './Profiles.module.css'
import Preview from '../preview/Preview'

const Profiles = () =>
{
    const [ profileData, setProfileData ] = useState([]);
    const [ zoom, setZoom ] = useState(false);
    const [ previewProfile, setPreviewProfile ] = useState(false);

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
        <div className={profiles.container}>
            {profileData.map((profile)=>
            (
                <div className={profiles.card}>
                    <img className={zoom === true ? profiles.zoom : ''} src={profile.personalData.img} alt="img" onClick={()=>setZoom(true)}/>
                    {zoom && <span className={profiles.close} onClick={()=> setZoom(false)}>X</span>}
                    <div className={profiles.content} onClick={()=> setPreviewProfile(true)}>
                        <p><span>Full Name : </span>{profile.personalData.firstname +' ' +profile.personalData.lastname}</p>
                        <p><span>DOB : </span>{profile.personalData.dob}</p>
                        <p><span>Religion : </span>{profile.familyData.religion}</p>
                        <p><span>Caste : </span>{profile.familyData.caste}</p>
                    </div>
                    {previewProfile && 
                        <div className={profiles.preview}>
                            <Preview profile={profile}/>    
                            <span className={profiles.close} onClick={()=> setPreviewProfile(!previewProfile)}>X</span>
                        </div>}
                </div>
            ))}
        </div>
    )
}

export default Profiles