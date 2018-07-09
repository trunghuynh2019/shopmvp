import { Modal, Button } from "react-bootstrap"
import React, { Component } from "react"

class ProductSoldEditModal extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
        this.state = {
            show: props.show,
            store_id: props.productSold ? props.productSold.store_id : "",
            product_id: props.productSold ? props.productSold.product_id : "",
            customer_id: props.productSold ? props.productSold.customer_id: "",
            date_sold: props.productSold ? props.productSold.date_sold: "",
            id: props.productSold ? props.productSold.id : "",
            products: [],
            customers: [],
            stores: []
        };

        console.log(this.state);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.productSold) {
            this.setState({
                id: nextProps.productSold.id,
                date_sold: nextProps.productSold.date_sold,
                product_id: nextProps.productSold.product_id,
                customer_id: nextProps.productSold.customer_id,
                store_id: nextProps.productSold.store_id
            });
        }

        if(nextProps.products) {
            this.setState({
                products: nextProps.products,
                customers: nextProps.customers,
                stores: nextProps.stores
            });
        }
        
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        this.props.handleCallbackSubmit(this.state);      
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleClose() {
        this.props.parentCallbackClose();
    }

    handleShow() {
        this.setState({ show: true });
    }

    renderSelect(hasIdvalues, thisValue, name) {
        var options = hasIdvalues.map(function(x) {
            if(x.id == thisValue) {
                return <option value={x.id} selected>{x.name}</option>
            } else {
                return <option value={x.id}>{x.name}</option> 
            }
            
        });
        return (
            <select name={name}>{options}</select>
        );
    }

    initEmptyProductSold() {
        if(! this.state.date_sold) {
            this.state.date_sold = new Date().toISOString();
        }
        try {
            if(! this.state.customer_id) {
                this.state.customer_id = this.state.customers[0].id;
            }
            if(! this.state.product_id) {
                this.state.product_id = this.state.products[0].id;
            }
            if(! this.state.store_id) {
                this.state.store_id = this.state.stores[0].id;
            }
        } catch (error) {
            
        }
        
    }
    

    render() {
        var that = this;
        // support new action
        this.initEmptyProductSold();
        return (
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Product sold</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                        <p>Stores: {this.renderSelect(this.state.stores, this.state.store_id, 'store_id')}</p>
                        <p>customers: {this.renderSelect(this.state.customers, this.state.customer_id, 'customer_id')}</p>
                        <p>Products: {this.renderSelect(this.state.products, this.state.product_id, 'product_id')}</p>
                        <input type="hidden" name="id" value={this.state.id}/>
                        <p>Date sold: <input name="date_sold" value={this.state.date_sold} /></p>
                        <p><input type="submit" value="Submit" /></p>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ProductSoldEditModal;