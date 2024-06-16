import { useNavigate, useParams } from 'react-router-dom'
import preview from './Preview.module.css'
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import CircularProgress from '@mui/joy/CircularProgress';
import profiles from '../profiles/Profiles.module.css'
import { enqueueSnackbar } from 'notistack';
import UpdateStatus from '../updatestatus/UpdateStatus';

const Preview = () =>
{
    const {id} = useParams();
    const navigate = useNavigate();
    const [ profile, setProfile ] = useState(null);
    const [ showStatus, setShowStatus ] = useState(false)

    const getDocument = async () =>
    {
        try
        {
            const docRef = doc(db, 'profiles', id.toString())
            const snapshot = await getDoc(docRef);
            if(snapshot.exists())
                setProfile(snapshot.data());
        }
        catch(error)
        {
            enqueueSnackbar('Check your internet connection or refresh', {variant:'error'})
        }
    }
    
    useEffect(()=>
    {
        getDocument();
    },[])

    const handleDownload = () =>
    {
        const url = `https://parinaya.vercel.app/profiles/${id}`
        const a = document.createElement('a');
        a.href = url;
        a.download = `profile_${id}.json`;
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    return(
        <div className={preview.container}>
        <button className={preview.back} onClick={()=> navigate('/profiles')}>Back</button>
        {profile ? 
        <div className={preview.profile}>
            <div className={preview.header}>
                <div className={preview.displaypicture}>
                    <img src={profile.personalData.img} alt="img"/>
                </div>
                <button className={profile.status === 'Pending' ? 
                    `${profiles.warning} ${profiles.status}` : 
                    `${profiles.success} ${profiles.status}`}
                    onClick={()=>setShowStatus(true)}>
                    {profile.status}
                </button>
                <div className={preview.profilebuttons}>
                    <button className={preview.download} onClick={handleDownload}>Download</button>
                    <button className={preview.edit} onClick={()=> navigate(`/edit/${id}`)}>Edit</button>
                </div>
            </div>
            <div className={preview.details}>
                <div className={preview.personal}>
                    <h2>Personal Details</h2>
                    <p><span>Full name : </span>{profile.personalData.firstname +' ' +profile.personalData.lastname}</p>
                    <p><span>Gender : </span>{profile.personalData.gender}</p>
                    <p><span>Date of Birth : </span>{profile.personalData.dob}</p>
                    <p><span>Age : </span>{profile.personalData.age}</p>
                    <p><span>Sun sign : </span>{profile.personalData.sunsign}</p>
                    <p><span>Height : </span>{profile.personalData.ft} ft {profile.personalData.in} in</p>
                    <p><span>Education : </span>{profile.personalData.education}</p>
                    {profile.personalData.field && <p><span>Field of Education : </span>{profile.personalData.field}</p>}
                    <p><span>Sector : </span>{profile.personalData.sector}</p>
                    <p><span>Occupation : </span>{profile.personalData.occupation}</p>
                    <p><span>Salary in LPA : </span>{profile.personalData.salary}</p>
                    <p><span>Work Place : </span>{profile.personalData.workplace}</p>
                    <p><span>Contact : </span>{profile.personalData.contact}</p>
                </div>
                <div className={preview.family}>
                    <h2>Family Details</h2>
                    <p><span>Father's name : </span>{profile.familyData.frname +' ' +profile.personalData.lastname}</p>
                    <p><span>Father's occupation : </span>{profile.familyData.frocc}</p>
                    <p><span>Mother's name : </span>{profile.familyData.mrname +' ' +profile.personalData.lastname}</p>
                    <p><span>Mother's occupation : </span>{profile.familyData.mrocc}</p>
                    <p><span>Siblings : </span>{profile.familyData.msiblings}M {profile.familyData.fsiblings}F</p>
                    <p><span>Religion : </span>{profile.familyData.religion}</p>
                    <p><span>Caste : </span>{profile.familyData.caste}</p>
                    <p><span>Bedagu : </span>{profile.familyData.bedagu}</p>
                    <p><span>Address : </span>{profile.familyData.place}, {profile.familyData.district}</p>
                    <p><span>Demands : </span>{profile.familyData.demands}</p>
                </div>
                <div className={preview.properties}>
                    <h2>Properties</h2>
                    <p><span>Own house(s) : </span>{profile.familyData.prophouses}</p>
                    <p><span>Land : </span>{profile.familyData.propland} acres</p>
                    <p><span>Sites : </span>{profile.familyData.propsites}</p>
                </div>
            </div>
        </div> :
        <CircularProgress
            color="neutral"
            determinate={false}
            size="lg"
            value={30}
            variant="soft"
        />}

        {showStatus && 
            <div className={preview.updatestatus}>
                <UpdateStatus setShowStatus={setShowStatus} id={id} status={profile.status}/>
            </div>}
        </div>
    )
}

export default Preview