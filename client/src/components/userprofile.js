import React, { Component } from 'react';
import './css/userprofile.scss';
import './css/userprofilemain.scss';
import Axios from 'axios';
import copy from 'clipboard-copy';
import title from './assets/klose/combined-shape.svg';
import phonesvg from './assets/klose/phone-1.svg';
import emailsvg from './assets/klose/mail-2.svg';
import whatsappsvg from './assets/klose/whatsapp.svg'
import smssvg from './assets/klose/sms.svg'
import share2 from './assets/klose/share-2.svg';
// import massenger from './assets/klose/messenger.svg';
import group from './assets/klose/group@2x.png';
import share from './assets/klose/copy.svg';
import quotation_marks from './assets/klose/quotation-marks.svg';
import video_camera from './assets/klose/video-camera.svg';
import colsewin from './assets/klose/group-6.svg';
import facebookIcon from './assets/klose/facebook-2.svg';
import instagramIcon from './assets/klose/instagram.svg';
import twitterIcon from './assets/klose/twitter.svg';
import linkedinIcon from './assets/klose/linkedin-2.svg';
import githubIcon from './assets/klose/github.svg';
import dribbbleIcon from './assets/klose/dribbble.svg';
import behanceIcon from './assets/klose/behance.svg';
import youtubeIcon from './assets/klose/youtube.svg';
import mediumIcon from './assets/klose/medium.svg';
import codeopenIcon from './assets/klose/codeopen.svg';
import snapchatIcon from './assets/klose/snapchat.svg';
import pdf from './assets/klose/pdf.svg';
import profilebtn from './assets/klose/group-5.svg';
import signupbackground from './assets/klose/signupbackground.svg';
import closepopupcontact from './assets/klose/closepopupcontact.svg';
import closeImg from './assets/klose/x-circle.svg';
import config from './config';
// import Cookies from 'js-cookie';

import { PuffLoader } from 'react-spinners';


