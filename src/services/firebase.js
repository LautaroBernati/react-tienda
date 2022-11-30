import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, query, where, addDoc, documentId, writeBatch } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwCxJ31jsJMYUj8LRqrF1veS8HVyn0bak",
    authDomain: "vfreact-34785.firebaseapp.com",
    projectId: "vfreact-34785",
    storageBucket: "vfreact-34785.appspot.com",
    messagingSenderId: "327397787025",
    appId: "1:327397787025:web:82699599efb9c40c34c630"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const DB = getFirestore(FirebaseApp);

/**
 * @func getItemsFromAPI
 * @desc Retorna un array con todos los productos guardados en firestore.
 * @example
 * ```javascript
 * const products = [
 *  {
 *      category: "night",
 *      creator: "Paco Rabanne",
 *      fragrance: "One Million",
 *      gender: "Masculino",
 *      id: "6Z9YiSS6YQGiP4NT8Toe",
 *      imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
 *      price100ml: 4392,
 *      stock: 4
 *  },
 *  {
 *      category: "day",
 *      creator: "Armani",
 *      fragrance: "Acqua di Gio",
 *      gender: "Femenino",
 *      id: "mJqBcimBHE88J0pV27Oy",
 *      imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
 *      price100ml: 4715,
 *      stock: 8
 *  }
 * ];
 * ```
 * @returns {Array<*>} Array de productos
 * @async
 */
export async function getItemsFromAPI() {
    try {
        const CollectionProducts = collection(DB, 'products');
        let snapshot = (await getDocs(CollectionProducts)).docs;

        const products = snapshot.map(doc => {
            return {
                ...doc.data(), // Operador spread, saca y desarma todas las properties y las acomoda tal cual la id de arriba.
                id: doc.id
            };
        });

        return products;
    } catch (e) {
        console.error(e);
    }
}

/**
 * @func getSingleItemFromAPI
 * @desc Busca en firestore algún documento según una id.
 * @param {string} id ID del documento a buscar en firestore.
 * @returns {any} Documento mapeado, junto con su id.
 * @example
 * ```json
 *  {
 *      "category": "night",
 *      "creator": "Paco Rabanne",
 *      "fragrance": "One Million",
 *      "gender": "Masculino",
 *      "id": "6Z9YiSS6YQGiP4NT8Toe",
 *      "imgurl": "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
 *      "price100ml": 4392,
 *      "stock": 4
 *  }
 * ```
 * @async
 */
export async function getSingleItemFromAPI(id) {
    try {
        const docRef = doc(DB, 'products', id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            throw new Error(`El documento con id ${id} no existe`);
        }
        return {
            ...docSnap.data(),
            id: docSnap.id
        }
    } catch (e) {
        console.error(e);
        return null;
    }
}

/**
 * @func getItemsFromAPIByCategory
 * @summary Retorna un array de los productos en firestore, filtrando según categoría.
 * @param {string} category Categoría a usar para filtrar. 'day'/'night'.
 * @returns {Array<any>} Array de objetos filtrados por categoría.
 * @async
 */
export async function getItemsFromAPIByCategory(category) {
    try {
        const productsRef = collection(DB, 'products');
        const q = query(productsRef, where('category', '==', category));

        const productsSnapshot = (await getDocs(q)).docs;

        const products = productsSnapshot.map(doc => {
            return {
                ...doc.data(), // Operador spread, saca y desarma todas las properties y las acomoda tal cual la id de arriba.
                id: doc.id
            };
        });

        return products;
    } catch (e) {
        console.error(e);
        return null;
    }
}

/**
 * @func createBuyOrderFS
 * @summary Genera un nuevo documento con los datos de la compra y del comprador que se agrega a la collection 'buyorders'.
 * @param {*} orderData Datos del comprador y de la compra en si.
 * @returns {string | null} Caso sin error: ID de la orden de compra, que es en realidad la ID del documento generado en la collection 'buyorders'. En error: null.
 * @async
 */
