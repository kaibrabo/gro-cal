/*
    Copyright © 2024 Blumelist / Kainoa Ubaldo-Brabo. All Rights Reserved.
*/

import { logMessage } from "../../utils/log.mjs";

/**
 *
 * @param {object} app object
 * @returns {void}
 */
export async function checkOrCreateUserFirebase(app) {
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
        plants: [],
    };
}
