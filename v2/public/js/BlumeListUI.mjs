
async function main() {

    console.log("BlumelistUI: loading");

    landing();

    // check auth cookies?
    // unauthed -> landing

    // authed -> dashboard
};

function landing() {
    
    // Handle login button click
    const loginBtn = document.getElementById("login");
    
    loginBtn.addEventListener("click", async () => {
        // login screen
        window.location.href = "/login";
    });
}

main();