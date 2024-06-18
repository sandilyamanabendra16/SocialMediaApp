
import { useSelector } from 'react-redux';
import './App.css';
import Auth from './pages/Auth/Auth';
import Home from './pages/home/Home';
import Profile from './pages/Profile/Profile';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const user= useSelector((state)=>state.authReducer.authData)
  return (
    <div className="App">
      {/* <div className="blur1" style={{top: '-18%' ,right: '0'}}></div>
      <div className="blur2" style={{top: '36%' ,left: '-8rem'}}></div> */}
      <div className="blur1"></div>
      <div className="blur2"></div>
      <Routes>
        <Route path="/" element={user? <Navigate to= "home"/>: <Navigate to= "auth"/>}/>
        <Route path='/home' element={user? <Home /> : <Navigate to="../auth"/>}/>
        <Route path='/auth' element={user? <Navigate to="../home"/> : <Auth/> }/>
        <Route path='/profile/:id' element={user? <Profile /> : <Navigate to="/auth"/>}/>
      </Routes>
    </div>
  );
}

export default App;
