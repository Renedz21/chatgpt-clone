import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAFGRG2YqtNmWVrzsnYxZJh-Qm_AhlEJL0",
    authDomain: "chatgpt-clone-732dc.firebaseapp.com",
    projectId: "chatgpt-clone-732dc",
    storageBucket: "chatgpt-clone-732dc.appspot.com",
    messagingSenderId: "551709680498",
    appId: "1:551709680498:web:02a1fc9cc53bb2f9a2f3eb"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);