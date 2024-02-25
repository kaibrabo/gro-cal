/*
    Copyright © 2024 Blumelist / Kainoa Ubaldo-Brabo. All Rights Reserved.
*/

import { logMessage } from "../../utils/log.mjs";
import { getUserPlants } from "../models/plantsModel.mjs";

export function getPlants(app) {
    logMessage("getPlants");
    return getUserPlants(app);
}
