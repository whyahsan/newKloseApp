import React, { Component } from 'react'
import axios from 'axios';
import config from './config';
import './css/signupDetails.scss';
import forword from './assets/klose/group.svg';

import loaction from './assets/klose/location.svg';
import Cookies from 'js-cookie';
export class signupDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            // email: '',
            city: '',
            jobtitle: '',
            company: '',
            errorname: '',
            errorcity: '',
            errorjob: '',
            errorcompany: '',
            // image: null,
            // file: null,

        }
    }


    componentDidMount() {
        if (sessionStorage.getItem('mobile') === null) {
            this.props.history.push('/')
        }

        if (Cookies.get('profile') !== undefined) {

            var data = Cookies.get('profile');
            var userData = JSON.parse(data)

            this.setState({
                name: userData.name,
                // image: userData.image
            })

        }
    }


    //handle on change values
    onChangeValues = (e) => {

        const nam = e.target.name;
        const val = e.target.value;

        this.setState({ [nam]: val, errorname: "", errorcity: '', errorcompany: '', errorjob: '' })
    }

    //handle user form on submit
    handleSubmit = async (e) => {

        e.preventDefault();

        const { name, city, jobtitle, company } = this.state;

        if (name === '') {
            this.setState({ errorname: "Field required" })
            return
        }

        if (/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(this.state.name) === false) {
            this.setState({ errorname: "only alphabates" })
            return;
        }

        if (city === '') {
            this.setState({ errorcity: "Field required" })
            return
        }

        if (/^[a-zA-Z0-9\s]*$/.test(this.state.jobtitle) === false) {
            this.setState({ errorjob: "only alphanumaric" })
            return;
        }

        if (jobtitle === '') {
            this.setState({ errorjob: "Field required" })
            return
        }

        if (/^[a-zA-Z0-9'\s]*$/.test(this.state.company) === false) {
            this.setState({ errorcompany: "only alphanumaric" })
            return;
        }

        if (company === '') {
            this.setState({ errorcompany: "Field required" })
            return
        }

        const header = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }

        const user = {
            name: name,
            city: city,
            jobtitle: jobtitle,
            company: company,
        }

        //submit the user form
        await axios.post(config.urlport + '/forms', { user }, header,)
            .then((data) => {
                // console.log(data);
                this.props.history.push({ pathname: "/signup/addimage" })
            })
    }

    render() {
        return (
            <div className="signup_details_container">
                <form onSubmit={this.handleSubmit}  >
                    <div className="userContainer">
                        <div className="userChildContainer">
                            <div>
                                <label htmlFor="name">Enter your<span> full name</span> </label>
                            </div>

                            <div>
                                <input type='text'
                                    id="name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChangeValues}
                                // onKeyDown={this.thisdata}
                                // placeholder="name"
                                />
                                <span className="errormsg">{this.state.errorname}</span>
                            </div>
                        </div>


                        <div className="userChildContainer">
                            <div >
                                <label htmlFor="city">Where do you live , <span className="userName">{this.state.name}?</span></label>
                            </div>

                            <div className="input_container">
                                <img src={loaction} alt={loaction} className="input_img" />
                                <input type="text"
                                    className="input"
                                    name="city"
                                    value={this.state.city}
                                    onChange={this.onChangeValues}
                                // placeholder="city"
                                />
                            </div>
                            <span className="errormsg">{this.state.errorcity}</span>
                        </div>


                        <div className="userChildContainer">
                            <div>
                                <label htmlFor="jobtitle">What’s your <span>professional title?</span></label>
                            </div>

                            <div>
                                <input type="text"
                                    id="jobtitle"
                                    name="jobtitle"
                                    value={this.state.jobtitle}
                                    onChange={this.onChangeValues}

                                />
                            </div>
                            <span className="errormsg">{this.state.errorjob}</span>
                        </div>

                        <div className="userChildContainer">
                            <div>
                                <label htmlFor="company">Where do you <span>work?</span></label>
                            </div>

                            <div>
                                <input type="text"
                                    id="company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChangeValues}
                                />
                            </div>
                            <span className="errormsg">{this.state.errorcompany}</span>
                        </div>

                        <button
                            className="buttons_submit"
                            type="submit">
                            <img src={forword} alt="forword" />
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default signupDetails;