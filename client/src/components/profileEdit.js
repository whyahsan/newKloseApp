import React, { Component } from 'react';

import Axios from 'axios';
import back_edit_btn from './assets/klose/back_edit_btn.svg';
import back_image from './assets/klose/back_image.svg';
import uploadImage from './assets/klose/uploadimage.svg';
import reuploadImage from './assets/klose/reuploadimage.svg';
import tick from './assets/klose/tick-3.svg';
import drop_down from './assets/klose/drop-down.svg';
import './css/profileedit.scss';
import './css/imageuploadmodel.scss';
import UpdateCustomUrl from './updateCustomUrl';
import group from './assets/klose/group@2x.png';
import config from './config';
import imageCompression from 'browser-image-compression';
import pdf from './assets/klose/pdf.svg';
import DeleteImg from '../components/assets/klose/trash_2.svg';
import editimage from './assets/klose/group-3.svg';
import personal_details from './assets/klose/persnaldetails.svg';
import contact_details from './assets/klose/contactdetails.svg';
import socila_details from './assets/klose/socailmedia_details.svg';
import add_file_details from './assets/klose/add_file_details.svg';
import custom_link_details from './assets/klose/custom_link_details.svg';
// import Cookies from 'js-cookie';
// import Cropper from 'react-easy-crop';
//import AvatarEditor from "react-avatar-editor";
import MyModal from './imageuploadmodel';
import { PuffLoader } from 'react-spinners';


