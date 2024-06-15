import footer from './Footer.module.css'
import telephone from '../../assets/telephone.png'
import email from '../../assets/email.png'
import address from '../../assets/address.png'

const Footer = () =>
{
    return(
        <div className={footer.container}>
            <h2>PARINAYA EVENTS</h2>
            <span className={footer.hr}></span>
            <div className={footer.row}>
                <img src={telephone} alt="img"/>
                <p>+91 7353283308</p>
            </div>
            {/* <div className={footer.row}>
                <img src={email} alt="img"/>
                <p>savitrimagadum7@gmail.com</p>
            </div> */}
            <div className={footer.row}>
                <img src={address} alt="img"/>
                <p>#568, Abhishek Residency, Sahakar Nagar, A/p Hidkal Dam, Hukkeri,  Belagavi - 591107</p>
            </div>            
        </div>
    )
}

export default Footer