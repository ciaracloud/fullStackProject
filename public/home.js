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

// ****** HOTEL DATA ******
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
//     vacationId: vacationId,
//   };

const yel_api_key = "";
const sg_api_key = "";

const searchButton = document.querySelector(".searchButton");
const getRestaurantsData = async (city, vacationId) => {
  const restaurantObject = {
    city: city,
    url: `https://api.yelp.com/v3/businesses/search?location="${city}"&term="restaurant"&limit=3`,
    yel_api_key: `${yel_api_key}`,
  };
  console.log(restaurantObject);
  let restaurantInfo = await fetch("http://localhost:3000/get_restaurants", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(restaurantObject),
  });
  let restaurantsJson = await restaurantInfo.json();
  const restaurantsContainer = document.querySelector(".restaurants");
  let i = 0;
  for (const restaurant of restaurantsJson) {
    i++;
    const restDiv = document.createElement("div");
    restDiv.className = `restDiv${i}`;
    const restName = document.createElement("p");
    restName.innerText = restaurant.name;
    restName.className = "restName";
    const restImg = document.createElement("img");
    restImg.src = restaurant.image_url;
    restImg.height = "200";
    restImg.className = "restImg";
    const restRating = document.createElement("p");
    restRating.innerText = restaurant.rating;
    restRating.className = "restRating";
    const restPrice = document.createElement("p");
    restPrice.innerText = restaurant.price;
    restPrice.className = "restPrice";
    const restAddress = document.createElement("p");
    restAddress.innerText = restaurant.location.display_address;
    restAddress.className = "restAddress";
    const restPhone = document.createElement("p");
    restPhone.innerText = restaurant.display_phone;
    restPhone.className = "restPhone";
    const restAddButton = document.createElement("button");
    restAddButton.innerText = "Add";
    restAddButton.className = "restAddButton";
    console.log("this is the img url", restaurant.image_url);
    const addRestToDB = async () => {
      restDiv.remove();
      const restaurantToCreate = {
        name: restaurant.name,
        imageUrl: restaurant.image_url,
        rating: restaurant.rating,
        price: restaurant.price,
        address: restaurant.location.address1,
        phoneNumber: restaurant.display_phone,
        vacationId: vacationId.id,
      };
      console.log(restaurantToCreate);
      const createNewRestaurant = await fetch(
        "http://localhost:3000/create_restaurant",
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
          body: JSON.stringify(restaurantToCreate),
        }
      );

      // const responseFromRest = await createNewRestaurant.json();
      // console.log(responseFromRest);
      // // getRestaurantsData(inputCity, responseFromRest);
      if (createNewRestaurant.status === 200) {
        // window.location.assign("/hotels");
      } else {
        window.alert("Bruh, you messed up somewhere");
      }
    };

    restAddButton.addEventListener("click", async () => {
      addRestToDB();
    });
    restDiv.append(
      restName,
      restImg,
      restRating,
      restPrice,
      restAddress,
      restPhone,
      restAddButton
    );
    restaurantsContainer.append(restDiv);
  }
  const excursionsButton = document.createElement("button");
  excursionsButton.innerText = "See excursions";
  excursionsButton.className = "excursionButton";
  restaurantsContainer.append(excursionsButton);
  const getExcursionsData = () => {
    const excursionObject = {
      city: city,
      url: `https://api.yelp.com/v3/businesses/search?location="${city}"&term="excursions"&limit=3`,
      yel_api_key: `${yel_api_key}`,
    };
    let excursionInfo = await fetch("http://localhost:3000/get_excursions", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(excursionObject),
    });
    let excursionJson = await excursionInfo.json();
    const excursionsContainer = document.querySelector(".excursions");
    let i = 0;
  };
  excursionsButton.addEventListener("click", () => {
    restaurantsContainer.remove();
  });

  console.log("this is the vaction id", vacationId.id);
};

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
  const responseFromVacay = await createNewVacation.json();
  console.log(responseFromVacay);
  getRestaurantsData(inputCity, responseFromVacay);
  if (createNewVacation.status === 200) {
    // window.location.assign("/hotels");
  } else {
    window.alert("Bruh, you messed up somewhere");
  }
};

searchButton.addEventListener("click", () => {
  createVacation();
});
