/*
    Copyright © 2024 Blumelist / Kainoa Ubaldo-Brabo. All Rights Reserved.
*/
// NODE
import path from "node:path";
import { fileURLToPath } from "node:url";

// API's
import express from "express";
import { initFirebase } from "./firebase.mjs";

// Routing
const app = express();
const port = 8080;

// directory of current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// access /public
app.use(express.static(__dirname + '/public'));

// routes
app.get("/login", (_req, res) => {
    res.sendFile(path.join(__dirname, "./public/login.html"));
});

app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
});

app.listen(port, () => main());

async function main() {
    console.log("App starting...");

    // Initialize Firebase for Auth, DB
    initFirebase();

    console.log("App initialized successfully.");
}