import { Link } from 'react-router';
import React, {Component} from 'react'
import BaseContainer from '../BaseContainer';
import {getAll, updateStore, newStore} from "./data";
import { HasIdList } from "../../data/config";
import StoreEditModal from "./store-edit-modal"
import Dialog from 'react-bootstrap-dialog'
import {Button} from 'react-bootstrap'
import format from "string-format";

class InnerStore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stores: [
                {id: 20, name: "name20", address:"add"},
                {id: 25, name: "name25", address:"add25"}
            ],
            currentStoreId: "",
            showEditForm: false,
            currentStore: {}
        }
        this.openEditPopup = this.openEditPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.saveChange = this.saveChange.bind(this);
        this.deleteStore = this.showDeleteStore.bind(this);
    }

    componentDidMount() {
        var that = this;
        getAll().then(
            function(stores) {
                if(stores) {
                    that.setState({stores: stores});
                }
            }
        );
    }

    openEditPopup(id) {
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
        var newStores = new HasIdList(this.state.stores).upsert(store).get();
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

    showDeleteStore(store) {
        var that = this;
        this.dialog.show({
            title: 'Delete',
            body: format("You are about to delete: {name}, are you sure?", store),
            actions: [
              Dialog.CancelAction(),
              Dialog.DefaultAction(
                'Remove',
                () => {
                    that.deleteStore(store.id);
                },
                'btn-danger'
              )
            ],
            bsSize: 'small',
            onHide: (dialog) => {
              dialog.hide()
              console.log('closed by clicking background.')
            }
        });
    }

    deleteStore() {

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
                            <Button bsStyle="warning" onClick={() => that.openEditPopup(store.id)}>Edit</Button>
                        </td>
                        <td>
                            <Button bsStyle="danger" onClick={() => that.showDeleteStore(store)}>Delete</Button>
                        </td>
                    </tr>
                );
            });
        }
        return (
            
            <div>
                <Dialog ref={(el) => { this.dialog = el }} />
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
                            <th scope="col">Update</th>
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