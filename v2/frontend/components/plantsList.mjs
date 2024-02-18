import { logMessage } from "../../utils/log.mjs";

export function plantsList(app) {
    logMessage("plantsList");

    if (!app || !app.user || !app.user.plants) {
        logMessage("plantsList", "no_user");

        return;
    }

    const mainContent = document.getElementById("main-content");

    // Plants Section
    const plantsTableContainer = document.createElement("table");
    const plantsTableBody = document.createElement("tbody");

    // plant table labels
    let plantLabelRow = document.createElement("tr");
    plantLabelRow.classList.add('plantLabelItem');

    let name = document.createElement("td");
    let type = document.createElement("td");
    let notes = document.createElement("td");
    let startTime = document.createElement("td");
    let vegToFlower = document.createElement("td");
    let flowerDuration = document.createElement("td");

    name.append('Name');
    type.append('Type');
    notes.append('Notes');
    startTime.append('Start');
    vegToFlower.append('Switch');
    flowerDuration.append('Flower Time');

    plantLabelRow.append(
        name,
        type,
        startTime,
        vegToFlower,
        flowerDuration,
        notes
    );

    // add each table row
    plantsTableBody.append(plantLabelRow);

    for (let plant of app.user.plants) {
        let plantRow = document.createElement("tr");
        plantRow.classList.add('plantItem');

        // plant info
        name = document.createElement("td");
        type = document.createElement("td");
        notes = document.createElement("td");
        startTime = document.createElement("td");
        vegToFlower = document.createElement("td");
        flowerDuration = document.createElement("td");

        name.append(plant.name);
        type.append(plant.type);
        notes.append(plant.notes);
        startTime.append(plant.start_time);
        vegToFlower.append(plant.veg_to_flower);
        flowerDuration.append(plant.flower_duration);

        plantRow.append(
            name,
            type,
            startTime,
            vegToFlower,
            flowerDuration,
            notes
        );

        // add each table row
        plantsTableBody.append(plantRow);
    }

    // add tbody to table
    plantsTableContainer.append(plantsTableBody);

    // add to main section
    mainContent.append(plantsTableContainer);
}
