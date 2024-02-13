/*
    Copyright © 2024 Blumelist / Kainoa Ubaldo-Brabo. All Rights Reserved.
*/

import { initFirebase } from "./firebase.mjs";
import { initUI } from "./ui.mjs";

// global app data
const app = {
    user: null,
    firebase: null,
};


// RUNS THE PROGRAM
main();

// THE PROGRAM
async function main() {
    // load firestore
    app.firebase = !app.firebase ? initFirebase() : null;

    if (!app.firebase) {
        console.error("firebase not loaded");
        return;
    }

    // persist authenticated user
    app.firebase.auth.onAuthStateChanged(async (user) => {
        if (user) {
            app.user = user;
            app.userRef = await checkOrCreateUserFirebase(app, app.user);
        } else {
            app.user = null;
            app.userRef = null;
        }

        console.log("app USER", app.user);

        // get user's plant list from firestore 

        // display UI
        initUI(app);
    });
    
    console.log("Main.js loaded");
}


// HELPER FUNCTIONS -----------------------------------------------------------

// SIMPLE FUNCTIONS
function logMessage(method='', err='') {
    let date = new Date;
    date = date.toISOString().replace('T', ' ').replace('Z', '');

    let message = `(${date})::${method}`
    
    message += err != '' ? ` Error: ${err}` : '';

    console.log(message);
    return;
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function createUserData(user) {
    logMessage('createUserData');

    return {
        createdAt: new Date(),
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
    };
}

function createPlantsList(user) {
    logMessage("createPlantsList");

    return {
        createdAt: new Date(),
        uid: user.uid,
        name: `NewGarden`,
        pid: generateId(),
        list: [],
    }
}

// COMPLEX FUNCTIONS

// function getPlantsList(app, user) {
//     logMessage('getPlantsList');

//     if (!app || !user) logMessage('getPlantsList', 'Missing Parameters');
    
//     const plantsListRef = app.firebase.doc(app.firebase.db, 'plants', )
// }

/**
 *
 * @param {object} app  object
 * @param {object} user object
 * @returns {void}
 */
async function checkOrCreateUserFirebase(app, user) {
    logMessage('checkOrCreateUserFirebase');

    if (!app || !user || !app.firebase.db) {
        logMessage("checkOrCreateUserFirebase", "Missing Parameters");
        return;
    }

    const userRef = app.firebase.doc(app.firebase.db, "users", user.uid);

    try {
        const docSnap = await app.firebase.getDoc(userRef);

        if (!docSnap.exists()) {
            const userData = createUserData(user);

            await app.firebase.setDoc(userRef, userData);

            console.log("User created in Firestore");
        } else {
            app.user.firestore = docSnap.data();

            console.log("User already exists in Firestore", app.user.firestore);
        }
    } catch (err) {
        console.error("Error in Firestore operation:", err);
    }

    return userRef;
}
