const yel_api_key = "";

const inputsArray = [];

const searchButton = document.querySelector(".searchButton");
const checkVacationButton = document.querySelector(".checkVacationButton");

const getHotelsData = async (city, vacationId) => {
  const formContainer = document.querySelector(".formContainer");
  const destinationsContainer = document.querySelector(
    ".destinationsContainer"
  );
  const thailandImage = document.querySelector(".thailandImage");
  formContainer.remove();
  destinationsContainer.remove();
  thailandImage.remove();
  const welcomeContainer = document.querySelector(".welcomeContainer");
  const welcomePhoto = document.createElement("img");
  welcomePhoto.className = "welcomePhoto";
  welcomePhoto.src =
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2235&q=80";
  const welcomeText = document.createElement("div");
  welcomeText.className = "welcomeText";
  const welcomeTitle = document.createElement("p");
  welcomeTitle.innerText = "Time to plan!";
  welcomeTitle.className = "welcomeTitle";
  const paragraph1 = document.createElement("p");
  paragraph1.innerText = `Welcome ${inputsArray[0]} ${inputsArray[1]}! Let's start planning your trip to ${inputsArray[4]}!`;
  paragraph1.className = "paragraph1";
  const paragraph2 = document.createElement("p");
  paragraph2.innerText = `Your reservation ID is ${vacationId.id}.`;
  paragraph2.className = "paragraph2";
  const paragraph3 = document.createElement("p");
  paragraph3.className = "paragraph3";
  paragraph3.innerText = `Make sure to keep track of it in order to look up and make changes to your trip.`;
  const welcomeParagraph = document.createElement("div");
  welcomeParagraph.className = "welcomeParagraph";
  welcomeParagraph.append(paragraph1, paragraph2, paragraph3);
  welcomeText.append(welcomeTitle, welcomeParagraph);
  welcomeContainer.append(welcomePhoto, welcomeText);

  const hotelObject = {
    city: city,
    url: `https://api.yelp.com/v3/businesses/search?location="${city}"&term="hotels"&limit=4`,
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
  hotelsTitle.className = "hotelsTitle elementTitle";
  hotelsTitle.innerText = "Choose a hotel from below:";
  hotelsContainer.append(hotelsTitle);
  const hotelDivsContainer = document.createElement("div");
  hotelDivsContainer.className = "hotelDivsContainer divContainer";
  let i = 0;
  for (const hotel of hotelsJson) {
    i++;
    const hotelDiv = document.createElement("div");
    hotelDiv.className = `hotelDiv${i} hotelDiv elementDiv`;
    const hotelName = document.createElement("p");
    hotelName.innerText = hotel.name;
    hotelName.className = "hotelName name";
    const hotelImg = document.createElement("img");
    hotelImg.src = hotel.image_url;
    hotelImg.height = "200";
    hotelImg.className = "hotelImg img";
    const hotelRating = document.createElement("p");
    hotelRating.innerText = `Rating: ${hotel.rating}`;
    hotelRating.className = "hotelRating rating";
    const hotelPrice = document.createElement("p");
    hotelPrice.innerText = hotel.price;
    hotelPrice.className = "hotelPrice price";
    const hotelAddress = document.createElement("p");
    hotelAddress.innerText = hotel.location.display_address;
    hotelAddress.className = "hotelAddress address";
    const hotelPhone = document.createElement("p");
    hotelPhone.innerText = hotel.display_phone;
    hotelPhone.className = "hotelPhone phone";
    const hotelAddButton = document.createElement("button");
    hotelAddButton.innerText = "Add";
    hotelAddButton.className = "hotelAddButton addButton";

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
    hotelDivsContainer.append(hotelDiv);
  }
  hotelsContainer.append(hotelDivsContainer);
  const restaurantsButton = document.createElement("button");
  restaurantsButton.innerText = "See restaurants";
  restaurantsButton.className = "restaurantButton nextButton";
  const restButtonContainer = document.querySelector(".restButtonContainer");
  restButtonContainer.className = "nextButtonContainer";
  restButtonContainer.append(restaurantsButton);
  const getRestaurantsData = async () => {
    const restaurantObject = {
      city: city,
      url: `https://api.yelp.com/v3/businesses/search?location="${city}"&term="restaurants"&limit=4`,
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
    restaurantTitle.className = "restaurantTitle elementTitle";
    restaurantTitle.innerText = "Choose restaurant(s) from below:";
    restaurantContainer.append(restaurantTitle);
    const restaurantsDivsContainer = document.createElement("div");
    restaurantsDivsContainer.className =
      "restaurantsDivsContainer divContainer";
    let i = 0;
    for (const restaurant of restaurantJson) {
      i++;
      const restaurantDiv = document.createElement("div");
      restaurantDiv.className = `restaurantDiv${i} restaurantDiv elementDiv`;
      const restaurantName = document.createElement("p");
      restaurantName.innerText = restaurant.name;
      restaurantName.className = "restaurantName name";
      const restaurantImg = document.createElement("img");
      restaurantImg.src = restaurant.image_url;
      restaurantImg.height = "200";
      restaurantImg.className = "restaurantImg img";
      const restaurantPrice = document.createElement("p");
      restaurantPrice.innerText = restaurant.price;
      restaurantPrice.className = "restaurantPrice price";
      const restaurantRating = document.createElement("p");
      restaurantRating.innerText = `Rating: ${restaurant.rating}`;
      restaurantRating.className = "restaurantRating rating";
      const restaurantAddress = document.createElement("p");
      restaurantAddress.innerText = restaurant.location.display_address;
      restaurantAddress.className = "restaurantAddress address";
      const restaurantPhone = document.createElement("p");
      restaurantPhone.innerText = restaurant.display_phone;
      restaurantPhone.className = "restaurantPhone phone";
      const restaurantAddButton = document.createElement("button");
      restaurantAddButton.innerText = "Add";
      restaurantAddButton.className = "restaurantAddButton addButton";

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
      restaurantsDivsContainer.append(restaurantDiv);
    }
    restaurantContainer.append(restaurantsDivsContainer);
    const excursionsButton = document.createElement("button");
    excursionsButton.innerText = "See excursions";
    excursionsButton.className = "excursionsButton nextButton";
    const excButtonContainer = document.createElement("div");
    excButtonContainer.className = "excButtonContainer nextButtonContainer";
    excButtonContainer.append(excursionsButton);
    restaurantContainer.append(excButtonContainer);

    const getExcursionsData = async () => {
      const excursionObject = {
        city: city,
        url: `https://api.yelp.com/v3/businesses/search?location="${city}"&term="excursions"&limit=4`,
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
      excursionTitle.className = "excursionTitle elementTitle";
      excursionTitle.innerText = "Choose an excursion(s) from below:";
      excursionsContainer.append(excursionTitle);
      const excursionsDivsContainer = document.createElement("div");
      excursionsDivsContainer.className =
        "excursionsDivsContainer divContainer";
      let i = 0;
      for (const excursion of excursionsJson) {
        i++;
        const excursionDiv = document.createElement("div");
        excursionDiv.className = `excursionDiv${i} excursionDiv elementDiv`;
        const excursionName = document.createElement("p");
        excursionName.innerText = excursion.name;
        excursionName.className = "excursionName name";
        const excursionImg = document.createElement("img");
        excursionImg.src = excursion.image_url;
        excursionImg.height = "200";
        excursionImg.className = "excursionImg img";
        const excursionRating = document.createElement("p");
        excursionRating.innerText = `Rating: ${excursion.rating}`;
        excursionRating.className = "excursionRating rating";
        const excursionAddress = document.createElement("p");
        excursionAddress.innerText = excursion.location.display_address;
        excursionAddress.className = "excursionAddress address";
        const excursionPhone = document.createElement("p");
        excursionPhone.innerText = excursion.display_phone;
        excursionPhone.className = "excursionPhone phone";
        const excursionAddButton = document.createElement("button");
        excursionAddButton.innerText = "Add";
        excursionAddButton.className = "excursionAddButton addButton";

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
        excursionsDivsContainer.append(excursionDiv);
      }
      excursionsContainer.append(excursionsDivsContainer);
      const finalPageButton = document.createElement("button");
      finalPageButton.className = "finalPageButton nextButton";
      finalPageButton.innerText = "See vacation";
      const finalPageButtonContainer = document.querySelector(
        ".finalPageButtonContainer"
      );
      finalPageButtonContainer.className = "nextButtonContainer";
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
