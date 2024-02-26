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

    if (!app.user || !app.firebase) {
        logMessage(
            "getUserPlants",
            `user: ${!!app.user} firebase: ${!!app.firebase}`
        );
        return;
    }

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
