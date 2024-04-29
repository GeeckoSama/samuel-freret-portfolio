import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey:
    process.env.PUBLIC_FIREBASE_API_KEY ||
    import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain:
    process.env.PUBLIC_FIREBASE_AUTH_DOMAIN ||
    import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:
    process.env.PUBLIC_FIREBASE_PROJECT_ID ||
    import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:
    process.env.PUBLIC_FIREBASE_STORAGE_BUCKET ||
    import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:
    process.env.PUBLIC_FIREBASE_APP_ID ||
    import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);