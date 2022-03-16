const submitButton = document.querySelector(".submitButton");

const createVacation = async () => {
  const inputFirstName = document.querySelector(".firstNameInput").value;
  const inputLastName = document.querySelector(".lastNameInput").value;
  const inputStartDate = document.querySelector(".startDateInput").value;
  const inputEndDate = document.querySelector(".endDateInput").value;
  const inputCity = document.querySelector(".cityInput").value;

  const vacationToCreate = {
    firstName: inputFirstName,
    lastName: inputLastName,
    startDate: inputStartDate,
    endDate: inputEndDate,
    city: inputCity,
  };

  const createNewVacation = await fetch(
    "http://localhost:3000/create_vacation",
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(vacationToCreate),
    }
  );
  console.log(createNewVacation);
  if (createNewVacation.status === 200) {
    window.location.assign("/hotels");
  } else {
    window.alert("Bruh, you messed up somewhere");
  }
};

submitButton.addEventListener("click", () => {
  createVacation();
});

//********************navbar funcitonality */
const toggle = document.querySelectorAll(".toggle")[0];
const links = document.querySelectorAll(".links")[0];

toggle.addEventListener("click", () => {
  links.classList.toggle("active");
});
//**********************end navbar functionality */
