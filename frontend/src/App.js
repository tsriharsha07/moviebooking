import './App.css';
import Header from './components/Header';
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './components/Home';
import Movies from './components/movies/Movies'
import Auth from './components/auth/Auth';
import Admin from './components/admin/Admin';
import { useSelector } from 'react-redux';


function App() {
  const {isLoggedIn:isUserLoggedIn,user}=useSelector(state=>state.user)
  const { isLoggedIn:isAdminLoggedIn,admin}=useSelector(state=>state.admin)
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <section>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/movies' element={<Movies/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/auth' element={<Auth/>}/>
        </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
