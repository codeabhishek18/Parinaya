import family from './FamilyDetails.module.css'
import { useState } from 'react'

const FamilyDetails = ({familyData, setFamilyData, onComplete, handleBack}) =>
{

    const handleChange = (e) =>
    {
        const {name,value} = e.target;
        setFamilyData({...familyData, [name] : value});
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        onComplete(familyData);
    }

    return(
    <form className={family.container} onSubmit={handleSubmit}>
        <input name="frname" type="text" placeholder="Father's name" value={familyData.frname} onChange={handleChange} required/>
        <input name="frocc" type="text" placeholder="Father's occupation" value={familyData.frocc} onChange={handleChange} required/>
        <input name="mrname" type="text" placeholder="Mother's name" value={familyData.mrname} onChange={handleChange} required/>
        <input name="mrocc" type="text" placeholder="Mother's occupation" value={familyData.mrocc} onChange={handleChange} required/>
        <select name="siblings" onChange={handleChange}>
            <option value="">Siblings</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
        </select>
        <input name="religion" type="text" placeholder="Religion" value={familyData.religion} onChange={handleChange} required/>
        <input name="caste" type="text" placeholder="Caste" value={familyData.caste} onChange={handleChange} required/>
        <input name="bedagu" type="text" placeholder="Bedagu" value={familyData.bedagu} onChange={handleChange} required/>
        <input name="place" type="text" placeholder="Place" value={familyData.place} onChange={handleChange} required/>
        <input name="demands" type="text" placeholder="Demands" value={familyData.demands} onChange={handleChange} required/>
        <div className={family.buttons}>
            <button className={family.back} onClick={handleBack}>Back</button>
            <button className={family.submit}>Submit</button>
        </div>
    </form>
    )
}

export default FamilyDetails