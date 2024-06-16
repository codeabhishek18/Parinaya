import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'
import profiles from './Profiles.module.css'
import Dashboard from '../dashboard/Dashboard'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/joy/CircularProgress'
import DeleteProfile from '../deleteprofile/DeleteProfile'
import { enqueueSnackbar } from 'notistack'
import UpdateStatus from '../updatestatus/UpdateStatus'
import preview from '../preview/Preview.module.css'

const Profiles = () =>
{
    const [ profileData, setProfileData ] = useState([]);
    const [ zoom, setZoom ] = useState(false);
    const [ currentDP, setCurrentDP ] = useState(null);
    const [ deleteProfile, setDeleteProfile ] = useState(false);
    const [ profileId, setProfileId ] = useState(null);
    const [ currentStatus, setCurrentStatus ] = useState();
    const [ showStatus, setShowStatus ] = useState(false)
    const navigate = useNavigate();

    const [ searchName, setSearchName ] = useState('');
    const [ byGender, setByGender ] = useState(null);
    const [ byAge, setByAge ] = useState(null);
    const [ bySector, setBySector ] = useState(null);
    const [ byCategory, setByCategory ] = useState(null);

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

    const handleStatus = (id, profileStatus, yes) =>
    {
        // setProfileId(id); 
        // setCurrentStatus(profileStatus); 
        // setShowStatus(yes);
        // getProfileData();
    }

    const handleClear = () =>
    {
        setSearchName('');
        setByGender(null);
        setByAge(null);
        setBySector(null);
        setByCategory(null); 
    }

    const getAgeRange = (ageRange) =>
    {
        let lowerLimit = ageRange.split('-')[0];
        let upperLimit = ageRange.split('-')[1];
        setByAge({lower: lowerLimit, upper: upperLimit})
    }

    const filteredSearch = 
    [...profileData].filter(
        (profile) => 
        {
            const fullname = profile.personalData.firstname +' ' +profile.personalData.lastname;
            if(fullname.toLowerCase().includes(searchName.toLowerCase()))
                return profile
        })

    const searchByGender = byGender ? filteredSearch.filter((profile)=> profile.personalData.gender === byGender) : filteredSearch; 

    const searchByAge = byAge ? searchByGender.filter((profile)=> profile.personalData.age >= byAge.lower && profile.personalData.age <= byAge.upper) : searchByGender; 

    const searchBySector = bySector ? searchByAge.filter((profile)=> profile.personalData.sector === bySector) : searchByAge; 

    const searchByCategory = byCategory ? searchBySector.filter((profile)=> profile.category === byCategory) : searchBySector; 

    return(
        <div className={profiles.profilecards}>
        {profileData.length ? <div className={profiles.container}>
            <Dashboard/>
            <div className={profiles.query}>
                <div className={profiles.searchbar}>
                    <input placeholder="Search by name" value={searchName} className={profiles.search} onChange={(e)=> setSearchName(e.target.value)}/>
                    <span className={profiles.clear} onClick={handleClear}>Clear</span>
                </div>
                <div className={profiles.filters1}>
                    <select onChange={(e)=> setByGender(e.target.value)}>
                        <option value="" selected disabled>Filter by gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <select onChange={(e)=> getAgeRange(e.target.value)}>
                        <option value="" selected disabled>Filter by age</option>
                        <option value="18-21">18-21</option>
                        <option value="22-25">22-25</option>
                        <option value="26-30">26-30</option>
                        <option value="30-35">30-35</option>
                        <option value="36-40">36-40</option>
                        <option value="40-50">40+</option>
                    </select>
                </div>
                <div className={profiles.filters2}>
                    <select onChange={(e)=> setBySector(e.target.value)}>
                        <option value="" selected disabled>Filter by sector</option>
                        <option value="Private">Private</option>
                        <option value="Government">Government</option>
                    </select>
                    <select onChange={(e)=> setByCategory(e.target.value)}>
                        <option value="" selected disabled>Filter by category</option>
                        <option value="A">Category A</option>
                        <option value="B">Category B</option>
                        <option value="C">Category C</option>
                        <option value="D">Category D</option>
                    </select>
                </div>
            </div>
            {searchByCategory.map((profile)=>
            (
                <div className={profiles.card} key={profile.id}>
                    <div className={profiles.dp}>
                        <img src={profile.personalData.img} alt="img" onClick={()=> {setCurrentDP(profile.personalData.img); setZoom(true)}}/>
                        <p className={profiles.category}>Category {profile.category}</p>
                    </div>
                    <button className={profile.status === 'Pending' ? 
                        `${profiles.warning} ${profiles.status}` : 
                        `${profiles.success} ${profiles.status}`}
                        onClick={()=>handleStatus(profile.id, profile.status, true)}>
                        {profile.status}
                    </button>
                    <div className={profiles.content}>
                        <p><span>Full Name : </span>{profile.personalData.firstname +' ' +profile.personalData.lastname}</p>
                        <p><span>Age: </span>{profile.personalData.age}</p>
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
            
            {!searchByCategory.length && 
            <div className={profiles.noprofiles}>
                <h1>No Profiles Found</h1>
            </div>}
            
            {deleteProfile && <div className={profiles.deleteProfile}>
                <DeleteProfile setDeleteProfile={setDeleteProfile} profileId={profileId} setProfileData={setProfileData}/>
            </div>}

            {showStatus && 
            <div className={preview.updatestatus}>
                <UpdateStatus setShowStatus={setShowStatus} id={profileId} status={currentStatus}/>
            </div>}

            {zoom && 
                <div className={profiles.zoomcontainer}>
                    <img className={profiles.zoom} src={currentDP} alt='img'/>
                    {zoom && <span className={profiles.imgclose} onClick={()=> setZoom(false)}>X</span>}
                </div>
            }
                
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