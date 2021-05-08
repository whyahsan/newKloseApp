import React, { Component } from 'react'
import axios from 'axios';
import config from './config';
import './css/otp.scss';
// import OtpInput from 'react-otp-input';
import closeImg from './assets/klose/x-circle.svg';
// import Cookies from 'js-cookie';
import home from './assets/klose/group@3x.png';
import title from './assets/klose/combined-shape.svg';
// import triangle from './assets/klose/triangle.svg';
import forword from './assets/klose/group.svg';
import bcak1 from './assets/klose/x-circle (1).svg';

export class otp extends Component {
    constructor(prpos) {
        super(prpos);
        this.state = {
            mobile: "",
            otp: '',
            email: '' || window.sessionStorage.getItem("email"),
            errormsg: '',
            showModel: true,
            showModel1: true,
            user: false,
            time: {}, seconds: 30,
            password: '',
        }
        this.timer = 0;
    }


    async componentDidMount() {

        if (sessionStorage.getItem('email') === null) {
            this.props.history.push('/')
        }
        const id = this.state.email
        console.log(id);
        await axios.get(`${config.urlport}/user/data/${id}`)
            .then((data) => {
                console.log(data.data.data.password);
                if (data.data.data.password !== undefined) {
                    this.setState({
                        user: true
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            })
        // let timeLeftVar = this.secondsToTime(this.state.seconds);
        // this.setState({ time: timeLeftVar });

    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }

    // onOtpChange = async (e) => {

    //     if (e.length >= 4) {
    //         this.handleSubmit()
    //     }
    // }


    // secondsToTime(secs) {

    //     let hours = Math.floor(secs / (60 * 60));
    //     let divisor_for_minutes = secs % (60 * 60);
    //     let minutes = Math.floor(divisor_for_minutes / 60);
    //     let divisor_for_seconds = divisor_for_minutes % 60;
    //     let seconds = Math.ceil(divisor_for_seconds);

    //     let obj = {
    //         "h": hours,
    //         "m": minutes,
    //         "s": seconds
    //     };

    //     return obj;
    // }


    // startTimer = () => {

    //     if (this.timer === 0 && this.state.seconds > 0) {
    //         this.timer = setInterval(this.countDown, 1000);
    //     }
    // }


    // countDown = () => {

    //     let seconds = this.state.seconds - 1;

    //     this.setState({
    //         time: this.secondsToTime(seconds),
    //         seconds: seconds,
    //     });

    //     // Check if we're at zero.
    //     if (seconds === 0) {
    //         clearInterval(this.timer);

    //     }
    // }


    //handeling submit otp

    handleSubmit = async (e) => {
        try {

            const { mobile, otp, password, email } = this.state
            console.log(password);
            console.log(email);


            // const mobileData = { mobile, otp,email,password }

            var expireData = 365;

            //post otp to verify
            await axios.post(config.urlport + '/verify', { mobile: mobile, otp: otp, email: email, password: password })

            // .then((resp) => {

            //     if (resp.data.otp.userDetailsData.length !== 0) {

            //         if (resp.data.otp.usercustomurl === undefined) {

            //             if (resp.data.otp.userDetailsData[0].profileimagepath === undefined) {

            //                 this.props.history.push('/signup/addimage')

            //             } else {

            //                 if (resp.data.otp.userDetailsData[0].usercustomurl === undefined) {
            //                     this.props.history.push('/signup/url')
            //                 } else {
            //                     this.props.history.push('/')
            //                 }

            //             }
            //         } else {

            //             localStorage.setItem('token', resp.data["token"], { expires: expireData })
            //             localStorage.setItem('kurl', resp.data.otp.usercustomurl, { expires: expireData })

            //             sessionStorage.removeItem('mobile')
            //             this.props.history.push('/')

            //         }

            //     } else {

            //         localStorage.setItem('token', resp.data["token"], { expires: expireData })
            //         this.props.history.push('/signup/social')

            //     }

            // })
            // .catch(err => {
            //     this.setState({
            //         errormsg: 'OTP entered is incorrect'
            //     })
            // })


            // if (otp === '' || otp.length !== 4) {

            //     this.setState({
            //         errormsg: 'Please enter the 4 digit OTP'
            //     })
            //     return;

            // }

            // const mobileData = { mobile, otp }

            // var expireData = 365;

            // //post otp to verify
            // axios.post(config.urlport + '/verify', { mobile: mobileData.mobile, otp: mobileData.otp })

            //     .then((resp) => {

            //         if (resp.data.otp.userDetailsData.length !== 0) {

            //             if (resp.data.otp.usercustomurl === undefined) {

            //                 if (resp.data.otp.userDetailsData[0].profileimagepath === undefined) {

            //                     this.props.history.push('/signup/addimage')

            //                 } else {

            //                     if (resp.data.otp.userDetailsData[0].usercustomurl === undefined) {
            //                         this.props.history.push('/signup/url')
            //                     } else {
            //                         this.props.history.push('/')
            //                     }

            //                 }
            //             } else {

            //                 localStorage.setItem('token', resp.data["token"], { expires: expireData })
            //                 localStorage.setItem('kurl', resp.data.otp.usercustomurl, { expires: expireData })

            //                 sessionStorage.removeItem('mobile')
            //                 this.props.history.push('/')

            //             }

            //         } else {

            //             localStorage.setItem('token', resp.data["token"], { expires: expireData })
            //             this.props.history.push('/signup/social')

            //         }

            //     })
            //     .catch(err => {
            //         this.setState({
            //             errormsg: 'OTP entered is incorrect'
            //         })
            //     })
        } catch (error) {
            console.log(error);
        }

    }


    // //resend otp handler
    // resendHandle = (e) => {

    //     e.preventDefault();
    //     const resned = this.state.mobile;

    //     // post resend OTP
    //     axios.post(config.urlport + '/resend', {
    //         mobile: resned
    //     })
    //         .then(res => {

    //             this.startTimer()

    //             this.setState({
    //                 showModel1: false,
    //             })

    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })

    //     setTimeout(() => {

    //         this.setState({
    //             showModel1: true,
    //         })

    //     }, 30000)
    // }


    goBackButton = () => {

        this.props.history.push('/')

    }


    //close mobile number popup on click
    closeOnclick = () => {

        this.setState({
            showModel: false
        })

    }


    render() {

        const { mobile, otp, errormsg, showModel, showModel1, user } = this.state;

        return (
            <div className="sendOtp">

                {showModel === true ? (
                    <div className="otpContainor">
                        <div className="display_mobile_number"  >
                            <div className="new_old_user"> <img className="goback" src={bcak1} alt='bcak1' onClick={this.goBackButton} />
                                {user === true ? (
                                    <div>
                                        Welcome back
                                    </div>
                                ) : (
                                    <div>
                                        Welcome to Klose
                                    </div>
                                )}
                                <img src={closeImg} alt={closeImg} onClick={this.closeOnclick} /></div>
                            {

                                // <p> <img className="goback" src={bcak1} alt='bcak1' onClick={this.goBackButton} /> OTP was sent to  <span>&nbsp;+91 {mobile}</span>   <img src={closeImg} alt={closeImg} onClick={this.closeOnclick} /></p>
                            }
                        </div>
                    </div>
                ) : (
                    <div>
                    </div>
                )}

                <img className="title" alt="title" src={title}></img>
                <br />

                <div>
                    <img className="group" src={home} alt="home"></img>
                </div>

                <div>
                    <p className="p1"><span className="you"> You</span>’re more than just a name</p>
                    <p className="p2">Your card, website, pitch, social links and more all at one place</p>
                </div>
                {
                    // <div>
                    //     <div className="userforms">
                    //         <div className="userformc">
                    //             <label htmlFor="otp">OTP</label>
                    //         </div>

                    //         <div className="userformc1">
                    //             <OtpInput
                    //                 onChange={
                    //                     async (otp) => {
                    //                         await this.setState({
                    //                             otp: otp,
                    //                             errormsg: ''
                    //                         })
                    //                         await this.onOtpChange(otp)
                    //                     }
                    //                 }
                    //                 numInputs={4}
                    //                 containerStyle={{
                    //                     justifyContent: "space-between",
                    //                 }}
                    //                 inputStyle={{
                    //                     width: '3rem',
                    //                     height: '3rem',
                    //                     border: "0.5px solid  #707070",
                    //                     backgroundColor: "rgba(245, 245, 253, 0.6)",
                    //                     textAlign: "center",
                    //                     margin: '0.3rem',
                    //                     borderRadius: 9,
                    //                 }}
                    //                 value={otp}
                    //                 isInputNum={true}
                    //                 focusStyle={true}
                    //             />
                    //         </div>
                    //     </div>
                    //     <p className="errormsg">{errormsg}</p>

                    //     <div className="resendotp">
                    //         {showModel1 === true ? (
                    //             <div>
                    //                 <p className="Resend" href="a" onClick={this.resendHandle}>Resend</p>
                    //             </div>
                    //         ) : (
                    //             <div>
                    //                 <p className='timer'>00 : {this.state.time.s}</p>
                    //             </div>
                    //         )
                    //         }
                    //     </div>

                    //     <div className="userbuttons" onClick={this.handleSubmit}>
                    //         <button className="takeMeHome">Confirm OTP <img className="triangle" src={triangle} alt="triangle"></img></button>
                    //     </div>
                    // </div>
                }

                {user === true ? (
                    <div className="login_container">
                        <form onSubmit={this.handleSubmit} method="POST">
                            <div className="login_input_field">
                                <input
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onPasswordChange}
                                    placeholder="Enter your password"
                                />
                                <img onClick={this.handleSubmit} src={forword} alt="forword" />
                            </div>

                        </form>

                    </div>

                ) : (
                    <div className="login_container">
                        <form onSubmit={this.handleSubmit} method="POST">
                            <div className="login_input_field">
                                <input
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onPasswordChange}
                                    placeholder="Enter a new password"
                                />
                                <img onClick={this.handleSubmit} src={forword} alt="forword" />
                            </div>

                        </form>

                    </div>

                )}


            </div>
        )
    }
}
export default otp;

