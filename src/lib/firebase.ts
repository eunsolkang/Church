import * as firebase from 'firebase'
import axios from 'axios';
import { fileURLToPath } from 'url';
let database;
const firebaseConfig = {
  apiKey: "AIzaSyCoekKbIb-fOIjFLxhdSYAmJp0lunAgBFc",
  authDomain: "church-attendence.firebaseapp.com",
  databaseURL: "https://church-attendence.firebaseio.com",
  projectId: "church-attendence",
  storageBucket: "church-attendence.appspot.com",
  messagingSenderId: "340106405182",
  appId: "1:340106405182:web:6b970853764db0b6d7f86f"
};

export const fire = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
     database = firebase.database();
     const messaging = firebase.messaging();
     console.log(messaging);
}

// 유저 관련
export const getUserList = () => {
    return database.ref('/users').once('value')
}
export const getUser = (i) => {
    return database.ref(`/users/${i}`).once('value');
}
export const removeUser = (id) => {
    return database.ref(`/users/${id}`).remove();
}

export const createUser = (data, i) => {
    return database.ref(`/users/${i}`).set(data)
}
export const updateUser = (data, i) => {
    return database.ref(`/users/${i}`).update(data);
}

export const getAttendList = () => {
    return database.ref('/attend').once('value')
}

