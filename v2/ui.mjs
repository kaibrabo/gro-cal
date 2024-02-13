/*
    Copyright © 2024 Blumelist / Kainoa Ubaldo-Brabo. All Rights Reserved.
*/ 

export function initUI(app) {
    console.log("UI loaded", app);

    if (app.user) collection(app.user);

    navbar(app);
}

function navbar(app) {
    // select elements
    const login = document.getElementById("login");
    const userIcon = document.getElementById("user-icon");
    const userName = document.getElementById("user-name");
    const userEmail = document.getElementById("user-email");
    
    // set textcontent based on user
    userIcon.textContent = app.user ? "account_circle" : "";
    userName.textContent = app.user ? app.user.displayName : "LOGIN";
    userEmail.textContent = app.user ? app.user.email : "";
    login.textContent = app.user ? "logout" : "login";

    
    // event handlers
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
        }
    });
}

function collection(user) {

}
