import formstyles from './Form.module.css'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import PersonalDetails from '../personaldetails/PersonalDetails';
import FamilyDetails from '../familydetails/FamilyDetails';
import Dashboard from '../dashboard/Dashboard';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const dateFormat = () =>
{
    const date = new Date();
    return date.toDateString();
}

const Form = () =>
{
    const navigate = useNavigate();
    const [ page, setPage ] = useState(0);
    const [ profile, setProfile ] = useState(
        {
            status: 'pending',
            date: dateFormat(),
        }
    );

    const [ personalData, setPersonalData ] = 
        useState(
            {   
                firstname: '',
                lastname: '',
                gender: '',
                dob: '',
                sunsign: '',
                height: '',
                education: '',
                occupation: '',
                salary: '',
                workplace: ''
            }
        );

    const [ familyData, setFamilyData ] = 
        useState(
            {   
                frname: '',
                frocc: '',
                mrname: '',
                mrocc: '',
                siblings: '',
                religion: '',
                caste: '',
                bedagu: '',
                place: '',
                demands: ''
            }
        )

    const handleBack = () =>
    {
        setPage(0);
        const perosnalData = localStorage.getItem('personalData')
        personalData && setPersonalData(JSON.parse(perosnalData))
        perosnalData && localStorage.setItem('familyData', JSON.stringify(familyData));
    }

    const submitData = async (familyData) =>
    {
        await addDoc(collection(db, "profiles"), {...profile, familyData});
    }

    const handlePersonalDetails = (personalData) =>
    {
        setProfile({...profile, personalData});
        setPage(1);
        localStorage.setItem('personalData', JSON.stringify(personalData));
        const familyData = JSON.parse(localStorage.getItem('family'))
        familyData && setFamilyData(JSON.parse(familyData));
    }

    const handleFamilyDetails = (familyData) =>
    {
        submitData(familyData);
        navigate('/')
        localStorage.clear();
    }

    return(
        <div className={formstyles.container}>
            <Dashboard/>
            <div className={formstyles.headers}>
                <p onClick={()=>setPage(0)} className={page === 0 ? formstyles.active : ''}>Personal Details</p>
                <p onClick={()=>setPage(1)} className={page === 1 ? formstyles.active : ''}>Family Details</p>
            </div>

            <div className={formstyles.view}>
            {page === 0 ?  
                <PersonalDetails personalData={personalData} setPersonalData={setPersonalData} onComplete={handlePersonalDetails}/> :
                <FamilyDetails familyData={familyData} setFamilyData={setFamilyData} onComplete={handleFamilyDetails} handleBack={handleBack}/>}
            </div>
        </div>
    )
}

export default Form