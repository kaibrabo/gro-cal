/*
    Copyright © 2024 Blumelist / Kainoa Ubaldo-Brabo. All Rights Reserved.
*/
import { logMessage } from "../utils/log.mjs";
import { navbar } from "./components/navbar.mjs";
import { plantsList } from "./components/plantsList.mjs";

export function initUI(app) {
    logMessage("initUI");
    
    // load components
    navbar(app);

    if (app.user) {
        plantsList(app);
    }
    
    // add to main section (remove loading)
    const mainContent = document.querySelector("#main-content");
    const loading = document.querySelector("#main-content-loading");
    mainContent.removeChild(loading);
    
    logMessage("UI loaded");
}
