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
            showEditForm: true,
            currentStore: {}
        }
        this.openEditPopup = this.openEditPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.saveChange = this.saveChange.bind(this);
    }

    componentDidMount() {
        var that = this;
        getAll().then(
            function(pss) {
                that.setState({productSolds: pss});
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
        this.setState({currentStore: this.findOne(id), currentStoreId: id}, function() {
            that.setState({showEditForm: true});
        });
    }

    closePopup() {
        this.setState({currentStore: {}, currentStoreId: "", showEditForm: false});
        console.log("close popup");
    }

    upsertStore(store) {
        var newStores = new HasIdList(this.state.productSolds).upsert(store).get();
        this.setState({stores: newStores});
    }

    saveChange(changedStore) {
        var that = this;
        if(changedStore && changedStore.id) {
            console.log("save change", changedStore);
            updateProductSold(changedStore).then(function(item) {
                console.log("return from update", item);
                that.upsertStore(item);
            });
        } else {
            console.log("save change", changedStore);
            newProductSold(changedStore).then(function(item) {
                that.upsertStore(item);
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
            storeList = this.state.productSolds.map(function(store) {
                return (
                    <tr className="item" key={store.id}>
                        <th scope="row">{store.id}</th>
                        <td>{store.name}</td>
                        <td>
                            <button type="button" className="btn btn-warning" 
                                onClick={() => that.openEditPopup(store.id)}>
                            Edit
                            </button>
                        </td>
                    </tr>
                );
            });
        }
        return (
            
            <div>
                <ProductSoldEditModal show={this.state.showEditForm} store={this.state.currentStore} 
                    parentCallbackClose={this.closePopup}
                    handleCallbackSubmit={this.saveChange}></ProductSoldEditModal>
                <button type="button" className="btn btn-primary" 
                                onClick={() => that.openEditPopup()}>
                            Add new Store
                            </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
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