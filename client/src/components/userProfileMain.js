import React, { Component } from 'react';

import Axios from 'axios';
import './css/userprofilemain.scss';
import copy from 'clipboard-copy';
import title from './assets/klose/combined-shape.svg';
import share2 from './assets/klose/share-2.svg';
import phonesvg from './assets/klose/phone-1.svg';
import emailsvg from './assets/klose/mail-2.svg';
import whatsappsvg from './assets/klose/whatsapp.svg'
import smssvg from './assets/klose/sms.svg';
// import massenger from './assets/klose/messenger.svg';
import colsewin from './assets/klose/group-6.svg';
import share from './assets/klose/copy.svg';
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
import config from './config';
import pdf from './assets/klose/pdf.svg';


export class userProfileMain extends Component {
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
            codeopen: '',
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
            youtubeArray: [],

            customlinkarray: [],
            customlinktitle: '',
            customlinkurl: '',

        }
    }

    async componentDidMount() {

        const id = this.props.match.params.id;
        await Axios.get(`${config.urlport}/publicprofile/${id}`)

            .then(async (data) => {
                const {
                    name, email, jobtitle, company, summary, profileimagepath, facebook,
                    twitter, linkedin, github, instagram, phone, behance,
                    dribbble, youtube, medium, codeopen, snapchat, tiktok, kid, qrcode,
                    usercustomurl,
                } = data.data.data;

                if (data.data.data.fileattachment[0] !== undefined) {
                    const pdfdatas = data.data.data.fileattachment[0].pdfattachment;
                    // const pdfdatas = 'ahsan';
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
                        // console.log(datas);
                        return photosgetdata = datas.imagepath;
                    })
                    const customlinksdata = data.data.data.fileattachment[0].customlinks;
                    let customtitle = ''
                    customlinksdata.map((datas) => {
                        // console.log(datas);
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
                // console.log("datas", data);
                var d = data.data.data.qrlinks;
                this.setState({
                    name,
                    email,
                    jobtitle,
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
                    codeopen,
                    snapchat,
                    tiktok,
                    frontEndurl: qrcode,
                    url: config.urlport + '/',
                    // xyz: d,
                    kid,
                    // kloseID: kloseLocal,
                    usercustomurl,

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
        document.getElementById('copyurl').style.display = 'block';
        this.setState({ msg: "Profile Copyed" });
        setTimeout(() => {
            this.setState({ msg: '' })
        }, 1000)
    }

    //redirect to the user profile page
    handleClicktogle = () => {
        document.getElementById('hye').style.display = "none";

        const id = this.state.usercustomurl;
        this.props.history.push({
            pathname: "/pro/" + id
        });
    }

    //copy profile on click and share 
    shareProfile = () => {
        localStorage.removeItem('coach');
        if (navigator.share) {
            navigator.share({
                title: 'web.dev',
                text: 'klose profile',
                url: 'https://klose.xyz/' + this.state.usercustomurl,
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            console.log("error");
        }
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


    socialDatas = (logo, link) => {

        if (link === undefined || link === '' || link === null) {
            return (
                <div style={{ display: "none" }}>
                </div>
            )
        } else {
            return (
                <div>
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
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);

            if (match && match[2].length === 11) {
                return match[2];
            } else {
                return 'error';
            }
        }
    }
    render() {

        const { name, company, jobtitle, facebook, linkedin, github, twitter, instagram,
            dribbble,
            behance,
            youtube,
            medium,
            codeopen,
            snapchat,
            frontEndurl,
            phone,
            email,
            profileimagepath,
            msg,
            summary,
            usercustomurl,
            photo,
            pdftitleGet,
            youtubeData,
            customlinktitle,
        } = this.state;
        return (
            <div className="userprofileMainContainer_parent">

                <div className="profileEditContainer">
                    <div className="share_and_title">
                        <div className='title_img' onClick={this.handleHomePage}>
                            <img className="title" alt="title" src={title}></img>
                        </div>

                        <div className="share_btn" onClick={this.shareProfile}>
                            <h1><img src={share2} alt='ds' /> share</h1>
                        </div>
                    </div>
                    <div className="profileEditImageParent">

                        <div className="profileEditImage">

                            <div className="profile_main_Edit_logo">

                                <div className="shareUrlProfilemainS">
                                    {frontEndurl ? (
                                        <div>
                                            <p className="btn" onClick={this.handleCopyUrl} ><span>{frontEndurl}</span>klose.xyz/{usercustomurl} <img src={share} alt={share} /></p>
                                        </div>
                                    ) : (
                                            <div>
                                            </div>
                                        )
                                    }
                                </div>

                            </div>

                            <div className="copy_url_msg" id="copyurl" style={{ display: 'none ', zIndex: '1' }}>
                                <p>  {msg}</p>
                            </div>

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

                            <div >
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
                                {this.socialDatas(codeopenIcon, codeopen)}
                            </div>
                        </div>
                        {summary === '' || summary === null ? (
                            <div></div>
                        ) : (
                                <div className="profile_main_summary">
                                    <p>{summary}</p>
                                </div>
                            )

                        }
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
                                                        <img style={{ width: '200px', height: '200px' }} src={datas.imagepath} alt={datas.imagepath} />
                                                        <p>{this.convertToTitleCase(datas.imagetitel)} </p>
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
                            {youtubeData === '' || youtubeData === undefined || youtubeData === null ?
                                (
                                    <div style={{ display: "none" }}>
                                    </div>
                                ) : (
                                    <div className="youtubelinkcontainar">
                                        {
                                            this.state.youtubeArray.map((datas) => {
                                                return (
                                                    <div className="video-responsive" key={datas._id}>
                                                        <iframe width="420px" height="315px" src={`//www.youtube.com/embed/${this.handleYoutubeEmbed(datas.youtubeembadLink)}`} frameBorder="0" allowFullScreen title={datas.youtubeembadLink}></iframe>

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
}

export default userProfileMain
