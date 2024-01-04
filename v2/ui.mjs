export function initUI(app) {
    console.log("UI loaded", app);
    header(app);
}

function header(app) {
    // const logo = document.getElementById('logo');
    const login = document.getElementById('login');

    if (app.user) {
        login.textContent = app.user.displayName;
    }

    login.addEventListener('click', async () => {
        if (!app.firebase) { 
            console.error("No Firebase Loaded."); 
            return;
        }

        app.firebase.signInWithRedirect(app.firebase.auth, app.firebase.provider);        
    });
}
