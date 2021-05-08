import React, { Component } from 'react';
import axios from 'axios';
import './css/customUrl.scss';
import config from './config';
import forword from './assets/klose/group.svg';
// import Cookies from 'js-cookie'
export class customUrls extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usercustomurl: '',
            qrcode: '',
            errormsg: '',
        }
    }

    componentDidMount() {

        if (sessionStorage.getItem('mobile') === null) {
            this.props.history.push('/')
        }
    }


    //handle the change value
    handelChange = (e) => {

        this.setState({
            usercustomurl: e.target.value.toLowerCase(),
            qrcode: "https://klose.xyz/",
            errormsg: '',
        })
    }


    //handle on submit values
    handleSubmit = async (e) => {

        e.preventDefault();

        const id = this.state.usercustomurl;

        var slugsData = ['account', 'user', 'search', 'login', 'register', 'signup', 'url', 'home', 'profile', 'seatting', 'result', 'priceing', 'blog', 'post', 'add', 'message', 'feed', 'notification', 'contact', 'about', 'logout', 'saved', 'friends', 'network', 'kloes', 'groups', 'send', 'recieve', 'group', 'events', 'company', 'shop', 'page', 'explore', 'help', 'topics', 'message', 'delete', 'update', 'upload', 'get', 'post', 'put', 'nearme', 'feed', 'timeline', 'comment', 'like', 'me', 'you', 'us', 'saved', 'why', 'whyventures', 'tagged', 'photo', 'video', 'pdf', 'image', 'jobs', 'work', 'notification', 'activity', 'privacy', 'terms-and-conditions', 'terms', 'conditions', 'safety', 'mobile', 'web', 'tab', 'app', 'ios', 'android', 'iphone']


        const header = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }

        const { usercustomurl } = this.state;



        if (usercustomurl.length === 0) {

            this.setState({
                errormsg: `Please enter a custom URL to proceed.  Hint: It's the URL where people can discover you`,
            })
            return;

        } else if (usercustomurl.length >= 25) {

            this.setState({
                errormsg: 'Custom Domain is too long. Shorter domains are easier to remember'
            })
            return;

        } else if (!usercustomurl.match(/^[a-zA-Z0-9_.]*$/)) {

            this.setState({
                errormsg: 'Custom URL may only contain letters, numbers, underscores ("_") and periods (".")'
            })
            return;
        } else {

            for (var i = 0; i < slugsData.length; i++) {
                if (slugsData[i] === usercustomurl) {
                    this.setState({
                        errormsg: `${usercustomurl} is taken`
                    })
                    return;
                }
            }
        }
        const user = {
            usercustomurl,
            qrcode: this.state.qrcode + id,
        }


        await axios.post(config.urlport + '/customurl', { user }, header)
            .then((data) => {

                localStorage.setItem('coach', 'coach')
                localStorage.setItem('kurl', id)

                if (data.data.usercustomurl) {

                    sessionStorage.removeItem('mobile')
                    this.props.history.push({
                        pathname: "/"
                    });

                } else {
                    this.setState({
                        errormsg: `${usercustomurl} is taken`
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {

        const { usercustomurl, errormsg } = this.state;

        return (
            <div className="customUrlContainor">

                <form onSubmit={this.handleSubmit}>

                    <div className="customUrlChild">

                        <div className="customUrlChild_h1_p">
                            <h1>Choose your Custom URL</h1>
                            <p>The one link for everyone to discover you!</p>
                        </div>

                        <div className="customUrlForm">

                            <div className="customUrlInput">
                                <label>klose.xyz/</label>
                                <input
                                    name="customurl"
                                    value={usercustomurl}
                                    onChange={this.handelChange}
                                    autoComplete='off'
                                />
                            </div>

                            <p>Please note: This cannot be changed after signup</p>

                            <span className="errormsg">{errormsg}</span>

                            <button
                                type="submit">
                                <img src={forword} alt="forword" />
                            </button>

                        </div>

                    </div>

                </form>

            </div>
        )
    }
}

export default customUrls;
