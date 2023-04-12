import React from 'react'
import { useSelector } from 'react-redux';

import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import './App.css'
import Layout from './components/Layout';
import AdminRequireAuth from './features/AdminRequireAuth';
import { currentToken } from './features/authSlice';
import ManagersRequireAuth from './features/ManagersRequireAuth';
import { managersData } from './features/managersAuthSlice';
import { userData2 } from './features/userAuthSlice';

import UserRequireAuth from './features/UserRequireAuth';
import AdminHome from './pages/adminPages/AdminHome';
import AdminLogin from './pages/adminPages/AdminLogin';
import EventManagers from './pages/adminPages/EventManagers';
import Requests from './pages/adminPages/Requests';
import TransactionHistory from './pages/adminPages/TransactionHistory';
import UserManagement from './pages/adminPages/UserManagement';
import ChangePassword from './pages/ChangePassword';
import Chat from './pages/chat/Chat';

import Forgotpassword from './pages/Forgotpassword';
import Login from './pages/Login';
import MyOrders from './pages/MyOrders';
import PageNotFound from './pages/PageNotFound';
import Completion from './pages/payment/Completion';
import Payment from './pages/payment/Payment';
import ManagerChat from './pages/providerPages/chat/ManagerChat';
import EditProfile from './pages/providerPages/EditProfile';
import ManagerChangePassword from './pages/providerPages/ManagerChangePassword'
import ManagersForgotPassword from './pages/providerPages/ManagersForgotPassword';
import Orders from './pages/providerPages/Orders';
import ProviderLogin from './pages/providerPages/ProviderLogin';
import ProviderProfile from './pages/providerPages/ProviderProfile';
import ProviderSignup from './pages/providerPages/ProviderSignup';
import Providers from './pages/Providers';
import Signup from './pages/Signup';
import SingleProvider from './pages/SingleProvider';
import OurEvents from './pages/OurEvents';
import UserLandingPage from './pages/UserLandingPage'



export const Appl = () => {


  const user = useSelector(userData2)
  const admin = useSelector(currentToken)
  const manager = useSelector(managersData)



  return (

    <Routes>
      <Route path='/' element={<Layout />}>
      <Route index element={<OurEvents />} />


        <Route path="login" element={user != "" ? <Navigate to="/home" /> : <Login />} />
        <Route path="signup" element={user != "" ? <Navigate to="/home" /> : <Signup />} />
        <Route path="forgotPassword" element={user != "" ? <Navigate to="/home" /> : <Forgotpassword />} />
        <Route path="changePassword/:userId/:token" element={user != "" ? <Navigate to="/home" /> : <ChangePassword />} />
          <Route path="provider/:id" element={<SingleProvider />} />
          <Route path="providers/:service" element={<Providers />} />
        <Route element={<UserRequireAuth />}>
          <Route path='home' element={<UserLandingPage />} />
          <Route path='chat' element= {<Chat/>}/>
          <Route path='completion' element={<Completion/>}/>
          <Route path='payment' element={<Payment/>}/>
          <Route path='myOrders' element={<MyOrders/>}/>
        </Route>

        <Route path="providerLogin" element={manager != "" ? <Navigate to="/providerProfile" /> : <ProviderLogin />} />
        <Route path="providerSignup" element={manager != "" ? <Navigate to="/providerProfile" /> : <ProviderSignup />} />
        <Route path="managersForgotPassword" element={manager != "" ? <Navigate to="/providerProfile" /> : <ManagersForgotPassword />} />
        <Route path="managerChangePassword/:userId/:token" element={manager != "" ? <Navigate to="/providerProfile" /> : <ManagerChangePassword />} />
        <Route element={<ManagersRequireAuth />}>
          {/* <Route path='managersLanding' element={<ManagersLanding />} /> */}
          <Route path="providerProfile" element={<ProviderProfile />} />
          <Route path="editProfile" element={<EditProfile />} />
          <Route path='managersChat' element={<ManagerChat/>}/>
          <Route path='orders' element={<Orders/>}/>
        </Route>


        <Route path="adminLogin" element={admin != "" ? <Navigate to="/adminLanding" /> : <AdminLogin />} />
        <Route element={<AdminRequireAuth />}>
          <Route path="adminLanding" element={<AdminHome />} />
          <Route path="userManagement" element={<UserManagement />} />
          <Route path="requests" element={<Requests />} />
          <Route path="eventManagers" element={<EventManagers />} />
          <Route path='transactions' element={<TransactionHistory/>}/>
        </Route>

      </Route>
      <Route path="*" element={<PageNotFound />} />

    </Routes>

  )
}

// export default App