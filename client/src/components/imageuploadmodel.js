import React, { Component } from 'react';
import group from './assets/klose/group@2x.png';
import uploadImage from './assets/klose/uploadimage.svg';
import reuploadImage from './assets/klose/reuploadimage.svg';
//import AvatarEditor from "react-avatar-editor";
import Cropper from 'react-easy-crop';
import imageCompression from 'browser-image-compression';
// import Cookies from 'js-cookie';
import config from './config';
import Axios from 'axios';
import { PuffLoader } from 'react-spinners';

const createImage = url =>
    new Promise((resolve, reject) => {

        const image = new Image()

        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', error => reject(error))

        image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
        image.src = url

    })



export default class model extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profileimagepath: '',
            uploadImg: [],
            imagePreviewUrl: '',
            submitImage: false,
            errorimage: '',
            errorfile: '',
            invalidimage: '',
            scale: 1,
            rotate: 0,
            borderRadius: 0,
            preview: null,
            imageloader: false,

            // width: 230,
            // height: 350,
            // border: 50,
            // color: [255, 255, 255, 0.6]

            crop: { x: 0, y: 0 },
            zoom: 1,
            aspect: 9 / 14,
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
                    profileimagepath
                } = data.data.data;

                this.setState({
                    profileimagepath
                })

            })
            .catch((err) => {
                return console.log(err);
            })

    }


    resetImage = () => {
        document.getElementById('change_image')
    }


    //image preview on upload
    imagePreview = async (e) => {

        const reader = new FileReader();
        const file = e.target.files[0];

        if (file === undefined) {
            this.setState({
                uploadImg: ''
            })
            return
        }

        if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            this.setState({ invalidimage: 'Please select valid image.' });
            return false;
        }

        this.setState({
            invalidimage: '',
            errorimage: ''
        })
        // var image = '';

        // if (file.size >= 411960) {

        //     const options = {
        //         maxSizeMB: 0.5,
        //         maxWidthOrHeight: 1920,
        //         useWebWorker: true,
        //     }

        //     image = await imageCompression(file, options);
        //     // console.log('compressedFile instanceof Blob', image instanceof Blob); // true
        //     // console.log(`compressedFile size ${image.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        //     // console.log("image value", image);
        // } else {
        //     image = file
        //     // console.log(image);
        // }

        reader.onloadend = () => {
            this.setState({
                uploadImg: file,
                imagePreviewUrl: reader.result,
            })
        }

        reader.readAsDataURL(file)

    }


    //handle image on upload 
    imageUploadHandle = async (e) => {

        e.preventDefault();

        this.setState({
            imageloader: true
        })

        const header = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            }
        }

        var image = [];

        const { croppedImageUrl } = this.state;

        if (croppedImageUrl === undefined) {
            return window.location.reload();
        }

        if (croppedImageUrl.size >= 411960) {

            const options = {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            }

            image = await imageCompression(croppedImageUrl, options);
            // console.log('compressedFile instanceof Blob', image instanceof Blob); // true
            // console.log(`compressedFile size ${image.size / 1024 / 1024} MB`); // smaller than maxSizeMB
            // console.log("image value", image);

        } else {
            image = croppedImageUrl
        }

        const imageupload = [image]

        const formData = new FormData();



        imageupload.forEach((file) => {
            formData.append("image", file);
        });

        await Axios.post(config.urlport + '/imageupload', formData, header,)
            .then((data) => {

                window.location.reload();

                this.setState({
                    imageloader: false
                })

            })
            .catch(err => {
                return console.log(err);
            })
    }


    onCropChange = crop => {
        this.setState({ crop })
    }


    onCropComplete = (croppedArea, croppedAreaPixels) => {
        this.makeclickCrop(croppedAreaPixels)
    }


    async makeclickCrop(croppedAreaPixels) {

        const croppedImageUrl = await this.getCroppedImage(
            this.state.imagePreviewUrl,
            croppedAreaPixels,
            'kloseimage'
        )

        this.setState({
            croppedImageUrl
        })

    }


    getCroppedImage = async (imageSrc, crop, name) => {

        const canvas = document.createElement('canvas')
        const image = await createImage(imageSrc);

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = crop.width;
        canvas.height = crop.height;

        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        // const canvas = document.createElement('canvas')
        // const ctx = canvas.getContext('2d')

        // const maxSize = Math.max(image.width, image.height)
        // const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

        // // set each dimensions to double largest dimension to allow for a safe area for the
        // // image to rotate in without being clipped by canvas context
        // canvas.width = safeArea
        // canvas.height = safeArea

        // // translate canvas context to a central location on image to allow rotating around the center.
        // // ctx.translate(safeArea / 2, safeArea / 2)
        // // // ctx.rotate(getRadianAngle(rotation))
        // // ctx.translate(-safeArea / 2, -safeArea / 2)

        // // draw rotated image and store data.
        // ctx.drawImage(
        //     image,
        //     safeArea / 2 - image.width * 0.5,
        //     safeArea / 2 - image.height * 0.5
        // )
        // const data = ctx.getImageData(0, 0, safeArea, safeArea)

        // // set canvas width to final desired crop size - this will clear existing context
        // canvas.width = pixelCrop.width
        // canvas.height = pixelCrop.height

        // // paste generated rotate image with correct offsets for x,y crop values.
        // ctx.putImageData(
        //     data,
        //     Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
        //     Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
        // )

        return new Promise(resolve => {
            canvas.toBlob(file => {
                // console.log(file);
                file.name = name
                resolve(file)
            }, 'image/jpeg')
        })

    }


    // cropimage = async () => {
    //     const img = this.editor.getImageScaledToCanvas().toDataURL();
    //     const image = await createImage(img)

    //     // console.log(image);
    //     const canvas = document.createElement('canvas');

    //     canvas.width = this.state.width * 5;
    //     canvas.height = this.state.height * 5;

    //     var ctx = canvas.getContext('2d');
    //     ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    //     // console.log(canvas.width);

    //     return new Promise(resolve => {
    //         canvas.toBlob(file => {
    //             // console.log(file);
    //             file.name = 'kloseimage'
    //             resolve(file)
    //         }, 'image/jpeg')
    //     })

    //     // canvas.toBlob(onsuccess => {
    //     //     // console.log(onsuccess);
    //     //     // this.setState({
    //     //     //     croppedImageUrl: onsuccess
    //     //     // })
    //     // });

    //     // console.log(img);
    // }


    // setEditorRef = editor => {
    //     if (editor) {
    //         this.editor = editor;

    //     }
    // };

    // handlePositionChange = position => {
    //     // console.log(position);
    //     this.setState({ position });
    //     // console.log(position);
    // };

    // imageChange = async () => {

    //     const croppedImageUrl = await this.cropimage();
    //     this.setState({
    //         croppedImageUrl
    //     })
    //     // console.log(croppedImageUrl);
    //     // console.log('imagecnhage');
    // };

    // onLoadSuccess = async (e) => {

    //     const croppedImageUrl = await this.cropimage();
    //     this.setState({
    //         croppedImageUrl
    //     })
    //     // console.log('onload');
    // };


    render() {

        let { imagePreviewUrl, profileimagepath,
            errorimage, invalidimage, imageloader,
            crop, zoom, aspect
            // width, height, scale, border, color
        } = this.state;

        const styles = {
            // padding: '0',
            position: 'absolute',
            top: '140px',
            left: '25px',
            bottom: '0',
            right: '25px',
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: 'black',
            boxShadow: '0 4px 5px 0 rgba(0, 0, 0, 0.5)',
            borderRadius: '10px',
            // width: '100%',
            height: '400px',
        }

        const mediaStyle = {
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            // objectFit: 'contain',
            // width: '100%',
            // objectFit: 'cover',
            // padding: '30px 0',
            // height: 'auto',
            // position: 'absolute',
            // top: '0',
            // left: '0',
            // bottom: '0',
            // right: '0',
        }

        const cropStyle = {
            // objectFit: 'cover',
            // width: '100%',
            // height: '400px'
        }

        return (

            <div>

                {imageloader === true ? (
                    <div className="loader_klose">
                        <PuffLoader />
                    </div>
                ) : (
                    <div>
                        <div className="profileqrcodedisplay">

                            <div className="imagePreviewEdits" >
                                {
                                    (() => {
                                        if (imagePreviewUrl) {
                                            return (
                                                <div className="app">
                                                    <Cropper
                                                        image={imagePreviewUrl}
                                                        crop={crop}
                                                        zoom={zoom}
                                                        aspect={aspect}
                                                        onCropChange={this.onCropChange}
                                                        onCropComplete={this.onCropComplete}
                                                        // onZoomChange={this.onZoomChange}
                                                        style={{ containerStyle: styles, mediaStyle: mediaStyle, cropAreaStyle: cropStyle }}
                                                    />
                                                    {
                                                        // <div className="crop_container">

                                                        // <AvatarEditor
                                                        // ref={(ref) => this.setEditorRef(ref)}
                                                        // scale={parseFloat(scale)}
                                                        // width={width}
                                                        // height={height}
                                                        // position={this.state.position}
                                                        // onPositionChange={this.handlePositionChange}

                                                        // // borderRadius={55}
                                                        // border={border}
                                                        // color={color} // RGBA
                                                        // onImageChange={this.imageChange}
                                                        // image={imagePreviewUrl}
                                                        // onLoadSuccess={this.onLoadSuccess}

                                                        // />
                                                        // </div>
                                                    }
                                                </div>
                                            )
                                        } else if (profileimagepath) {

                                            return (
                                                <div>
                                                    <img className="imgs" src={profileimagepath} alt={profileimagepath} />
                                                </div>
                                            )

                                        } else {

                                            return (
                                                <div className="imgsss">
                                                    <img className="imgs" src={group} alt={group} />
                                                </div>
                                            )

                                        }
                                    })
                                        ()
                                }

                            </div>
                            <span className="errormsg"> {errorimage} {invalidimage}</span>
                        </div>

                        <div className="save_edit_button">

                            <div>
                                <button type="button" onClick={this.imageUploadHandle}><img src={uploadImage} alt={uploadImage} /></button>
                                <p>Save Changes</p>
                            </div>

                            <div>
                                <label ><img src={reuploadImage} alt={reuploadImage} />
                                    <input
                                        type="file"
                                        id='change_image'
                                        className="editimages"
                                        accept="image/*"
                                        name="profileimagepath"
                                        onChange={this.imagePreview}
                                    />
                                </label>
                                <p>Re-Upload</p>
                            </div>

                        </div>

                    </div>
                )
                }
            </div>
        )
    }
}


