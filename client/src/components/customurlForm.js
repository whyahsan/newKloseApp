import Axios from 'axios'
import '../components/css/customurlForm.scss';
import React, { Component } from 'react';
import config from './config';
// import Cookies from 'js-cookie';
// import shortid from 'shortid';

export class customurlCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            customlinktitle: '',
            customlinkurldata: '',
            urlTitleError: '',
            urlNameError: ''
        }
    }


    handleChange = (e) => {

        e.preventDefault();

        var nam = e.target.name;
        var val = e.target.value;

        this.setState({ [nam]: val, urlNameError: '', urlTitleError: '' })
    }



    handleSubmit = async (e) => {

        e.preventDefault();
        var customlinkurl;
        const { customlinktitle, customlinkurldata } = this.state;

        if (customlinktitle === '') {
            return this.setState({
                urlTitleError: 'input some value'
            })
        }

        if (customlinkurldata === '') {
            return this.setState({
                urlNameError: 'input some value'
            })
        }


        if (!/^https?:\/\//i.test(customlinkurldata)) {
            customlinkurl = 'http://' + customlinkurldata;
        } else {
            customlinkurl = customlinkurldata
        }


        const header = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }


        var data = { customlinktitle, customlinkurl }

        await Axios.post(`${config.urlport}/file/upload`, data, header)
            .then((data) => {
                this.props.reload()
            }).catch((err) => {
                console.log(err);
            })

        this.setState({
            customlinktitle: '',
            customlinkurldata: ""

        })
    }


    render() {

        const { customlinkurldata, customlinktitle, urlTitleError, urlNameError } = this.state;

        return (
            <div className="cutomurlContainor">

                <form onSubmit={(e) => this.handleSubmit(e)}>

                    <h1>Add a Button</h1>

                    <div className="customurl_label_input" >
                        <label>Give your button a name</label>
                        <input
                            type="text"
                            name="customlinktitle"
                            value={customlinktitle}
                            onChange={this.handleChange}
                            autoComplete='off'
                        />
                        <span className="errormsg">{urlTitleError}</span>
                    </div>

                    <div className="customurl_label_input" >
                        <label>Where does your button point to?</label>
                        <input
                            type="text"
                            name="customlinkurldata"
                            value={customlinkurldata}
                            onChange={this.handleChange}
                            placeholder="https://www.addyoururlhere.com"
                            autoComplete='off'
                        />
                        <span className="errormsg">{urlNameError}</span>
                    </div>

                    {customlinktitle === '' ? (
                        <div style={{ display: 'none' }}>
                        </div>
                    ) : (
                        <div className="button_title_preview">
                            <p>{customlinktitle}</p>
                        </div>
                    )
                    }

                    <div className="addmorebutton">
                        <button type="submit" >Add new link</button>
                    </div>

                </form>

            </div>
        )
    }
}

export default customurlCard
