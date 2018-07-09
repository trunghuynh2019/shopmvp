import {BASE_URL, fetchPost, fetchPut, fetchGet, notifyApiRequestError} from "../../data/config";

export const getAll = () => fetchGet(BASE_URL + "Stores").then(res => res.json())
    .catch(function(res) {
        console.log(res);
        notifyApiRequestError("Error while loading Stores");
});;

export const updateStore = (store) => fetchPut(BASE_URL + "Stores/" + store.id, store).then(res => res.json())
    .catch(function(res) {
        console.log(res);
        notifyApiRequestError("Error while update Stores");
});;

export const newStore = (store) => fetchPost(BASE_URL + "Stores/", store).then(res=>res.json())
    .catch(function(res) {
        console.log(res);
        notifyApiRequestError("Error while add new Stores");
});;
