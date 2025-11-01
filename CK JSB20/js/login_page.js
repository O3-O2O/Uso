document.addEventListener("DOMContentLoaded", function () {

    
    

    const URL = "https://68ce57f66dc3f350777eb99b.mockapi.io/user";

    const loginForm = document.getElementById("subm");
    const email = document.getElementById("fname");
    const password = document.getElementById("lname");
    const login = document.getElementById("btn-log");
    const catcha = document.getElementById("catcha-random")
    const catcha_show = document.getElementById("catcha-take")

    let chuCai = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomChuoi = "";

    for (let i = 0; i < 5; i++) {
                randomChuoi += chuCai.charAt(Math.floor(Math.random() * chuCai.length));
            }
    console.log(randomChuoi);
    catcha.textContent = randomChuoi

    let users = [];

    login.disabled = true;

    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            users = data;
            login.disabled = false;
        });

    function handleLogin(event) {
        event.preventDefault();

        console.log("username:", email.value);
        console.log("password:", password.value);
        console.log("catcha:",catcha_show.value)
        
        if (email.value === "" || password.value === "") {
            alert("Vui lòng điền đầy đủ thông tin");  
        }else if(catcha_show.value==="" || catcha_show.value!= randomChuoi){

            alert("Vui lòng điền đúng captcha")

        } else {
            for (let i = 0; i < users.length; i++) {
                if (users[i].username === email.value && users[i].password === password.value && randomChuoi === catcha_show.value) {
                    alert("Đăng nhập thành công");
                    localStorage.setItem("user", JSON.stringify(users));
                    location.href = "ck_jsb.html";
                    return
                } else if (i === users.length - 1) {
                    alert("Tên đăng nhập hoặc mật khẩu không đúng, vui lòng thử lại");
                }
            }
        }
    }

    loginForm.addEventListener("submit", handleLogin);


























    const registerForm = document.getElementById("form_dn");

    const username_1 = document.getElementById("dnh");
    const email_1 = document.getElementById("gma");
    const password_1 = document.getElementById("mkh");
    const confirmPassword = document.getElementById("re_mkh");

    let users_1 = [];
    //lấy dữ liệu về từ api

    reloadData()

    function reloadData() {
        fetch(URL)
        .then(response => response.json())
        .then(data => users_1 = data)
        .catch(error => console.error("Lỗi:", error));
    }

    function checkExistUser(username) {

        // duyệt qua các phần tử tìm xem có username nào trùng cái mình truyền vào k
        return users_1.some(user => user.username === username);

    }

    // hàm xử lý đăng ký
    function handleRegister(event) {
        event.preventDefault(); // Ngăn sự kiện tự động reload của trình duyệt.

        const user = {
            username: username_1.value.trim(),
            email: email_1.value.trim(),
            password: password_1.value.trim(),
        };

        // kiểm tra điều kiện đăng ký
        if (username_1.value === "" || password_1.value === "" || confirmPassword.value === "") {
            alert("Vui lòng điền đầy đủ thông tin");
        }
        else if (password_1.value !== confirmPassword.value) {
            alert("Mật khẩu không khớp, vui lòng nhập lại");
        }
        else if (password_1.value.length < 6) {
            alert("Mật khẩu phải có ít nhất 6 ký tự");
        }
        else if (checkExistUser(username_1.value)) {
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

















    






    
});

const bgCh = document.getElementById("bg-ch");

function login_changer(event) {
    // Nếu có event, ngăn reload form
    if(event) event.preventDefault();

    
    // Đảm bảo phần tử có position để di chuyển
    bgCh.style.position = "absolute";
    // Di chuyển sang phải 400px
    bgCh.style.left = "auto";
    // Nếu có set right thì xóa để không chồng chéo
    bgCh.style.right = "0px";
}

function signIn_changer(event) {
    if(event) event.preventDefault();

    bgCh.style.position = "absolute";
    // Quay về trái 0px
    bgCh.style.left = "0px";
    bgCh.style.right = "auto";
}