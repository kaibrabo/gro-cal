import { logMessage } from "../../utils/log.mjs";
import { loginUser } from "../../backend/controllers/userController.mjs";

export function navbar(app) {
    logMessage("navbar");

    // select elements
    const logo = document.getElementById("logo");
    const login = document.getElementById("login");
    const userIcon = document.getElementById("user-icon");
    const userName = document.getElementById("user-name");
    const userEmail = document.getElementById("user-email");

    // set textcontent based on user
    login.textContent = app.user ? "logout" : "login";
    userIcon.textContent = app.user ? "account_circle" : "";
    userIcon.title = app.user ? `${app.user.displayName}\n${app.user.email}` : "";
    userName.textContent = app.user ? app.user.displayName : "LOGIN";
    userEmail.textContent = app.user ? app.user.email : "";

    // event handlers
    logo.addEventListener("click", () => location.reload(true));

    login.addEventListener("click", () => loginUser(app));
}
