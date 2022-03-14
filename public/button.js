const toggle = document.querySelectorAll(".toggle")[0];
const links = document.querySelectorAll(".links")[0];

// toggle.addEventListener("click", () => {
//   links.classList.toggle("active");
// });

console.log("hi");

const form = document.querySelector(".form");
const submitButton = document.querySelector(".button");
submitButton.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("hello");
  let vacationsData = await db.Vacations.findAll();
  let vacationsParagraph = createElement("p");
  vacationsParagraph.innerText = vacationsData;
  form.append(vacationsParagraph);
});

// const clickMe = () => {
//   console.log("hai");
// };
// const button = document.querySelector(".button");
// button.addEventListener("click", clickMe);

// let vacationsData = await db.Vacations.findAll();
// let vacationsParagraph = createElement("p");
// vacationsParagraph.innerText = vacationsParagraph;
// vacationsParagraph.innerText = vacationsData;
// form.append(vacationsParagraph);
