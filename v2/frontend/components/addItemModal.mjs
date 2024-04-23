/*
    Copyright © 2024 Blumelist / Kainoa Ubaldo-Brabo. All Rights Reserved.
*/

import { addItem } from "../../backend/controllers/plantsController.mjs";
import { logMessage } from "../../utils/log.mjs";

export function addItemModal(app) {
    logMessage("addItemModal");

    const modal = document.createElement("div");
    modal.classList.add("modal");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // add form to modal
    const form = document.createElement("form");
    form.classList.add("add-item-form");

    // name label & input
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Name";
    
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";

    form.appendChild(nameLabel);
    form.appendChild(nameInput);

    // type label & input
    const typeLabel = document.createElement("label");
    typeLabel.textContent = "Type";
    typeLabel.htmlFor = "addItemTypeInput";
    
    const typeInput = document.createElement("select");
    typeInput.id = "addItemTypeInput";
    typeInput.name = "type";
    
    const sativa = document.createElement("option");
    sativa.value = "Sativa";
    sativa.textContent = "Sativa";
    
    const indica = document.createElement("option");
    indica.value = "Indica";
    indica.textContent = "Indica";
    
    const hybrid = document.createElement("option");
    hybrid.value = "Hybrid";
    hybrid.textContent = "Hybrid";
    
    typeInput.appendChild(sativa);
    typeInput.appendChild(indica);
    typeInput.appendChild(hybrid);

    form.appendChild(typeLabel);
    form.appendChild(typeInput);

    // start time - label & input
    const startTimeLabel = document.createElement("label");
    startTimeLabel.textContent = "Start Date";
    
    const startTimeInput = document.createElement("input");
    startTimeInput.type = "date";
    startTimeInput.name = "start-time";
    startTimeInput.addEventListener("change", (e) => calculateEndDate());

    form.appendChild(startTimeLabel);
    form.appendChild(startTimeInput);

    // veg to flower - label & input
    const vegToFlowerLabel = document.createElement("label");
    vegToFlowerLabel.textContent = "Flip Date (veg to flower)";
    
    const vegToFlowerInput = document.createElement("input");
    vegToFlowerInput.type = "date";
    vegToFlowerInput.name = "veg-to-flower";
    vegToFlowerInput.addEventListener("change", (e) => calculateEndDate());

    form.appendChild(vegToFlowerLabel);
    form.appendChild(vegToFlowerInput);

    // flower duration - label & input
    const flowerDurationLabel = document.createElement("label");
    flowerDurationLabel.textContent = "Flowering (days)";
    
    const flowerDurationInput = document.createElement("input");
    flowerDurationInput.type = "number";
    flowerDurationInput.min = "0";
    flowerDurationInput.name = "flower-duration";
    flowerDurationInput.addEventListener("change", (e) => calculateEndDate());

    form.appendChild(flowerDurationLabel);
    form.appendChild(flowerDurationInput);

    // end time - label & input
    const endTimeLabel = document.createElement("label");
    endTimeLabel.textContent = "End Date (computed)";
    
    const endTimeInput = document.createElement("input");
    endTimeInput.type = "date";
    endTimeInput.name = "end-time";
    endTimeInput.disabled = true; // start out disabled

    form.appendChild(endTimeLabel);
    form.appendChild(endTimeInput);

    // notes - label & input
    const notesLabel = document.createElement("label");
    notesLabel.textContent = "Notes";
    
    const notesInput = document.createElement("input");
    notesInput.type = "text";
    notesInput.name = "notes";

    form.appendChild(notesLabel);
    form.appendChild(notesInput);

    // update 'end time' to reflect ('veg-to-flower' + 'flower-duration)

    // add to firebase button
    const addButton = document.createElement("input");
    addButton.type = "submit";
    addButton.value = "Add Item";

    form.appendChild(addButton);
    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const fd = new FormData(form);
        const item = {
            name: fd.get("name"),
            type: fd.get("type"),
            startTime: fd.get("start-time"),
            vegToFlower: fd.get("veg-to-flower"),
            duration: fd.get("flower-duration"),
            endTime: fd.get("end-time"),
            notes: fd.get("notes"),
        };

        // send to firebase
        await addItem(app, item);

        // clear input
        form.reset();

        // close modal
        modal.remove();

        // refresh plants list
        window.location.reload();
    });

    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // remove modal on click
    modal.addEventListener("click", () => {
        
        modal.remove();
    });

    // prevent click propagation on modal content
    modalContent.addEventListener("click", (e) => {

        e.stopPropagation();
    });

    var calculateEndDate = () => {

        const vegToFlower = new Date(vegToFlowerInput.value);
        const endDate = new Date(vegToFlower);
        let duration = parseInt(flowerDurationInput.value);

        duration = duration >= 0 ? duration : 0;
        endDate.setDate(endDate.getDate() + duration);        
        endTimeInput.valueAsDate = endDate;
        endTimeInput.disabled = false;  // enabled once calculated
    }
}
