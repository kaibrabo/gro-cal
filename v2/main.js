import { initFirebase } from "./firebase.mjs";
import { initUI } from "./ui.mjs";

// global app data
const APP = {
    user: null,
    firebase: null,
};

async function main() {
    // firestore
    APP.firebase = !APP.firebase ? initFirebase() : null;

    if (!APP.firebase) {
        console.error("firebase not loaded");
        return;
    }

    APP.firebase.auth.onAuthStateChanged(async (user) => {
        if (user) {
            APP.user = user;
            await checkOrCreateUserFirebase(APP, APP.user);
        } else {
            APP.user = null;
        }

        initUI(APP);
    });

    console.log("Main.js loaded");
}

main();

/**
 *
 * @param {object} app  object
 * @param {object} user object
 * @returns {void}
 */
async function checkOrCreateUserFirebase(app, user) {
    if (!app || !user || !app.firebase.db) {
        console.error("Invalid parameters passed to checkOrCreateUserFirebase");
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

            console.log("User already exists in Firestore", docSnap.data());
        }
    } catch (err) {
        console.error("Error in Firestore operation:", err);
    }
}

/**
 *
 * @param {object} user
 * @returns {object}
 */
function createUserData(user) {
    return {
        createdAt: new Date(),
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        inventory: [createItem(firstItem)],
    };
}

function createItem(item) {
    return {
        id: item.id,
        name: item.name,
        type: item.type,
        startVeg: item.startVeg,
        flowerTime: item.flowerTime,
        startFlower: item.startFlower,
    };
}
