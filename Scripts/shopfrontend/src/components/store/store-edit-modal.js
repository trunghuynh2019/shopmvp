import { Modal, Button } from "react-bootstrap"
import React, { Component } from "react"


class StoreEditModal extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        console.log(props);
        this.state = {
            show: props.show,
            name: props.store.name,
            address: props.store.address,
            id: props.store.id
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.store.name,
            address: nextProps.store.address,
            id: nextProps.store.id
        });
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

    render() {
        var that = this;
        var store = this.props.store;
        return (
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Store</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                        <p>Name: <input name="name" value={this.state.name}  /></p>
                        <input type="hidden" name="id" value={this.state.id}/>
                        <p>Address: <textarea name="address" value={this.state.address}></textarea></p>
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

export default StoreEditModal;