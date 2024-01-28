export function initUI(app) {
    console.log("UI loaded", app);

    if (app.user) collection(app.user);

    header(app);
}

function header(app) {
    try {
        // const logo = document.getElementById('logo');
        const login = document.getElementById("login");
        const userEmail = document.getElementById("userEmail");

        login.textContent = app.user ? "Logout" : "Login";
        userEmail.textContent = app.user ? app.user.email : "";

        login.addEventListener("click", async () => {
            if (!app.firebase) {
                console.error("No Firebase Loaded.");
                return;
            }

            if (!app.user) {
                app.firebase.signInWithRedirect(
                    app.firebase.auth,
                    app.firebase.provider
                );
            } else {
                await app.firebase.auth.signOut(app.firebase.auth);
                app.user = null;
            }
        });
    } catch (err) {
        console.error(err);
    }
}

function collection(user) {
    try {
        const collection = document.getElementById("collection");

        if (!user.firestore || !user.firestore.inventory.length) {
            const noItems = document.createTextNode("no items");

            collection.appendChild(noItems);

            return;
        }

        const box = document.createElement("div");

        for (let item of user.firestore.inventory) {
            console.log("ITEM:", item);

            const elementId = document.createTextNode(item.id);
            const elementName = document.createTextNode(item.name);
            const elementType = document.createTextNode(item.type);
            const elementStartVeg = document.createTextNode(item.startVeg);
            const elementFlowerTime = document.createTextNode(item.flowerTime);
            const elementStartFlower = document.createTextNode(item.startFlower);

            box.appendChild(
                elementId,
                elementName,
                elementType,
                elementStartVeg,
                elementStartFlower,
                elementFlowerTime,
            );
        }

        collection.appendChild(box);
    } catch (err) {
        console.error(err);
    }
}
