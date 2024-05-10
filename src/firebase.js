import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
   //Do firebase config here for database
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
//   Get a reference to the service
  export const db = getFirestore(app);
  
