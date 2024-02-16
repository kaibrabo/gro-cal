/*
    Copyright © 2024 Blumelist / Kainoa Ubaldo-Brabo. All Rights Reserved.
*/ 
import { logMessage } from "../utils/log";

export function initUI(app) {
    logMessage("UI loaded");

    // DELETE for production
    console.log(app);

    navbar(app);
}

function navbar(app) {
    // select elements
    const logo = document.getElementById("logo");
    const login = document.getElementById("login");
    const userIcon = document.getElementById("user-icon");
    const userName = document.getElementById("user-name");
    const userEmail = document.getElementById("user-email");
    
    // set textcontent based on user
    login.textContent = app.user ? "logout" : "login";
    userIcon.textContent = app.user ? "account_circle" : "";
    userName.textContent = app.user ? app.user.displayName : "LOGIN";
    userEmail.textContent = app.user ? app.user.email : "";

    
    // event handlers
    logo.addEventListener("click", () => (location.reload(true)));

    login.addEventListener("click", async () => {
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
    });
}