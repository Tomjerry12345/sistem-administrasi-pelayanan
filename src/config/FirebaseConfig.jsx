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
import { logS } from "../values/Utilitas";

const firebaseConfig = {
  apiKey: "AIzaSyBeJzcuuKKcu1HXNFA2ri5Rk6ICAfH0GgI",
  authDomain: "salkpm-12bf3.firebaseapp.com",
  projectId: "salkpm-12bf3",
  storageBucket: "salkpm-12bf3.appspot.com",
  messagingSenderId: "993620155324",
  appId: "1:993620155324:web:caae9ab548c21a6c34a9b9",
  measurementId: "G-6NWGWMLQFE",
};

const FirebaseConfig = () => {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
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

    if (value !== "") {
      listWhere.push(where(key, "==", parseInt(value)));
    }

    if (value1 !== "") {
      listWhere.push(where(key1, "==", value1));
    }

    if (value2 !== "") {
      listWhere.push(where(key2, "==", value2));
    }

    if (value3 !== "") {
      listWhere.push(where(key3, "==", value3));
    }

    if (value4 !== "") {
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
