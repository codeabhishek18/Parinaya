import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'

const Profiles = () =>
{
    const [ profileData, setProfileData ] = useState([]);

    useEffect(()=>
    {
        getProfileData();
    },[])

    const getProfileData = async () =>
    {
        const querySnapshot = await getDocs(collection(db, "profiles"));
        const profileList = querySnapshot.docs.map((doc)=> ({id: doc.id,...doc.data()}))
        console.log(profileList);
        setProfileData(profileList);
    }

    return(
        <div>
            {profileData.map((profile)=>
            (
                <div>
                    <p>First Name : {profile['First Name']}</p>
                    <p>Last Name : {profile['Last Name']}</p>
                    <p>DOB : {profile['DOB']}</p>
                    <p>Height : {profile['Height']}</p>
                    <p>Sun Sign : {profile['Sun Sign']}</p>
                    <p>Education : {profile['Education']}</p>
                    <p>Occupation : {profile['Occupation']}</p>
                    <p>Salary : {profile['Salary']}</p>
                </div>
            ))}
        </div>
    )
}

export default Profiles