import { logMessage } from "../../utils/log.mjs";

export function plantsList(app) {
    logMessage("plantsList");

    if (!app || !app.user || !app.user.plants) {
        logMessage("plantsList", "no_user");

        return;
    }

    const mainContent = document.getElementById("main-content");

    const plantsListSection = document.createElement("div");

    for (let plant of app.user.plants) {
        const data = {
            flower_duration: 65,
            name: "--name--",
            notes: "--notes--",
            start_time: "--start-time--",
            type: "--type--",
            user_id: "sNwMkSufWaPgGeYlMcmFqtmT3kz2",
            "veg-to-flower": "--veg-to-flower--",
        };

        let plantElement = document.createElement("div");

        // plant info
        let name = document.createElement("p");
        let type = document.createElement("p");
        let notes = document.createElement("p");
        let startTime = document.createElement("p");
        let vegToFlower = document.createElement("p");
        let flowerDuration = document.createElement("p");

        name.append(plant.name);
        type.append(plant.type);
        notes.append(plant.notes);
        startTime.append(plant.start_time);
        vegToFlower.append(plant.veg_to_flower);
        flowerDuration.append(plant.flower_duration);

        plantElement.append(
            name,
            type,
            startTime,
            vegToFlower,
            flowerDuration,
            notes
        );

        plantsListSection.append(plantElement);
    }

    mainContent.append(plantsListSection);
}
