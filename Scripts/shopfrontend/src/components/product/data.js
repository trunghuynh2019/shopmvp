import {BASE_URL, fetchPost, fetchPut} from "../../data/config";

export const getAll = () => fetch(BASE_URL + "Products").then(res => res.json()).catch(function() {
    console.log("err updateProduct");
});

export const updateProduct = (product) => fetchPut(BASE_URL + "Products/" + product.id, 
    product).then(res => res.json()).catch(function() {
        console.log("err updateProduct");
    });

export const newProduct = (product) => fetchPost(BASE_URL + "Products/", product).then(res=>res.json());
