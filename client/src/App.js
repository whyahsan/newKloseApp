import React from 'react';

import Login from './components/login';
import Otp from './components/otp';
import SocialSignup from './components/socialSignup';
import DetailsSocial from './components/detailsSocial';
import SignupDetails from './components/signupDetails';
import SignupImage from './components/signupImage';
import Scanner from './components/qrscanner';
import Profile from './components/profile';
import ProfileEdit from './components/profileEdit';
import ProfileMain from './components/profileMain';
import CustomUrl from './components/customUrls';
import Userprofile from './components/userprofile';
import PageNotFound from './components/pageNotFound';
import UserProfileMain from './components/userProfileMain';

function App() {
  return (
    <div className="App">
      <Login />
      <Otp />
      <SocialSignup />
      <DetailsSocial />
      <SignupDetails />
      <SignupImage />
      <Scanner />
      <Profile />
      <ProfileEdit />
      <ProfileMain />
      <CustomUrl />
      <Userprofile />
      <UserProfileMain />
      <PageNotFound />
    </div>
  );
}

export default App;
