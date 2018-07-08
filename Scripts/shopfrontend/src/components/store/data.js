import {BASE_URL, fetchPost, fetchPut} from "../../data/config";

export const getAll = () => fetch(BASE_URL + "Stores").then(res => res.json());

export const updateStore = (store) => fetchPut(BASE_URL + "Stores/" + store.id, store).then(res => res.json());

export const newStore = (store) => fetchPost(BASE_URL + "Stores/", store).then(res=>res.json());


export class StoreList {
    
    constructor(stores) {
        this.stores = stores;
    }

    get() {
        return this.stores;
    }

    upsert(store) {
        console.log(store, this.stores);
        var exited = false;
        for(var i = 0; i < this.stores.length; i++) {
            if(store.id == this.stores[i].id) {
                console.log(store, this.stores[i]);
                this.stores[i] = store;
                exited = true;
            }
        }
        if(! exited) {
            this.stores.push(store);
        }
        return this;
    }

}