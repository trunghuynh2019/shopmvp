import PubSub from "pubsub-js";
export const BASE_URL = "/api/"

export const events = {
    successfulUpdate: 'successfulUpdate'
}

export const fetchPost = (url, data) => fetch(url, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});

export const fetchPut = (url, data) => fetch(url, {
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});

export const fetchDelete = (url) => fetch(url, {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export const publishEvent = (event, message) => {
    if(event in events) {
        PubSub.publish(event, message);
    } else {
        console.log("dangerous! seems like you publish event that is not in the list");
    }
}

export const subscribeToEvent = (event, callback) => {
    if(event in events) {
        PubSub.subscribe(event, callback);
    } else {
        console.log("dangerous! seems like you publish event that is not in the list");
    }
}

export class HasIdList {
    
    constructor(stores) {
        this.stores = stores;
    }

    get() {
        return this.stores;
    }

    upsert(store) {
        console.log(store, this.stores);
        var exited = false;
        for (var i = 0; i < this.stores.length; i++) {
            if (store.id == this.stores[i].id) {
                console.log(store, this.stores[i]);
                this.stores[i] = store;
                exited = true;
            }
        }
        if (!exited) {
            this.stores.push(store);
        }
        return this;
    }

    getOne(id) {
        return this.stores.find(x => x.id == id);
    }

    getOneName(id) {
        if(id) {
            var obj = this.stores.find(x => x.id == id);
            if(obj) {
                return obj.name;
            }
        }
        return "";
    }

}