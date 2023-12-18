export function initUI(fb) {
    console.log("UI loaded", fb);
    header();
}

function header() {
    const logo = document.getElementById('logo');
    const login = document.getElementById('login');

    login.addEventListener( 'click', () => { 
        console.log("clicked"); 
    });
}