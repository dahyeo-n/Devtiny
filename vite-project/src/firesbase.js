import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBQ_iDyrFLv3t5ZvjEF2o3rWN_6hZ1zQVo',
  authDomain: 'nbc-logindata.firebaseapp.com',
  projectId: 'nbc-logindata',
  storageBucket: 'nbc-logindata.appspot.com',
  messagingSenderId: '279576748767',
  appId: '1:279576748767:web:dab0f34ad9cd55b1fdff6a'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
