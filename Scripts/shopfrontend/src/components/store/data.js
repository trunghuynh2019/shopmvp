import {BASE_URL, fetchPost, fetchPut} from "../../data/config";

export const getAll = () => fetch(BASE_URL + "Stores").then(res => res.json());

export const updateStore = (store) => fetchPut(BASE_URL + "Stores/" + store.id, store);

export const newStore = (store) => fetchPost(BASE_URL + "Stores/", store);
