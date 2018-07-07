import { Link } from 'react-router';
import React, {Component} from 'react'
import CustomerAddModal from "./customer-add-modal"

class InnerCustomer extends Component {
    
    constructor(props) {
        super(props);
        // available funciton showLoading from parent container
    }

    render() {
        return (
            <div>
                <CustomerAddModal></CustomerAddModal>
                <a onClick={this.props.showLoading}></a>
            </div>
        );
    }
}

export default InnerCustomer;