import Form from '../form/Form';
import Profiles from '../profiles/Profiles'
import dashboard from './Dashboard.module.css'
import { useState } from 'react'

const Dashboard = () =>
{
    const [ register, setRegister ] = useState(false);

    return(
        <div className={dashboard.container}>
            <div className={dashboard.navbar}>
                <h1 onClick={()=>setRegister(false)}>Parinaya</h1>
                <button className={dashboard.register} onClick={()=> setRegister(true)}>Register</button>
            </div>
            {!register ? <Profiles/> : <Form/>}
        </div>
    )
}

export default Dashboard