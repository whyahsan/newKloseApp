import React, { Component } from 'react';
import './css/profile.scss';
import Axios from 'axios';
import TinderCard from 'react-tinder-card';
import QrReader from 'react-qr-reader'
import copy from 'clipboard-copy';
import config from './config';
// import Qrscanner from './qrscanner';
// import ProfileMain from './profileMain';
import phonesvg from './assets/klose/phone-1.svg';
import emailsvg from './assets/klose/mail-2.svg';
import whatsappsvg from './assets/klose/whatsapp.svg'
import smssvg from './assets/klose/sms.svg'
// import massenger from './assets/klose/messenger.svg';
import send from './assets/klose/send.svg';
import recive from './assets/klose/qrcoderecive.svg';
import notification from './assets/klose/notification.svg';
import notification1 from './assets/klose/notification1.svg';
import view1 from './assets/klose/view-1.svg';
import user from './assets/klose/user-1.svg';
import user1 from './assets/klose/user-2.svg';
import group from './assets/klose/group@2x.png';
import share from './assets/klose/copy.svg';
import share2 from './assets/klose/share-2.svg';
import bcak1 from './assets/klose/backqrscan.svg';
import profilebtn from './assets/klose/group-5.svg';
import coachmarkup from './assets/klose/coachmarkupimage.svg';
// import coachmarkmiddle from './assets/klose/coachmarkcenter.svg';
import coachmarkdown from './assets/klose/coachmarkdown.svg';
import more from './assets/klose/more.svg';
import logout from './assets/klose/power-button.svg';
import contact_us from './assets/klose/contactus1.svg';
// import Cookies from 'js-cookie';
import { ClipLoader, PuffLoader } from 'react-spinners';
// import QrReader from 'react-weblineindia-qrcode-scanner'
import { withRouter } from 'react-router-dom';


