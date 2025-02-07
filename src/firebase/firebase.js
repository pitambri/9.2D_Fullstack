import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBFAXhBrteFdQENlKjdXqOTWNglQLipkSw",
    authDomain: "post-page-30069.firebaseapp.com",
    databaseURL: "https://post-page-30069-default-rtdb.firebaseio.com",
    projectId: "post-page-30069",
    storageBucket: "post-page-30069.appspot.com",
    messagingSenderId: "376401008354",
    appId: "1:376401008354:web:9369b971ad6d8756fdb0bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore, Authentication, and Storage
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Authentication
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);
export { db, auth, googleProvider, storage };
