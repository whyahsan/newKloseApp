import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from "react-router";
import config from './config';
import './css/login.scss';
// import Cookies from 'js-cookie';

//image import
import forword from './assets/klose/group.svg';
import home from './assets/klose/group@3x.png';
import title from './assets/klose/combined-shape.svg';
// import india from './assets/klose/india.svg';
// import triangle from './assets/klose/triangle.svg';

export class login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            errormsg: '',
            email: ''
        }
    }


    componentDidMount() {

        sessionStorage.removeItem('mobile')

        let user = localStorage.getItem('Kurl')

        if (user) {

            window.location.reload();

        }
    }


    //onchange value for input
    onMobileChange = (e) => {
        this.setState({ email: e.target.value, errormsg: '' })
    }


    //onsubmit the mobile number
    handleSubmit = (e) => {

        e.preventDefault();

        const { mobile, email } = this.state;

        // if (mobile === "") {
        //     this.setState({ errormsg: "Please enter a 10 digit phone number" })
        //     return;
        // }

        // if (/^[0]?[56789]\d{9}$/.test(mobile) === false) {

        //     this.setState({ errormsg: "Please enter a 10 digit phone number" })
        //     return;

        // }

        if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g.test(email) === false) {
            this.setState({ errormsg: "Please enter a valid email" })
            return;
        }
        //post mobile number to send otp
        axios.post(config.urlport + '/send', {
            method: "POST",
            email: email
        })
            .then((resp) => {

                window.sessionStorage.setItem("email", email)

                this.setState({ email: '' })
                this.props.history.push({
                    pathname: "/login/otp"
                });

            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {

        return (
            <div className="sendOtp">
                <img className="title" alt="title" src={title}></img>
                <div className="groupImage" >
                    <img className="group" src={home} alt="home"></img>
                </div>
                <div>
                    <p className="p1"><span className="you"> You</span>’re more than just a name</p>
                    <p className="p2">Your card, website, pitch, social links and more all at one place</p>
                </div>

                <div className="login_container">
                    <form onSubmit={this.handleSubmit} method="POST">
                        <div className="login_input_field">
                            <input
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onMobileChange}
                                placeholder="Enter your email address"
                            />
                            <img onClick={this.handleSubmit} src={forword} alt="forword" />
                        </div>
                        <div>
                            <p className="errormsg">{this.state.errormsg}</p>
                        </div>
                        {

                            // <div className="mainform">
                            //     <div className="userform">
                            //         <div className="login_mobile_number">
                            //             <div className="lines">
                            //                 <img className="india" src={india} alt="india"></img><span> +91</span>
                            //             </div>
                            //             <input
                            //                 type="tel"
                            //                 className="enternumbers"
                            //                 name="number"
                            //                 value={this.state.mobile}
                            //                 onChange={this.onMobileChange}
                            //                 placeholder="Enter your phone number "
                            //             />
                            //         </div>
                            //     </div>

                            //     <div>
                            //         <p className="errormsg">{this.state.errormsg}</p>
                            //     </div>

                            //     <br></br>

                            //     <div className="userbutton">
                            //         <button className="takeMeHome" type="submit">Send OTP <img className="triangle" src={triangle} alt="triangle"></img></button>
                            //     </div>

                            //     </div>
                        }
                    </form>
                    <div className='or'>
                        or
                    </div>
                    <div className="login_with_socila_media">
                        <div>
                            <button type="button">  Login with google</button>
                        </div>
                        <div>
                            <button type="button">  Login with facebook</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(login);