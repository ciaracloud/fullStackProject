const yel_api_key = "";

const inputsArray = [];

const searchButton = document.querySelector(".searchButton");
const checkVacationButton = document.querySelector(".checkVacationButton");

checkVacationButton.addEventListener("click", () => {
  window.location.assign("/check_vacation");
});

const getHotelsData = async (city, vacationId) => {
  const formContainer = document.querySelector(".formContainer");
  formContainer.remove();

  const welcomeContainer = document.querySelector(".welcomeContainer");

  const welcomeParagraph = document.createElement("p");
  welcomeParagraph.className = "welcomeParagraph";
  welcomeParagraph.innerText = `Welcome ${inputsArray[0]} ${inputsArray[1]}!
  Let's start planning your trip to ${inputsArray[4]}!
  Here is your reservation ID: ${vacationId.id}.
  Make sure to keep track of it in order to look up and make changes to your trip.`;
  welcomeContainer.append(welcomeParagraph);

  const hotelObject = {
    city: city,
    url: `https://api.yelp.com/v3/businesses/search?location="${city}"&term="hotels"&limit=3`,
    yel_api_key: `${yel_api_key}`,
  };
  let hotelInfo = await fetch("http://localhost:3000/get_hotels", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(hotelObject),
  });
  let hotelsJson = await hotelInfo.json();
  const hotelsContainer = document.querySelector(".hotels");
  const hotelsTitle = document.createElement("p");
  hotelsTitle.className = "hotelsTitle";
  hotelsTitle.innerText = "Choose a hotel from below:";
  hotelsContainer.append(hotelsTitle);
  let i = 0;
  for (const hotel of hotelsJson) {
    i++;
    const hotelDiv = document.createElement("div");
    hotelDiv.className = `hotelDiv${i}`;
    const hotelName = document.createElement("p");
    hotelName.innerText = hotel.name;
    hotelName.className = "hotelName";
    const hotelImg = document.createElement("img");
    hotelImg.src = hotel.image_url;
    hotelImg.height = "200";
    hotelImg.className = "hotelImg";
    const hotelRating = document.createElement("p");
    hotelRating.innerText = `Rating: ${hotel.rating}`;
    hotelRating.className = "hotelRating";
    const hotelPrice = document.createElement("p");
    hotelPrice.innerText = hotel.price;
    hotelPrice.className = "hotelPrice";
    const hotelAddress = document.createElement("p");
    hotelAddress.innerText = hotel.location.display_address;
    hotelAddress.className = "hotelAddress";
    const hotelPhone = document.createElement("p");
    hotelPhone.innerText = hotel.display_phone;
    hotelPhone.className = "hotelPhone";
    const hotelAddButton = document.createElement("button");
    hotelAddButton.innerText = "Add";
    hotelAddButton.className = "hotelAddButton";

    const line = document.createElement("hr");
    line.className = "line";

    const addHotelToDB = async () => {
      hotelsContainer.remove();
      const hotelToCreate = {
        name: hotel.name,
        imageUrl: hotel.image_url,
        rating: hotel.rating,
        price: hotel.price,
        address: hotel.location.address1,
        phoneNumber: hotel.display_phone,
        vacationId: vacationId.id,
      };
      const createNewHotel = await fetch("http://localhost:3000/create_hotel", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(hotelToCreate),
      });
      if (createNewHotel.status === 200) {
      } else {
        window.alert("Error");
      }
    };

    hotelAddButton.addEventListener("click", async () => {
      addHotelToDB();
    });
    hotelDiv.append(
      hotelName,
      hotelImg,
      hotelRating,
      hotelPrice,
      hotelAddress,
      hotelPhone,
      hotelAddButton
    );
    hotelsContainer.append(line);
    hotelsContainer.append(hotelDiv);
  }
  const restaurantsButton = document.createElement("button");
  restaurantsButton.innerText = "See restaurants";
  restaurantsButton.className = "restaurantButton";
  const restButtonContainer = document.querySelector(".restButtonContainer");
  restButtonContainer.append(restaurantsButton);
  const getRestaurantsData = async () => {
    const restaurantObject = {
      city: city,
      url: `https://api.yelp.com/v3/businesses/search?location="${city}"&term="restaurants"&limit=3`,
      yel_api_key: `${yel_api_key}`,
    };
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
    let restaurantJson = await restaurantInfo.json();
    const restaurantContainer = document.querySelector(".restaurants");
    const restaurantTitle = document.createElement("p");
    restaurantTitle.className = "restaurantTitle";
    restaurantTitle.innerText = "Choose restaurant(s) from below:";
    restaurantContainer.append(restaurantTitle);
    let i = 0;
    for (const restaurant of restaurantJson) {
      i++;
      const restaurantDiv = document.createElement("div");
      restaurantDiv.className = `restaurantDiv${i}`;
      const restaurantName = document.createElement("p");
      restaurantName.innerText = restaurant.name;
      restaurantName.className = "restaurantName";
      const restaurantImg = document.createElement("img");
      restaurantImg.src = restaurant.image_url;
      restaurantImg.height = "200";
      restaurantImg.className = "restaurantImg";
      const restaurantPrice = document.createElement("p");
      restaurantPrice.innerText = restaurant.price;
      restaurantPrice.className = "restaurantPrice";
      const restaurantRating = document.createElement("p");
      restaurantRating.innerText = `Rating: ${restaurant.rating}`;
      restaurantRating.className = "restaurantRating";
      const restaurantAddress = document.createElement("p");
      restaurantAddress.innerText = restaurant.location.display_address;
      restaurantAddress.className = "restaurantAddress";
      const restaurantPhone = document.createElement("p");
      restaurantPhone.innerText = restaurant.display_phone;
      restaurantPhone.className = "restaurantPhone";
      const restaurantAddButton = document.createElement("button");
      restaurantAddButton.innerText = "Add";
      restaurantAddButton.className = "restaurantAddButton";

      const line = document.createElement("hr");
      line.className = "line";

      console.log("this is the img url", restaurant.image_url);
      const addRestaurantToDB = async () => {
        restaurantDiv.remove();
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
        if (createNewRestaurant.status === 200) {
        } else {
          window.alert("Error");
        }
      };

      restaurantAddButton.addEventListener("click", async () => {
        addRestaurantToDB();
      });
      restaurantDiv.append(
        restaurantName,
        restaurantImg,
        restaurantRating,
        restaurantPrice,
        restaurantAddress,
        restaurantPhone,
        restaurantAddButton
      );

      restaurantContainer.append(line);
      restaurantContainer.append(restaurantDiv);
    }
    const excursionsButton = document.createElement("button");
    excursionsButton.innerText = "See excursions";
    excursionsButton.className = "excursionsButton";
    restaurantContainer.append(excursionsButton);

    const getExcursionsData = async () => {
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
      let excursionsJson = await excursionInfo.json();
      const excursionsContainer = document.querySelector(".excursions");
      const excursionTitle = document.createElement("p");
      excursionTitle.className = "excursionTitle";
      excursionTitle.innerText = "Choose an excursion(s) from below:";
      excursionsContainer.append(excursionTitle);
      let i = 0;
      for (const excursion of excursionsJson) {
        i++;
        const excursionDiv = document.createElement("div");
        excursionDiv.className = `excursionDiv${i}`;
        const excursionName = document.createElement("p");
        excursionName.innerText = excursion.name;
        excursionName.className = "excursionName";
        const excursionImg = document.createElement("img");
        excursionImg.src = excursion.image_url;
        excursionImg.height = "200";
        excursionImg.className = "excursionImg";
        const excursionRating = document.createElement("p");
        excursionRating.innerText = `Rating: ${excursion.rating}`;
        excursionRating.className = "excursionRating";
        const excursionAddress = document.createElement("p");
        excursionAddress.innerText = excursion.location.display_address;
        excursionAddress.className = "excursionAddress";
        const excursionPhone = document.createElement("p");
        excursionPhone.innerText = excursion.display_phone;
        excursionPhone.className = "excursionPhone";
        const excursionAddButton = document.createElement("button");
        excursionAddButton.innerText = "Add";
        excursionAddButton.className = "excursionAddButton";

        const line = document.createElement("hr");
        line.className = "line";

        const addExcursionToDB = async () => {
          excursionDiv.remove();
          const excursionToCreate = {
            name: excursion.name,
            imageUrl: excursion.image_url,
            rating: excursion.rating,
            address: excursion.location.address1,
            phoneNumber: excursion.display_phone,
            vacationId: vacationId.id,
          };
          const createNewExcursion = await fetch(
            "http://localhost:3000/create_excursion",
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
              body: JSON.stringify(excursionToCreate),
            }
          );
          if (createNewExcursion.status === 200) {
          } else {
            window.alert("Error");
          }
        };

        excursionAddButton.addEventListener("click", async () => {
          addExcursionToDB();
        });
        excursionDiv.append(
          excursionName,
          excursionImg,
          excursionRating,
          excursionAddress,
          excursionPhone,
          excursionAddButton
        );
        excursionsContainer.append(line);
        excursionsContainer.append(excursionDiv);
      }
      const finalPageButton = document.createElement("button");
      finalPageButton.className = "finalPageButton";
      finalPageButton.innerText = "See vacation";
      const finalPageButtonContainer = document.querySelector(
        ".finalPageButtonContainer"
      );
      finalPageButton.addEventListener("click", () => {
        window.location.assign("/check_vacation");
      });
      finalPageButtonContainer.append(finalPageButton);
    };
    excursionsButton.addEventListener("click", () => {
      restaurantContainer.remove();
      getExcursionsData();
    });
  };
  restaurantsButton.addEventListener("click", () => {
    restButtonContainer.remove();
    hotelsContainer.remove();
    getRestaurantsData();
  });
};

const createVacation = async () => {
  const inputFirstName = document.querySelector(".firstNameInput").value;
  const inputLastName = document.querySelector(".lastNameInput").value;
  const inputStartDate = document.querySelector(".startDateInput").value;
  const inputEndDate = document.querySelector(".endDateInput").value;
  const inputCity = document.querySelector(".cityInput").value;

  inputsArray.push(
    inputFirstName,
    inputLastName,
    inputStartDate,
    inputEndDate,
    inputCity
  );

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
  getHotelsData(inputCity, responseFromVacay);
  if (createNewVacation.status === 200) {
  } else {
    window.alert("Error");
  }
};

searchButton.addEventListener("click", () => {
  createVacation();
});
