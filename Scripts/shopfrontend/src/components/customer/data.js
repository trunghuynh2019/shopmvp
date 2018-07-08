import {BASE_URL, fetchPost, fetchPut} from "../../data/config";

export const getAll = () => fetch(BASE_URL + "Customers").then(res => res.json()).catch(function() {
    console.log("err getAll customer");
});

export const updateCustomer = (customer) => fetchPut(BASE_URL + "Customers/" + customer.id, 
    customer).then(res => res.json()).catch(function() {
        console.log("err updateCustomer customer");
    });

export const newCustomer = (customer) => fetchPost(BASE_URL + "Customers/", customer).then(res=>res.json()).catch(function() {
    console.log("err newCustomer customer");
});
