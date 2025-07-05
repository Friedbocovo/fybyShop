import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Configuration Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialiser Firebase
let app;
let auth;
let db;
let storage;

export const initializeFirebase = () => {
  try {
    console.log('🔥 Initializing Firebase...');
    
    // Vérifier si les variables d'environnement sont présentes
    const requiredEnvVars = [
      'VITE_FIREBASE_API_KEY',
      'VITE_FIREBASE_AUTH_DOMAIN',
      'VITE_FIREBASE_PROJECT_ID',
      'VITE_FIREBASE_STORAGE_BUCKET',
      'VITE_FIREBASE_MESSAGING_SENDER_ID',
      'VITE_FIREBASE_APP_ID'
    ];

    const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);
    
    if (missingVars.length > 0) {
      console.warn('⚠️ Firebase variables manquantes:', missingVars);
      console.log('📋 Variables disponibles:', Object.keys(import.meta.env).filter(key => key.startsWith('VITE_FIREBASE')));
      return { app: null, auth: null, db: null, storage: null, isConfigured: false };
    }

    // Vérifier que les valeurs ne sont pas vides
    const emptyVars = requiredEnvVars.filter(varName => {
      const value = import.meta.env[varName];
      return !value || value.trim() === '';
    });

    if (emptyVars.length > 0) {
      console.warn('⚠️ Firebase variables vides:', emptyVars);
      return { app: null, auth: null, db: null, storage: null, isConfigured: false };
    }

    // Initialiser l'app Firebase
    app = initializeApp(firebaseConfig);
    
    // Initialiser les services
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);

    console.log('✅ Firebase initialized successfully');
    console.log('📊 Project ID:', firebaseConfig.projectId);
    console.log('🔐 Auth Domain:', firebaseConfig.authDomain);
    
    return { app, auth, db, storage, isConfigured: true };
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
    return { app: null, auth: null, db: null, storage: null, isConfigured: false };
  }
};

// Initialiser Firebase au démarrage
const firebaseServices = initializeFirebase();

export const { app: firebaseApp, auth: firebaseAuth, db: firebaseDB, storage: firebaseStorage } = firebaseServices;
export const isFirebaseConfigured = firebaseServices.isConfigured;

// Fonctions utilitaires
export const checkFirebaseConnection = async () => {
  if (!isFirebaseConfigured) {
    console.log('❌ Firebase not configured');
    return false;
  }
  
  try {
    // Test simple de connexion
    if (firebaseAuth) {
      console.log('✅ Firebase Auth available');
      return true;
    }
    return false;
  } catch (error) {
    console.error('❌ Firebase connection test failed:', error);
    return false;
  }
};