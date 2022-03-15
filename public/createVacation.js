// ****** GET HOTELS ******
// const getHotelData = async () => {
//   let url = `https://api.impala.travel/v1/hotels?end=2022-07-05&latitude=40.7128&longitude=-74.0060&radius=5000&sortBy=distance_m:desc&start=2022-07-01`;
//   let hotels = await fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "x-api-key": `${imp_api_key}`,
//     },
//   });
//   let hotelJson = await hotels.json();
//   return hotelJson;
// };
// const hotelData = await getHotelData();

// ****** GET EXCURIONS ******
// const getExcursions = async () => {
//   let url = `https://api.yelp.com/v3/businesses/search?location="Houston"&term="excursion"`;
//   let excursionInfo = await fetch(url, {
//     method: "get",
//     headers: {
//       Authorization: `Bearer ${yel_api_key}`,
//     },
//   });
//   let excursionJson = await excursionInfo.json();
//   return excursionJson;
// };
// const excursionData = await getExcursions();

//  ****** GET RESTAURANTS ******
// const getRestaurants = async () => {
//   let url = `https://api.yelp.com/v3/businesses/search?location="tokyo"&term="restaurant"`;
//   let restaurantInfo = await fetch(url, {
//     method: "get",
//     headers: {
//       Authorization: `Bearer ${yel_api_key}`,
//     },
//   });
//   let restaurantJson = await restaurantInfo.json();
//   return restaurantJson;
// };
// const restaurantData = await getRestaurants();

// ****** GET EVENTS ******
// const getEventsData = async () => {
//   let url = `https://api.seatgeek.com/2/events?client_id=${sg_api_key}&lat=25.7617&lon=-80.1918&datetime_utc=2022-03-20`;
//   let events = await fetch(url);
//   let eventsJson = await events.json();
//   return eventsJson;
// };
// const eventsData = await getEventsData();

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

// submitButton.onclick = () => console.log("hello");
submitButton.addEventListener("click", () => {
  createVacation();
});

// const getVacationData = async (form) => {
//   console.log(form);
//   let url = "http://localhost:3000/create_vacation";
//   let vacationData = await fetch(url, {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//     body: JSON.stringify(data),
//   });
//   let vacationJson = await vacationData.json();
//   return vacationJson;
// };

// const form = document.querySelector(".form");
// const submitButton = document.querySelector(".button");
// console.log(form);
// submitButton.addEventListener("click", async (e) => {
//   e.preventDefault();
//   const vacationData = await getVacationData(form);
//   console.log("hello");
//   let vacationsParagraph = document.createElement("p");
//   vacationsParagraph.innerText = vacationData;
//   form.append(vacationsParagraph);
//   return vacationData;
// });
