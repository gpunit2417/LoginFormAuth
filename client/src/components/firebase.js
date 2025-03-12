import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4Uvx1mZZlfZ9EROoJ6TZqr-EFu9mB9-Q",
  authDomain: "login-form-auth-f93cc.firebaseapp.com",
  projectId: "login-form-auth-f93cc",
  storageBucket: "login-form-auth-f93cc.firebasestorage.app",
  messagingSenderId: "803179637962",
  appId: "1:803179637962:web:373eea2870e809b8595833",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider, signInWithPopup };
