import {BASE_URL, fetchPost, fetchPut} from "../../data/config";

export const getAll = () => fetch(BASE_URL + "Stores").then(res => res.json()).catch(function() {
    console.log("err getAll stores");
});;

export const updateStore = (store) => fetchPut(BASE_URL + "Stores/" + store.id, store).then(res => res.json()).catch(function() {
    console.log("err updateProduct");
});;

export const newStore = (store) => fetchPost(BASE_URL + "Stores/", store).then(res=>res.json()).catch(function() {
    console.log("err updateProduct");
});;
