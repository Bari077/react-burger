import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { RegistrationPage } from '../../pages/registration/registration';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { ProfilePage } from '../../pages/profile/profile';
import { ProtectedRouteElement } from '../Protected-Route/Protected-Route';
import { IngredientPage } from '../../pages/ingredient/ingredient';
import { Preloader } from '../Preloader/Preloader';
import { getUserInfo } from '../../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ProfileForm } from '../Forms/Profile-Form';
import { OrderList } from '../Order-List/Order-List';
import { FeedPage } from '../../pages/feed/feed';
import { FeedOrderPage } from '../../pages/feed-order/feed-order';




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
          <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />}/>}>
            <Route path=""  element={<ProfileForm />} />
            <Route path="orders" element={<OrderList />} />
          </Route>          
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:id" element={<FeedOrderPage />} />
        </Routes>
      </Router>)}
    </>    
  );
}

export default App;