export class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: '',
            profilecopymsg: '',
            qrcode: '',
            profileimagepath: "",
            url: "",
            jobtitle: "",
            company: "",
            qecodescanresult: '',
            frontEndurl: "",
            displayQrcode: false,
            coach: '',
            kid: '',
            usercustomurl: '',
            welcomeCoach: false,
            swipeUpCoachMark: false,
            swipeDownCoachMark: false,
            displayLogout: false,
            showCopyurl: false,
            qrocdeScannerShow: false,
            scannerloading: false,

            scananimationshow: false,
            qrcodeloader: false,
            porfileLoader: false,

            notificationDisplay: false,

            displayImageContainor: true,

            profileview: [],

            timeduration: [],

            profileDisplayContainor: true,

            qrCoderScannerDisplay: false,

            qrCoderGeneratorDisplay: false,

            notificationtimestamp: '',

            newNotification: false,

            numberofNotification: [],
        }
    }

    async componentDidMount() {

        const header = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }

        await Axios.get(config.urlport + `/userdetails`, header)
            .then((data) => {

                var coach = localStorage.getItem('coach');
                // var coach = 'coach';
                const { name, email, jobtitle, company, profileimagepath, qrcode, phone, kid, usercustomurl, profileview, notificationtimestamp } = data.data.data;
                var arr = [];
                var index = '';
                // console.log("new time stamp", notificationtimestamp);
                // console.log(profileview.length);

                for (index = 0; index < profileview.length; index++) {
                    const element = profileview[index];
                    if (element.currantDate > notificationtimestamp) {
                        this.setState({
                            newNotification: true
                        })
                        arr.push(element);
                        // console.log(element[index]);
                    }
                }

                // profileview.sort(async (a) => {

                //     if (notificationtimestamp < a.currantDate) {

                //         this.setState({
                //             newNotification: true
                //         })
                //         await arr.push(a)
                //         console.log(a);
                //         console.log("new notification");
                //     }
                // })

                this.setState({
                    name, email, jobtitle: `${jobtitle},`, company, profileimagepath, qrcode, phone,
                    coach: coach, kid,
                    url: config.urlport + "/",
                    frontEndurl: qrcode,
                    usercustomurl,
                    porfileLoader: true,
                    profileview: profileview,
                    notificationtimestamp,
                    numberofNotification: arr.length
                })
                localStorage.setItem('full_name', name)
            })
            .catch((err) => {
                console.log(err);
            })
    }


    //handle qrcode scanner data
    handleScan = async (data) => {

        if (data !== null) {

            if (/(?:(?:http|https):\/\/)?(?:www.)?(?:klose.xyz)\/([A-Za-z0-9-_.]+)/im.test(data) === false) {

                this.setState({
                    qecodescanresult: 'Seems like this code is not valid',
                })

                setTimeout(() => {
                    this.setState({
                        qecodescanresult: ''
                    })
                }, 2000)

                return;

            } else {

                this.setState({
                    qecodescanresult: data,
                    displayQrcode: false,
                    scannerloading: false,
                    scananimationshow: true,
                })

                setTimeout(() => {
                    window.open(data, "_self",);
                }, 1000)

            }

        }
    }


    //handle qrcode scanner error
    handleScannerError = (err) => {
        console.error(err)
    }


    // get the qrcode form this api
    qrcodeGeneratorApi = async () => {

        const header = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
        }

        await Axios.get(config.urlport + '/qrcode', header,)
            .then((data) => {
                this.setState({ qrcodeloader: true, qrcode: data.data.data })
            })
            .catch(err => {
                console.log(err);
            })
    }


    //copy profile on click and share 
    shareProfile = () => {

        if (navigator.share) {
            const { usercustomurl, name } = this.state;
            const kloseshare = {
                title: window.document.title,
                text: `${name} has shared his Klose Card with you:`,
                url: 'https://klose.xyz/' + usercustomurl,
                // savecontact: {
                // text: 'Everything you need to know at one place. To add me to your contacts directly.',
                // url: `${config.urlport}/vcard/${usercustomurl}`
                // }
            }
            // const savecontact = {
            //     text: 'Everything you need to know at one place. To add me to your contacts directly.',
            //     url: `${config.urlport}/vcard/${usercustomurl}`
            // }
            navigator.share(kloseshare)
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));

        } else {
            console.log("error");
        }
    }


    //open qrcodr scanner form this function
    popupOpenQRScanner = () => {
        const { profileDisplayContainor, qrCoderScannerDisplay } = this.state;
        this.setState({
            displayQrcode: true,
            qrocdeScannerShow: true,
            scannerloading: true,
            qrCoderScannerDisplay: !qrCoderScannerDisplay,
            profileDisplayContainor: !profileDisplayContainor
        })
    }


    //close qrcodr scanner form this function
    popupCloseQRScanner = () => {
        const { profileDisplayContainor, qrCoderScannerDisplay } = this.state;
        this.setState({
            displayQrcode: false,
            qrCoderScannerDisplay: !qrCoderScannerDisplay,
            profileDisplayContainor: !profileDisplayContainor

        })
    }


    //open qrcode generator
    popupOpenQrGenerator = () => {
        const { profileDisplayContainor, qrCoderGeneratorDisplay } = this.state;
        this.setState({
            qrcodeloader: false,
            qrCoderGeneratorDisplay: !qrCoderGeneratorDisplay,
            profileDisplayContainor: !profileDisplayContainor

        })
        this.qrcodeGeneratorApi();
    }


    //close qrcode generator
    popupCloseQrGenerator = () => {
        const { profileDisplayContainor, qrCoderGeneratorDisplay } = this.state;
        this.setState({
            qrCoderGeneratorDisplay: !qrCoderGeneratorDisplay,
            profileDisplayContainor: !profileDisplayContainor

        })
    }


    //this function to close coach mark
    closeCoachMark = () => {
        document.getElementById('coachmark').style.display = 'none';
    }


    // On swipe action 
    onSwipe = (direction) => {

        if (direction === "up") {
            this.popupOpenQrGenerator();
        } else {
            this.popupOpenQRScanner();
        }

    }


    // onCardLeftScreen = (myIdentifier) => {
    //     console.log(myIdentifier + ' left the screen')
    // }


    //Copy the URL and past 
    handleCopyUrl = (e) => {

        e.preventDefault();

        copy(this.state.frontEndurl)

        this.setState({
            showCopyurl: true,
            profilecopymsg: " Copied"
        });

        setTimeout(() => {
            this.setState({ profilecopymsg: '', showCopyurl: false })
        }, 1000)

    }


    //Redirect to main profile page 
    handleClicktogle = () => {
        this.props.history.push({
            pathname: "/account/profile"
        });
    }


    //logout 
    handleLogout = (e) => {

        e.preventDefault();

        localStorage.removeItem('kurl');
        localStorage.removeItem('token');
        localStorage.removeItem('full_name');
        window.location.reload();

    }


    //logout togle handle
    logoutTogleHandle = () => {
        const { displayLogout } = this.state;
        this.setState({
            displayLogout: !displayLogout,
            displayImageContainor: true,
            notificationDisplay: false,
            // newNotification: false
        })
    }

    handleLogoutFales = () => {
        if (this.state.displayLogout === true) {
            this.setState({
                displayLogout: false,
            })
        }
    }

    //covert first letter in capital
    convertToTitleCase = (str) => {
        if (str !== null && str !== undefined) {
            return (
                str.split(/\s/).join(''),
                str.replace(
                    /\w\S*/g,
                    function (txt) {
                        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    }
                )
            )
        }

    }


    //remove coach mark
    removeCoachmark = () => {
        localStorage.removeItem('coach');
    }


    //gettimeStamp
    handleTimeStamp = (dates) => {

        var currantDate = new Date().getTime();
        // var oDiff = new Object();

        var oDiff = {
            days: '',
            hours: '',
            minutes: '',
            seconds: '',
        }
        var result = currantDate - dates;

        oDiff.days = Math.floor(result / 1000 / 60 / 60 / 24);
        result -= oDiff.days * 1000 * 60 * 60 * 24;

        oDiff.hours = Math.floor(result / 1000 / 60 / 60);
        result -= oDiff.hours * 1000 * 60 * 60;

        oDiff.minutes = Math.floor(result / 1000 / 60);
        result -= oDiff.minutes * 1000 * 60;

        oDiff.seconds = Math.floor(result / 1000);

        var hourtext = '00';
        if (oDiff.days > 0) { hourtext = String(oDiff.days); }
        if (hourtext.length === 1) { hourtext = '0' + hourtext };

        //  Format Minutes
        var mintext = '00';
        if (oDiff.minutes > 0) { mintext = String(oDiff.minutes); }
        if (mintext.length === 1) { mintext = '0' + mintext };

        //  Format Seconds
        var sectext = '00';
        if (oDiff.seconds > 0) { sectext = String(oDiff.seconds); }
        if (sectext.length === 1) { sectext = '0' + sectext };

        //  Set Duration
        var sDuration = hourtext + ':' + mintext + ':' + sectext;
        oDiff.duration = sDuration;
        // console.log(oDiff);

        return (
            <div>
                {(() => {
                    if (oDiff.days === 0 && oDiff.hours === 0 && oDiff.minutes === 0 && oDiff.seconds !== 0) {
                        return (
                            <div>
                                <p>{oDiff.seconds} seconds ago</p>
                            </div>
                        )
                    } else if (oDiff.days === 0 && oDiff.hours === 0 && oDiff.minutes !== 0 && oDiff.minutes === 1 && oDiff.seconds !== 0) {
                        return (
                            <div>
                                <p>{oDiff.minutes} minute ago</p>
                            </div>
                        )
                    } else if (oDiff.days === 0 && oDiff.hours === 0 && oDiff.minutes !== 0 && oDiff.minutes > 1 && oDiff.seconds !== 0) {
                        return (
                            <div>
                                <p>{oDiff.minutes} minutes ago</p>
                            </div>
                        )
                    } else if (oDiff.days === 0 && oDiff.hours !== 0 && oDiff.hours === 1) {
                        return (
                            <div>
                                <p>{oDiff.hours} hour ago</p>
                            </div>
                        )

                    } else if (oDiff.days === 0 && oDiff.hours !== 0 && oDiff.hours > 1) {
                        return (
                            <div>
                                <p>{oDiff.hours} hours ago</p>
                            </div>
                        )
                    } else if (oDiff.days > 1 && oDiff.days !== 0) {
                        return (
                            <div>
                                <p>{oDiff.days} days ago</p>
                            </div>
                        )
                    } else if (oDiff.days !== 0 && oDiff.days === 1) {
                        return (
                            <div>
                                <p>{oDiff.days} day ago</p>
                            </div>
                        )
                    }
                })
                    ()
                }
            </div>
        );

    }


    //notification 
    handleDisplayNotification = async () => {

        const { notificationDisplay, displayImageContainor, profileview } = this.state;

        const header = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }

        await this.setState({
            notificationDisplay: !notificationDisplay,
            displayImageContainor: !displayImageContainor,
            displayLogout: false
        })
        if (profileview.length > 0) {
            var notificationtimestamp = profileview[0].currantDate;
            // console.log(profileview[0]);
            // console.log(notificationtimestamp);
            await Axios.post(config.urlport + `/notification/timestapm`, { notificationtimestamp }, header)
                .then(() => {
                    // this.componentDidMount();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }


    //handlehometab
    handlehometab = () => {

        const { notificationDisplay, displayImageContainor } = this.state;

        this.setState({
            notificationDisplay: !notificationDisplay,
            displayImageContainor: !displayImageContainor,
            displayLogout: false,
            newNotification: false
        })
    }


    swipeUpCoachMarkNext = () => {
        this.setState({
            swipeUpCoachMark: true,
            welcomeCoach: true
        })
    }


    swipeDownCoachMarkNext = () => {
        this.setState({
            swipeDownCoachMark: true,
            welcomeCoach: true,
            swipeUpCoachMark: false
        })
    }


    render() {
        const { name, jobtitle, company, email, phone, profileimagepath, frontEndurl, profilecopymsg, qrcode, qecodescanresult, displayQrcode, coach, usercustomurl,
            displayLogout, qrcodeloader, porfileLoader, notificationDisplay, displayImageContainor, profileview, qrCoderScannerDisplay, profileDisplayContainor, qrCoderGeneratorDisplay,
            notificationtimestamp, newNotification, welcomeCoach, swipeUpCoachMark, swipeDownCoachMark } = this.state;
        var coachdisplay;
        // console.log(profileview);
        if (coach) {
            coachdisplay =
                <div className="popup_coach_mark" id="coachmark" style={{ display: "block" }}>
                    <div className="popup_inner_coach_mark">
                        {
                            (() => {
                                if (welcomeCoach === false) {
                                    return (
                                        <div>
                                            <p className="welcomeCoachmark">Welcome to your Klose Card </p>
                                            <button onClick={this.swipeUpCoachMarkNext} className="welcome_btn">Next</button>

                                        </div>
                                    )
                                }
                                else if (swipeUpCoachMark === true) {
                                    return (
                                        <div>
                                            <img src={coachmarkup} alt={coachmarkup} />
                                            <p className="swipeUpCoachMark">Swipe up to send your Klose </p>
                                            <button onClick={this.swipeDownCoachMarkNext} className="welcome_btn">Next</button>

                                        </div>
                                    )
                                } else if (swipeDownCoachMark === true) {
                                    return (
                                        <div>
                                            <img src={coachmarkdown} alt={coachmarkdown} />
                                            <p className="swipeUpCoachMark">Swipe down to receive your Klose </p>
                                            <button onClick={this.closeCoachMark} className="welcome_btn">Next</button>
                                        </div>
                                    )
                                }
                            })()
                        }
                        {


                            // <div name="Close" className="close_button_coach_mark" onClick={this.closeCoachMark}>
                            //     <div>
                            //         <img src={coachmarkup} alt={coachmarkup} />
                            //     </div>
                            //     <div>
                            //         <p>Swipe up to send your Klose</p>
                            //     </div>
                            //     <div>
                            //         <img src={coachmarkmiddle} alt={coachmarkmiddle} />
                            //     </div>
                            //     <div>
                            //         <p>Swipe down to recieve a Klose</p>
                            //     </div>
                            //     <div>
                            //         <img src={coachmarkdown} alt={coachmarkdown} />
                            //     </div>
                            // </div>
                        }
                    </div>
                </div>
        }
        return (
            <div className="divMediaQuery">
                {porfileLoader === false ? (

                    <div className="loader_klose">
                        <PuffLoader />
                    </div>

                ) : (
                    <div onClick={this.removeCoachmark}>
                        <div>

                            {qrCoderGeneratorDisplay &&
                                <div className="popup_qrcode_parent">
                                    <div className="overlay_qrcode"  ></div>
                                    <div className="popup_qrcode"  >

                                        {qrcodeloader === false ? (
                                            <div className="loader_klose">
                                                <PuffLoader />
                                            </div>
                                        ) : (
                                            <div className="popup_inner_qrcode">
                                                <div name="Close" className="s3-btn-close_qrcode" onClick={this.popupCloseQrGenerator}  >
                                                    <span><img src={bcak1} alt='bcak1' /></span>
                                                </div>

                                                <div className="profileqrcodedisplay_qrcode">
                                                    <h1>Send my Card</h1>
                                                    <div className="popup_qrcode_parent1_data">
                                                        <div className="popup_qrcode_parent_data">
                                                        </div>
                                                        <div className="popup_qrcode_data">
                                                            <img className="rqcodeimage" src={qrcode} alt="qrcode" />
                                                            <div className="share_onclick">
                                                                <p onClick={this.handleCopyUrl} >klose.xyz/{usercustomurl} <img className='image' src={share} alt={share} /></p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {this.state.showCopyurl === true ? (
                                                        <div className="msgtext" >
                                                            <p>  {profilecopymsg}</p>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                        </div>
                                                    )
                                                    }
                                                    <h2 onClick={this.shareProfile}><img src={share2} alt='ds' /> Share</h2>
                                                </div>

                                            </div>
                                        )
                                        }
                                    </div>
                                </div>
                            }


                            {coachdisplay}


                            {qrCoderScannerDisplay &&
                                <div className="popup_qrcode_sacnner_parent">
                                    {this.state.scananimationshow === false ? (
                                        <div>
                                            <div className="overlay_qrscanner" id="overlays" ></div>
                                            <div className="popup_qrscanner" id="popups" >

                                                <div className="s3_btn_close_qrscanner" >
                                                    <img onClick={this.popupCloseQRScanner} src={bcak1} alt='bcak1' />
                                                </div>

                                                <div className="popup_inner_qrscanner">
                                                    <div>
                                                        <section>
                                                            <h1>View a Klose Profile</h1>
                                                            <p>Point your camera towards the QR code to scan.</p>
                                                        </section>

                                                        <div className="camera_qrscanner">
                                                            {displayQrcode === false ? (
                                                                <div></div>
                                                            ) : (
                                                                <QrReader
                                                                    delay={100}
                                                                    onError={this.handleScannerError}
                                                                    onScan={this.handleScan}
                                                                    className='qrcode_scanner'
                                                                />
                                                            )}
                                                        </div>

                                                        <div className="result_qrcodeScanner">
                                                            {
                                                                qecodescanresult === '' ? (
                                                                    <div className="scan_loader">
                                                                        <div className="loader">
                                                                            <ClipLoader
                                                                                color={'#ffffff'}
                                                                                // size={10}
                                                                                // height={10}
                                                                                // width={2}
                                                                                // radius={2}
                                                                                // margin={2}
                                                                                // css={{ display: 'block' }}
                                                                                loading={this.state.scannerloading}
                                                                            />
                                                                        </div>
                                                                        <p>
                                                                            Searching for a QR Code
                                                                         </p>

                                                                    </div>
                                                                ) : (
                                                                    <div className='scan_loader'>
                                                                        <p>
                                                                            {qecodescanresult}
                                                                        </p>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    ) : (
                                        <div>
                                            <div className="container">
                                                <div className="action">

                                                    <div className="trophy">
                                                        <svg fill="#FFD600" width="100%" height="100%" viewBox="0 0 24 24">
                                                            <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
                                                        </svg>
                                                    </div>

                                                    <div className="confetti"></div>
                                                    <div className="confetti two"></div>
                                                    <div className="confetti three"></div>
                                                    <div className="confetti four"></div>
                                                    <div className="confetti--purple"></div>
                                                    <div className="confetti--purple two"></div>
                                                    <div className="confetti--purple three"></div>
                                                    <div className="confetti--purple four"></div>

                                                </div>

                                            </div>
                                        </div>
                                    )}
                                </div>
                            }


                            {notificationDisplay &&
                                <div className="popup_display_notification">
                                    {profileview.length === 0 ? (
                                        <div className="no_new_notification_display">
                                            <p className="no_new">No New Notifications</p>
                                            <p className="share_your">Share your Klose Card to get notified every time someone views your details</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <div>
                                                {this.state.newNotification === true ? (

                                                    <p className="new_notification">New Notifications</p>
                                                ) : (
                                                    <div style={{ display: 'none' }} />

                                                )}

                                                {profileview
                                                    .sort((a, b) => {
                                                        return (b.currantDate - a.currantDate)
                                                    })
                                                    .map((Datas, index) => {
                                                        // console.log(Datas);
                                                        return (
                                                            <div key={index}>
                                                                <div>
                                                                    <div>{
                                                                        (() => {
                                                                            if (Datas.currantDate > notificationtimestamp || notificationtimestamp === undefined) {

                                                                                return (

                                                                                    (() => {
                                                                                        if (Datas.username !== null && Datas.username !== undefined) {
                                                                                            return (
                                                                                                <div className="notification_display">
                                                                                                    <img src={view1} alt={'view1'} />
                                                                                                    <div className="notifactiontext">
                                                                                                        <p>Your profile was viewed by <a className="username" href={`${config.kloseurl}${Datas.slug}`}>  {this.convertToTitleCase(Datas.username)}</a></p>
                                                                                                        <div className="time_and_date">  {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            )
                                                                                        } else {
                                                                                            if (Datas.location !== null) {
                                                                                                if (Datas.location.city !== null && Datas.location.city !== undefined) {
                                                                                                    return (
                                                                                                        <div className="notification_display">
                                                                                                            <img src={view1} alt={'view1'} />
                                                                                                            <div className="notifactiontext">

                                                                                                                <p>Your profile was viewed by someone from {Datas.location.city} ,{Datas.location.country}</p>
                                                                                                                <div className="time_and_date">  {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    )
                                                                                                } else if (Datas.location.state !== null && Datas.location.city === null) {
                                                                                                    return (
                                                                                                        <div className="notification_display">
                                                                                                            <img src={view1} alt={'view1'} />
                                                                                                            <div className="notifactiontext">

                                                                                                                <p>Your profile was viewed by someone from {Datas.location.state} ,{Datas.location.country}</p>
                                                                                                                <div className="time_and_date">  {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    )

                                                                                                }
                                                                                            } else {
                                                                                                return (
                                                                                                    <div className="notification_display">
                                                                                                        <img src={view1} alt={'view1'} />
                                                                                                        <div className="notifactiontext">

                                                                                                            <p>Your profile was viewed by someone</p>
                                                                                                            <div className="time_and_date">  {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )

                                                                                            }
                                                                                        }

                                                                                        // if (Datas.location !== null) {
                                                                                        //     if (Datas.username !== null) {
                                                                                        //         return (
                                                                                        //             <div className="notification_display">
                                                                                        //                 <img src={view1} alt={'view1'} />
                                                                                        //                 <div className="notifactiontext">
                                                                                        //                     <p>Your profile was viewed by <a className="username" href={`${config.kloseurl}${Datas.slug}`}>  {this.convertToTitleCase(Datas.username)}</a> </p>
                                                                                        //                     <div className="time_and_date">  {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                        //                 </div>
                                                                                        //             </div>
                                                                                        //         )
                                                                                        //     }
                                                                                        //     // else if (Datas.username !== undefined ) {
                                                                                        //     //     return (
                                                                                        //     //         <div className="notification_display">
                                                                                        //     //             <img src={view1} alt={'view1'} />
                                                                                        //     //             <div className="notifactiontext">
                                                                                        //     //                 <p>Your profile was viewed by <a className="username" href={`${config.kloseurl}${Datas.slug}`}>  {this.convertToTitleCase(Datas.username)}</a></p>
                                                                                        //     //                 <div className="time_and_date">  {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                        //     //             </div>
                                                                                        //     //         </div>
                                                                                        //     //     )
                                                                                        //     // }
                                                                                        //     else if (Datas.location.city !== undefined && Datas.username === undefined) {
                                                                                        //         return (
                                                                                        //             <div className="notification_display">
                                                                                        //                 <img src={view1} alt={'view1'} />
                                                                                        //                 <div className="notifactiontext">

                                                                                        //                     <p>Your profile was viewed by someone from {Datas.location.city} ,{Datas.location.country}</p>
                                                                                        //                     <div className="time_and_date">  {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                        //                 </div>
                                                                                        //             </div>
                                                                                        //         )
                                                                                        //     } else if (Datas.location.state !== undefined && Datas.username === undefined) {
                                                                                        //         return (
                                                                                        //             <div className="notification_display">
                                                                                        //                 <img src={view1} alt={'view1'} />
                                                                                        //                 <div className="notifactiontext">

                                                                                        //                     <p>Your profile was viewed by someone from {Datas.location.state} ,{Datas.location.country}</p>
                                                                                        //                     <div className="time_and_date">  {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                        //                 </div>
                                                                                        //             </div>
                                                                                        //         )
                                                                                        //     }
                                                                                        // } else if (Datas.username !== null && Datas.location === null) {
                                                                                        //     return (
                                                                                        //         <div className="notification_display">
                                                                                        //             <img src={view1} alt={'view1'} />
                                                                                        //             <div className="notifactiontext">
                                                                                        //                 <p> Your profile was viewed by <a className="username" href={`${config.kloseurl}${Datas.slug}`}>  {this.convertToTitleCase(Datas.username)}</a> </p>
                                                                                        //                 <div className="time_and_date">   {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                        //             </div>
                                                                                        //         </div>
                                                                                        //     )
                                                                                        // }
                                                                                        // else if (Datas.username !== null && Datas.location !== null) {
                                                                                        //     return (
                                                                                        //         <div className="notification_display">
                                                                                        //             <img src={view1} alt={'view1'} />
                                                                                        //             <div className="notifactiontext">
                                                                                        //                 <p> Your profile was viewed by <a className="username" href={`${config.kloseurl}${Datas.slug}`}>  {this.convertToTitleCase(Datas.username)}</a> </p>
                                                                                        //                 <div className="time_and_date">   {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                        //             </div>
                                                                                        //         </div>
                                                                                        //     )
                                                                                        // }
                                                                                        // else {
                                                                                        //     return (
                                                                                        //         <div className="notification_display">
                                                                                        //             <img src={view1} alt={'view1'} />
                                                                                        //             <div className="notifactiontext">
                                                                                        //                 <p> Your profile was viewed by someone </p>
                                                                                        //                 <div className="time_and_date">   {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                        //             </div>
                                                                                        //         </div>
                                                                                        //     )
                                                                                        // }
                                                                                    })
                                                                                        ()

                                                                                )
                                                                            }
                                                                        })()
                                                                    }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>

                                            <div>
                                                {this.state.newNotification === true ? (
                                                    <p className="new_notification">Previous Notifications</p>
                                                ) : (
                                                    <div style={{ display: 'none' }} />

                                                )}

                                                {profileview
                                                    .sort((a, b) => {
                                                        return (b.currantDate - a.currantDate)
                                                    })
                                                    .map((Datas, index) => {
                                                        // console.log(Datas);
                                                        return (
                                                            <div key={index}>
                                                                <div>
                                                                    <div>{
                                                                        (() => {
                                                                            if (Datas.currantDate <= notificationtimestamp) {

                                                                                return (
                                                                                    (() => {
                                                                                        // console.log(Datas);
                                                                                        if (Datas.username !== null && Datas.username !== undefined) {
                                                                                            return (
                                                                                                <div className="notification_display">
                                                                                                    <img src={view1} alt={'view1'} />
                                                                                                    <div className="notifactiontext">
                                                                                                        <p>Your profile was viewed by <a className="username" href={`${config.kloseurl}${Datas.slug}`}>  {this.convertToTitleCase(Datas.username)}</a></p>
                                                                                                        <div className="time_and_date">  {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            )
                                                                                        } else {
                                                                                            if (Datas.location !== null) {
                                                                                                if (Datas.location.city !== null && Datas.location.city !== undefined) {
                                                                                                    return (
                                                                                                        <div className="notification_display">
                                                                                                            <img src={view1} alt={'view1'} />
                                                                                                            <div className="notifactiontext">

                                                                                                                <p>Your profile was viewed by someone from {Datas.location.city} ,{Datas.location.country}</p>
                                                                                                                <div className="time_and_date">  {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    )
                                                                                                } else if (Datas.location.state !== null && Datas.location.city === null) {
                                                                                                    return (
                                                                                                        <div className="notification_display">
                                                                                                            <img src={view1} alt={'view1'} />
                                                                                                            <div className="notifactiontext">

                                                                                                                <p>Your profile was viewed by someone from {Datas.location.state} ,{Datas.location.country}</p>
                                                                                                                <div className="time_and_date">  {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    )

                                                                                                }
                                                                                            } else {
                                                                                                return (
                                                                                                    <div className="notification_display">
                                                                                                        <img src={view1} alt={'view1'} />
                                                                                                        <div className="notifactiontext">

                                                                                                            <p>Your profile was viewed by someone</p>
                                                                                                            <div className="time_and_date">  {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )

                                                                                            }
                                                                                        }

                                                                                        // if (Datas.location !== null) {
                                                                                        //     if (Datas.username !== null && Datas.us) {
                                                                                        //         // if (Datas.username.length > 0) {

                                                                                        //         return (
                                                                                        //             <div className="notification_display">
                                                                                        //                 <img src={view1} alt={'view1'} />
                                                                                        //                 <div className="notifactiontext">
                                                                                        //                     <p>Your profile was viewed by.. <a className="username" href={`${config.kloseurl}${Datas.slug}`}>  {this.convertToTitleCase(Datas.username)}</a></p>
                                                                                        //                     <div className="time_and_date">  {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                        //                 </div>
                                                                                        //             </div>
                                                                                        //         )
                                                                                        //         // }
                                                                                        //     }
                                                                                        //     // else if (Datas.username !== undefined && Datas.location.village !== undefined && Datas.location.state !== null) {
                                                                                        //     //     return (
                                                                                        //     //         <div className="notification_display">
                                                                                        //     //             <img src={view1} alt={'view1'} />
                                                                                        //     //             <div className="notifactiontext">
                                                                                        //     //                 <p>Your profile was viewed by <a className="username" href={`${config.kloseurl}${Datas.slug}`}>  {this.convertToTitleCase(Datas.username)}</a> {Datas.location.state},{Datas.location.country}</p>
                                                                                        //     //                 <div className="time_and_date">  {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                        //     //             </div>
                                                                                        //     //         </div>
                                                                                        //     //     )
                                                                                        //     // }
                                                                                        //     else if (Datas.location.city !== null && Datas.username === null) {
                                                                                        //         return (
                                                                                        //             <div className="notification_display">
                                                                                        //                 <img src={view1} alt={'view1'} />
                                                                                        //                 <div className="notifactiontext">

                                                                                        //                     <p>Your profile was viewed by someone from {Datas.location.city} ,{Datas.location.country}</p>
                                                                                        //                     <div className="time_and_date">  {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                        //                 </div>
                                                                                        //             </div>
                                                                                        //         )
                                                                                        //     } else if (Datas.location.state !== null && Datas.username === null) {
                                                                                        //         return (
                                                                                        //             <div className="notification_display">
                                                                                        //                 <img src={view1} alt={'view1'} />
                                                                                        //                 <div className="notifactiontext">

                                                                                        //                     <p>Your profile was viewed by someone from {Datas.location.state} ,{Datas.location.country}</p>
                                                                                        //                     <div className="time_and_date">  {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                        //                 </div>
                                                                                        //             </div>
                                                                                        //         )
                                                                                        //     }
                                                                                        // } else if (Datas.username !== null && Datas.location === null) {
                                                                                        //     return (
                                                                                        //         <div className="notification_display">
                                                                                        //             <img src={view1} alt={'view1'} />
                                                                                        //             <div className="notifactiontext">
                                                                                        //                 <p> Your profile was viewed by <a className="username" href={`${config.kloseurl}${Datas.slug}`}>  {this.convertToTitleCase(Datas.username)}</a> </p>
                                                                                        //                 <div className="time_and_date">   {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                        //             </div>
                                                                                        //         </div>
                                                                                        //     )
                                                                                        // }
                                                                                        // else if (Datas.username !== null && Datas.location !== null) {
                                                                                        //     return (
                                                                                        //         <div className="notification_display">
                                                                                        //             <img src={view1} alt={'view1'} />undefined
                                                                                        //             <div className="notifactiontext">
                                                                                        //                 <p> Your profile was viewed by <a className="username" href={`${config.kloseurl}${Datas.slug}`}>  {this.convertToTitleCase(Datas.username)}</a> </p>
                                                                                        //                 <div className="time_and_date">   {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                        //             </div>
                                                                                        //         </div>
                                                                                        //     )
                                                                                        // }
                                                                                        // else {
                                                                                        //     return (

                                                                                        //         <div className="notification_display">
                                                                                        //             <img src={view1} alt={'view1'} />
                                                                                        //             <div className="notifactiontext">
                                                                                        //                 <p> Your profile was viewed by someone </p>
                                                                                        //                 <div className="time_and_date">   {this.handleTimeStamp(Datas.currantDate)}</div>
                                                                                        //             </div>
                                                                                        //         </div>
                                                                                        //     )
                                                                                        // }
                                                                                    })
                                                                                        ()
                                                                                )
                                                                            }
                                                                        })()
                                                                    }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>

                                        </div>

                                    )}

                                </div>
                            }


                            {displayLogout &&
                                <div className="popup_more">
                                    <div>
                                        <p><img src={contact_us} alt={contact_us} /> Contact Us</p>
                                    </div>

                                    <div onClick={this.handleLogout}>
                                        <p><img src={logout} alt={logout} />Logout</p>
                                    </div>
                                </div>
                            }


                            {profileDisplayContainor &&
                                <div onClick={this.handleLogoutFales} className="profileContainer" id="profile_containor">
                                    <div className="profileConyainerInside">

                                        <div className="profile_user_shape " >
                                            <div className="notification_contect">
                                                <div className="notification_data">
                                                    {notificationDisplay === false ? (

                                                        <img className="notification_image" src={user} alt={'user'} />
                                                    ) : (
                                                        <img onClick={this.handlehometab} className="notification_image" src={user1} alt={'user1'} />
                                                    )
                                                    }
                                                </div>
                                                <div className="notification_data">
                                                    {notificationDisplay === false ? (
                                                        <div onClick={this.handleDisplayNotification}>
                                                            {newNotification === true ? (
                                                                <div>
                                                                    <div className="notification_dot">
                                                                        <p>{this.state.numberofNotification}</p>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div style={{ display: 'none' }} />

                                                            )}
                                                            <img className="notification_image" src={notification1} alt={notification1} />
                                                        </div>
                                                    ) : (
                                                        <img className="notification_image" src={notification} alt={notification} />
                                                    )}
                                                </div>
                                                <div onClick={this.logoutTogleHandle} className="more" >
                                                    <img src={more} alt={more} />
                                                </div>
                                            </div>
                                        </div>
                                        {displayImageContainor &&
                                            <div>

                                                <div className="profileImageParent" >
                                                    <div className="profileImage">
                                                        <TinderCard
                                                            onSwipe={this.onSwipe}
                                                            flickOnSwipe={false}
                                                            // onCardLeftScreen={() => this.onCardLeftScreen('up')}
                                                            preventSwipe={['right', 'left']}
                                                        >
                                                            <div className="img-gradient">

                                                                {profileimagepath ? (
                                                                    <img src={profileimagepath} alt={profileimagepath} />
                                                                ) : (
                                                                    <img src={group} alt={group} />
                                                                )
                                                                }
                                                            </div>

                                                            {this.state.showCopyurl === true ? (
                                                                <div className="copy_url_msg" >
                                                                    <p>  {profilecopymsg}</p>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                </div>
                                                            )
                                                            }

                                                        </TinderCard>

                                                        <div className="profileDatas" >
                                                            <div className="profileName">
                                                                {this.convertToTitleCase(name)}
                                                            </div>

                                                            <div className="profileJob">
                                                                <span>{this.convertToTitleCase(jobtitle)} {this.convertToTitleCase(company)}</span>
                                                            </div>

                                                            <div className="profilePhoneEmail">
                                                                {
                                                                    phone === undefined || phone === '' || phone === null ? (
                                                                        <img style={{ display: "none" }} src={phonesvg} alt={phonesvg} />
                                                                    ) : (
                                                                        <a href={"tel:" + phone}><img src={phonesvg} alt={phonesvg} /></a>
                                                                    )
                                                                }
                                                                {
                                                                    email === undefined || email === null || email === '' ? (
                                                                        <img style={{ display: "none" }} src={emailsvg} alt={emailsvg} />
                                                                    ) : (
                                                                        <a href={"mailto:" + email}><img src={emailsvg} alt={emailsvg} /></a>
                                                                    )
                                                                }
                                                                {
                                                                    phone === undefined || phone === '' || phone === null ? (
                                                                        <img style={{ display: "none" }} src={smssvg} alt={smssvg} />
                                                                    ) : (
                                                                        <a href={'sms:' + phone}><img src={smssvg} alt={smssvg} /></a>
                                                                    )
                                                                }
                                                                {
                                                                    phone === undefined || phone === '' || phone === null ? (
                                                                        <img style={{ display: "none" }} src={whatsappsvg} alt={whatsappsvg} />
                                                                    ) : (
                                                                        <a href={"https://api.whatsapp.com/send?phone=+91" + phone}><img src={whatsappsvg} alt={whatsappsvg} /></a>
                                                                    )
                                                                }
                                                            </div>

                                                            <div className="profilephone" >
                                                                {phone} {email}
                                                            </div>

                                                        </div>

                                                        <div onClick={this.handleClicktogle} style={{ display: 'block' }} className="redirect_profile_main_btn">
                                                            <img src={profilebtn} alt='profilebtn' />
                                                        </div>

                                                        <div className="shareUrlProfiles">
                                                            <div className="shareUrlProfile" >
                                                                {frontEndurl === '' ? (
                                                                    <div></div>
                                                                ) : (
                                                                    <div>
                                                                        <p className="btn" onClick={this.handleCopyUrl} >klose.xyz/{usercustomurl} <img src={share} alt={share} /></p>
                                                                    </div>
                                                                )
                                                                }
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>

                                                <div className="profile_send_recive" >
                                                    <div>
                                                        <div className="profile_send_recive_child">
                                                            <img onClick={this.popupOpenQrGenerator} src={send} alt={send} />
                                                        </div>
                                                        <p>Send</p>
                                                    </div>

                                                    <div>
                                                        <div className="profile_send_recive_child">
                                                            <img onClick={this.popupOpenQRScanner} src={recive} alt={recive} />
                                                        </div>
                                                        <p>Receive</p>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                )
                }
            </div>
        )
    }
}
export default withRouter(profile);