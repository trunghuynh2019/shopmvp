import React, {Component} from 'react'
import { Link } from 'react-router';
import Loader from './Loader';
import CustomerAdd from "./customer/customer-add-modal";

class BaseContainer extends Component {
    state = {
        loading: false
    }

    constructor(props) {
        super(props);
        this.showLoading = this.showLoading.bind(this);
    }

    showLoading() {
        this.setState({loading: true});
    }

    hideLoading() {
        this.setState({loading: false});
    }

    render() {
        var that = this;
        const childWithProp = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {showLoading: that.showLoading, value: 10});
        });
        
        return (
            <div>
                <Loader loading={this.state.loading} />
                <CustomerAdd show={true} />
                <div className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="/">Application name</a>
                        </div>
                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/customers">Customers</Link></li>
                                <li><Link to="/stores">Stores</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container body-content">
                    <div className="row">
                        <div className="col-md-12" id="main-container">
                            {childWithProp}                         
                        </div>
                    </div>
                    <hr />
                    <footer>
                        <p>© 2018 - My ASP.NET Application</p>
                    </footer>
                </div>
            </div>
        )
    }
}

export default BaseContainer;
