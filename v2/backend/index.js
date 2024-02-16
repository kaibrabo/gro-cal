/*
    Copyright © 2024 Blumelist / Kainoa Ubaldo-Brabo. All Rights Reserved.
*/

import { initFirebase } from "./db/firebase.mjs";
import { initUI } from "../frontend/ui.mjs";
import { logMessage } from "../utils/log.js";

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
        logMessage("main", "firebase not loaded");
        return;
    }

    // persist authenticated user
    app.firebase.auth.onAuthStateChanged(async (user) => {
        if (user) {
            app.user = user;
            app.userRef = await checkOrCreateUserFirebase(app);
        } else {
            app.user = null;
            app.userRef = null;
            logMessage("main", "no user");
        }

        // display UI
        initUI(app);
    });

    logMessage("main loaded");
}

// HELPER FUNCTIONS -----------------------------------------------------------

/**
 *
 * @param {object} app object
 * @returns {void}
 */
async function checkOrCreateUserFirebase(app) {
    logMessage("checkOrCreateUserFirebase");

    if (!app || !app.user || !app.firebase.db) {
        logMessage("checkOrCreateUserFirebase", "Missing Parameters");
        return;
    }

    const userRef = app.firebase.doc(app.firebase.db, "users", app.user.uid);

    try {
        const docSnap = await app.firebase.getDoc(userRef);

        if (!docSnap.exists()) {
            const userData = createUserData(app.user);

            await app.firebase.setDoc(userRef, userData);

            logMessage("checkOrCreateUserFirebase", "User created");
        } else {
            app.user.firestore = docSnap.data();

            logMessage("checkOrCreateUserFirebase", "User already exists");
        }
    } catch (err) {
        logMessage("Error in Firestore operation:", err);
    }

    return userRef;
}

/**
 *
 * @param {object} user object
 * @returns {(object)}
 */
function createUserData(user) {
    logMessage("createUserData");

    return {
        createdAt: new Date(),
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
    };
}
