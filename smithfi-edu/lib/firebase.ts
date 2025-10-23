/**
 * Firebase Configuration
 * Initializes Firebase services for the Fund Your Future Education platform
 */

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9TIBVB6GH1s4rcvcG3-Wk8cT8wHr65F0",
  authDomain: "seven-3efe8.firebaseapp.com",
  projectId: "seven-3efe8",
  storageBucket: "seven-3efe8.firebasestorage.app",
  messagingSenderId: "138096486687",
  appId: "1:138096486687:web:9ea1e077f389bf80c9e82a",
  measurementId: "G-FKBNBEE6JP"
};

// Initialize Firebase (avoid multiple initializations)
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser environment)
let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics };

// Connect to emulators in development (optional)
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // Uncomment these lines if you want to use Firebase emulators in development
  /*
  try {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    connectFunctionsEmulator(functions, '127.0.0.1', 5001);
    connectStorageEmulator(storage, '127.0.0.1', 9199);
  } catch (error) {
    console.log('Firebase emulators already connected or not available');
  }
  */
}

export default app;