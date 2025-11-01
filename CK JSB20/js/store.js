const API_URL = "https://68d78eb92144ea3f6da5b1bd.mockapi.io/users"

const container = document.getElementById("store_div");

fetch(API_URL)
    .then(response => response.json())
    .then(data => renderProducts(data))
    .catch(error => console.error("Lỗi:", error));

function renderProducts(data) {
    console.log(data);
    

    let itemHTML = "";

    data.forEach(product => {
        itemHTML += `
                        <button onclick="handelDetail(${product.id})" style="border: none;"><div class="store_ha" style="background-image:url('${product.bg_url}');">

                            <div class="store_contain">

                                <p class="store_chu_lon">${product.detail}</p>

                            </div>

                        </div></button>`})
        
    container.innerHTML = itemHTML;
}

function handelDetail(prId) {
    console.log(prId)
    location.href = `store_show.html?id=${prId}`;
}

renderAccountMenu();

