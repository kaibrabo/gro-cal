export function initUI({ firebase }) {
    console.log("UI loaded", firebase);
    header(firebase.auth);
}

function header(auth) {
    // const logo = document.getElementById('logo');
    const login = document.getElementById('login');

    login.addEventListener('click', () => {
        console.log("clicked", auth);
    });
}