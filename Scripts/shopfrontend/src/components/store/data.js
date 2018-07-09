import {
    BASE_URL, fetchPost, fetchPut, fetchGet, notifyApiRequestError,
    fetchDelete, publishEvent, events
} from "../../data/config";

const notifyDeleteStoreSuccessful = (id) => {
    publishEvent(events['store.removed'], id);
}

const notifyAddStoreSuccessful = (store) => {
    publishEvent(events['store.updated'], store);
}

export const getAll = () => fetchGet(BASE_URL + "Stores").then(res => res.json())
    .catch(function (res) {
        console.log(res);
        notifyApiRequestError("Error while loading Stores");
    });

export const updateStore = (store) => fetchPut(BASE_URL + "Stores/" + store.id, store)
    .then(res => {
        try {
            var json = res.json();
            return json;
        } catch (err) {
            throw Error(err.message);
        }
    }).then(
        alreadyJsonStore => {
            notifyAddStoreSuccessful(alreadyJsonStore);
            return alreadyJsonStore;
        }
    )
    .catch(function (res) {
        console.log(res);
        notifyApiRequestError("Error while update Stores");
    });

export const newStore = (store) => fetchPost(BASE_URL + "Stores/", store).then(res => res.json())
    .catch(function (res) {
        console.log(res);
        notifyApiRequestError("Error while add new Stores");
    });

export const deleteStore = (id) => fetchDelete(BASE_URL + "Stores/" + id)
    .then(res => {
        try {
            var json = res.json();
            notifyDeleteStoreSuccessful(id);
            return json;
        } catch (err) {
            throw Error(err.message);
        }
    })
    .catch(function (res) {
        console.log(res);
        notifyApiRequestError("Error while delete Store");
    });
