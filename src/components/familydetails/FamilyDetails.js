import family from './FamilyDetails.module.css'

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
        <div className={family.siblings}>
            <select name="msiblings" onChange={handleChange} required>
                <option value="">Siblings (Male)</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
            <select name="fsiblings" onChange={handleChange} required>
                <option value="">Siblings (Female)</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
        </div>
        <div className={family.properties}>
            <select name="prophouses" onChange={handleChange} required>
                <option value="">Houses</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <select name="propland" onChange={handleChange} required>
                <option value="">Land in acres</option>
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
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
            </select>
            <select name="propsites" onChange={handleChange} required>
                <option value="">Sites</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
            </select>
        </div>
       <select name="religion" onChange={handleChange} required>
            <option value="">Religion</option>
            <option value="Hindu">Hindu</option>
            <option value="Jain">Jain</option>
            <option value="Christ">Christ</option>
            <option value="Muslim">Muslim</option>
        </select>
        {familyData.religion === 'Hindu' && <input name="caste" type="text" placeholder="Caste" value={familyData.caste} onChange={handleChange} required/>}
        <input name="bedagu" type="text" placeholder="Bedagu" value={familyData.bedagu} onChange={handleChange} required/>
        <div className={family.address}>
            <input name="place" type="text" placeholder="Place" value={familyData.place} onChange={handleChange} required/>
            <select name="district" onChange={handleChange} required>
                <option value="">District</option>
                <option value="Bagalkote">Bagalkote</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Belagavi">Belagavi</option>
                <option value="Bellari">Bellari</option>
                <option value="Bidar">Bidar</option>
                <option value="Vijayapura">Vijayapura</option>
                <option value="Chamarajanagar">Chamarajanagar</option>
                <option value="Chikkaballapura">Chikkaballapura</option>
                <option value="Chikkamagaluru">Chikkamagaluru</option>
                <option value="Chitradurga">Chitradurga</option>
                <option value="Dakshina Kannada">Dakshina Kannada</option>
                <option value="Davanagere">Davanagere</option>
                <option value="Dharwad">Dharwad</option>
                <option value="Gadag">Gadag</option>
                <option value="1Kalaburagi">Kalaburagi</option>
                <option value="Hassan">Hassan</option>
                <option value="Haveri">Haveri</option>
                <option value="Kodagu">Kodagu</option>
                <option value="Kolar">Kolar</option>
                <option value="Koppal">Koppal</option>
                <option value="Mandya">Mandya</option>
                <option value="Mysuru">Mysuru</option>
                <option value="Raichur">Raichur</option>
                <option value="Ramanagara">Ramanagara</option>
                <option value="Shivamogga">Shivamogga</option>
                <option value="Udupi">Udupi</option>
                <option value="Uttara Kannada">Uttara Kannada</option>
                <option value="Vijayanagara">Vijayanagara</option>
                <option value="Yadgiri">Yadgiri</option>
            </select>
        </div>
        <input name="demands" type="text" placeholder="Demands" value={familyData.demands} onChange={handleChange} required/>
        <div className={family.buttons}>
            <button className={family.back} onClick={handleBack}>Back</button>
            <button className={family.submit}>Submit</button>
        </div>
    </form>
    )
}

export default FamilyDetails