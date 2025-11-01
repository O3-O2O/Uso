const CART_API = "https://68e0cda693207c4b47956ccf.mockapi.io/orders";
const PRODUCT_API = "https://68d78eb92144ea3f6da5b1bd.mockapi.io/users";

const cartBody = document.getElementById("cart-body");
const user = JSON.parse(localStorage.getItem("user"))?.[0]; 

console.log(user)

// function loadCart() {
//   fetch(CART_API)
//     .then(res => res.json())
//     .then(cart => {
//       // Lọc theo user hiện tại
//       const userCart = cart.filter(c => c.userId == user.id);
//       console.log(userCart);
      
//       cartBody.innerHTML = "";

//       // Dùng Promise.all để đợi tất cả sản phẩm load xong
//       const promises = userCart.map(item => {
//         return fetch(`${PRODUCT_API}/${item.productId}`)
//           .then(pRes => pRes.json())
//           .then(product => {

//             cartBody.innerHTML += `
//               <div class="wait-pay">

//                 <span class="name-pay">${product.detail}</span>

//                 <div class="modify-pay">

//                     <span class="name-pay">1 đơn vị</span>
//                     <span class="name-pay">${product.cost} $</span>
//                     <button class="name-pay btn-pay" onclick="deleteItem(${item.id})">x</button>

//                 </div>

//             </div>
//             `;

//           // cartBody.innerHTML += `
//           //     <tr>
//           //       <td>${product.product_title}</td>
//           //       <td>${product.product_price} ₫</td>
//           //       <td>${item.quantity}</td>
//           //       <td>${product.product_price * item.quantity} ₫</td>
//           //       <td><button class="btn btn-danger btn-sm" onclick="deleteItem(${item.id})">Xóa</button></td>
//           //     </tr>
//           //   `;
            
//           });
//       });

//       return Promise.all(promises);
//     })
//     .catch(err => console.error("Lỗi loadCart:", err));
// }

function loadCart() {
  fetch(CART_API)
    .then(res => res.json())
    .then(cart => {
      if (!user || !user.id) {
        cartBody.innerHTML = "<p>Vui lòng đăng nhập để xem giỏ hàng.</p>";
        return;
      }

      const userCart = cart.filter(c => String(c.userId) === String(user.id));

      const groupedCart = {};
      userCart.forEach(item => {
        if (groupedCart[item.productId]) {
          groupedCart[item.productId].quantity += 1;
          groupedCart[item.productId].ids.push(item.id);
        } else {
          groupedCart[item.productId] = { ...item, quantity: 1, ids: [item.id] };
        }
      });

      cartBody.innerHTML = "";

      const promises = Object.values(groupedCart).map(item => {
        return fetch(`${PRODUCT_API}/${item.productId}`)
          .then(pRes => pRes.json())
          .then(product => {
            cartBody.innerHTML += `
              <div class="wait-pay">
                <span class="name-pay">${product.detail}</span>
                <div class="modify-pay">
                    <span class="name-pay">${item.quantity} đơn vị</span>
                    <span class="name-pay">${product.cost * item.quantity} $</span>
                    <button class="name-pay btn-pay delete-btn" data-ids='${JSON.stringify(item.ids)}'>x</button>
                </div>
              </div>
            `;
          });
      });

      Promise.all(promises).then(() => {
        document.querySelectorAll(".delete-btn").forEach(btn => {
          btn.addEventListener("click", async (e) => {
            const ids = JSON.parse(e.target.getAttribute("data-ids"));
            if (!confirm(`Xóa ${ids.length} sản phẩm khỏi giỏ hàng?`)) return;

            for (const id of ids) {
              await fetch(`${CART_API}/${id}`, { method: "DELETE" });
            }

            alert("Đã xóa sản phẩm!");
            loadCart();
          });
        });
      });
    })
    .catch(err => console.error("Lỗi loadCart:", err));
}



// function deleteItem(id) {
//   fetch(`${CART_API}/${id}`, { method: "DELETE" })
//     .then(() => {
//       loadCart();
//     })
//     .catch(err => console.error("Lỗi deleteItem:", err));
// }

function deleteGroupedItems(ids) {
  if (!Array.isArray(ids) || ids.length === 0) return;

  // Xác nhận trước khi xóa
  if (!confirm(`Xóa ${ids.length} sản phẩm khỏi giỏ hàng?`)) return;

  // Xóa lần lượt từng item trong nhóm
  Promise.all(
    ids.map(id => fetch(`${CART_API}/${id}`, { method: "DELETE" }))
  )
  .then(() => {
    alert("Đã xóa sản phẩm khỏi giỏ hàng!");
    loadCart(); // Cập nhật lại danh sách
  })
  .catch(err => console.error("Lỗi khi xóa nhóm sản phẩm:", err));
}


function paid() {
  fetch(CART_API)
    .then(res => res.json())
    .then(async (cart) => {
      if (!user || !user.id) {
        alert("Vui lòng đăng nhập trước khi thanh toán!");
        return;
      }

      // Kiểm tra dữ liệu user & cart
      console.log("User hiện tại:", user);
      console.log("Toàn bộ giỏ hàng:", cart);

      // Lọc đúng sản phẩm của user (ép kiểu sang string để khớp)
      const userCart = cart.filter(c => String(c.userId) === String(user.id));

      console.log("Giỏ hàng của user:", userCart);

      if (userCart.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
      }

      if (!confirm(`Xác nhận thanh toán ${userCart.length} sản phẩm?`)) return;

      // Dùng for...of để đảm bảo DELETE chạy tuần tự
      for (const item of userCart) {
        console.log(`Đang xóa đơn hàng ID: ${item.id}`);
        try {
          await fetch(`${CART_API}/${item.id}`, { method: "DELETE" });
        } catch (err) {
          console.error(`Lỗi khi xóa đơn hàng ${item.id}:`, err);
        }
      }

      // Đợi 1 chút để MockAPI cập nhật hoàn tất
      await new Promise(resolve => setTimeout(resolve, 800));

      alert("Thanh toán thành công! Giỏ hàng đã được làm trống.");
      loadCart(); // Tải lại giao diện sau khi xóa
    })
    .catch(err => console.error("Lỗi lấy giỏ hàng:", err));
}






loadCart();