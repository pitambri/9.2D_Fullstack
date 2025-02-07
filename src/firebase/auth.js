// auth.js
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export async function signUp(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            createdAt: new Date()
        });

        console.log('User signed up and added to Firestore:', user);
        return user; 
    } catch (error) {
        console.error('Error signing up:', error.message);
        throw error; 
    }
}

export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', userCredential.user);
        return userCredential.user; 
    } catch (error) {
        console.error('Error logging in:', error.message);
        throw error; 
    }
}
