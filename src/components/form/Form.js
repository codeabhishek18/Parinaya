import formstyles from './Form.module.css'
import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import PersonalDetails from '../personaldetails/PersonalDetails';
import FamilyDetails from '../familydetails/FamilyDetails';

const dateFormat = () =>
{
    const date = new Date();
    return date.toDateString();
}

const Form = () =>
{
    const [ page, setPage ] = useState(0);
    const [ profile, setProfile ] = useState(
        {
            status: 'pending',
            date: dateFormat(),
        }
    );

    const handleBack = () =>
    {
        setPage(0);
    }

    const submitData = async (familyData) =>
    {
        await addDoc(collection(db, "profiles"), {...profile, familyData});
    }

    const handlePersonalDetails = (personalData) =>
    {
        setProfile({...profile, personalData});
        setPage(1);
    }

    const handleFamilyDetails = (familyData) =>
    {
        submitData(familyData);
    }

    return(
        <div className={formstyles.container}>
            <div className={formstyles.headers}>
                <p onClick={()=>setPage(0)} className={page === 0 ? formstyles.active : ''}>Personal Details</p>
                <p onClick={()=>setPage(1)} className={page === 1 ? formstyles.active : ''}>Family Details</p>
            </div>

            <div className={formstyles.view}>
            {page === 0 ?  
                <PersonalDetails onComplete={handlePersonalDetails}/> :
                <FamilyDetails onComplete={handleFamilyDetails} handleBack={handleBack}/>}
            </div>
        </div>
    )
}

export default Form