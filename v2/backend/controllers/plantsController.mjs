/*
    Copyright © 2024 Blumelist / Kainoa Ubaldo-Brabo. All Rights Reserved.
*/

import { logMessage } from "../../utils/log.mjs";
import { getUserPlants } from "../models/plantsModel.mjs";

export function getPlants(app) {
    logMessage("getPlants");
    return getUserPlants(app);
}

export function displayAddItemModal() {
    logMessage("displayAddItemModal");

    // create modal
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    // add form to modal
    const form = document.createElement('form');
    form.classList.add('add-item-form');

    let nameLabel = document.createElement('label');
    let typeLabel = document.createElement('label');
    let startTimeLabel = document.createElement('label');
    let vegToFlowerLabel = document.createElement('label');
    let endTimeLabel = document.createElement('label');
    let flowerDurationLabel = document.createElement('label');
    let notesLabel = document.createElement('label');

    nameLabel.textContent = 'Name';
    typeLabel.textContent = 'Type';
    startTimeLabel.textContent = 'Start Date';
    vegToFlowerLabel.textContent = 'Flip Date (veg to flower)';
    endTimeLabel.textContent = 'End Date';
    flowerDurationLabel.textContent = 'Flowering Duration';
    notesLabel.textContent = 'Notes';
    
    let nameInput = document.createElement('input');
    let typeInput = document.createElement('input');
    let startTimeInput = document.createElement('input');
    let vegToFlowerInput = document.createElement('input');
    let endTimeInput = document.createElement('input');
    let flowerDurationInput = document.createElement('input');
    let notesInput = document.createElement('input');
    
    nameInput.type = 'text';
    typeInput.type = 'text';
    notesInput.type = 'text';
    startTimeInput.type = 'date';
    vegToFlowerInput.type = 'date';
    endTimeInput.type = 'date';
    flowerDurationInput.type = 'number';

    nameInput.name = 'name';
    typeInput.name = 'type';
    notesInput.name = 'notes';
    startTimeInput.name = 'start-time';
    vegToFlowerInput.name = 'veg-to-flower';
    endTimeInput.name = 'end-time';
    flowerDurationInput.name = 'flower-duration';

    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(typeLabel);
    form.appendChild(typeInput);
    form.appendChild(startTimeLabel);
    form.appendChild(startTimeInput);
    form.appendChild(vegToFlowerLabel);
    form.appendChild(vegToFlowerInput);
    form.appendChild(endTimeLabel);
    form.appendChild(endTimeInput);
    form.appendChild(flowerDurationLabel);
    form.appendChild(flowerDurationInput);
    form.appendChild(notesLabel);
    form.appendChild(notesInput);

    // update 'end time' to reflect ('veg-to-flower' + 'flower-duration) 

    // add to firebase button

    // clear input

    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // remove modal on click
    modal.addEventListener('click', () => {
        modal.remove();
    });

    // prevent click propagation on modal content
    modalContent.addEventListener('click', e => {
        e.stopPropagation();
    });
}
