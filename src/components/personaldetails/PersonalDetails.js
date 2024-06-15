import personal from './PersonalDetails.module.css'
import { useState, useEffect } from 'react'
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import CircularProgress from '@mui/joy/CircularProgress';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PersonalDetails = ({personalData, setPersonalData, onComplete}) =>
{
    
        const [ file, setFile ] = useState(null);
        const [ progress, setProgress ] = useState(0);
        const [selectDate, setSelectDate] = useState(null);

    useEffect(()=>
    {
        const uploadImageFile = () =>
        {
            const filename = file.name + new Date().getTime();
            const storageRef = ref(storage, filename);
            const uploadTask = uploadBytesResumable(storageRef, file);
        
            uploadTask.on("state_changed", (snapshot)=>
            {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },(error) =>
            {
                console.log(error);
            },() =>
            {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
                {
                    setPersonalData({...personalData, img:downloadURL});
                })
            })
        }

        file && uploadImageFile();

    },[file])

    const handleChange = (e) =>
    {
        const {name,value} = e.target;
        setPersonalData({...personalData, [name] : value});
    }

    const handleDateChange = (date) => 
    {
        setPersonalData({...personalData, dob: date})
        setSelectDate(date);
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        onComplete(personalData);
    }

    return(
    <form className={personal.container} onSubmit={handleSubmit}>
        <input name="firstname" type="text" placeholder="First name" value={personalData.firstname} onChange={handleChange} required/>
        <input name="lastname" type="text" placeholder="Last name" value={personalData.lastname}  onChange={handleChange} required/>
        <select name="gender" onChange={handleChange}>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </select>      
        <DatePicker
            selected={selectDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            isClearable
            placeholderText="Date of Birth"
            showYearDropdown
            scrollableMonthYearDropdown
        />
        <select name="sunsign" onChange={handleChange}>
            <option value="">Sun sign</option>
            <option value="Aries">Aries</option>
            <option value="Taurus">Taurus</option>
            <option value="Gemini">Gemini</option>
            <option value="Cancer">Cancer</option>
            <option value="Leo">Leo</option>
            <option value="Virgo">Virgo</option>
            <option value="Libra">Libra</option>
            <option value="Scorpio">Scorpio</option>
            <option value="Sagittarius">Sagittarius</option>
            <option value="Capricorn">Capricorn</option>
            <option value="Aquarius">Aquarius</option>
            <option value="Pisces">Pisces</option>
        </select>
        <div className={personal.height}>
            <select name="ft" onChange={handleChange}>
                <option value="">Height (ft)</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
            <select name="in" onChange={handleChange}>
                <option value="">Height (in)</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
            </select>
        </div>
       <select name="education" onChange={handleChange}>
            <option value="">Highest Education</option>
            <option value="7th Class">7th Class</option>
            <option value="10th Class">10th Class</option>
            <option value="PUC">PUC</option>
            <option value="Graduation">Graduation</option>
            <option value="Post Graduation">Post Graduation</option>
        </select>
        {(personalData.education === 'Graduation' || personalData.education === 'Post Graduation') && 
        <select name="field" onChange={handleChange}>
            <option value="">Field of study</option>
            <option value="BA">BA</option>
            <option value="BBA">BBA</option>
            <option value="BBM">BBM</option>
            <option value="BCA">BCA</option>
            <option value="B.Com">B.Com</option>
            <option value="B.E">B.E</option>
            <option value="B.Sc">B.Sc</option>
            <option value="MA">MA</option>
            <option value="MBA">MBA</option>
            <option value="MCA">MCA</option>
            <option value="M.Com">M.Com</option>
            <option value="M.E">M.E</option>
        </select>}
        <select name="sector" onChange={handleChange}>
            <option value="">Sector</option>
            <option value="Private">Private</option>
            <option value="Government">Government</option>
        </select>
        <input name="occupation" type="text" placeholder="Occupation" value={personalData.occupation}  onChange={handleChange} required/>
        <input name="salary" type="text" placeholder="Salary per month" value={personalData.salary} onChange={handleChange} required/>
        <input name="workplace" type="text" placeholder="Work Place" value={personalData.workplace} onChange={handleChange} required/>
        <input name="contact" type="text" placeholder="Contact Number" value={personalData.contact} onChange={handleChange} required/>
        <label>Upload Picture</label>
        <input className={personal.file} type="file" onChange={(e)=> setFile(e.target.files[0])}/>
        {progress>0 && progress<100 && 
        <div className={personal.upload}>
            <CircularProgress
                color="neutral"
                determinate={false}
                size="md"
                value={30}
                variant="soft"/>
        </div>}
        <button className={personal.next}>Next</button>
    </form>
        
    )
}

export default PersonalDetails