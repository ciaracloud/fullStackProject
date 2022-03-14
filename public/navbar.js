const toggle = document.querySelectorAll(".toggle")[0];
const links = document.querySelectorAll(".links")[0];

toggle.addEventListener("click", () => {
  links.classList.toggle("active");
});
