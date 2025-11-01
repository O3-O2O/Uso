const CART_API = "https://68e0cda693207c4b47956ccf.mockapi.io/orders";
const detail = document.getElementById("store_show_result");

// Lấy ID từ URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log(id);

const API_URL = `https://68d78eb92144ea3f6da5b1bd.mockapi.io/users/${id}`;

fetch(API_URL)
  .then(res => res.json())
  .then(p => {
    detail.innerHTML = `

                <div class="tq">
                    
                    <span class="mau_tq"><a href="../Page/store_container.html" class="store_change"><i class="fa-solid fa-cart-shopping"></i></a></span>
                    <span class="mau_tq">Uso!store</span>                 

                </div>

                <div class="div-modify">

                    <div class="store_main_2">
                        <div>
                            <img src="${p.bg_url}" class="img-size-modify">

                            <div class="info-modify">

                                <p class="orange-font">${p.detail}</p>
                                <p class="support-font">${p.some_info}</p>j

                            </div>
                        </div>

                        <button onclick="addToCart(${p.id})" class="btn-info">Thêm vào giỏ hàng</button>

                    </div>

                </div>
    `;
  });

function addToCart(productId) {
  console.log(productId);
  
  const user = JSON.parse(localStorage.getItem("user"))?.[0];
  if (!user) {
    alert("Bạn cần đăng nhập để thêm vào giỏ hàng");
    return;
  }

  fetch(CART_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: user.id,
      productId: productId,
      quantity: 1
    })
  }).then(() => {
    alert("Đã thêm vào giỏ hàng");
  });
}

renderAccountMenu();
