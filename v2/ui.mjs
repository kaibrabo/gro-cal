export function initUI(app) {
    console.log("UI loaded", app);
    header(app);
}

function header(app) {
    try {
        // const logo = document.getElementById('logo');
        const login = document.getElementById("login");

        login.textContent = app.user ? "Logout" : "Login";

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
    } catch (err) {
        console.error(err);
    }
}
