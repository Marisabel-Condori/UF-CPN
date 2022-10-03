import {initializeApp} from "firebase/app"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCHHRdZ9rCGZCpmb5x70ENUEM0w6TY6EQw",
  authDomain: "storage-proyect-b295a.firebaseapp.com",
  projectId: "storage-proyect-b295a",
  storageBucket: "storage-proyect-b295a.appspot.com",
  messagingSenderId: "455238407182",
  appId: "1:455238407182:web:547b06ab5255a3dbbcd85f"
};

export const app = initializeApp(firebaseConfig)
export const storage = getStorage()