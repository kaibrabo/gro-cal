import { initFirebase } from './firebase.mjs';
import { initUI } from './ui.mjs';

async function main() {
    // global app data
    const app = {};

    // firestore
    app.firebase = !app.firebase ? initFirebase() : null;
    
    if (!app.firebase) {
        console.error("firebase not loaded");
        return;
    }

    // handle authenticated user
    app.user = await handleGoogleAuthRedirect(app);
    
    // UI
    initUI(app);

    console.log("Main.js loaded");
}
main();

async function handleGoogleAuthRedirect(app) {
    try {
        const result = await app.firebase.getRedirectResult(app.firebase.auth);
    
        if (result) {
            return result.user;
        }
    } 
    catch(err) {
        console.error(err);    
    }
}

