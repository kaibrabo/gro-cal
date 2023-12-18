import { initFirebase } from './firebase.mjs';
import { initUI } from './ui.mjs';

async function main() {
    // global app data
    const app = {};

    // auth, firestore
    app.firebase = !app.firebase ? initFirebase() : null;
    
    if (!app.firebase) {
        console.error("firebase not loaded");
        return;
    }

    await handleGoogleAuthRedirect(app);
    
    initUI(app);

    console.log("Main.js loaded");
}
main();

async function handleGoogleAuthRedirect(app) {
    try {

        const result = await app.firebase.getRedirectResult(app.firebase.auth);
    
        if (result) {
            console.log("res:", result.user);
            app.user = result.user;
            return;
        }
    } 
    catch(err) {
        console.error(err);
    }

    return;
}

