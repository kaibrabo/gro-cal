/*
    Copyright © 2024 Blumelist / Kainoa Ubaldo-Brabo. All Rights Reserved.
*/

import { logMessage } from "./utils/log.mjs";
import { initUI } from "./frontend/ui.mjs";
import { initFirebase } from "./backend/db/firebase.mjs";
import { authCheck } from "./backend/controllers/userController.mjs";
import { getPlants } from "./backend/controllers/plantsController.mjs";

// global app data
// (need to figure out something better)
const app = {
    user: null,
    firebase: null,
};

// RUNS THE PROGRAM
main();

async function main() {
    // load firestore
    app.firebase = !app.firebase ? initFirebase() : null;

    if (!app.firebase) {
        logMessage("main", "firebase not loaded");
        return;
    }

    // persist authenticated user
    app.firebase.auth.onAuthStateChanged(async (user) => {
        if (!user) {
            app.user = null;
            app.userRef = null;
            logMessage("main", "no user");
        } else {
            app.user = user;
            app.userRef = await authCheck(app);
            app.user.plants = await getPlants(app);
        }

        

        // display UI
        initUI(app);
    });

    logMessage("main loaded");
}
