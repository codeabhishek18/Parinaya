import './App.css';
import Form from './components/form/Form';
import Preview from './components/preview/Preview';
import Profiles from './components/profiles/Profiles';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { SnackbarProvider } from 'notistack';
import Homepage from './pages/homepage/Homepage';

function App() 
{
  return (
  <div className="App">
    <SnackbarProvider anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
      <Router>
        <Routes>
          <Route path='/' index element={<Homepage/>}/>
          <Route path='/profiles' index element={<Profiles/>}/>
          <Route path='/register' element={<Form/>}/>
          <Route path='/profiles/:id' element={<Preview/>}/>
          <Route path='/edit/:id' element={<Form/>}/>
        </Routes>
      </Router>
    </SnackbarProvider>
  </div>
  );
}

export default App;
