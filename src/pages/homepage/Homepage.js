import home from './Homepage.module.css'
import matrimony from '../../assets/matrimony.jpg'
import catering from '../../assets/catering.jpg'
import gallery from '../../assets/gallery.jpg'
import { useNavigate } from 'react-router-dom'
import Dashboard from '../../components/dashboard/Dashboard'
import { enqueueSnackbar } from 'notistack'

const Homepage = () =>
{   
    const navigate = useNavigate();  

    return(
        <div className={home.container}>
          <Dashboard type="home"/>
          <div className={home.verticals}>
            <div className={home.row} onClick={()=> navigate('/signin')}>
              <img src={matrimony} alt="img"/>
              <h1>Matrimony</h1>
            </div>
            <div className={home.row} onClick={()=> enqueueSnackbar('Coming soon, stay tuned !')}>
              <img src={catering} alt="img"/>
              <h1>Catering</h1>
            </div>
            <div className={home.row} onClick={()=> enqueueSnackbar('Coming soon, stay tuned !')}>
              <img src={gallery} alt="img"/>
              <h1>Bride's Gallery</h1>
            </div>
          </div>
        </div>
    )
}

export default Homepage