import Axios from 'axios';
import React, { Component } from 'react'
import CustomurlForm from './customurlForm';
import '../components/css/updateCustomUrl.scss'
import DeleteImg from '../components/assets/klose/trash_2.svg'
import config from './config';
// import Cookies from 'js-cookie';
export class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customlinkarray: [],
            customlinktitle: '',
            customlinkurl: '',
            _id: '',
            urlTitleError: '',
            urlNameError: ''

        }
    }


    async componentDidMount() {

        const header = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            },
        }

        await Axios.get(`${config.urlport}/file/get`, header)
            .then(data => {

                if (data.data.data.customlinks[0] !== undefined) {

                    const linkdatas = data.data.data.customlinks
                    let custumlinkurldata = data.data.data.customlinks[0].customlinktitle

                    this.setState({
                        customlinkarray: linkdatas,
                        customlinkurl: custumlinkurldata
                    })
                }

            }).catch(error => {
                return console.log(error);
            })
    }


    //handle delete customurl
    handleDeleteCustumurl = async (_id, customlinkurl) => {

        const header = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        const data = { _id, customlinkurl }

        await Axios.post(`${config.urlport}/file/delete`, data, header)
            .then(data => {

                this.componentDidMount()

                this.setState({
                    customlinkurl: ''
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    //handle update datas
    handleChange = async (e, f, c, u) => {

        let obj = this.state.customlinkarray.find(o => o._id === e);

        if (u === 'customlinktitle') {
            obj.customlinktitle = f;
        }

        if (u === 'customlinkurl') {
            obj.customlinkurl = f
        }

        this.setState({ ...this.state.customlinkarray, urlNameError: '', urlTitleError: '' })
    }
    handleAlart = async (e, f, c, u) => {

        let obj = this.state.customlinkarray.find(o => o._id === e);

        var data;

        const header = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }

        if (u === 'customlinktitle') {

            obj.customlinktitle = f;

            if (f.length === 0) {
                this.setState({
                    urlTitleError: 'Enter Title'
                })
                return;
            }

            if (c.length === 0) {
                this.setState({
                    urlNameError: 'Enter Url'
                })
                return;
            }

            data = {
                customlinktitle: f,
                customlinkurl: c,
                _id: e
            }

            await Axios.post(config.urlport + '/file/update', data, header)
                .then((data) => {
                    this.componentDidMount();
                }).catch((err) => {
                    console.log(err);
                })
        }

        if (u === 'customlinkurl') {

            obj.customlinkurl = f;

            if (c.length === 0) {
                this.setState({
                    urlTitleError: 'Enter Title'
                })
                return;
            }

            if (f.length === 0) {
                this.setState({
                    urlNameError: 'Enter Url'
                })
                return;
            }

            data = {
                customlinktitle: c,
                customlinkurl: f,
                _id: e
            }

            await Axios.post(config.urlport + '/file/update', data, header)
                .then((data) => {
                    this.componentDidMount();
                }).catch((err) => {
                    console.log(err);
                })
        }

        this.setState({ ...this.state.customlinkarray })
    }

    render() {
        const { customlinkurl, urlNameError, urlTitleError } = this.state;
        return (
            <div className="updateCustomUrl_contanor">
                { customlinkurl === undefined || customlinkurl === null || customlinkurl === '' ?
                    (
                        <div style={{ display: "none" }}>

                        </div>
                    ) : (
                        <div>

                            {
                                this.state.customlinkarray.map((items) => {
                                    return (

                                        <div className="updateCustomUrl_forms" key={items._id}>
                                            <form >
                                                <label>Link Title</label>
                                                <input
                                                    type="text"
                                                    name="customlinktitle"
                                                    value={items.customlinktitle}
                                                    onMouseLeave={(e) => this.handleAlart(items._id, e.target.value, items.customlinkurl, 'customlinktitle')}
                                                    onChange={(e) => this.handleChange(items._id, e.target.value, items.customlinkurl, 'customlinktitle')}
                                                    autoComplete='off'
                                                />
                                                <span className="errormsg">{urlTitleError}</span>
                                                <label>Link URL</label>
                                                <input
                                                    type="url"
                                                    name="customlinkurl"
                                                    value={items.customlinkurl}
                                                    onMouseLeave={(e) => this.handleAlart(items._id, e.target.value, items.customlinktitle, 'customlinkurl')}
                                                    onChange={(e) => this.handleChange(items._id, e.target.value, items.customlinktitle, 'customlinkurl')}
                                                    autoComplete='off'
                                                />
                                                <span className="errormsg">{urlNameError}</span>
                                            </form>
                                            <div className="delete_btn">
                                                <button onClick={() => this.handleDeleteCustumurl(items._id, items.customlinkurl)}> <img src={DeleteImg} alt="delete" /></button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )

                }
                <div>
                    <CustomurlForm reload={() => this.componentDidMount()} />
                </div>

            </div>
        )
    }
}

export default TodoList
