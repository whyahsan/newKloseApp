import React, { Component } from 'react'
import config from './config';
// import Axios from 'axios';
import './css/socialSignup.scss';
import facebook from './assets/klose/facebook-2.svg';
import linkedin from './assets/klose/linkedin-2.svg';
import Cookies from 'js-cookie';
// import Cookies from 'js-cookie';
export class socialSignup extends Component {


    componentDidMount() {
        if (sessionStorage.getItem('mobile') === null) {
            this.props.history.push('/')
        }
        if (Cookies.get('profile') !== undefined) {

            Cookies.remove('profile');

        }
    }

    // getUserformData = async () => {

    //     const header = {
    //         headers: {
    //             "Authorization": "Bearer " + Cookies.get('token'),
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     }

    //     await Axios.get(`${config.urlport}/forms`, header)
    //         .then((data) => {
    //             console.log(data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }


    skiphandle = () => {
        this.props.history.push({
            pathname: '/signup/form'
        });
    }


    onclickFacebook = () => {
        window.open(`${config.urlport}/auth/facebook?authorization=`, "_self",)
    }


    onclickLinkedin = () => {
        window.open(`${config.urlport}/auth/linkedin?authorization=`, "_self")
    }


    render() {

        return (
            <div className="background">
                <div className="parentContainar">
                    <div className="childContainar">
                        <div>
                            <h1>Signup with a social account</h1>
                            <p className="childp1">Connect any one of the following accounts to get started</p>
                        </div>

                        <div>
                            <div className="sociallogos">
                                <p onClick={this.onclickFacebook}>
                                    <span> <img src={facebook} alt="facebook" />SIGN UP WITH FACEBOOK</span>
                                </p>
                            </div>

                            <p className="or">or</p>

                            <div className="sociallogos">
                                <p onClick={this.onclickLinkedin}>
                                    <span><img src={linkedin} alt="linkedin" />   SIGN UP WITH LINKEDIN</span>
                                </p>
                            </div>
                            <p className="thefaster">The faster & more popular option</p>
                        </div>

                        <div className="skip" onClick={this.skiphandle}>
                            <p >Skip. I like to do it manually &gt; </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default socialSignup;
