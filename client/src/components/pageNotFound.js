import React, { Component } from 'react'
import './css/pageNotFound.scss'

export class pageNotFound extends Component {

    takemHome = () => {
        return this.props.history.push({
            pathname: "/"
        });
    }

    render() {
        return (
            <div className="pageNotFound">
                <p className="page_not_found">Page not Found </p>
                <button onClick={this.takemHome} className="takeMeHome" type="submit"> Take me Home</button>
                <p className="contact_us">Contact us</p>
            </div>
        )
    }
}

export default pageNotFound
