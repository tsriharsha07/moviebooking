import './App.css';
import Header from './components/Header';
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './components/Home';
import Movies from './components/movies/Movies'
import Auth from './components/auth/Auth';
import Admin from './components/admin/Admin';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { adminActions, userActions } from "./store";
import { useEffect } from 'react';
import UserProfile from './Profile/UserProfile';
import Booking from './components/Booking/Booking'


function App() {
  const dispatch=useDispatch();
  const {isLoggedIn:isUserLoggedIn,user}=useSelector(state=>state.user);
  const { isLoggedIn:isAdminLoggedIn,admin}=useSelector(state=>state.admin);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <section>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/movies' element={<Movies/>}/>
          {!isUserLoggedIn && !isAdminLoggedIn && (
            <>
              {" "}
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
            </>
          )}
          {isUserLoggedIn && !isAdminLoggedIn && (
            <>
              {" "}
              <Route path="/user" element={<UserProfile />} />
              <Route path="/booking/:id" element={<Booking />} />
            </>
          )}
        </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
