import { initFirebase } from './firebase.mjs';
import { initUI } from './ui.mjs';

function main() {
    console.log("Main.js loaded");
    // auth, firestore
    const firebase = initFirebase();

    const lib = { firebase };

    initUI(lib);
}
main();

