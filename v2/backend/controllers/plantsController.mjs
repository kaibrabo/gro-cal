/*
    Copyright © 2024 Blumelist / Kainoa Ubaldo-Brabo. All Rights Reserved.
*/

import { addItemModal } from "../../frontend/components/addItemModal.mjs";
import { logMessage } from "../../utils/log.mjs";
import { getUserPlants, addUserPlant } from "../models/plantsModel.mjs";

export function getPlants(app) {

    logMessage("getPlants");
    
    return getUserPlants(app);
}

export function displayAddItemModal(app) {

    logMessage("displayAddItemModal");

    return addItemModal(app);
}

export async function addItem(app, data) {
    
    logMessage("addItem");

    return await addUserPlant(app, data);
}
