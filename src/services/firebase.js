// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
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

export function testDb() {
    console.log(FirebaseApp);
}

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
        
        const products = snapshot.map( doc => {
            return {
                ...doc.data(), // Operador spread, saca y desarma todas las properties y las acomoda tal cual la id de arriba.
                id: doc.id
            };
        });
    
        return products;
    } catch(e) {
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
    } catch(e) {
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

        const products = productsSnapshot.map( doc => {
            return {
                ...doc.data(), // Operador spread, saca y desarma todas las properties y las acomoda tal cual la id de arriba.
                id: doc.id
            };
        });

        return products;
    } catch(e) {
        console.error(e);
        return null;
    }
}
