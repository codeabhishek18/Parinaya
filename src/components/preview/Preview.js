import preview from './Preview.module.css'

const Preview = ({profile}) =>
{

    return(
        <div className={preview.container}>
            <div className={preview.displaypicture}>
                <img src={profile.personalData.img} alt="img"/>
            </div>
            <div className={preview.details}>
                <div className={preview.personal}>
                    <h3>Personal Details</h3>
                    <p><span>Full name : </span>{profile.personalData.firstname +' ' +profile.personalData.lastname}</p>
                    <p><span>Gender : </span>{profile.personalData.gender}</p>
                    <p><span>DOB : </span>{profile.personalData.dob}</p>
                    <p><span>Sun sign : </span>{profile.personalData.sunsign}</p>
                    <p><span>Height: </span>{profile.personalData.height}</p>
                    <p><span>Education : </span>{profile.personalData.education}</p>
                    <p><span>Occupation: </span>{profile.personalData.occupation}</p>
                    <p><span>Salary: </span>{profile.personalData.salary}</p>
                    <p><span>Work Place: </span>{profile.personalData.workplace}</p>
                </div>
                <div className={preview.family}>
                    <h3>Family Details</h3>
                    <p><span>Father's name : </span>{profile.familyData.frname +' ' +profile.personalData.lastname}</p>
                    <p><span>Father's occupation : </span>{profile.familyData.frocc}</p>
                    <p><span>Mother's name : </span>{profile.familyData.mrname +' ' +profile.personalData.lastname}</p>
                    <p><span>Mother's occupation : </span>{profile.familyData.mrocc}</p>
                    <p><span>Siblings : </span>{profile.familyData.siblings}</p>
                    <p><span>Religion : </span>{profile.familyData.religion}</p>
                    <p><span>Caste : </span>{profile.familyData.caste}</p>
                    <p><span>Bedagu : </span>{profile.familyData.bedagu}</p>
                    <p><span>Place : </span>{profile.familyData.place}</p>
                    <p><span>Demands : </span>{profile.familyData.demands}</p>
                </div>
            </div>
        </div>
    )
}

export default Preview