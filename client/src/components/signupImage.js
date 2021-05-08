import React, { Component } from 'react'
import axios from 'axios';

import './css/signupimage.scss';
import './css/imageuploadmodel.scss';
import Cookies from 'js-cookie';
import MyModal from './imageuploadmodel';

import svg from './assets/klose/group.svg';
import svg1 from './assets/klose/group-3.svg';
import group from './assets/klose/group@2x.png';
import config from './config';
import back_image from './assets/klose/back_image.svg';
class signupImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileimagepath: '',
            imagePreviewUrl: '',
            socialImage: '',
            imageError: '',
            invalidimage: '',
            showModal: false
        };
    }


    async componentDidMount() {

        if (sessionStorage.getItem('mobile') === null) {
            this.props.history.push('/')
        }

        if (Cookies.get('profile') !== undefined) {

            var data = Cookies.get('profile');
            var userData = JSON.parse(data)

            this.setState({
                socialImage: userData.image
            })

        }


        const header = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            },
        }

        await axios.get(`${config.urlport}/userdetails`, header)

            .then(async (data) => {
                const {
                    profileimagepath
                } = data.data.data;


                if (profileimagepath !== undefined) {

                    Cookies.remove('profile')
                    this.setState({
                        profileimagepath,
                        socialImage: ''

                    })

                }
                // console.log(this.state.profileimagepath);
            })
            .catch((err) => {
                return console.log(err);
            })

    }


    //handle submit on image
    _handleSubmit = async (e) => {

        const { profileimagepath, socialImage } = this.state;

        if (socialImage.length !== 0) {
            const header = {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }

            var image = socialImage
            await axios.post(config.urlport + '/social/imageupload', { image }, header)
                .then((data) => {
                    Cookies.remove('profile')
                    this.props.history.push({
                        pathname: "/signup/url"
                    });

                })
                .catch(err => {
                    return console.log(err);
                })

        } else {

            if (profileimagepath.length === 0) {

                this.setState({
                    imageError: 'select an image'
                })
                return;

            }
            //  else if (profileimagepath === '') {
            //     this.setState({
            //         imageError: 'select an image'
            //     })
            //     return;

            // }
            else {

                Cookies.remove('profile')
                this.props.history.push({
                    pathname: "/signup/url"
                });
            }
        }
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


    render() {
        let { imagePreviewUrl, imageError, invalidimage, profileimagepath, socialImage } = this.state;

        // let $imagePreview = null;
        // if (imagePreviewUrl) {
        //     $imagePreview = (<img src={imagePreviewUrl} alt={imagePreviewUrl} />);
        // } else {
        //     $imagePreview = (<img src={group} alt={group} />)
        // }

        return (
            <div>
                <div className="overlay" id="overlay" style={{ display: "none" }}></div>
                <div className="popup_imageupload" id="popup" style={{ display: "none" }}>
                    <div className="popup_inner_imageupload">
                        <img name="Close" className="s3_btn_close" onClick={this.popupClose} src={back_image} alt={back_image} />
                        <div className="profileqrcodedisplay">
                            <div className="imagePreviewEdits" >

                                <MyModal msg={imagePreviewUrl} />

                            </div>
                        </div>
                    </div>
                </div>


                <div className="uploadImagecontainer" id="container">
                    <div className="uploadImageChield">

                        <div className="uploadformcontainer">
                            <div className="image_paragraph_h1">
                                <h1>Upload Profile Photo</h1>
                                <p>Add a photo so people can remember you!</p>
                            </div>

                            <div className="upload_container" >
                                <div className="imagePreviews" onClick={this.popupOpen}>
                                    <img className="imgUpload" src={svg1} alt={svg1} />
                                    {

                                        (() => {
                                            if (imagePreviewUrl !== '') {

                                                return (
                                                    <div className="imageupload">
                                                        <img src={imagePreviewUrl} alt={imagePreviewUrl} />

                                                    </div>
                                                )
                                            } else if (profileimagepath !== '') {

                                                return (

                                                    <div className="imageupload">
                                                        <img src={profileimagepath} alt={profileimagepath} />
                                                    </div>
                                                )
                                            } else if (socialImage !== '' && profileimagepath === '') {

                                                return (

                                                    <div className="imageupload">
                                                        <img src={socialImage} alt={socialImage} />
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div className="imageupload">
                                                        <img src={group} alt={group} />
                                                    </div>
                                                )
                                            }
                                        })
                                            ()
                                    }

                                </div>
                                <div className="uploadButton">
                                    <button onClick={this._handleSubmit}
                                        type="submit">
                                        <img src={svg} alt="svg" />

                                    </button>
                                </div>
                            </div>
                        </div>
                        <span className="errormsg" >{imageError} {invalidimage}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default signupImage;
