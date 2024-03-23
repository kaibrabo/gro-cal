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
    mainContent.appendChild(mainContentInnerContainer);

    // Plants Title
    const plantsTitle = document.createElement("h1");
    plantsTitle.textContent = "Plants";
    mainContentInnerContainer.appendChild(plantsTitle);

    // Plants Section
    const plantsTableContainer = document.createElement("table");
    const plantsTableHead = document.createElement("thead");
    const plantsTableBody = document.createElement("tbody");

    // add labels to table head
    const LABELS = {
        name: "Name",
        type: "Type",
        start_time: "Start",
        veg_to_flower: "Switch",
        flower_duration: "Flower (days)",
        end_time: "End",
        notes: "Notes",
    };

    addRowToTable(plantsTableHead, LABELS, "th");

    // add head labels to table
    plantsTableContainer.appendChild(plantsTableHead);

    // add each plant to body
    for (let plant of app.user.plants) {
        addRowToTable(plantsTableBody, plant, "td");
    }

    // add tbody to table
    plantsTableContainer.appendChild(plantsTableBody);

    // add table to main content
    mainContentInnerContainer.appendChild(plantsTableContainer);
}

function addRowToTable(table, data, cellType) {
    let row = document.createElement("tr");
    row.classList.add("row-item");

    let name = document.createElement(cellType);
    let type = document.createElement(cellType);
    let notes = document.createElement(cellType);
    let endTime = document.createElement(cellType);
    let startTime = document.createElement(cellType);
    let vegToFlower = document.createElement(cellType);
    let flowerDuration = document.createElement(cellType);

    console.log("ENDTIME", data);

    name.appendChild(data.name);
    type.appendChild(data.type);
    notes.appendChild(data.notes);
    endTime.appendChild(data.end_time);
    startTime.appendChild(data.start_time);
    vegToFlower.appendChild(data.veg_to_flower);
    flowerDuration.appendChild(data.flower_duration);

    row.appendChild(name, type, startTime, vegToFlower, endTime, flowerDuration, notes);

    // add each table row
    table.appendChild(row);
}
