import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'
import profiles from './Profiles.module.css'
import Dashboard from '../dashboard/Dashboard'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/joy/CircularProgress'
import DeleteProfile from '../deleteprofile/DeleteProfile'
import { enqueueSnackbar } from 'notistack'

const Profiles = () =>
{
    const [ profileData, setProfileData ] = useState([]);
    const [ zoom, setZoom ] = useState(false);
    const [ currentDP, setCurrentDP ] = useState(null);
    const [ deleteProfile, setDeleteProfile ] = useState(false);
    const [ profileId, setProfileId ] = useState(null);
    const navigate = useNavigate();

    const [ searchName, setSearchName ] = useState('');
    // const [ byGender, setByGender ] = useState(null);

    useEffect(()=>
    {
        getProfileData();
    },[])

    const getProfileData = async () =>
    {
        try
        {
            const querySnapshot = await getDocs(collection(db, "profiles"));
            const profileList = querySnapshot.docs.map((doc)=> ({id: doc.id,...doc.data()}))
            setProfileData(profileList);
        }
        catch(error)
        {
            enqueueSnackbar('Check your internet connection or refresh', {variant:'error'})
        }
    }

    const filteredSearch = 
    [...profileData].filter(
        (profile) => 
        {
            const fullname = profile.personalData.firstname +' ' +profile.personalData.lastname;
            if(fullname.toLowerCase().includes(searchName.toLowerCase()))
                return profile
        })

    return(
        <div className={profiles.profilecards}>
        {profileData.length ? <div className={profiles.container}>
            <Dashboard/>
            <div className={profiles.query}>
                <div className={profiles.searchbar}>
                    <input placeholder="Search by name" value={searchName} className={profiles.search} onChange={(e)=> setSearchName(e.target.value)}/>
                    <span className={profiles.clear} onClick={()=> setSearchName('')}>Clear</span>
                </div>
                {/* <div className={profiles.filtergender}>
                    <select onChange={(e)=> setByGender(e.target.value)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div> */}
            </div>
            {filteredSearch.map((profile)=>
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
            
            {!filteredSearch.length && 
            <div className={profiles.noprofiles}>
                <h1>No Profiles Found</h1>
            </div>}
            
            {deleteProfile && <div className={profiles.deleteProfile}>
                <DeleteProfile setDeleteProfile={setDeleteProfile} profileId={profileId} setProfileData={setProfileData}/>
            </div>}

            {zoom && 
                <div className={profiles.zoomcontainer}>
                    <img className={profiles.zoom} src={currentDP} alt='img'/>
                    {zoom && <span className={profiles.imgclose} onClick={()=> setZoom(false)}>X</span>}
                </div>}
        </div> :
        <div className={profiles.circularProgress}>
            <CircularProgress
            color="neutral"
            determinate={false}
            size="lg"
            value={30}
            variant="soft"/>
        </div>}
        </div>
    )
}

export default Profiles