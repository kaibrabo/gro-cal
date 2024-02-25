/*
    Copyright © 2024 Blumelist / Kainoa Ubaldo-Brabo. All Rights Reserved.
*/

export function logMessage(method = "", text = "") {
    let date = new Date();

    date = date.toISOString().replace("T", " ").replace("Z", "");

    let message = `(${date})::${method}\n`;

    message += text;

    console.log(message);

    return;
}
