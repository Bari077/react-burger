import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { RegistrationPage } from '../../pages/registration/registration';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { ProfilePage } from '../../pages/profile/profile';
import { ProtectedRouteElement } from '../Protected-Route/Protected-Route';
import { IngredientPage } from '../../pages/ingredient/ingredient';
import { OrdersPage } from '../../pages/profile/orders';
import { Preloader } from '../Preloader/Preloader';
import { getUserInfo } from '../../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';




const App =()=> {
  const itemsRequest = useSelector(state => state.ingredientsReducer.itemsRequest);
  const userRequest = useSelector(state=> state.authReducer.userRequest);
  const dispatch = useDispatch(); 
  useEffect(()=> {
    dispatch(getUserInfo())
    }, [])

  return (
    <>
      {itemsRequest || userRequest && (<Preloader/>)}
      {!userRequest && (           
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />}/>} />
          <Route path="/profile/orders" element={<ProtectedRouteElement element={<OrdersPage />}/>} />
          <Route path="/ingredients/:id" element={<IngredientPage />} />
        </Routes>
      </Router>)}
    </>    
  );
}

export default App;
