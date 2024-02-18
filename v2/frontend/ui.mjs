/*
    Copyright © 2024 Blumelist / Kainoa Ubaldo-Brabo. All Rights Reserved.
*/ 
import { logMessage } from "../utils/log.mjs";
import { navbar } from "./components/navbar.mjs";
import {plantsList} from "./components/plantsList.mjs"

export function initUI(app) {
    // DELETE for production
    console.log(app);
    
    // load components
    navbar(app);
    plantsList(app);

    logMessage("UI loaded");
}