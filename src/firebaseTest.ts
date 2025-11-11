// src/firebaseTest.ts
import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

async function testFirebase() {
  try {
    // Write test
    const docRef = await addDoc(collection(db, "testCollection"), {
      message: "Firebase connected successfully!",
      time: new Date().toISOString(),
    });
    console.log("✅ Test document written with ID:", docRef.id);

    // Read test
    const querySnapshot = await getDocs(collection(db, "testCollection"));
    querySnapshot.forEach((doc) => {
      console.log("📄 Found document:", doc.id, "=>", doc.data());
    });
  } catch (e) {
    console.error("❌ Firebase connection failed:", e);
  }
}

testFirebase();
