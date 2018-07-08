import { Link } from 'react-router';
import React, {Component} from 'react'
import BaseContainer from '../BaseContainer';
import {getAll, updateProductSold, newProductSold} from "./data";
import {getAll as storeGetAll} from "../store/data";
import {getAll as productGetAll} from "../product/data";
import {getAll as customerGetAll} from "../customer/data";
import {HasIdList} from "../../data/config"
import ProductSoldEditModal from "./product-sold-edit-modal";

class InnerProductSold extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productSolds: [
                
            ],
            customers: [],
            products: [],
            stores: [],
            currentStoreId: "",
            showEditForm: false,
            currentProductSold: {}
        }
        this.openEditPopup = this.openEditPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.saveChange = this.saveChange.bind(this);
    }

    componentDidMount() {
        var that = this;
        getAll().then(
            function(pss) {
                if(pss) {
                    that.setState({productSolds: pss});
                }
            }
        );
        productGetAll().then(function(products) {
            that.setState({products: products});
        });
        customerGetAll().then(function(customers) {
            that.setState({customers: customers});
        });
        storeGetAll().then(function(stores) {
            that.setState({stores: stores});
        });

    }
    openEditPopup(id) {
        console.log(this.findOne(id));
        var that = this;
        this.setState({currentProductSold: this.findOne(id), currentStoreId: id}, function() {
            that.setState({showEditForm: true});
        });
    }

    closePopup() {
        this.setState({currentProductSold: {}, currentStoreId: "", showEditForm: false});
        console.log("close popup");
    }

    upsertProductSold(productSold) {
        var newProductSolds = new HasIdList(this.state.productSolds).upsert(productSold).get();
        this.setState({productSolds: newProductSolds});
    }

    saveChange(changedProductSold) {
        var that = this;
        if(changedProductSold && changedProductSold.id) {
            console.log("save change", changedProductSold);
            updateProductSold(changedProductSold).then(function(item) {
                console.log("return from update", item);
                that.upsertProductSold(item);
            });
        } else {
            console.log("save change", changedProductSold);
            newProductSold(changedProductSold).then(function(item) {
                that.upsertProductSold(item);
            });
        }
        
    }

    findOne(id) {
        return this.state.productSolds.find(elm => elm.id == id);
    }

    render() {
        var storeList = <tr><td colSpan={5}></td></tr>;
        var that = this;
        
        if(this.state.productSolds && this.state.productSolds.length > 0) {
            storeList = this.state.productSolds.map(function(productSold) {
                return (
                    <tr className="item" key={productSold.id}>
                        <th scope="row">{productSold.id}</th>
                        <td>{new HasIdList(that.state.stores).getOneName(productSold.store_id)}</td>
                        <td>{new HasIdList(that.state.products).getOneName(productSold.product_id)}</td>
                        <td>{new HasIdList(that.state.customers).getOneName(productSold.customer_id)}</td>
                        <td>
                            <button type="button" className="btn btn-warning" 
                                onClick={() => that.openEditPopup(productSold.id)}>
                            Edit
                            </button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-danger" 
                                onClick={() => that.openEditPopup(productSold.id)}>
                            Edit
                            </button>
                        </td>
                    </tr>
                );
            });
        }
        return (
            
            <div>
                <ProductSoldEditModal show={this.state.showEditForm} productSold={this.state.currentProductSold} 
                    stores={this.state.stores}
                    products={this.state.products}
                    customers={this.state.customers}
                    parentCallbackClose={this.closePopup}
                    handleCallbackSubmit={this.saveChange}
                    ></ProductSoldEditModal>
                <button type="button" className="btn btn-primary" 
                                onClick={() => that.openEditPopup()}>
                            Add new product sold
                            </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Store</th>
                            <th scope="col">Product</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>{storeList}</tbody>
                </table>
            </div>
        );
    } 
}

class ProductSold extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BaseContainer>
                <InnerProductSold></InnerProductSold>
            </BaseContainer>
        );
    }
}

export default ProductSold;