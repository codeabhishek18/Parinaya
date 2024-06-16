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
            dob:'',
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
                msiblings: '',
                fsiblings:'',
                prophouses:'',
                propland:'',
                propsites:'',
                religion: '',
                caste: '',
                bedagu: '',
                place: '',
                district: '',
                demands: ''
            }
        )

    const calculateCategory = () =>
    {
        let salarypoints = 0;
        let housepoints = 0;
        let landpoints = 0;
        let sitepoints = 0;

        let salary = +personalData.salary;
        let houses = +familyData.prophouses;
        let land = +familyData.propland;
        let sites = +familyData.propsites;
        let siblings = +familyData.msiblings;

        if(salary < 3)
            salarypoints = 10;
        if(salary >=3 && salary < 8)
            salarypoints = 20;
        if(salary >=8 && salary <15)
            salarypoints = 30;
        if(salary > 15)
            salarypoints = 40;

        if(houses === 0)
            housepoints = 0;
        if(houses === 1)
            housepoints = 10;
        if(houses === 2)
            housepoints = 20;
        if(houses === 3)
            housepoints = 30;
        if(houses > 3)
            housepoints = 40;

        if(land/siblings <= 1)
            landpoints = 10;
        if(land/siblings > 1 && land/siblings < 2)
            landpoints = 20;
        if(land/siblings >=2 && land/siblings < 5)
            landpoints = 30;
        if(land/siblings > 5)
            landpoints = 40;

        if(sites === 0)
            sitepoints = 0;
        if(sites === 1)
            sitepoints = 10;
        if(sites === 2)
            sitepoints = 20;
        if(sites === 3)
            sitepoints = 30;
        if(sites > 3)
            sitepoints = 40;

        if(salarypoints === 40 || housepoints === 40 || landpoints === 40 || sitepoints === 40)
            return "A";

        if(salarypoints === 30 && housepoints>0)
            return "B"

        if(salarypoints === 30 && housepoints===0)
            return "C"

        if(housepoints === 0)
            return "D"
        
        let totalpoints = salarypoints + housepoints + landpoints + sitepoints;
        if(totalpoints>=80)
            return "B";

        else    
            return "C";
    }

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
            await addDoc(collection(db, "profiles"), {...profile, category: calculateCategory(), familyData});
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
            dob:'',
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
            msiblings: '',
            fsiblings:'',
            prophouses:'',
            propland:'',
            propsites:'',
            religion: '',
            caste: '',
            bedagu: '',
            place: '',
            district: '',
            demands: ''
        })
        localStorage.clear();
        }
    },[id])

    return(
        <div className={formstyles.container}>
            <Dashboard setPage={setPage} type="edit"/>
            {((id && familyData && personalData) || !id) ? 
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