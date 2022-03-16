// ****** GET EVENTS ******
// const getEventsData = async () => {
//   let url = `https://api.seatgeek.com/2/events?client_id=${sg_api_key}&lat=25.7617&lon=-80.1918&datetime_utc=2022-03-20`;
//   let events = await fetch(url);
//   let eventsJson = await events.json();
//   return eventsJson;
// };
// const eventsData = await getEventsData();

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
//   const amenitiesArray = [hotelJson.data[0]["address"]["line1"]];
//   const addressArray = [...hotelJson.data[0]["address"]];
//   console.log(addressArray);
//   const hotelDataObject = {
//     name: hotelJson.data[0]["name"],
//     description: hotelJson.data[0]["description"]["short"],
//     starRating: hotelJson.data[0]["starRating"],
//     phoneNumber: hotelJson.data[0]["phoneNumbers"],
//     email: hotelJson.data[0]["emails"],
//     amenities: hotelJson.data[0]["name"],
//     hotelImageUrl: hotelJson.data[0]["images"][0]["url"],
//     room1ImageUrl: hotelJson.data[0]["images"],
//     rooom2ImageUrl: hotelJson.data[0]["images"],
//     address: addressArray,
//     vacationId: "",
//   };
// };
// const hotelData = await getHotelData();

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