import React from "react";
import ReactDOM from "react-dom";
import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./components/login";
import Otp from "./components/otp";
import SocialSignup from './components/socialSignup';
import DetailsSocial from './components/detailsSocial';
import SignupDetails from "./components/signupDetails";
import SignupImage from './components/signupImage';
import Profile from './components/profile';
import ProfileEdit from './components/profileEdit';
import ProfileMain from './components/profileMain';
import CustomUrl from './components/customUrls';
import Userprofile from './components/userprofile';
import PageNotFound from './components/pageNotFound';
// import Cookies from 'js-cookie';
// import UserProfileMain from './components/userProfileMain';
// import { PrivateRoute } from './privateRoute';

const isAuthenticated = () => {

    return localStorage.getItem('kurl')
    // return Cookies.get("kurl");
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem('token') ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to='/'
                />
            )
        }
    />
)

const Routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={() => {

                    if (isAuthenticated() !== null) {
                        // console.log(isAuthenticated());
                        return <Profile />
                    } else {
                        return <Login />
                        // console.log(isAuthenticated());
                    }
                }} name="SendOtp" />

                <Route exact path="/login/otp" component={Otp} name="receiveOtp" />
                <Route exact path="/signup/social" component={SocialSignup} name="social" />
                <Route exact path="/signup/social/details/" component={DetailsSocial} name="socials" />
                <Route exact path="/signup/form" component={SignupDetails} name="forms" />
                <Route exact path="/signup/addimage" component={SignupImage} name="imageupload" />
                <Route exact path="/signup/url" component={CustomUrl} name="customUrl" />

                <PrivateRoute exact path="/account/profile" component={ProfileMain} name="ProfileMain" />
                <PrivateRoute exact path="/edit/profile" component={ProfileEdit} name="ProfileEdit" />
                <Route exact path="/:id" component={Userprofile} name="userprofile" />
                <Route path='*' component={PageNotFound} />
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(Routing, document.getElementById("root"));