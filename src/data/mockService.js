// const prods = require("./products.js");
import { PRODUCTS } from "../data/products";

function getItemsFromAPI() {

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(PRODUCTS);
        }, 1500);
    });
}

function getSingleItemFromAPI(idParams) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let itemRequested = PRODUCTS.find((item) => item.id === Number(idParams));

            if (itemRequested) {
                resolve(itemRequested);
            } else {
                reject(new Error("El item no existe."));
            }
        }, 1000);
    });
}

function getItemsFromAPIByCategory(categoryid) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let itemsRequested = PRODUCTS.filter(
                (item) => item.category === categoryid
            );
            resolve(itemsRequested);
        }, 1250);
    });
}

export { getItemsFromAPI, getSingleItemFromAPI, getItemsFromAPIByCategory };