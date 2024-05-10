import { removeItem } from "../../backend/controllers/plantsController.mjs";
import { logMessage } from "../../utils/log.mjs";
import { editItemModal } from "./editItemModal.mjs";
import { displayAddItemModal } from "../../backend/controllers/plantsController.mjs";

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

    // Add Plants
    const addPlantButton = document.createElement("button");
    addPlantButton.id = "add-item-btn";
    addPlantButton.textContent = "Add";
    addPlantButton.addEventListener("click", () => displayAddItemModal(app));

    const plantListHeader = document.createElement("div");
    plantListHeader.id = "plant-list-header";
    plantListHeader.appendChild(plantsTitle)
    plantListHeader.appendChild(addPlantButton)
    
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
    mainContentInnerContainer.appendChild(plantListHeader);
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

    type.append(data.type);
    endTime.append(data.end_time);
    startTime.append(data.start_time);
    vegToFlower.append(data.veg_to_flower);
    flowerDuration.append(data.flower_duration);
    notes.append(`${data.notes.length > 20 ? (data.notes.slice(0, 20) + "...") : data.notes}`);
    name.append(`${data.name.length > 13 ? (data.name.slice(0, 13) + "...") : data.name}`);

    let options = null;

    if (cellType == "th") {
        options = document.createElement("th");
        options.append("Options");
    }

    let editBtn = document.createElement("span");
    let deleteBtn = document.createElement("span");

    if (cellType == "td") {
        row.id = data.id;

        notes.title = data.notes;
        notes.id = "notes-data"

        editBtn.classList.add("material-symbols-outlined");
        editBtn.textContent = "edit_note";
        deleteBtn.classList.add("material-symbols-outlined");
        deleteBtn.textContent = "delete_forever";

        options = document.createElement("td");
        options.id = "row-options";
        options.appendChild(editBtn);
        options.appendChild(deleteBtn);
    }

    editBtn.addEventListener("click", async(event) => {
        // stop refresh
        event.preventDefault();

        editItemModal(app, data);
    });

    deleteBtn.addEventListener("click", async (event) => {
        // stop refresh
        event.preventDefault();

        if (window.confirm(`Are you sure you want to delete '${data.name}' permanently?`)) {
            await removeItem(app, data);

            // refresh plants list
            window.location.reload();
        }
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
