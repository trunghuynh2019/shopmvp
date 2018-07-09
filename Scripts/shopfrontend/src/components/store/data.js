import {BASE_URL, fetchPost, fetchPut, fetchGet, notifyApiRequestError, 
    fetchDelete, publishEvent, events} from "../../data/config";

const notifyDeleteStoreSuccessful = (id) => {
    publishEvent(events['store.removed'], id);
}

export const getAll = () => fetchGet(BASE_URL + "Stores").then(res => res.json())
    .catch(function(res) {
        console.log(res);
        notifyApiRequestError("Error while loading Stores");
});

export const updateStore = (store) => fetchPut(BASE_URL + "Stores/" + store.id, store).then(res => res.json())
    .catch(function(res) {
        console.log(res);
        notifyApiRequestError("Error while update Stores");
});

export const newStore = (store) => fetchPost(BASE_URL + "Stores/", store).then(res=>res.json())
    .catch(function(res) {
        console.log(res);
        notifyApiRequestError("Error while add new Stores");
});

export const deleteStore = (id) => fetchDelete(BASE_URL + "Stores/" + id)
    .then(res => 
    {
        try {
            console.log("inside delete store");
            var json = res.json();
                notifyDeleteStoreSuccessful(id);
                console.log("inside if id");
            
            return json;
        } catch(err) {
            console.log("inside cat er");
            throw Error(err.message);
        }
        
    })
    .catch(function(res) {
        console.log(res);
        notifyApiRequestError("Error while delete Store");
});
