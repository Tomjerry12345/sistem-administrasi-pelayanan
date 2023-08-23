import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { log, logS } from "../values/Utilitas";

// main

const firebaseConfig = {
  apiKey: "AIzaSyDC-xyB5g8iPgTzsuBQBaUACgptysAxFPA",
  authDomain: "sistem-administrasi-pelayanan.firebaseapp.com",
  projectId: "sistem-administrasi-pelayanan",
  storageBucket: "sistem-administrasi-pelayanan.appspot.com",
  messagingSenderId: "469648941370",
  appId: "1:469648941370:web:0a8445ee1642379321b003",
  measurementId: "G-W13F93GL0P",
};

// testing

// const firebaseConfig = {
//   apiKey: "AIzaSyD3k2CQcdMWRZ1681bCejcOpY8hTWcWumQ",
//   authDomain: "sistem-pelayanan.firebaseapp.com",
//   projectId: "sistem-pelayanan",
//   storageBucket: "sistem-pelayanan.appspot.com",
//   messagingSenderId: "723332462456",
//   appId: "1:723332462456:web:e9b97768620d1c7c823a8d",
//   measurementId: "G-JGDNZSPHJS",
// };

const FirebaseConfig = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const addData = async (path, data) => {
    try {
      const docRef = await addDoc(collection(db, path), data);
      const id = docRef.id;
      const res = await updateDataSpecifict(path, id, "id", id);
      if (res) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  const getData = async (path) => {
    const col = collection(db, path);
    const snapshot = await getDocs(col);

    // snapshot.forEach((doc) => {
    //   logged(`${doc.id} => ${doc.data()}`);
    // });

    return snapshot;
  };

  const updateDataSpecifict = async (path, child, key, value) => {
    const ref = doc(db, path, child);
    try {
      await updateDoc(ref, {
        [key]: value,
      });
      return true;
    } catch (e) {
      return false;
    }
  };

  const updateDataDoc = async (path, child, value) => {
    const ref = doc(db, path, child);
    try {
      await updateDoc(ref, value);
      return true;
    } catch (e) {
      return false;
    }
  };

  const searching = async (path, key, value) => {
    const col = collection(db, path);
    const q = query(col, where(key, "==", value));
    const querySnapshot = await getDocs(q);

    return querySnapshot;
  };

  const multipleSearching = async (
    path,
    key,
    value,
    key1,
    value1,
    key2,
    value2,
    key3,
    value3,
    key4,
    value4
  ) => {
    const col = collection(db, path);

    const listWhere = [];

    if (value !== "" && value !== undefined) {
      listWhere.push(where(key, "==", value));
    }

    if (value1 !== "" && value1 !== undefined) {
      listWhere.push(where(key1, "==", value1));
    }

    if (value2 !== "" && value2 !== undefined) {
      listWhere.push(where(key2, "==", value2));
    }

    if (value3 !== "" && value3 !== undefined) {
      listWhere.push(where(key3, "==", parseInt(value3)));
    }

    if (value4 !== "" && value4 !== undefined) {
      listWhere.push(where(key4, "==", value4));
    }

    const sum = listWhere.length;

    let q;

    if (sum === 1) {
      q = query(col, listWhere[0]);
    } else if (sum === 2) {
      q = query(col, listWhere[0], listWhere[1]);
    } else if (sum === 3) {
      q = query(col, listWhere[0], listWhere[1], listWhere[2]);
    } else if (sum === 4) {
      q = query(col, listWhere[0], listWhere[1], listWhere[2], listWhere[3]);
    }

    const querySnapshot = await getDocs(q);

    return querySnapshot;
  };

  const deleteAllData = async (path) => {
    const allData = await getData(path);
    const promise = allData.docs.forEach((obj, i) => {
      setTimeout(async () => {
        // await deleteDoc(doc(db, path, obj.id));

        if (i >= allData.docs.length - 1) {
          const test = await true;
          return test;
        }
      }, 1000);
    });
  };

  const deleteSpecifict = async (path, id) => {
    await deleteDoc(doc(db, path, id));
  };

  return {
    getData,
    addData,
    updateDataSpecifict,
    searching,
    multipleSearching,
    deleteAllData,
    deleteSpecifict,
    updateDataDoc,
  };
};

export default FirebaseConfig;
