import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/login';
import { RegistrationPage } from '../../pages/registration';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password';
import { ProfilePage } from '../../pages/profile';
import { ProtectedRouteElement } from '../Protected-Route/Protected-Route';
import { IngredientPage } from '../../pages/ingredient';
import { OrdersPage } from '../../pages/orders';
import { getUserInfo } from '../../services/actions/auth';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';




const App =()=> {
  /*const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(getUserInfo())
  },[])*/

  return (
                
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
    </Router>
  );
}

export default App;
