import { Link } from 'react-router';
import React, {Component} from 'react'
import BaseContainer from '../BaseContainer';
import {getAll, updateStore, newStore, storeList, StoreList} from "./data";
import StoreEditModal from "./store-edit-modal"

class InnerStore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stores: [
                {id: 20, name: "name20", address:"add"},
                {id: 25, name: "name25", address:"add25"}
            ],
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
            function(stores) {
                that.setState({stores: stores});
            }
        );
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
        var newStores = new StoreList(this.state.stores).upsert(store).get();
        this.setState({stores: newStores});
    }

    saveChange(changedStore) {
        var that = this;
        if(changedStore && changedStore.id) {
            console.log("save change", changedStore);
            updateStore(changedStore).then(function(item) {
                console.log("return from update", item);
                that.upsertStore(item);
            });
        } else {
            console.log("save change", changedStore);
            newStore(changedStore).then(function(item) {
                that.upsertStore(item);
            });
        }
        
    }



    findOne(id) {
        return this.state.stores.find(elm => elm.id == id);
    }

    render() {
        var storeList = "";
        var that = this;
        if(this.state.stores && this.state.stores.length > 0) {
            storeList = this.state.stores.map(function(store) {
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
                <StoreEditModal show={this.state.showEditForm} store={this.state.currentStore} 
                    parentCallbackClose={this.closePopup}
                    handleCallbackSubmit={this.saveChange}></StoreEditModal>
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
                    <tbody>
                        {storeList}
                    </tbody>
                </table>
            </div>
        );
    } 
}

class Store extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BaseContainer>
                <InnerStore></InnerStore>
            </BaseContainer>
        );
    }
}

export default Store;