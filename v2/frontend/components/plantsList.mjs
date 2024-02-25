import { logMessage } from "../../utils/log.mjs";

export function plantsList(app) {
    logMessage("plantsList");

    if (!app || !app.user || !app.user.plants) {
        logMessage("plantsList", "no_user");

        return;
    }

    const mainContent = document.getElementById("main-content");
    const mainContentInnerContainer = document.createElement("div");
    mainContentInnerContainer.id = "main-content-inner";

    // set inner container div to hold all main content
    mainContent.append(mainContentInnerContainer);

    // Plants Title
    const plantsTitle = document.createElement("h1");
    plantsTitle.textContent = "Plants";
    mainContentInnerContainer.append(plantsTitle);

    // Plants Section
    const plantsTableContainer = document.createElement("table");
    const plantsTableBody = document.createElement("tbody");

    // add plant table labels
    const LABELS = {
        name: "Name",
        type: "Type",
        start_time: "Start",
        veg_to_flower: "Switch",
        flower_duration: "Flower Time",
        notes: "Notes",
    };

    addRowToTable(plantsTableBody, LABELS);

    // add each plant to table
    for (let plant of app.user.plants) {
        addRowToTable(plantsTableBody, plant);
    }

    // add tbody to table
    plantsTableContainer.append(plantsTableBody);

    // add to main section
    mainContentInnerContainer.append(plantsTableContainer);
}

function addRowToTable(table, data) {
    let row = document.createElement("tr");
    row.classList.add("row-item");

    let name = document.createElement("td");
    let type = document.createElement("td");
    let notes = document.createElement("td");
    let startTime = document.createElement("td");
    let vegToFlower = document.createElement("td");
    let flowerDuration = document.createElement("td");

    name.append(data.name);
    type.append(data.type);
    notes.append(data.notes);
    startTime.append(data.start_time);
    vegToFlower.append(data.veg_to_flower);
    flowerDuration.append(data.flower_duration);

    row.append(name, type, startTime, vegToFlower, flowerDuration, notes);

    // add each table row
    table.append(row);
}
