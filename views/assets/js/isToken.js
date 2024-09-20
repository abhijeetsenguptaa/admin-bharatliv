let loginToken = sessionStorage.getItem('login-token');
let logoutButton = document.getElementById('logoutButton');


if (!loginToken) {
    // Blur the entire screen by applying the blur to the body element
    document.body.style.filter = "blur(5px)";  // Apply blur effect
    document.body.style.pointerEvents = "none";  // Disable all interactions with blurred content
    window.location.href = 'index.html';
}


logoutButton.addEventListener("click", ()=>{
    sessionStorage.clear();
    window.location.href = './index.html';
})