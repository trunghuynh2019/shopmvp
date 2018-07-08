import {BASE_URL, fetchPost, fetchPut} from "../../data/config";

export const getAll = () => fetch(BASE_URL + "ProductSolds").then(res => res.json()).catch(function() {
    console.log("err getAll customer");
});

export const updateProductSold = (productSold) => fetchPut(BASE_URL + "ProductSolds/" + productSold.id, 
    productSold).then(res => res.json()).catch(function() {
        console.log("err getAll customer");
    });

export const newProductSold = (productSold) => fetchPost(BASE_URL + "ProductSolds/", productSold).then(res=>res.json()).catch(function() {
    console.log("err getAll customer");
});
