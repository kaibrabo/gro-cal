import { initFirebase } from "./firebase.mjs";
import { initUI } from "./ui.mjs";

// global app data
const APP = {
    user: null,
    firebase: null,
};

async function main(app) {
    // firestore
    app.firebase = !app.firebase ? initFirebase() : null;

    if (!app.firebase) {
        console.error("firebase not loaded");
        return;
    }

    try {
        app.firebase.auth.onAuthStateChanged(async (user) => {
            if (user) {
                app.user = user;
                await checkOrCreateUser(app, app.user, app.firebase.db);
            } else {
                app.user = null;
            }

            initUI(app);
        });

        console.log("Main.js loaded");
    } catch (err) {
        console.error(err);
        return null;
    }
}

main(APP);

async function checkOrCreateUser(app, user, db) {
    const userRef = app.firebase.doc(db, "users", user.uid);
    const docSnap = await app.firebase.getDoc(userRef);

    const userData = {
        createdAt: new Date(),
        uid: user.uid,
        accessToken: user.accessToken,
        displayName: user.displayName,
        email: user.email,
        inventory: [],
    };

    if (!docSnap.exists()) {
        await app.firebase.setDoc(userRef, userData);
        console.log("User created in firestore");
    } else {
        console.log("User already exists in firestore");
    }
}