// import Resizer from 'react-image-file-resizer';
export class profileEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            profileimagepath: '',

            uploadImg: [],
            file: [],
            city: '',
            jobtitle: '',
            company: '',
            summary: '',
            phone: null,
            facebook: '',
            twitter: '',
            linkedin: '',
            github: '',
            instagram: '',
            dribbble: '',
            behance: '',
            youtube: '',
            usercustomurl: '',
            medium: '',
            codepen: '',
            snapchat: '',
            tiktok: '',
            imagePreviewUrl: '',
            url: '',
            show: false,
            show1: false,
            show2: false,
            show3: false,
            show4: false,
            submitImage: false,
            errorname: '',
            errorcity: '',
            errorjob: '',
            errorcompany: '',
            errorimage: '',
            errorfile: '',
            invalidimage: '',
            _id: '',

            showModal: false,
            profileEditLoader: false,

            photoPreviewUrl: '',
            photo: '',
            phototitle: '',
            photoArray: [],


            pdfFileGet: '',
            pdftitleGet: '',
            pdffilename: '',
            pdffiletitle: '',
            pdfinvalidFile: '',
            pdffilesizeerror: '',
            pdffiletitleerror: '',
            pdfArray: [],

            youtubelink: '',
            youtubeData: '',
            youtubelinkError: '',
            youtubeArray: [],
            youtubeembadLinktitle: '',
            value: 'select',
            photouploadloader: false,

            profileDisplaContainer: true,
            photpuploadDisplay: false,
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
                const {
                    name, email, jobtitle, company, summary, city, profileimagepath, facebook,
                    twitter, linkedin, github, instagram, phone, behance,
                    dribbble, youtube, medium, codeopen, snapchat, tiktok, usercustomurl,
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

                    this.setState({
                        pdfArray: pdfdatas,
                        pdftitleGet: pdftitles,
                        youtubeArray: youtubelink,
                        youtubeData: youtubedgetdata,
                        photo: photosgetdata,
                        photoArray: photodata
                    })
                }

                this.setState({
                    name,
                    city,
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
                    phone,
                    behance,
                    dribbble,
                    youtube,
                    medium,
                    usercustomurl,
                    codepen: codeopen,
                    snapchat,
                    tiktok,
                    url: config.urlport + "/",
                    profileEditLoader: true
                })
            })
            .catch((err) => {
                return console.log(err);
            })

    }


    //first dropdown
    togleDiv1 = () => {
        const { show } = this.state;
        this.setState({ show: !show })
    }


    //second dropdown
    togleDiv2 = () => {
        const { show1 } = this.state;
        this.setState({ show1: !show1 })
    }


    //third dropdown
    togleDiv3 = () => {
        const { show2 } = this.state;
        this.setState({ show2: !show2 })
    }


    //forth dropdown
    togleDiv4 = () => {
        const { show3 } = this.state;
        this.setState({ show3: !show3 })
    }


    //fifth dropdown
    togleDiv5 = () => {
        const { show4 } = this.state;
        this.setState({ show4: !show4 })
    }


    //image upload popup open
    popupOpen = () => {
        document.getElementById("popup").style.display = "block";
        document.getElementById("overlay").style.display = "block";
        document.getElementById("container").style.display = "none";
        document.getElementById('change_image').click()
    }


    //image upload  Popup Close
    popupClose = () => {
        document.getElementById("popup").style.display = "none";
        document.getElementById("overlay").style.display = "none";
        document.getElementById("container").style.display = "block";
        window.location.reload();
    }


    //photo upload popup opne
    photopopupOpen = () => {
        const { profileDisplaContainer } = this.state;
        this.setState({
            profileDisplaContainer: !profileDisplaContainer,
            photpuploadDisplay: true,
        })

    }


    //photo upload popup clsoe
    photopopupClose = () => {

        const { profileDisplaContainer } = this.state;
        this.setState({
            profileDisplaContainer: !profileDisplaContainer,
            photpuploadDisplay: false,
            imagePreviewUrl: ''
        })

    }


    //change the values on type
    handelChange = (e) => {

        const nam = e.target.name;
        const val = e.target.value;

        this.setState({ [nam]: val, errorname: "", errorcity: '', errorcompany: '', errorjob: '', pdffiletitleerror: '' })
    }


    //on click go back to profile
    gobackonClick = () => {
        this.props.history.push({
            pathname: "/account/profile"
        });
    }


    //handle form input on submit
    handleForm = async (e) => {

        e.preventDefault();

        const header = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }

        const { name, email, city, jobtitle, company, phone, summary, facebook, linkedin, twitter, github, instagram, tiktok, snapchat, youtube, medium, behance, dribbble, codepen } = this.state;

        if (name === '') {
            this.setState({ errorname: "Name is required." })
            return
        }

        // if (/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(this.state.name) === false) {
        //     this.setState({ errorname: "only alphabet" })
        //     return;
        // }

        if (city === '') {
            this.setState({ errorcity: "City name required." })
            return
        }

        if (/^[a-zA-Z0-9\s]*$/.test(this.state.jobtitle) === false) {
            this.setState({ errorjob: "Please enter either numbers or letters." })
            return;
        }

        if (jobtitle === '') {
            // console.log("job", this.state.jobtitle);
            this.setState({ errorjob: "Jobtitle required." })
            return
        }

        if (/^[a-zA-Z0-9'\s]*$/.test(this.state.company) === false) {
            this.setState({ errorcompany: "Please enter either numbers or letters." })
            return;
        }

        if (company === '') {
            this.setState({ errorcompany: "Company name required." })
            return
        }

        const user = {
            name, email, city, jobtitle, company, phone, summary, facebook, linkedin, twitter, github, instagram, tiktok, snapchat, youtube, medium, behance, dribbble, codepen
        };

        await Axios.post(config.urlport + '/userprofile', { user }, header,)
            .then((data) => {
                this.props.history.push({
                    pathname: "/account/profile"
                });
            })
            .catch(err => {
                console.log(err);
            })
    }


    //reset image on click
    resetImage = () => {
        document.getElementById('change_image')
    }


    //handle image on upload 
    // imageUploadHandle = async (e) => {
    //     e.preventDefault();
    //     // console.log(e);
    //     const header = {
    //         headers: {
    //             "Authorization": "Bearer " + Cookies.get('token'),
    //             'Content-Type': 'multipart/form-data'
    //         },
    //     }
    //     const imageupload = [this.state.croppedImageUrl]
    //     const formData = new FormData();

    //     if (this.state.uploadImg.length === 0) {
    //         this.setState({
    //             errorimage: 'please upload an image',
    //             invalidimage: ''
    //         })
    //         return;
    //     }
    //     imageupload.forEach((file) => {
    //         formData.append("image", file);
    //         // console.log("files", file);
    //     });


    //     await Axios.post(config.urlport + '/imageupload', formData, header,)
    //         .then((data) => {
    //             this.popupClose();
    //             window.location.reload();
    //             // this.props.history.push({
    //             //     pathname: "/edit/profile"
    //             // });
    //             // console.log("data of image", data);

    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })

    // }

    //handle submit youtube data


    submitYoutubeLink = async () => {

        const { youtubelink } = this.state
        // var regExp = /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/;
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        // var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

        var match = youtubelink.match(regExp);

        if (match && match[7].length === 11) {
            const header = {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }

            const data = {
                youtubeembadlink: youtubelink,
                youtubeembadLinktitle: this.state.youtubeembadLinktitle
            }

            await Axios.post(`${config.urlport}/file/upload`, data, header)
                .then((data) => {
                    this.setState({
                        youtubelink: '',
                        youtubelinkError: '',
                        youtubeembadLinktitle: ''
                    })
                    this.componentDidMount()
                })
                .catch((error) => {
                    console.log("Youtube embed error", error);
                })

            return match[7];

        } else {

            this.setState({
                youtubelinkError: 'The URL you entered is incorrect.'
            })
            return
        }

    }


    //handle delete youtube data
    handleDeleteYoutubelink = async (_id, youtubeembadLink) => {

        const header = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        const data = { _id, youtubeembadLink }

        await Axios.post(`${config.urlport}/file/delete`, data, header)
            .then((data) => {
                this.componentDidMount();
            })
            .catch((err) => {
                console.log(err);
            })
    }


    //handle pdf change
    handlePdfChange = async (e) => {

        const pdffile = e.target.files[0]
        const { pdffiletitle } = this.state

        if (pdffile === undefined || pdffile === null || pdffile === '') {
            this.setState({
                file: '',
            })
            return;
        }

        else if (!pdffile.name.match(/\.(pdf)$/)) {
            this.setState({ pdfinvalidFile: 'Please upload a PDF file.', errorfile: '', pdffilesizeerror: '' });
            return false;
        }

        else if (pdffile.size > 10485760) {
            this.setState({
                pdffilesizeerror: 'Upload a file less then 10 MB.',
                pdfinvalidFile: '',
            })
            return;
        }

        else if (pdffiletitle === "" || pdffiletitle === undefined || pdffiletitle === null) {
            this.setState({
                pdffiletitleerror: 'Please enter title. ',
            })
            return;
        }

        else if (pdffile.length === 0) {
            return (
                this.setState({
                    errorfile: 'Select a file.',
                    pdfinvalidFile: ''
                })
            )
        }

        // else {
        //     this.setState({
        //         pdfinvalidFile: '',
        //         pdffilesizeerror: '',
        //     })
        // }

        this.setState({
            pdfinvalidFile: '',
            file: pdffile,
            pdffilename: pdffile.name,
            // loaded: 0,
            errorfile: '',
            pdffiletitleerror: '',
            pdffiletitle
        })
    }


    //handlePdfSubmit
    handlePdfSubmit = async () => {

        const header = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            },
        }

        const { pdffiletitle, file } = this.state;
        this.setState({
            profileEditLoader: false
        })
        const filedatas = new FormData();

        filedatas.append('file', file)
        filedatas.append('pdftitle', pdffiletitle)

        await Axios.post(config.urlport + '/file/upload', filedatas, header)
            .then((data) => {

                if (data.data.status === 300) {

                    alert('File  Size to Large')

                } else {

                    this.componentDidMount()

                    this.setState({
                        pdffilesizeerror: '',
                        pdfinvalidFile: '',
                        pdffiletitle: '',
                        file: '',
                        profileEditLoader: true,
                        pdffilename: ''
                    })
                }
            })
            .catch((err) => {
                console.log("error", err);
            })
    }


    //handle delete pdf
    handleDeletePdf = async (pdfpath, pdftitle, _id) => {
        // console.log(pdfpath, pdftitle, _id);
        // console.log("file", file, filetitle);
        const header = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        }
        const data = {
            pdfpath,
            pdftitle,
            _id,
        }
        // const id = this.state._id
        await Axios.post(`${config.urlport}/file/delete`, data, header)
            .then(data => {

                this.componentDidMount()
                this.setState({
                    pdffilename: '',
                    filetitle: '',
                    file: '',
                })
                // console.log("delete", data);
            })
            .catch(error => {
                console.log(error);
            })
    }


    //photos preview 
    photoPreview = async (e) => {
        this.photopopupOpen()
        const reader = new FileReader();
        const file = e.target.files[0];
        if (file === undefined) {
            this.setState({
                uploadphoto: ''
            })
            return
        }

        if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            this.setState({ invalidimage: 'Please select a valid image.' });
            return false;
        }

        this.setState({
            invalidimage: '',
            errorimage: '',

        })

        const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }

        const image = await imageCompression(file, options);
        // console.log('compressedFile instanceof Blob', image instanceof Blob); // true
        // console.log(`compressedFile size ${image.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        // console.log("image value", image);

        reader.onloadend = () => {
            this.setState({
                uploadphoto: image,
                photoPreviewUrl: reader.result,
            })
        }

        reader.readAsDataURL(file)

    }


    //submit photo to database
    photoUploadHandle = async (e) => {

        const header = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            },
        }

        const { phototitle, uploadphoto } = this.state

        if (uploadphoto === undefined) {
            this.setState({
                errorimage: 'Select an Image',
                invalidimage: '',

            })
            return;

        }
        else if (!uploadphoto.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            this.setState({ invalidimage: 'Please select a valid image.' });
            return false;
        }

        this.setState({
            photouploadloader: true
        })

        const formData = new FormData();

        formData.append("image", uploadphoto);
        formData.append('phototitle', phototitle)

        await Axios.post(`${config.urlport}/file/upload`, formData, header)
            .then((data) => {
                this.setState({
                    phototitle: '',
                    uploadImage: '',
                    photoPreviewUrl: '',
                    photouploadloader: false
                })
                this.photopopupClose();
                this.componentDidMount();

            })
            .catch(err => {
                console.log(err);
            })

    }


    //handel delete photo
    photoDeleteHandle = async (_id, imagepath, imagetitel) => {

        const header = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }

        const data = { _id, imagepath, imagetitel }

        await Axios.post(`${config.urlport}/file/delete`, data, header)
            .then((data) => {
                this.componentDidMount();
            })
            .catch((err) => {
                console.log(err);
            })
    }


    //convert into title case
    convertToTitleCase = (str) => {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
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


    //drop down on change value
    onchangeDropdown = (e) => {
        this.setState({
            value: e.target.value
        })
    }


    handleSocilaProfile = (data) => {
        window.open(data)
    }


    render() {
        let { profileimagepath, instagram, behance, name, jobtitle, city, codepen, company,
            dribbble, email, errorcompany, errorjob, errorname, facebook, github, linkedin, medium, phone,
            show, show1, show2, show3, show4, snapchat, summary, tiktok, twitter, youtube, errorimage, invalidimage,
            photoPreviewUrl, phototitle, photo, errorfile, pdfinvalidFile, pdffilesizeerror,
            pdffiletitleerror, pdffilename, youtubelink, youtubeData, youtubelinkError, pdffiletitle, pdftitleGet, youtubeembadLinktitle
            , profileEditLoader, photouploadloader, profileDisplaContainer, photpuploadDisplay,
        } = this.state;


        return (
            <div>

                <div>
                    <div className="overlay" id="overlay" style={{ display: "none" }}></div>
                    <div className="popup_imageupload" id="popup" style={{ display: "none" }}>
                        <div className="popup_inner_imageupload">
                            <img name="Close" id="close_btn" className="s3_btn_close" onClick={this.popupClose} src={back_image} alt={back_image} />
                            <div>
                                <MyModal />
                            </div>
                        </div>
                    </div>
                </div>

                {photpuploadDisplay &&
                    <div>

                        <div className="overlay"></div>
                        <div className="popup_imageupload">

                            {photouploadloader === true ? (
                                <div className="loader_klose">
                                    <PuffLoader />
                                </div>
                            ) : (
                                <div className="popup_inner_imageupload">
                                    <img name="Close" className="s3_btn_close" onClick={this.photopopupClose} src={back_image} alt={back_image} />

                                    <div className="profileqrcodedisplay">

                                        <div className="imagePreviewEdits" >
                                            {photoPreviewUrl ?
                                                (
                                                    <div className="photopreview_container">
                                                        <img className="photopreview" src={photoPreviewUrl} alt={photoPreviewUrl} />
                                                    </div>
                                                ) : (
                                                    <div className="photopreview_container">
                                                        <img className="photopreview" src={group} alt={group} />
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <span className="errormsg"> {errorimage} {invalidimage}</span>
                                    </div>

                                    <div className="save_edit_button">
                                        <div>
                                            <button type="button" onClick={this.photoUploadHandle}><img src={uploadImage} alt={uploadImage} /></button>
                                            <p>Save Changes</p>
                                        </div>
                                        <div>
                                            <label><img src={reuploadImage} alt={reuploadImage} />
                                                <input
                                                    type="file"
                                                    className="editimages"
                                                    name="profileimagepath"
                                                    onChange={this.photoPreview}
                                                />
                                            </label>
                                            <p>Re-Upload</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                }

                {profileEditLoader === false ? (
                    <div className="loader_klose">
                        <PuffLoader />
                    </div>
                ) : (
                    <div>
                        {profileDisplaContainer &&
                            <div className="profileeditContaner" id="container">
                                <div className="profileeditContanerChild">

                                    <form onSubmit={this.handleForm}>
                                        <div className="form_contaner">


                                            <div className="save_back_button">
                                                <div className='display_contents'>
                                                    <div className="button_back" onClick={this.gobackonClick}>
                                                        <img src={back_edit_btn} alt='backbtn' />
                                                    </div>
                                                    <div className="editProfile">
                                                        <p>Edit Profile</p>
                                                    </div>

                                                    <div className="save_button">
                                                        <button type="submit"><img src={tick} alt={tick} /> Save</button>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="imageUploadEdit">
                                                <div className="imagePreviewEditChild">
                                                    <div className="preview">
                                                        <img onClick={this.popupOpen} className="editimage" src={editimage} alt={editimage} />
                                                        {profileimagepath ? (
                                                            <div onClick={this.popupOpen}>
                                                                <img className="imagePreviewEdit" src={profileimagepath} alt={profileimagepath} />
                                                            </div>
                                                        ) : (
                                                            <div onClick={this.popupOpen}>
                                                                <img className="imagePreviewEdit" src={group} alt={group} />
                                                            </div>
                                                        )
                                                        }
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="edit_profile_input">
                                                <div className="edit_profile_input_title">
                                                    <div onClick={this.togleDiv1} className="edit_dropdown">
                                                        <div className="dropdown_bar">
                                                            <img className="logoview" src={personal_details} alt="persnoldetails" />
                                                            <p> Personal Details <span className='msg_drop_down'>Update your Name, Professional Job title, Place of work and Bio</span> </p>
                                                        </div>
                                                        <img className="drop_down_btn" src={drop_down} alt={drop_down} />
                                                    </div>
                                                </div>

                                                {show &&
                                                    <div>
                                                        <div className="editprofile_label_input">
                                                            <label>Full Name</label>
                                                            <input type="text"
                                                                className="name"
                                                                name="name"
                                                                value={name || ''}
                                                                autoComplete="off"
                                                                onChange={this.handelChange}
                                                            />
                                                            <span className="errormsg">{errorname}</span>
                                                        </div>

                                                        <div className="editprofile_label_input">
                                                            <label>City</label>
                                                            <input type="text"
                                                                className="name"
                                                                name="city"
                                                                value={city || ''}
                                                                autoComplete="off"
                                                                onChange={this.handelChange}
                                                            />
                                                        </div>

                                                        <div className="editprofile_label_input">
                                                            <label>Job Title</label>
                                                            <input
                                                                type="text"
                                                                className="name"
                                                                name="jobtitle"
                                                                value={jobtitle || ''}
                                                                autoComplete="off"
                                                                onChange={this.handelChange}
                                                            />
                                                            <span className="errormsg">{errorjob}</span>
                                                        </div>

                                                        <div className="editprofile_label_input">
                                                            <label>Company</label>
                                                            <input
                                                                type="text"
                                                                className="name"
                                                                name="company"
                                                                value={company || ''}
                                                                autoComplete="off"
                                                                onChange={this.handelChange}
                                                            />
                                                            <span className="errormsg">{errorcompany}</span>
                                                        </div>

                                                        <div className="editprofile_label_input summary">
                                                            <label >Summary</label>
                                                            <textarea
                                                                type="text"
                                                                name="summary"
                                                                value={summary || ''}
                                                                autoComplete="off"
                                                                onChange={this.handelChange}
                                                            />
                                                        </div>
                                                    </div>
                                                }


                                                <div className="edit_profile_input_title">
                                                    <div onClick={this.togleDiv2} className="edit_dropdown">
                                                        <div className="dropdown_bar">
                                                            <img className="logoview" src={contact_details} alt='contectDetails' />
                                                            <p>Contact Details <span className='msg_drop_down'>Your Phone Number, Email and places where people can contact you</span> </p>
                                                        </div>
                                                        <img className="drop_down_btn" src={drop_down} alt={drop_down} />
                                                    </div>
                                                </div>

                                                {show1 &&
                                                    <div>
                                                        <div className="editprofile_label_input" >
                                                            <label>Phone</label>
                                                            <input
                                                                type="number"
                                                                className="name"
                                                                name="phone"
                                                                value={phone || ''}
                                                                autoComplete="off"
                                                                placeholder="xxxxxxxxxx"
                                                                onChange={this.handelChange}
                                                            />
                                                        </div>

                                                        <div className="editprofile_label_input">
                                                            <label>Email</label>
                                                            <input type="email"
                                                                className="name"
                                                                name="email"
                                                                value={email || ''}
                                                                autoComplete="off"
                                                                placeholder="user@email.com"
                                                                onChange={this.handelChange}
                                                            />
                                                        </div>
                                                    </div>
                                                }


                                                <div className="edit_profile_input_title">
                                                    <div onClick={this.togleDiv3} className="edit_dropdown">
                                                        <div className="dropdown_bar">
                                                            <img className="logoview" src={socila_details} alt="socialDetails" />
                                                            <p>Social Media & Portfolio Links <span className='msg_drop_down'>Add your social media URL’s or connect any custom portfolio link to your page</span></p>
                                                        </div>
                                                        <img className="drop_down_btn" src={drop_down} alt={drop_down} />
                                                    </div>
                                                </div>

                                                {show2 &&
                                                    <div>
                                                        <div className="editprofile_label_input">
                                                            <label>Facebook Profile  <span onClick={() => this.handleSocilaProfile('https://www.facebook.com/')} className="socailancorTag">Visit Facebook &#10140;</span></label>
                                                            <input
                                                                type="url"
                                                                className="name"
                                                                name="facebook"
                                                                value={facebook || ''}
                                                                autoComplete="off"
                                                                placeholder="facebook.com/user"
                                                                onChange={this.handelChange}
                                                            />
                                                        </div>

                                                        <div className="editprofile_label_input">
                                                            <label>linkedIn Profile <span onClick={() => this.handleSocilaProfile('https://www.linkedIn.com/')} className="socailancorTag">Visit LinkedIn &#10140;</span></label>
                                                            <input
                                                                type="url"
                                                                className="name"
                                                                name="linkedin"
                                                                value={linkedin || ''}
                                                                autoComplete="off"
                                                                placeholder="linkedin.com/user"
                                                                onChange={this.handelChange}
                                                            />
                                                        </div>

                                                        <div className="editprofile_label_input">
                                                            <label>Twitter Profile <span onClick={() => this.handleSocilaProfile('https://www.twitter.com/')} className="socailancorTag">Visit Twitter &#10140;</span></label>
                                                            <input
                                                                type="url"
                                                                className="name"
                                                                name="twitter"
                                                                value={twitter || ''}
                                                                autoComplete="off"
                                                                placeholder="twitter.com/user"
                                                                onChange={this.handelChange}
                                                            />
                                                        </div>

                                                        <div className="editprofile_label_input" >
                                                            <label>GitHub <span onClick={() => this.handleSocilaProfile('https://www.github.com/')} className="socailancorTag" >Visit GitHub &#10140;</span> </label>
                                                            <input
                                                                type="url"
                                                                className="name"
                                                                name="github"
                                                                value={github || ''}
                                                                autoComplete="off"
                                                                placeholder="github.com/user"
                                                                onChange={this.handelChange}
                                                            />
                                                        </div>

                                                        <div className="editprofile_label_input">
                                                            <label>Instagram <span onClick={() => this.handleSocilaProfile('https://www.instagram.com/')} className="socailancorTag" >Visit Instagram &#10140;</span></label>
                                                            <input
                                                                type="url"
                                                                className="name"
                                                                name="instagram"
                                                                value={instagram || ''}
                                                                autoComplete="off"
                                                                placeholder="instagram.com/user"
                                                                onChange={this.handelChange}
                                                            />
                                                        </div>

                                                        <div className="editprofile_label_input">
                                                            <label>Dribbble <span onClick={() => this.handleSocilaProfile('https://dribbble.com/')} className="socailancorTag" >Visit Dribbble &#10140;</span></label>
                                                            <input
                                                                type="url"
                                                                className="name"
                                                                name="dribbble"
                                                                value={dribbble || ''}
                                                                autoComplete="off"
                                                                placeholder="behance.net/user"
                                                                onChange={this.handelChange}
                                                            />
                                                        </div>

                                                        <div className="editprofile_label_input">
                                                            <label>Behance <span onClick={() => this.handleSocilaProfile('https://www.behance.net/')} className="socailancorTag" >Visit Behance &#10140;</span></label>
                                                            <input
                                                                type="url"
                                                                className="name"
                                                                name="behance"
                                                                value={behance || ''}
                                                                autoComplete="off"
                                                                placeholder="behance.net/user"
                                                                onChange={this.handelChange}
                                                            />
                                                        </div>

                                                        <div className="editprofile_label_input">
                                                            <label>Youtube <span onClick={() => this.handleSocilaProfile('https://www.youtube.com/')} className="socailancorTag" >Visit Youtube &#10140;</span></label>
                                                            <input
                                                                type="url"
                                                                className="name"
                                                                name="youtube"
                                                                value={youtube || ''}
                                                                autoComplete="off"
                                                                placeholder="youtube.com/user"
                                                                onChange={this.handelChange}
                                                            />
                                                        </div>

                                                        <div className="editprofile_label_input">
                                                            <label>Medium <span onClick={() => this.handleSocilaProfile('https://www.medium.com/')} className="socailancorTag"  >Visit Medium &#10140;</span></label>
                                                            <input
                                                                type="url"
                                                                className="name"
                                                                name="medium"
                                                                value={medium || ''}
                                                                autoComplete="off"
                                                                placeholder="medium.com/user"
                                                                onChange={this.handelChange}
                                                            />
                                                        </div>

                                                        <div className="editprofile_label_input">
                                                            <label>Codepen <span onClick={() => this.handleSocilaProfile('https://codepen.io/')} className="socailancorTag">Visit Codepen &#10140;</span></label>
                                                            <input
                                                                type="url"
                                                                className="name"
                                                                name="codepen"
                                                                value={codepen || ''}
                                                                autoComplete="off"
                                                                placeholder="codepan.com/user"
                                                                onChange={this.handelChange}
                                                            />
                                                        </div>

                                                        <div className="editprofile_label_input">
                                                            <label>Snapchat <span onClick={() => this.handleSocilaProfile('https://www.snapchat.com/')} className="socailancorTag">Visit Snapchat &#10140;</span></label>
                                                            <input
                                                                type="url"
                                                                className="name"
                                                                name="snapchat"
                                                                value={snapchat || ''}
                                                                autoComplete="off"
                                                                placeholder="snapchat.com/user"
                                                                onChange={this.handelChange}
                                                            />
                                                        </div>

                                                        <div className="editprofile_label_input">
                                                            <label>Tiktok <span onClick={() => this.handleSocilaProfile('https://www.tiktok.com/')} className="socailancorTag" >Visit Tiktok &#10140;</span></label>
                                                            <input
                                                                type="url"
                                                                className="name"
                                                                name="tiktok"
                                                                value={tiktok || ''}
                                                                autoComplete="off"
                                                                placeholder="tiktok.com/user"
                                                                onChange={this.handelChange}
                                                            />
                                                        </div>
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                    </form>


                                    <div>
                                        <div className="edit_profile_input_title">
                                            <div onClick={this.togleDiv5} className="edit_dropdown">
                                                <div className="dropdown_bar">
                                                    <img className="logoview" src={add_file_details} alt="add file details" />
                                                    <p>Add a Doc, PDF or a Video <span className='msg_drop_down'>Upload your resume, presentation or video. Anything you want to show off.</span> </p>
                                                </div>
                                                <img className="drop_down_btn" src={drop_down} alt={drop_down} />
                                            </div>
                                        </div>

                                        {show4 &&
                                            <div>
                                                <div className="dropdown_media">
                                                    <label >File Type</label>
                                                    <select className="valueselect" value={this.state.value} onChange={this.onchangeDropdown} >
                                                        <option value="select">Select a File</option>
                                                        <option value="photo" >Image</option>
                                                        <option value="pdf">Pdf</option>
                                                        <option value="video">Video</option>
                                                    </select>

                                                </div>
                                                {
                                                    (() => {
                                                        if (this.state.value === 'pdf') {
                                                            return (
                                                                <div>
                                                                    <div className="editprofile_label_input" >
                                                                        <label>File Name</label>
                                                                        <input
                                                                            type="text"
                                                                            className="file"
                                                                            name="pdffiletitle"
                                                                            value={pdffiletitle}
                                                                            autoComplete="off"
                                                                            placeholder="For Example: My Resume"
                                                                            onChange={this.handelChange}
                                                                        />
                                                                        <span className="errormsg">{pdffiletitleerror}</span>
                                                                    </div>
                                                                    <div className="editprofile_label_input" >
                                                                        <div className="uploadfile">
                                                                            <label className="labelfileupload">Upload File</label>
                                                                            <div className="labelfileupload_div">
                                                                                <p>{pdffilename}</p>
                                                                                <label className="upload"><span>Upload</span>
                                                                                    <input
                                                                                        type="file"
                                                                                        // className="file"
                                                                                        value=""
                                                                                        accept="application/pdf"
                                                                                        name="file"
                                                                                        autoComplete="off"
                                                                                        onChange={this.handlePdfChange}
                                                                                    />
                                                                                </label>
                                                                            </div>
                                                                            <span className="errormsg">{errorfile}{pdfinvalidFile}{pdffilesizeerror}</span>
                                                                            <div onClick={this.handlePdfSubmit} className="save_media_button">
                                                                                <button type="submit">Save</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        } else if (this.state.value === 'video') {
                                                            return (
                                                                <div>
                                                                    <div className="editprofile_label_input" >
                                                                        <label>Caption the Video(Option)</label>
                                                                        <input
                                                                            type="text"
                                                                            name="youtubeembadLinktitle"
                                                                            value={youtubeembadLinktitle}
                                                                            autoComplete="off"
                                                                            onChange={this.handelChange}
                                                                        />
                                                                    </div>
                                                                    <div className="editprofile_label_input" >
                                                                        <div className="youtebelinkdata">
                                                                            <label>Youtube link</label>
                                                                            <input
                                                                                type="url"
                                                                                name="youtubelink"
                                                                                value={youtubelink}
                                                                                autoComplete="off"
                                                                                onChange={this.handelChange}
                                                                            // onMouseLeave={(e) => this.submitYoutubeLink(e.target.value)}
                                                                            />
                                                                            <span className="errormsg">{youtubelinkError}</span>
                                                                            <div className="save_media_button">
                                                                                <button onClick={this.submitYoutubeLink} type="submit">save</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        } else if (this.state.value === 'photo') {
                                                            return (
                                                                <div>
                                                                    <div className="editprofile_label_input" >
                                                                        <label>Caption your Image (Optional) </label>
                                                                        <input
                                                                            type="text"
                                                                            className="file"
                                                                            name="phototitle"
                                                                            value={phototitle}
                                                                            autoComplete="off"
                                                                            onChange={this.handelChange}
                                                                        />
                                                                    </div>
                                                                    <div className="uploadphoto" >
                                                                        <label>Upload Images
                                                                            <input
                                                                                type="file"
                                                                                // className="file"
                                                                                value=""
                                                                                accept="image/*"
                                                                                name="uploadphoto"
                                                                                autoComplete="off"
                                                                                onChange={this.photoPreview}
                                                                            />
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                        ()
                                                }


                                                <div className="add_file_data">
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
                                                                                <div className="pdffilepreview" key={data._id}>
                                                                                    <p><span> <img src={pdf} alt={pdf} /></span> {this.convertToTitleCase(data.pdftitle)} </p>
                                                                                    <img className="deletedata" onClick={() => this.handleDeletePdf(data.pdfpath, data.pdftitle, data._id)} src={DeleteImg} alt={DeleteImg} />
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
                                                            <div className="photoarray_display">
                                                                {this.state.photoArray.map((datas) => {
                                                                    return (

                                                                        <div className="displayarryImage" key={datas._id}>
                                                                            <p>{this.convertToTitleCase(datas.imagetitel)}   <img className="deletedata" onClick={() => this.photoDeleteHandle(datas._id, datas.imagepath, datas.imagetitel)} src={DeleteImg} alt={DeleteImg} /></p>
                                                                            <div className="imagedatas">

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
                                                                                        <p>{this.convertToTitleCase(datas.youtubeembadLinktitle)}   <img onClick={() => this.handleDeleteYoutubelink(datas._id, datas.youtubeembadLink)} className="deletedata" src={DeleteImg} alt={DeleteImg} /></p>
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
                                                </div>
                                            </div>
                                        }


                                        <div className="edit_profile_input_title">
                                            <div onClick={this.togleDiv4} className="edit_dropdown">
                                                <div className="dropdown_bar">
                                                    <img className="logoview" src={custom_link_details} alt='customLinkdetaila' />
                                                    <p>Add a Button <span className='msg_drop_down'>Link your portfolio, payment link, website. Literally, just anything or anywhere on the web!</span></p>
                                                </div>
                                                <img className="drop_down_btn" src={drop_down} alt={drop_down} />
                                            </div>
                                        </div>

                                        {show3 &&
                                            <div>
                                                <UpdateCustomUrl />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                )
                }
            </div>
        )
    }
}
export default profileEdit;
