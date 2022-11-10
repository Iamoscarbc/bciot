import { initializeApp } from 'firebase/app'
import { getFirestore, doc } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAGMFarf78xqI7UJEYJBmhMaMnEZ6v0nwc",
    authDomain: "bciot-database-123b2.firebaseapp.com",
    projectId: "bciot-database-123b2",
    storageBucket: "bciot-database-123b2.appspot.com",
    messagingSenderId: "442182201654",
    appId: "1:442182201654:web:46030df2a19827c1730397",
    measurementId: "G-M56SJBV5TY"
})

const firestore = getFirestore()
const storage = getStorage()

export {
    firestore,
    doc,
    storage
}