export async function createBuyOrderFS(orderData) {
    try {
        const colBuyOrdersRef = collection(DB, 'buyorders');
        const docRef = await addDoc(colBuyOrdersRef, orderData);
        return (docRef.id);
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function createBuyOrderFSWithStock(orderData) {
    try {
        const colProductsRef = collection(DB, 'products');
        const colBuyOrdersRef = collection(DB, 'buyorders');
        const batch = writeBatch(DB);

        let arrayIds = orderData.items.map(item => item.id);
        const q = query(colProductsRef, where(documentId(), 'in', arrayIds) );
        let productsSnapshot = await getDocs(q);

        productsSnapshot.docs.forEach( (doc) => {
            let stockActual = doc.data().stock;
            let itemInCart = orderData.items.find( item => item.id === doc.id);
            let stockActualizado = stockActual - itemInCart.quantity;

            batch.update(doc.ref, { stock: stockActualizado});
        });

        const docOrderRef = doc(colBuyOrdersRef);
        batch.set(docOrderRef, orderData);

        await batch.commit();

        return docOrderRef.id;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function getBuyOrderByID(id) {
    try {
        const docRef = doc(DB, 'buyorders', id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            throw new Error(`El documento con id ${id} no existe`);
        }
        console.log(docSnap)
        return {
            ...docSnap.data(),
            date: docSnap._document.data.value.mapValue.fields.date.timestampValue
        };
    } catch (e) {
        console.error(e);
        return null;
    }
}

// async function exportItemsToFirestore() {
//     const productos = [
//         {
//             id: 3,
//             creator: "Armani",
//             fragrance: "Acqua di Gio",
//             gender: "Femenino",
//             price100ml: 4600,
//             price60ml: 3550,
//             category: "night",
//             imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
//             stock: 7
//         },
//         {
//             id: 3,
//             creator: "Paco Rabanne",
//             fragrance: "One Million",
//             gender: "Masculino",
//             price100ml: 4550,
//             price60ml: 3500,
//             category: "night",
//             imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
//             stock: 7
//         },
//         {
//             id: 3,
//             creator: "Paco Rabanne",
//             fragrance: "Invictus",
//             gender: "Masculino",
//             price100ml: 4400,
//             price60ml: 3555,
//             category: "night",
//             imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
//             stock: 7
//         },
//         {
//             id: 3,
//             creator: "Paco Rabanne",
//             fragrance: "Invictus Intense",
//             gender: "Masculino",
//             price100ml: 4518,
//             price60ml: 3479,
//             category: "night",
//             imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
//             stock: 7
//         },
//         {
//             id: 4,
//             creator: "Paco Rabanne",
//             fragrance: "Lady Million",
//             gender: "Femenino",
//             price100ml: 5203,
//             price60ml: 4005,
//             category: "night",
//             imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
//             stock: 3
//         },
//         {
//             id: 5,
//             creator: "Paco Rabanne",
//             fragrance: "Black XS For Her",
//             gender: "Femenino",
//             price100ml: 4683,
//             price60ml: 3587,
//             category: "night",
//             imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
//             stock: 4
//         },
//         {
//             id: 6,
//             creator: "Paco Rabanne",
//             fragrance: "Phantom",
//             gender: "Masculino",
//             price100ml: 4683,
//             price60ml: 3587,
//             category: "day",
//             imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
//             stock: 6
//         },
//         {
//             id: 7,
//             creator: "Armani",
//             fragrance: "Acqua Di Gio Men",
//             gender: "Masculino",
//             price100ml: 4715,
//             price60ml: 3618,
//             category: "day",
//             imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
//             stock: 4
//         },
//         {
//             id: 9,
//             creator: "Dior",
//             fragrance: "Miss Dior",
//             gender: "Femenino",
//             price100ml: 4854,
//             price60ml: 3739,
//             category: "night",
//             imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
//             stock: 9
//         },
//         {
//             id: 10,
//             creator: "Dior",
//             fragrance: "J'Adore",
//             gender: "Masculino",
//             price100ml: 4867,
//             price60ml: 3695,
//             category: "night",
//             imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
//             stock: 10
//         },
//         {
//             id: 11,
//             creator: "Armani",
//             fragrance: "Acqua Di Gioia",
//             gender: "Femenino",
//             price100ml: 4905,
//             price60ml: 3771,
//             category: "night",
//             imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
//             stock: 6
//         },
//         {
//             id: 12,
//             creator: "Armani",
//             fragrance: "Air di Gioia",
//             gender: "Femenino",
//             price100ml: 4937,
//             price60ml: 3771,
//             category: "night",
//             imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
//             stock: 4
//         },
//         {
//             id: 13,
//             creator: "Dior",
//             fragrance: "Sauvage",
//             gender: "Masculino",
//             price100ml: 4937,
//             price60ml: 3790,
//             category: "night",
//             imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
//             stock: 6
//         },
//         {
//             id: 14,
//             creator: "Armani",
//             fragrance: "Armani Code",
//             gender: "Masculino",
//             price100ml: 4905,
//             price60ml: 3587,
//             category: "night",
//             imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
//             stock: 2
//         },
//         {
//             id: 15,
//             creator: "Carolina Herrera",
//             fragrance: "Bad Boy",
//             gender: "Masculino",
//             price100ml: 4949,
//             price60ml: 3802,
//             category: "night",
//             imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
//             stock: 1
//         },
//         {
//             id: 16,
//             creator: "Carolina Herrera",
//             fragrance: "Good Girl",
//             gender: "Femenino",
//             price100ml: 4949,
//             price60ml: 3802,
//             category: "night",
//             imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
//             stock: 2
//         },
//         {
//             id: 17,
//             creator: "Armani",
//             fragrance: "Armani Code Sport",
//             gender: "Masculino",
//             price100ml: 5032,
//             price60ml: 3878,
//             category: "night",
//             imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
//             stock: 2
//         },
//         {
//             id: 18,
//             creator: "Carolina Herrera",
//             fragrance: "212 VIP Black",
//             gender: "Masculino",
//             price100ml: 4765,
//             price60ml: 3663,
//             category: "night",
//             imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
//             stock: 3
//         },
//         {
//             id: 19,
//             creator: "Armani",
//             fragrance: "Attitude",
//             gender: "Masculino",
//             price100ml: 4696,
//             price60ml: 3618,
//             category: "day",
//             imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
//             stock: 1
//         },
//         {
//             id: 20,
//             creator: "Armani",
//             fragrance: "Stronger With You",
//             gender: "Masculino",
//             price100ml: 4905,
//             price60ml: 3771,
//             category: "night",
//             imgurl: "https://i.pinimg.com/originals/05/5c/a1/055ca1eeac79ae6067f46b4809f9d387.jpg",
//             stock: 3
//         },
//     ];

//     const colRef = collection(DB, 'products');

//     for (let item of productos) {
//         delete item.id
//         delete item.price60ml;

//         let docRef = await addDoc(colRef, item);
//         console.log('Created doc with id', docRef.id);
//     }
// }
