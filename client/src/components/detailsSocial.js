import React, { Component } from 'react'
import Axios from 'axios';
import svg from './assets/klose/group.svg';
import svg1 from './assets/klose/group-3.svg';
import group from './assets/klose/group@2x.png';
import config from './config';
import Cookies from 'js-cookie';
import imageCompression from 'browser-image-compression';
import { PuffLoader } from 'react-spinners';
import './css/detailsSocial.scss';

export class detailsSocial extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            image: null,
            file: null,
            city: '',
            jobtitle: '',
            company: '',
            id: '',
            imagePreviewUrl: '',
            errorname: '',
            errorcity: '',
            errorjob: '',
            errorcompany: '',
            imageError: '',
            invalidimage: '',
            errorimage: '',
            pageloader: false
        }
    }



    async componentDidMount() {

        if (sessionStorage.getItem('mobile') === null) {
            this.props.history.push('/')
        }

        if (Cookies.get('profile') !== undefined) {

            var data = Cookies.get('profile');
            var p = JSON.parse(data)

            this.setState({
                name: p.name,
                image: p.image
            })

        } else {
            console.log("data not available");
        }
    }


    filePrevie = async (e) => {

        e.preventDefault();

        const reader = new FileReader();
        const file = e.target.files[0];

        if (file === undefined) {
            this.setState({
                image: ''
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

        const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }

        const image = await imageCompression(file, options);

        reader.onload = () => {
            this.setState({
                image: image,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }


    handlechange = (e) => {

        e.preventDefault();

        const nam = e.target.name;
        const val = e.target.value;

        this.setState({ [nam]: val, errorname: "", errorcity: '', errorcompany: '', errorjob: '' })
    }


    //handle submit data 
    handleSubmit = async (e) => {

        e.preventDefault();


        const header = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }

        const { name, email, city, jobtitle, company, image } = this.state;

        if (image === '' || image === null || image === undefined) {
            this.setState({ imageError: 'Please add profile photo' })
            return;
        }

        if (name === '') {
            this.setState({ errorname: "Field required" })
            return
        }

        if (/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(name) === false) {
            this.setState({ errorname: "only alphabates" })
            return;
        }

        if (city === '') {
            this.setState({ errorcity: "Field required" })
            return
        }

        if (/^[a-zA-Z0-9\s]*$/.test(jobtitle) === false) {
            this.setState({ errorjob: "only alphanumaric" })
            return;
        }

        if (jobtitle === '') {
            this.setState({ errorjob: "Field required" })
            return
        }

        if (/^[a-zA-Z0-9\s]*$/.test(company) === false) {
            this.setState({ errorcompany: "only alphanumaric" })
            return;
        }

        if (company === '') {
            this.setState({ errorcompany: "Field required" })
            return
        }

        this.setState({ token: localStorage.getItem('token'), pageloader: true })

        const formdata = new FormData();

        formdata.append('image', this.state.image)
        formdata.append('name', name);
        formdata.append('email', email);
        formdata.append('city', city);
        formdata.append('jobtitle', jobtitle);
        formdata.append('company', company);

        await Axios.post(config.urlport + '/socail/profile', formdata, header,)
            .then((data) => {

                localStorage.removeItem('profile')

                this.props.history.push({
                    pathname: "/signup/url"
                });
                this.setState({
                    pageloader: false
                })
            })
            .catch(err => {
                console.log(err);
            })
    }



    render() {

        let { imagePreviewUrl, city, company, errorcity, errorcompany, errorjob, errorname, jobtitle, name, image, errorimage, invalidimage, pageloader } = this.state,
            $imagePreview = null,
            $imagePreviewfb = image;

        if (imagePreviewUrl) {

            $imagePreview = (
                <img
                    src={imagePreviewUrl}
                    alt={imagePreviewUrl}
                />
            );
        } else if ($imagePreviewfb) {

            $imagePreview = (
                <img
                    src={image}
                    alt={image}
                />
            )
        } else {

            $imagePreview = (
                <img
                    src={group}
                    alt={group}
                />
            )
        }

        return (
            <div>
                {pageloader === true ? (

                    <div className="loader_klose">
                        <PuffLoader />
                    </div>
                ) : (
                    <div className="socialdata">

                        <div >
                            <h1 className="displayName">{name}</h1>
                            <p className="wouldyou">
                                Would you like to change anything?
                                Remember, first impressions matter.
                    </p>
                        </div>

                        <form onSubmit={this.handleSubmit}>
                            <div className="image_container">

                                <div className="image_container_child">

                                    <div className='image_previews'>
                                        <label>
                                            <img className="imgEdit" src={svg1} alt={svg1} />
                                            {$imagePreview
                                                //     ? (
                                                //     <div>
                                                //         <img alt={imagePreviewUrl} src={imagePreviewUrl} />
                                                //     </div>
                                                // ) : (
                                                //         <div>
                                                //             <img alt={this.state.image} src={this.state.image} />
                                                //         </div>
                                                //     )
                                            }
                                            <input
                                                type="file"
                                                className="images"
                                                name="image"
                                                accept="image/*"
                                                onChange={this.filePrevie}
                                            />
                                        </label>
                                    </div>
                                    <span className="errormsg"> {errorimage} {invalidimage}</span>
                                </div>

                                <div className="image_container_child">

                                    <div className="socialinputs">

                                        <label>I am </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={this.handlechange}
                                            className="forminput"
                                            placeholder="Name">
                                        </input>
                                    </div>
                                    <span className="errormsg">{errorname}</span>

                                    <div className="socialinputs">
                                        <label>based out of</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={city}
                                            onChange={this.handlechange}
                                            className="forminput"
                                            placeholder="City">
                                        </input>
                                    </div>
                                    <span className="errormsg">{errorcity}</span>

                                </div>

                                <div className="image_container_child">

                                    <div className="socialinputs">
                                        <label>I am the </label>
                                        <input
                                            type="text"
                                            name="jobtitle"
                                            value={jobtitle}
                                            onChange={this.handlechange}
                                            className="forminput"
                                            placeholder="Jobtitle">
                                        </input>
                                    </div>
                                    <span className="errormsg">{errorjob}</span>

                                    <div className="socialinputs">
                                        <label>at</label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={company}
                                            onChange={this.handlechange}
                                            className="forminput"
                                            placeholder="Company">
                                        </input>
                                    </div>
                                    <span className="errormsg">{errorcompany}</span>

                                </div>

                                <button type="submit">
                                    <a href="/profile">
                                        <img src={svg} alt="svg" />
                                    </a>
                                </button>
                            </div>

                        </form>

                    </div>

                )}

            </div>
        )
    }
}


export default detailsSocial;
