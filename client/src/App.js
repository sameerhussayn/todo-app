import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AccVerify from './components/AccVerify';
import Home from './components/Home';
function App() {
  return (
    
      <>
      <Routes>
        <Route path='/' Component={Login}/>
        <Route path='/register' Component={Register}/>
        <Route path='/verify' Component={AccVerify}/>
        <Route path='/home' Component={Home}/>

      </Routes>
      </>
   
  );
}

export default App;
