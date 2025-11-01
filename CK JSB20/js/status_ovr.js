// --- Render menu avatar ---
// Lấy user từ localStorage
function renderAccountMenu() {
  const user = JSON.parse(localStorage.getItem("user"));
}

function logOut(){

    localStorage.removeItem("user");
    location.href="login_page.html"

}