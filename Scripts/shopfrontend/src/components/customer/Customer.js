import React, {Component} from 'react'
import BaseContainer from "../BaseContainer"
import PropTypes from 'prop-types';
import InnerCustomer from "./InnerCustomer";

class Customer extends Component  {
    
    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {
        return (
            <BaseContainer>
                <InnerCustomer></InnerCustomer>
            </BaseContainer>
        );
    }

}

export default Customer;