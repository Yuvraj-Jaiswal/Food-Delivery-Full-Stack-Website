import {getApp,getApps,initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA0-3sUMFuV7kRDsBHWh-h3X10RQjUhcE8",
    authDomain: "food-delivery-app-7c389.firebaseapp.com",
    databaseURL: "https://food-delivery-app-7c389-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "food-delivery-app-7c389",
    storageBucket: "food-delivery-app-7c389.appspot.com",
    messagingSenderId: "582554109107",
    appId: "1:582554109107:web:8b539bb4ab2f5b09695cc6"
  };

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app)
const storage = getStorage(app)

export {app , firestore , storage}