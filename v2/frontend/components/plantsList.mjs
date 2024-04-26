import { logMessage } from "../../utils/log.mjs";
import { editItemModal } from "./editItemModal.mjs";

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
    const plantsTitle = document.createElement("h2");
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

    addRowToTable(app, plantsTableHead, LABELS, "th");

    // add head labels to table
    plantsTableContainer.appendChild(plantsTableHead);

    // add each plant to body
    for (let plant of app.user.plants) {
        addRowToTable(app, plantsTableBody, plant, "td");
    }

    // add tbody to table
    plantsTableContainer.appendChild(plantsTableBody);

    // add table to main content
    mainContentInnerContainer.appendChild(plantsTableContainer);
}

function addRowToTable(app, table, data, cellType) {
    let row = document.createElement("tr");
    row.classList.add("row-item");

    let name = document.createElement(cellType);
    let type = document.createElement(cellType);
    let notes = document.createElement(cellType);
    let endTime = document.createElement(cellType);
    let startTime = document.createElement(cellType);
    let vegToFlower = document.createElement(cellType);
    let flowerDuration = document.createElement(cellType);

    name.append(data.name);
    type.append(data.type);
    notes.append(data.notes);
    endTime.append(data.end_time);
    startTime.append(data.start_time);
    vegToFlower.append(data.veg_to_flower);
    flowerDuration.append(data.flower_duration);

    let options = null;

    if (cellType == "th") {
        options = document.createElement("th");
        options.append("Options");
    }

    let editBtn = document.createElement("span");
    let deleteBtn = document.createElement("span");

    if (cellType == "td") {
        row.id = data.id;

        editBtn.classList.add("material-symbols-outlined");
        editBtn.textContent = "edit_note";
        deleteBtn.classList.add("material-symbols-outlined");
        deleteBtn.textContent = "delete_forever";

        options = document.createElement("td");
        options.id = "row-options";
        options.appendChild(editBtn);
        options.appendChild(deleteBtn);
    }

    editBtn.addEventListener("click", (event) => {
        event.preventDefault();

        editItemModal(app, data);
    });

    row.append(
        name,
        type,
        startTime,
        vegToFlower,
        endTime,
        flowerDuration,
        notes,
        options
    );

    // add each table row
    table.append(row);
}
