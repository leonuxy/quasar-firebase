import { boot } from "quasar/wrappers";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useAuthStore } from "src/stores/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsFIa9SMfLEoz3ZkbCXZM8Rjv9uc8AvPs",
  authDomain: "smdc-bisi.firebaseapp.com",
  projectId: "smdc-bisi",
  storageBucket: "smdc-bisi.appspot.com",
  messagingSenderId: "614415807072",
  appId: "1:614415807072:web:be9f4fe08d4eff3ef84905",
  measurementId: "G-06QW95R6P3",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default boot(async ({ store }) => {
  //   app = (firebaseConfig);
  //   db = getFirestore(app);
});
