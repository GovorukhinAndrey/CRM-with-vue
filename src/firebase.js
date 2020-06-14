import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDlDqJE05WvGbQmKS77EeLIIe3pBii9SAU',
  authDomain: 'crm-with-vue.firebaseapp.com',
  databaseURL: 'https://crm-with-vue.firebaseio.com',
  projectId: 'crm-with-vue',
  storageBucket: 'crm-with-vue.appspot.com',
  messagingSenderId: '50840411605',
  appId: '1:50840411605:web:5092258e0ef2865e69715c',
  measurementId: 'G-PSGRMPEZYX',
};

// // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDb = firebaseApp.database();
export const firebaseAuth = firebaseApp.auth();

export default firebaseApp;
