/*
    Copyright © 2024 Blumelist / Kainoa Ubaldo-Brabo. All Rights Reserved.
*/

import { logMessage } from "../../utils/log.mjs";

/**
 * retrieves all plants matching user's id
 *
 * @param {object} app Global State Variable
 * @returns {object[]}
 */
export async function getUserPlants(app) {
    logMessage("getUserPlants");

    if (!app.user || !app.firebase || !app.user.firestore) {
        logMessage(
            "getUserPlants",
            `user: ${!!app.user},
            firebase: ${!!app.firebase},
            firestore: ${!!app.user.firestore}`
        );
        return;
    }

    // multiple documents in one request (Most efficient?)
    const q = app.firebase.query(
        app.firebase.collection(app.firebase.db, "plants"),
        app.firebase.where("user_id", "==", app.user.uid)
    );

    let docsSnapshot = await app.firebase.getDocs(q);

    let plants = [];

    if (!docsSnapshot.size) {
        logMessage("getUserPlants", "no_plants");
        return plants;
    }

    docsSnapshot.forEach((doc) => {
        let plant = doc.data();

        plants.push({
            id: doc.id,
            flower_duration: plant.flower_duration,
            name: plant.name,
            type: plant.type,
            notes: plant.notes,
            end_time: plant.end_time,
            start_time: plant.start_time,
            veg_to_flower: plant.veg_to_flower,
        });
    });

    return plants;
}

export async function addUserPlant(app, data) {
    logMessage("addUserPlant");

    const newItem = {
        end_time: data.endTime,
        flower_duration: data.duration,
        name: data.name,
        notes: data.notes,
        start_time: data.startTime,
        type: data.type,
        veg_to_flower: data.vegToFlower,
        user_id: app.user.uid,
    };

    const docRef = await app.firebase.addDoc(
        app.firebase.collection(app.firebase.db, "plants"),
        newItem
    );

    logMessage("addUserPlant", `doc id: ${docRef.id}`);
    return;
}

export async function updateUserPlant(app, data) {
    logMessage("updateUserPlant");

    const item = {
        end_time: data.endTime,
        flower_duration: data.duration,
        name: data.name,
        notes: data.notes,
        start_time: data.startTime,
        type: data.type,
        veg_to_flower: data.vegToFlower,
        user_id: app.user.uid,
    };

    // update via data.id
    const doc = app.firebase.doc(app.firebase.db, "plants", data.id);
    return await app.firebase.setDoc(doc, item);
}
