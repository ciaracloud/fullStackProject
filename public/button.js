const toggle = document.querySelectorAll(".toggle")[0];
const links = document.querySelectorAll(".links")[0];

toggle.addEventListener("click", () => {
  links.classList.toggle("active");
});

const getVacationData = async () => {
  let url = "http://localhost:3000/db";
  let vacationData = await fetch(url);
  let vacationJson = await vacationData.json();
  return vacationJson;
};

const form = document.querySelector(".form");
const submitButton = document.querySelector(".button");
submitButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const vacationData = await getVacationData();
  console.log("hello");
  let vacationsParagraph = document.createElement("p");
  vacationsParagraph.innerText = vacationData;
  form.append(vacationsParagraph);
  return vacationData;
});
