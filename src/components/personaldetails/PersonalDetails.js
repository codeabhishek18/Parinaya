import personal from './PersonalDetails.module.css'
import { useState, useEffect } from 'react'
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import CircularProgress from '@mui/joy/CircularProgress';

const PersonalDetails = ({personalData, setPersonalData, onComplete}) =>
{
    
        const [ file, setFile ] = useState(null);
        const [ progress, setProgress ] = useState(0);

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
        <input name="dob" type="text" placeholder="Date of Birth (dd-mm-yyyy)" value={personalData.dob} onChange={handleChange} required/>
        <input name="sunsign" type="text" placeholder="Sun sign" value={personalData.sunsign} onChange={handleChange} required/>
        <input name="height" type="text" placeholder="Height" value={personalData.height} onChange={handleChange} required/>
        <input name="education" type="text" placeholder="Education" value={personalData.education}  onChange={handleChange} required/>
        <input name="occupation" type="text" placeholder="Occupation" value={personalData.occupation}  onChange={handleChange} required/>
        <input name="salary" type="text" placeholder="Salary" value={personalData.salary} onChange={handleChange} required/>
        <input name="workplace" type="text" placeholder="Work Place" value={personalData.workplace} onChange={handleChange} required/>
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