import {BASE_URL, fetchPost, fetchPut} from "../../data/config";

export const getAll = () => fetch(BASE_URL + "ProductSolds").then(res => res.json()).catch(function() {
    console.log("err getAll customer");
});

export const updateProductSold = (productSold) => fetchPut(BASE_URL + "ProductSolds/" + productSold.id, 
    {
        product_id: productSold.product_id,
        customer_id: productSold.customer_id,
        store_id: productSold.store_id,
        date_sold: productSold.date_sold
    }).then(res => res.json()).catch(function() {
        console.log("err getAll customer");
    });

export const newProductSold = (productSold) => fetchPost(BASE_URL + "ProductSolds/", productSold).then(res=>res.json()).catch(function() {
    console.log("err getAll customer");
});
