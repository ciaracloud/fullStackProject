const toggle = document.querySelectorAll(".toggle")[0];
const links = document.querySelectorAll(".links")[0];

toggle.addEventListener("click", () => {
  links.classList.toggle("active");
});

const form = document.querySelector(".form");
const submitButton = document.querySelector(".button");
submitButton.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("hello");
  let vacationsParagraph = createElement("p");
  form.append(vacationsParagraph);
});
