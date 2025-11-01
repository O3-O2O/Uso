const URL = "https://68ce57f66dc3f350777eb99b.mockapi.io/user"

const loginForm = document.getElementById("subm")
const email = document.getElementById("fname");
const password = document.getElementById("lname");
const signup = document.getElementById("signed")

let menu = document.getElementById("menu_nav")
let avt = document.getElementById("avatar")

let users = []



fetch(URL)
  .then(response => response.json())
  .then(data => users = data)
  .catch(error => console.error("Lỗi:", error));



//hàm xử lí

const slides = document.querySelectorAll(".carousel img");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const dotsContainer = document.querySelector(".dots");

let index = 0;

// Tạo dots động
slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => showSlide(i));
  dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll(".dot");

// Hiển thị slide
function showSlide(i) {
  slides[index].classList.remove("active");
  dots[index].classList.remove("active");
  index = (i + slides.length) % slides.length;
  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

// Nút bấm
prevBtn.addEventListener("click", () => showSlide(index - 1));
nextBtn.addEventListener("click", () => showSlide(index + 1));

// Tự động chuyển slide
setInterval(() => showSlide(index + 1), 6000);


renderAccountMenu();
