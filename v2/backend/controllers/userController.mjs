/*
    Copyright © 2024 Blumelist / Kainoa Ubaldo-Brabo. All Rights Reserved.
*/
import { logMessage } from "../../utils/log.mjs";
import { checkOrCreateUserFirebase } from "../models/userModel.mjs";

export async function authCheck(app) {
    logMessage("authCheck");
    return checkOrCreateUserFirebase(app);
}

export async function loginUser() {
    logMessage("loginUser");

    if (!app.firebase) {
        console.error("No Firebase Loaded.");
        return;
    }

    if (!app.user) {
        app.firebase.signInWithRedirect(
            app.firebase.auth,
            app.firebase.provider
        );
    } else {
        await app.firebase.auth.signOut(app.firebase.auth);
        app.user = null;
        location.reload(true);
    }
}
