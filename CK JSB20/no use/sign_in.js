const URL = "https://68ce57f66dc3f350777eb99b.mockapi.io/Uso"

const registerForm = document.getElementById("form_dn");

const username = document.getElementById("dnh");
const email = document.getElementById("gma");
const password = document.getElementById("mkh");
const confirmPassword = document.getElementById("re_mkh");

let users = [];
//lấy dữ liệu về từ api

reloadData()

function reloadData() {
  fetch(URL)
    .then(response => response.json())
    .then(data => users = data)
    .catch(error => console.error("Lỗi:", error));
}

function checkExistUser(username) {

  // duyệt qua các phần tử tìm xem có username nào trùng cái mình truyền vào k
  return users.some(user => user.username === username);

}

// hàm xử lý đăng ký
function handleRegister(event) {
    event.preventDefault(); // Ngăn sự kiện tự động reload của trình duyệt.

    const user = {
      username: username.value.trim(),
      email: email.value.trim(),
      password: password.value.trim(),
    };

    // kiểm tra điều kiện đăng ký
    if (username.value === "" || password.value === "" || confirmPassword.value === "") {
        alert("Vui lòng điền đầy đủ thông tin");
    }
    else if (password.value !== confirmPassword.value) {
        alert("Mật khẩu không khớp, vui lòng nhập lại");
    }
    else if (password.value.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự");
    }
    else if (checkExistUser(username.value)) {
        alert("Tên đăng nhập đã tồn tại, vui lòng chọn tên khác");
    }
    else {
        // điều kiện hoàn hảo
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })

        reloadData()
        alert("Đăng ký thành công, bây giờ bạn có thể đăng nhập");

        //chuyển hướng sang dang nhap
        location.href = "ck_jsb.html"

    }
}

registerForm.addEventListener("submit", handleRegister)
