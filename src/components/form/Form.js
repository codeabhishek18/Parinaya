import formstyles from './Form.module.css'
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import PersonalDetails from '../personaldetails/PersonalDetails';
import FamilyDetails from '../familydetails/FamilyDetails';
import Dashboard from '../dashboard/Dashboard';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/joy/CircularProgress';
import Footer from '../footer/Footer';
import { enqueueSnackbar } from 'notistack';

const dateFormat = () =>
{
    const date = new Date();
    return date.toDateString();
}

const Form = () =>
{
    const {id} = useParams();
    const navigate = useNavigate();
    const [ page, setPage ] = useState(0);
    const [ profile, setProfile ] = useState(
        {
            status: 'Pending',
            date: dateFormat(),
        }
    );

    const [ personalData, setPersonalData ] = 
        useState(
        {   
            firstname: '',
            lastname: '',
            gender: '',
            sunsign: '',
            ft: '',
            in: '',
            education: '',
            field:'',
            sector:'',
            occupation: '',
            salary: '',
            workplace: '',
            contact:''
        });

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
        try
        {
            await addDoc(collection(db, "profiles"), {...profile, familyData});
        }
        catch(error)
        {
            enqueueSnackbar('Check your internet connection or refresh', {variant:'error'})
        }
    }

    const updateData = async () =>
    {
        try
        {
            await updateDoc(doc(db, 'profiles', id.toString()), {...profile, familyData})
        }
        catch(error)
        {
            enqueueSnackbar('Check your internet connection or refresh', {variant:'error'})
        }
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
        if(id)
        {
            updateData(familyData);
            enqueueSnackbar('Profile is updated', {variant:'success'})
        }
        else
        {
            submitData(familyData);
            enqueueSnackbar('Profile is registered', {variant:'success'})
        }
        navigate('/')
        localStorage.clear();
    }

    useEffect(()=>
    {
        const getDocument = async () =>
        {
            const docRef = doc(db, 'profiles', id.toString());
            const snapshot = await getDoc(docRef);
            if(snapshot.exists())
            {
                setPersonalData(snapshot.data().personalData)
                setFamilyData(snapshot.data().familyData)
            }
        }
        
        id && getDocument();
    },[])

    useEffect(()=>
    {
        if(!id)
        {
        setPersonalData({   
            firstname: '',
            lastname: '',
            gender: '',
            sunsign: '',
            ft: '',
            in: '',
            education: '',
            field:'',
            sector:'',
            occupation: '',
            salary: '',
            workplace: '',
            contact:''
        });
        setFamilyData({   
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
        })
        localStorage.clear();
        }
    },[id])

    return(
        <div className={formstyles.container}>
            <Dashboard/>
            {(id && familyData && personalData || !id) ? 
            <div>
                <div className={formstyles.headers}>
                    <p className={page === 0 ? formstyles.active : ''}>1. Personal Details</p>
                    <span className={formstyles.connector}></span>
                    <p className={page === 1 ? formstyles.active : ''}>2. Family Details</p>
                </div>

                <div className={formstyles.view}>
                {page === 0 ?  
                    <PersonalDetails personalData={personalData} setPersonalData={setPersonalData} onComplete={handlePersonalDetails}/> :
                    <FamilyDetails familyData={familyData} setFamilyData={setFamilyData} onComplete={handleFamilyDetails} handleBack={handleBack}/>}
                </div>
                <Footer/>
            </div> :
            <CircularProgress
                color="neutral"
                determinate={false}
                size="lg"
                value={30}
                variant="soft"
            />}
        </div>
    )
}

export default Form