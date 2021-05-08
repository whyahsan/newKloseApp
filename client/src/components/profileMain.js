import React, { Component } from 'react';
// import './css/profile.scss';
import Axios from 'axios';
import config from './config';
import './css/profilemain.scss'
import copy from 'clipboard-copy';
import phonesvg from './assets/klose/phone-1.svg';
import emailsvg from './assets/klose/mail-2.svg';
import whatsappsvg from './assets/klose/whatsapp.svg'
import smssvg from './assets/klose/sms.svg';
import eyes from './assets/klose/eyes.svg';
import draw from './assets/klose/draw.svg';
import colsewin from './assets/klose/group-6.svg';
import share from './assets/klose/copy.svg';
import back from './assets/klose/backqrscan.svg';
import quotation_marks from './assets/klose/quotation-marks.svg';
import video_camera from './assets/klose/video-camera.svg';
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
// import Cookies from 'js-cookie';
import { PuffLoader } from 'react-spinners';

export class profileMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            profileimagepath: '',
            city: '',
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

            showCopyurl: false,
            profilecopymsg: '',
            socialShow: false,
            profileMainLoader: false,

            profileviewcount: '',

        }
    }


    async componentDidMount() {

        const header = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            },
        }

        await Axios.get(`${config.urlport}/userdetails`, header)
            .then(async (data) => {
                // console.log(data.data.data);

                const {
                    name, email, jobtitle, company, summary, profileimagepath, facebook,
                    twitter, linkedin, github, instagram, phone, behance,
                    dribbble, youtube, medium, codeopen, snapchat, tiktok, kid, qrcode,
                    usercustomurl, profileviewcount
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
                    usercustomurl,
                    profileMainLoader: true,
                    profileviewcount,

                })
            })
            .catch((err) => {
                console.log(err);
            })
    }


    //copy profile on click and share 
    handleCopyUrl = (e) => {

        e.preventDefault();

        copy(this.state.frontEndurl)

        this.setState({ showCopyurl: true, profilecopymsg: "Copied" });

        setTimeout(() => {
            this.setState({ showCopyurl: false, profilecopymsg: '' })
        }, 1000)

    }


    //redirect to the user profile page
    handleClicktogle = () => {

        document.getElementById('hye').style.display = "none";

        this.props.history.push({
            pathname: "/"
        });
    }


    handleEditRedirect = () => {
        this.props.history.push({
            pathname: '/edit/profile'
        })
    }


    convertToTitleCase = (str) => {
        if (str !== null && str !== undefined) {

            return str.replace(
                /\w\S*/g,
                function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        }
    }


    openPdfFile = (data) => {
        window.open(data)
    }


    socialDatas = (logo, link) => {

        if (link === undefined || link === '' || link === null) {
            return (
                <div style={{ display: 'none' }}>

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

    numFormatter = (number, decPlaces) => {
        // 2 decimal places => 100, 3 => 1000, etc
        decPlaces = Math.pow(10, decPlaces);

        // Enumerate number abbreviations
        var abbrev = ["k", "m", "b", "t"];

        // Go through the array backwards, so we do the largest first
        for (var i = abbrev.length - 1; i >= 0; i--) {

            // Convert array index to "1000", "1000000", etc
            var size = Math.pow(10, (i + 1) * 3);

            // If the number is bigger or equal do the abbreviation
            if (size <= number) {
                // Here, we multiply by decPlaces, round, and then divide by decPlaces.
                // This gives us nice rounding to a particular decimal place.
                number = Math.round(number * decPlaces / size) / decPlaces;

                // Add the letter for the abbreviation
                number += abbrev[i];

                // We are done... stop
                break;
            }
        }

        return number;
    }
    // formDetails = (logo, data) => {
    //     if (data === undefined || data === '' || data === null) {
    //         return (
    //             <div style={{ display: 'none' }}>

    //             </div>
    //         )
    //     } else {
    //         return (
    //             <div>
    //                 <a href={data}>  <img src={logo} alt={logo} /></a>
    //             </div>
    //         )
    //     }
    // }


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
            profilecopymsg,
            profileMainLoader,
            profileviewcount
        } = this.state;

        return (
            <div>

                {profileMainLoader === false ? (
                    <div className="loader_klose">
                        <PuffLoader />
                    </div>
                ) : (
                    <div className="profileEditContainer_parent">
                        <div className="profileEditContainer">

                            <div className="profileEdit_user_shape " >
                                <div className="backto_profile" >
                                    <img src={back} alt={back} onClick={this.handleClicktogle} />
                                    <p>My Profile</p>
                                </div>

                                <div className="edit_logo_image" onClick={this.handleEditRedirect}>
                                    <img src={draw} alt={draw} />
                                    <p>Edit</p>
                                </div>
                            </div>


                            <div className="profileEditImageParent">
                                <div className="profileEditImage">
                                    <div className="profile_main_view">
                                        <div className="shareUrlProfilemainS">
                                            {frontEndurl === undefined ? (
                                                <div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p className="btn" onClick={this.handleCopyUrl} >klose.xyz/{usercustomurl} <img src={share} alt={share} /></p>
                                                </div>
                                            )
                                            }
                                        </div>
                                        {
                                            profileviewcount === undefined || profileviewcount === null ? (
                                                <div style={{ display: 'none' }} />
                                            ) : (
                                                <div className="profileViewCount">
                                                    <p><img src={eyes} alt='eyes' /> {this.numFormatter(profileviewcount, 2)}</p>
                                                </div>
                                            )
                                        }

                                    </div>



                                    {this.state.showCopyurl === true ? (
                                        <div className="copy_url_msg" style={{ zIndex: '101' }} >
                                            <p>  {profilecopymsg}</p>
                                        </div>
                                    ) : (
                                        <div>

                                        </div>
                                    )
                                    }

                                    <div className="img_gradient_edit">
                                        {profileimagepath ? (
                                            <img src={profileimagepath} alt={profileimagepath} />
                                        ) : (
                                            <img src={emailsvg} alt={emailsvg} />
                                        )
                                        }
                                    </div>

                                    <div className="profileEditDatas">
                                        <div className="profileEditName">
                                            {this.convertToTitleCase(name)}
                                        </div>

                                        <div className="profileEditJob">
                                            <span>{this.convertToTitleCase(jobtitle)}  {this.convertToTitleCase(company)}</span>
                                        </div>

                                        <div className="profileEditPhoneEmail">
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

                                <div className="summary_main_container">
                                    {summary === null || summary === '' || summary === undefined ? (
                                        <div style={{ display: 'none' }} >

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
                                    <img src={colsewin} alt='closewin' id="hye" onClick={this.handleClicktogle} style={{ display: 'block' }} />
                                </div>
                            </div>

                        </div>
                    </div>
                )
                }
            </div>
        )
    }
}

export default profileMain;