export class userprofile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            profileimagepath: '',
            jobtitle: '',
            company: '',
            summary: '',
            phone: '' || null,
            facebook: '',
            twitter: '',
            linkedin: '',
            // customurl: '',
            github: '',
            instagram: '',
            dribbble: '',
            behance: '',
            youtube: '',
            medium: '',
            codepen: '',
            snapchat: '',
            tiktok: '',
            url: '',
            frontEndurl: "",
            kloseID: '',
            kid: '',
            usercustomurl: '',

            photo: '',
            phototitle: '',
            photoArray: [],

            pdftitleGet: '',
            pdfArray: [],

            youtubeData: '',
            youtubeembadLinktitle: '',
            youtubeArray: [],

            customlinkarray: [],
            customlinktitle: '',
            customlinkurl: '',

            profilecopymsg: '',
            qrcode: '',
            downloadpopup: false,
            show: false,
            showCopyurl: false,
            showUserprofile: false,

            porfileLoader: false,

            SingupPopup: false,

            leti: '',
            longi: '',
            locationName: undefined,
            geo: false
        }
    }


    async componentDidMount() {

        const id = this.props.match.params.id;
        await Axios.get(`${config.urlport}/publicprofile/${id}`)

            .then(async (data) => {
                // console.log("datas", data.data.data);
                if (data.data.data === null) {
                    this.props.history.push({
                        pathname: '/'
                    })

                } else if (data.data.data.usercustomurl === localStorage.getItem('kurl')) {
                    this.props.history.push({
                        pathname: '/'
                    })

                } else {

                    const { qrcode, usercustomurl, name, email, jobtitle, company, summary, profileimagepath, facebook,
                        twitter, linkedin, github, instagram, phone, behance,
                        dribbble, youtube, medium, codeopen, snapchat, tiktok, kid,
                    } = data.data.data;

                    if (data.data.data.fileattachment[0] !== undefined) {

                        const pdfdatas = data.data.data.fileattachment[0].pdfattachment;
                        let pdftitles = '';
                        pdfdatas.map((datas) => {
                            return pdftitles = datas.pdftitle;
                        })

                        const youtubelink = data.data.data.fileattachment[0].youtubeattachment
                        let youtubedgetdata = ''
                        youtubelink.map((datas) => {
                            return youtubedgetdata = datas.youtubeembadLink
                        })

                        const photodata = data.data.data.fileattachment[0].imageattachment;
                        let photosgetdata = ''
                        photodata.map((datas) => {
                            return photosgetdata = datas.imagepath;
                        })

                        const customlinksdata = data.data.data.fileattachment[0].customlinks;
                        let customtitle = ''
                        customlinksdata.map((datas) => {
                            return customtitle = datas.customlinktitle;
                        })

                        this.setState({
                            pdfArray: pdfdatas,
                            pdftitleGet: pdftitles,
                            youtubeArray: youtubelink,
                            youtubeData: youtubedgetdata,
                            photo: photosgetdata,
                            photoArray: photodata,
                            customlinkarray: customlinksdata,
                            customlinktitle: customtitle,
                        })
                    }

                    this.setState({
                        name,
                        email,
                        jobtitle: `${jobtitle},`,
                        company,
                        summary,
                        profileimagepath,
                        facebook,
                        twitter,
                        linkedin,
                        github,
                        instagram,
                        // customurl: data.data.data.usercustomurl,
                        phone,
                        behance,
                        dribbble,
                        youtube,
                        medium,
                        codepen: codeopen,
                        snapchat,
                        tiktok,
                        frontEndurl: qrcode,
                        url: config.urlport + '/',
                        // xyz: d,
                        kid,
                        // kloseID: kloseLocal,
                        usercustomurl,
                        porfileLoader: true,
                    })
                    const username = localStorage.getItem('kurl');
                    if (username !== id) {

                        if (username === undefined) {

                            await Axios.post(`${config.urlport}/profile/view/count/${id}`)
                            await this.geoloaction();

                        } else {

                            await this.geoloaction();
                            await Axios.post(`${config.urlport}/profile/view/count/${id}`)

                        }
                    }
                    let user = localStorage.getItem('token')
                    if (user === null) {

                        setTimeout(() => {
                            this.setState({
                                SingupPopup: true
                            })
                        }, 2000)
                    }
                    // setTimeout(() => {
                    //     this.setState({
                    //         downloadpopup: true

                    //     })
                    // }, 3000)

                }
            })
            .catch((err) => {
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


    //Copy the URL and past 
    handleCopyUrl = (e) => {

        e.preventDefault();
        copy(this.state.frontEndurl)

        this.setState({ showCopyurl: true, profilecopymsg: "Copied" });

        setTimeout(() => {
            this.setState({ showCopyurl: false, profilecopymsg: '' })
        }, 1000)
    }


    handleCopyUrls = (e) => {

        e.preventDefault();
        copy(this.state.frontEndurl)

        this.setState({ showCopyurl: true, profilecopymsg: "Copied" });
        setTimeout(() => {
            this.setState({ showCopyurl: false, profilecopymsg: '' })
        }, 1000)
    }


    handleSavePopup = () => {

        this.setState({
            downloadpopup: true
        })
    }


    //handle save to contact data
    handleVcard = async () => {

        const id = this.props.match.params.id;

        await Axios.get(config.urlport + "/vcard/" + id)
            .then((data) => {

                if (data.data.data === null) {
                    this.props.history.push({
                        pathname: '/'
                    })
                } else {
                    window.open(config.urlport + '/vcard/' + id)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }


    //handle redirect to home page 
    handleHomePage = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/'
        })
    }


    convertToTitleCase = (str) => {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }


    openPdfFile = (data) => {
        window.open(data)
    }


    handleYoutubeEmbed = (url) => {

        if (url === undefined || url === null || url === '') {
            return (
                <div style={{ display: 'none' }}>
                </div>
            )
        } else {
            // var regExp = /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/;
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            // var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

            var match = url.match(regExp);

            return (match && match[7].length === 11) ? match[7] : false;
            // if (match && match[2].length === 11) {
            //     return match[2];
            // } else {
            //     return 'error';
            // }
        }
    }


    socialDatas = (logo, link) => {

        if (link === undefined || link === '' || link === null) {
            return (
                <div style={{ display: "none" }}>
                </div>
            )
        } else {
            return (
                <div className="social_datas">
                    <a href={link}>  <img src={logo} alt={logo} /></a>
                </div>
            )
        }
    }


    //open profile details from this function
    popupOpen = () => {
        this.setState({
            showUserprofile: true
        })

    }


    //close profile details form this function
    popupClose = () => {
        this.setState({
            showUserprofile: false
        })
    }


    //display profile data
    displayData = () => {
        return (
            <div>
                <div className="share_and_title">

                    <div className='title_img' onClick={this.handleHomePage}>
                        <img className="title" alt="title" src={title}></img>
                    </div>

                    <div className="share_btn" onClick={this.shareProfile}>
                        <h1><img src={share2} alt='ds' /> share</h1>
                    </div>
                </div>
            </div>
        )
    }


    //close singup popup
    closesignuppopup = () => {
        this.setState({
            SingupPopup: false
        })
    }


    //redirect to signup page
    hanlesignupredirect = () => {
        this.props.history.push({
            pathname: '/'
        })
    }


    //geoloaction get position
    geoloaction = async () => {
        if (navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition(this.showPosition, this.handleLocationError)

        } else {
            alert('geolocation is not supported.')
        }
    }


    //show geoloaction position 
    showPosition = async (position) => {

        const id = this.props.match.params.id;

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        var slug = localStorage.getItem('kurl');

        var username = localStorage.getItem('full_name')

        let currantDate = new Date().getTime();

        // console.log(currantDate);
        var userdata = {
            slug,
            username,
            currantDate,
            latitude,
            longitude,
        }
        await Axios.post(`${config.urlport}/geoloaction/api/${id}`, { userdata })

    }


    //handle geoloaction errors 
    handleLocationError = async (error) => {

        const id = this.props.match.params.id;
        var slug = localStorage.getItem('kurl');
        var username = localStorage.getItem('full_name');
        var currantDate = new Date().getTime();
        // console.log(currantDate);
        if (slug !== null) {
            var userdata = {
                slug,
                username,
                currantDate
            }
            await Axios.post(`${config.urlport}/geoloaction/api/${id}`, { userdata })
        }
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                break;
            default:
                alert("An unknown error occurred.")
        }
    }


    //handle close save contact
    closeContactPopup = () => {
        this.setState({
            downloadpopup: false
        })
        this.handleVcard();

    }


    render() {
        const { name, company, jobtitle, facebook, linkedin, github, twitter, instagram,
            dribbble,
            behance,
            youtube,
            medium,
            codepen,
            snapchat,
            frontEndurl,
            phone,
            email,
            profileimagepath,
            summary,

            usercustomurl,
            photo,
            pdftitleGet,
            youtubeData,
            customlinktitle,
            profilecopymsg, showUserprofile,
            porfileLoader,
            SingupPopup,
            downloadpopup
        } = this.state;

        var downloadContact;

        if (downloadpopup === true) {
            downloadContact =
                <div className="popup_Download_Contact" id="coachmark" style={{ display: "block" }}>
                    <div className="popup_inner_coach_mark">
                        <div className="contect_save">
                            <img onClick={this.closeContactPopup} className="closepopupcontact" src={closepopupcontact} alt="closepopupcontact" />
                            <div className="download_contact_card">Downloading Contact Card… </div>
                            <p className="the_download">
                                The download for the contact’s .vcard has started. To access it, check your file browser the download folder.
                            </p>
                            <p className="the_download">Once found, simply open the file and Save it</p>
                            <button onClick={this.closeContactPopup} type='button'>OK</button>
                        </div>
                    </div>
                </div>
        }
        // const { name, jobtitle, company, email, phone, profileimagepath, frontEndurl, profilecopymsg, usercustomurl } = this.state;
        return (
            <div>

                {SingupPopup === true ? (
                    <div className="signup_popup_userprofile" style={{ backgroundImage: `url(${signupbackground})`, width: '100%', height: '114px', backgroundRepeat: 'no-repeat', backgroundSize: "cover", }}>
                        <img onClick={this.closesignuppopup} className="close_image_popup" src={closeImg} alt='closeimage' />
                        <div className="divxx">

                            <p className="signup_text">
                                Experience the fastest way to share
                                your card with anyone, anytime & anywhere
                        </p>
                            <p onClick={this.hanlesignupredirect} className="signup_btn">
                                Sign up
                        </p>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'none' }}>

                    </div>
                )
                }

                {downloadContact}

                {porfileLoader === false ? (

                    <div className="loader_klose">
                        <PuffLoader />
                    </div>

                ) : (
                    <div>
                        {showUserprofile === true ? (

                            <div className="userprofileMainContainer_parent">
                                <div className="profileConyainerInside">
                                    <div className="share_and_title">
                                        <div className='title_img' onClick={this.handleHomePage}>
                                            <img className="title" alt="title" src={title}></img>
                                        </div>

                                        <div className="share_btn" onClick={this.shareProfile}>
                                            <h1><img src={share2} alt='ds' /> Share</h1>
                                        </div>
                                    </div>

                                    <div className="profileImageParent" >
                                        <div className="profileImage">
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

                                            <div className="profileDatas" >
                                                <div className="profileName">
                                                    {this.convertToTitleCase(name)}
                                                </div>
                                                <div className="profileJob">
                                                    <span>{this.convertToTitleCase(jobtitle)}  {this.convertToTitleCase(company)}</span>
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
                                            </div>

                                            <div className="shareUrlProfiles">
                                                <div className="shareUrlProfile" >
                                                    {frontEndurl ? (
                                                        <div onClick={this.handleCopyUrls}>
                                                            <p className="btn"  >klose.xyz/{usercustomurl} <img src={share} alt={share} /></p>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                        </div>
                                                    )
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div className="profile_social_logo">
                                            <div>
                                                {this.socialDatas(facebookIcon, facebook)}
                                            </div>
                                            <div>
                                                {this.socialDatas(githubIcon, github)}
                                            </div>
                                            <div>
                                                {this.socialDatas(twitterIcon, twitter)}
                                            </div>
                                            <div>
                                                {this.socialDatas(linkedinIcon, linkedin)}
                                            </div>
                                            <div>
                                                {this.socialDatas(instagramIcon, instagram)}
                                            </div>
                                            <div>
                                                {this.socialDatas(mediumIcon, medium)}
                                            </div>
                                            <div>
                                                {this.socialDatas(snapchatIcon, snapchat)}
                                            </div>
                                            <div>
                                                {this.socialDatas(behanceIcon, behance)}
                                            </div>
                                            <div>
                                                {this.socialDatas(dribbbleIcon, dribbble)}
                                            </div>
                                            <div>
                                                {this.socialDatas(youtubeIcon, youtube)}
                                            </div>
                                            <div>
                                                {this.socialDatas(codeopenIcon, codepen)}
                                            </div>
                                        </div>

                                        <div>
                                            {summary === '' || summary === undefined || summary === null ? (
                                                <div style={{ display: 'none' }}>
                                                </div>
                                            ) : (
                                                <div className="profile_main_summary">
                                                    <img src={quotation_marks} alt={quotation_marks} />
                                                    <p>{summary}</p>
                                                </div>
                                            )

                                            }
                                        </div>

                                        <div>
                                            {youtubeData === '' || youtubeData === undefined || youtubeData === null ?
                                                (
                                                    <div style={{ display: "none" }}>
                                                    </div>
                                                ) : (
                                                    <div className="youtubelinkcontainar">
                                                        {
                                                            this.state.youtubeArray.map((datas) => {
                                                                return (
                                                                    <div key={datas._id}>
                                                                        <div className='youtube_video_width' >
                                                                            <img src={video_camera} alt={video_camera} />

                                                                            <p>{this.convertToTitleCase(datas.youtubeembadLinktitle)}</p>
                                                                            <div className="video_responsive">

                                                                                <iframe width="420px" height="315px" src={`//www.youtube.com/embed/${this.handleYoutubeEmbed(datas.youtubeembadLink)}`} frameBorder="0" allowFullScreen title={datas.youtubeembadLink}></iframe>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                )
                                            }
                                        </div>

                                        <div >
                                            {customlinktitle === undefined || customlinktitle === null || customlinktitle === '' ?
                                                (
                                                    <div style={{ display: "none" }}>

                                                    </div>
                                                ) : (
                                                    <div className="profileUrl_contener_">

                                                        {
                                                            this.state.customlinkarray.map((items) => {
                                                                return (

                                                                    <a key={items._id} href={items.customlinkurl} className="profile_main_customUrl_btn">
                                                                        <p>
                                                                            {this.convertToTitleCase(items.customlinktitle)}
                                                                        </p>
                                                                    </a>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                )
                                            }
                                        </div>

                                        <div>
                                            {pdftitleGet === '' || pdftitleGet === undefined || pdftitleGet === null ?
                                                (
                                                    <div style={{ display: "none" }}>

                                                    </div>
                                                ) : (
                                                    <div>
                                                        {
                                                            this.state.pdfArray.map((data) => {
                                                                return (
                                                                    <div className="pdffilepreview" onClick={() => this.openPdfFile(data.pdfpath)} key={data._id}>
                                                                        <p><span> <img src={pdf} alt={pdf} /></span> {this.convertToTitleCase(data.pdftitle)} </p>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                )
                                            }
                                        </div>

                                        <div>
                                            {photo === null || photo === undefined || photo === '' ? (
                                                <div style={{ display: 'none' }}>
                                                </div>
                                            ) : (
                                                <div>

                                                    {this.state.photoArray.map((datas) => {
                                                        return (
                                                            <div className="displayarryImage" key={datas._id}>
                                                                <div className="imagedatas">
                                                                    <p>{this.convertToTitleCase(datas.imagetitel)} </p>
                                                                    <img src={datas.imagepath} alt={datas.imagepath} />
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                    }
                                                </div>
                                            )
                                            }
                                        </div>

                                        <div className="profile_redirect_btn">
                                            <img src={colsewin} alt='closewin' onClick={this.popupClose} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="userprofileContainer" >
                                <div className="profileConyainerInside">
                                    <div className="share_and_title">
                                        <div className='title_img' onClick={this.handleHomePage}>
                                            <img className="title" alt="title" src={title}></img>
                                        </div>

                                        <div className="share_btn" onClick={this.shareProfile}>
                                            <h1><img src={share2} alt='ds' /> Share</h1>
                                        </div>
                                    </div>

                                    <div className="profileImageParent" >
                                        <div className="profileImage">
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

                                            <div className="profileDatas" >
                                                <div className="profileName">
                                                    {this.convertToTitleCase(name)}
                                                </div>
                                                <div className="profileJob">
                                                    <span>{this.convertToTitleCase(jobtitle)}  {this.convertToTitleCase(company)}</span>
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
                                            </div>

                                            <div onClick={this.popupOpen} style={{ display: 'block' }} className="redirect_profile_main_btn">
                                                <img src={profilebtn} alt='profilebtn' />
                                            </div>

                                            <div className="shareUrlProfiles">
                                                <div className="shareUrlProfile" >
                                                    {frontEndurl ? (
                                                        <div onClick={this.handleCopyUrl}>
                                                            <p className="btn"  >klose.xyz/{usercustomurl} <img src={share} alt={share} /></p>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                        </div>
                                                    )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div onClick={this.handleSavePopup} className="save_contect">
                                        <button type="button" >Save to Contacts</button>
                                    </div>

                                </div>

                            </div>
                        )
                        }
                    </div>

                )}


            </div>
        )
    }
}

export default userprofile
