/*
    Copyright © 2024 Blumelist / Kainoa Ubaldo-Brabo. All Rights Reserved.
*/
// NODE
import path from "node:path";
import { fileURLToPath } from "node:url";

// API's
import express from "express";

// Routing
const app = express();
const port = 8080;

// directory of current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// access /public
app.use(express.static(__dirname + '/public'));

app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(port, () => main());


// import { initFirebase } from "./firebase.mjs";
// import Auth from "./features/Auth.mjs";

async function main() {
    console.log("App starting...");

    // // Initialize Firebase
    // const firebase = initFirebase();

    // // Auth
    // const auth = new Auth();
    
    // auth.login();

    console.log("App initialized successfully.");
}

// main();