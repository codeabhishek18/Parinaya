import personal from './PersonalDetails.module.css'
import { useState, useEffect } from 'react'

const PersonalDetails = ({onComplete}) =>
{
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
        const [ file, setFile ] = useState(null);

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
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>      
        <input name="dob" type="text" placeholder="Date of Birth" value={personalData.dob} onChange={handleChange} required/>
        <input name="sunsign" type="text" placeholder="Sun sign" value={personalData.sunsign} onChange={handleChange} required/>
        <input name="height" type="text" placeholder="Height" value={personalData.height} onChange={handleChange} required/>
        <input name="education" type="text" placeholder="Education" value={personalData.education}  onChange={handleChange} required/>
        <input name="occupation" type="text" placeholder="Occupation" value={personalData.occupation}  onChange={handleChange} required/>
        <input name="salary" type="text" placeholder="Salary" value={personalData.salary} onChange={handleChange} required/>
        <input name="workplace" type="text" placeholder="Work Place" value={personalData.workplace} onChange={handleChange} required/>
        <label>Upload Picture</label>
        <input className={personal.file} type="file" onChange={(e)=> setFile(e.target.files[0])}/>
        <button>Next</button>
    </form>
        
    )
}

export default PersonalDetails