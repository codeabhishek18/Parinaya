import dashboard from './Dashboard.module.css'
import { useNavigate } from 'react-router-dom'

const Dashboard = ({setPage, type}) =>
{
    const navigate = useNavigate();

    return(
        <div className={dashboard.container}>
            <div className={dashboard.navbar}>
                <h1 onClick={()=> navigate('/')}>Parinaya Events</h1>
                {!type && <button className={dashboard.register} onClick={()=> 
                {
                    if(type==="edit")
                        setPage(0); 
                    navigate('/register')}
                }>
                    <p>Register</p>
                </button>}
            </div>
        </div>
    )
}

export default Dashboard