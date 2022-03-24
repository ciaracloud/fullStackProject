const resIdButton = document.querySelector(".resIdButton");
const resIdInput = document.querySelector(".resIdInput");
const inputContainer = document.querySelector(".inputContainer");
const vacationContainer = document.querySelector(".vacationContainer");
const finalPageHotelContainer = document.querySelector(
  ".finalPageHotelContainer"
);
const restaurantsContainer = document.querySelector(".restaurantsContainer");
const excursionsContainer = document.querySelector(".excursionsContainer");
const suitcaseImg = document.querySelector(".suitcaseImg");
const finalPageHeader = document.querySelector(".finalPageHeader");
const finalPagePara = document.querySelector(".finalPagePara");
const finalPageVacationContainer = document.querySelector(
  ".finalPageVacationContainer"
);

resIdButton.addEventListener("click", async () => {
  suitcaseImg.remove();
  const resId = parseInt(resIdInput.value);
  const resObject = {
    resId: resId,
  };
  let vacationInfo = await fetch("http://localhost:3000/find_vacation", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(resObject),
  });
  let hotelInfo = await fetch("http://localhost:3000/find_hotel", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(resObject),
  });
  let restaurantsInfo = await fetch("http://localhost:3000/find_restaurants", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(resObject),
  });
  let excursionsInfo = await fetch("http://localhost:3000/find_excursions", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(resObject),
  });
  let vacationJson = await vacationInfo.json();
  let hotelJson = await hotelInfo.json();
  let restaurantsJson = await restaurantsInfo.json();
  let excursionsJson = await excursionsInfo.json();
  for (const vacation of vacationJson) {
    const vacationDiv = document.createElement("div");
    vacationDiv.className = `vacationDiv`;
    vacayHeaderText1 = document.createElement("p");
    vacayHeaderText1.className = "vacayHeaderText1 vacayHeaderText";
    vacayHeaderText1.innerText = "Who's going?";
    vacayParaText1 = document.createElement("p");
    vacayParaText1.className = "vacayParaText1 vacayParaText";
    vacayParaText1.innerText = `${vacation.firstName} ${vacation.lastName}`;
    const vacayTextDiv1 = document.createElement("div");
    vacayTextDiv1.append(vacayHeaderText1, vacayParaText1);
    vacayTextDiv1.className = "vacayTextDiv";
    vacayHeaderText2 = document.createElement("p");
    vacayHeaderText2.className = "vacayHeaderText2 vacayHeaderText";
    vacayHeaderText2.innerText = "Where to?";
    vacayParaText2 = document.createElement("p");
    vacayParaText2.className = "vacayParaText2 vacayParaText";
    vacayParaText2.innerText = `${vacation.city}`;
    const vacayTextDiv2 = document.createElement("div");
    vacayTextDiv2.append(vacayHeaderText2, vacayParaText2);
    vacayTextDiv2.className = "vacayTextDiv";
    vacayHeaderText3 = document.createElement("p");
    vacayHeaderText3.className = "vacayHeaderText3 vacayHeaderText";
    vacayHeaderText3.innerText = "When?";
    vacayParaText3 = document.createElement("p");
    vacayParaText3.className = "vacayParaText3 vacayParaText";
    vacayParaText3.innerText = `${vacation.startDate} - ${vacation.endDate}`;
    const vacayTextDiv3 = document.createElement("div");
    vacayTextDiv3.append(vacayHeaderText3, vacayParaText3);
    vacayTextDiv3.className = "vacayTextDiv";
    finalPagePara.innerText = `The details for your trip to ${vacation.city} are listed below!`;
    vacationDiv.append(vacayTextDiv1, vacayTextDiv2, vacayTextDiv3);
    const vacationTitle = document.createElement("p");
    vacationTitle.className = "vacationTitle finalPageTitle";
    finalPageVacationContainer.append(vacationTitle, vacationDiv);
    resIdInput.remove();
    resIdButton.remove();
  }
  const hotelTitle = document.createElement("p");
  hotelTitle.innerText = "Hotel";
  hotelTitle.className = "hotelTitle finalPageTitle";
  finalPageHotelContainer.append(hotelTitle);
  for (const hotel of hotelJson) {
    const hotelDiv = document.createElement("div");
    hotelDiv.className = `hotelDiv finalPageDiv`;

    const hotelName = document.createElement("p");
    hotelName.innerText = `${hotel.name}`;
    hotelName.className = "hotelName finalPageName";

    const hotelAddress = document.createElement("p");
    hotelAddress.innerText = `${hotel.address}`;
    hotelAddress.className = "hotelAddress finalPageAddress";

    const hotelImg = document.createElement("img");
    hotelImg.src = `${hotel.imageUrl}`;
    hotelImg.className = "hotelImg finalPageImg";
    hotelImg.height = "200";
    hotelImg.width = "300";
    const hotelRating = document.createElement("p");
    hotelRating.innerText = `Rating: ${hotel.rating}`;
    hotelRating.className = "hotelRating finalPageRating";
    const hotelPrice = document.createElement("p");
    hotelPrice.innerText = `${hotel.price}`;
    hotelPrice.className = "hotelPrice finalPagePrice";
    const hotelPhoneNumber = document.createElement("p");
    hotelPhoneNumber.innerText = `${hotel.phoneNumber}`;
    hotelPhoneNumber.className = "hotelPhoneNumber finalPagePhoneNumber";
    const hotelDeleteButton = document.createElement("button");
    hotelDeleteButton.className = "hotelDeleteButton finalPageDeleteButton";
    hotelDeleteButton.innerText = "Delete";

    const deleteHotel = async () => {
      const hotelToDelete = {
        name: hotel.name,
      };
      const deleteHotel = await fetch("http://localhost:3000/delete_hotel", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(hotelToDelete),
      });
      if (deleteHotel.status === 200) {
      } else {
        window.alert("Error");
      }
    };
    hotelDeleteButton.addEventListener("click", () => {
      hotelDiv.remove();
      deleteHotel();
    });
    const hotelTextDiv = document.createElement("div");
    hotelTextDiv.className = "hotelTextDiv finalPageTextDiv";
    hotelTextDiv.append(
      hotelName,
      hotelAddress,
      hotelRating,
      hotelPrice,
      hotelPhoneNumber,
      hotelDeleteButton
    );
    hotelDiv.append(hotelImg, hotelTextDiv);
    finalPageHotelContainer.append(hotelDiv);
  }

  const restaurantTitle = document.createElement("p");
  restaurantTitle.innerText = "Restaurants";
  restaurantTitle.className = "restaurantTitle finalPageTitle";
  restaurantsContainer.append(restaurantTitle);
  let i = 0;
  for (const restaurant of restaurantsJson) {
    i++;
    const restaurantDiv = document.createElement("div");
    restaurantDiv.className = `restaurantDiv${i} finalPageDiv`;
    const restaurantName = document.createElement("p");
    restaurantName.innerText = `${restaurant.name}`;
    restaurantName.className = "restaurantName finalPageName";
    const restaurantImg = document.createElement("img");
    restaurantImg.src = `${restaurant.imageUrl}`;
    restaurantImg.className = "restaurantImg finalPageImg";
    restaurantImg.height = "200";
    restaurantImg.width = "300";
    const restaurantRating = document.createElement("p");
    restaurantRating.innerText = `Rating: ${restaurant.rating}`;
    restaurantRating.className = "restaurantRating finalPageRating";
    const restaurantPrice = document.createElement("p");
    restaurantPrice.innerText = `${restaurant.price}`;
    restaurantPrice.className = "restaurantPrice finalPagePrice";
    const restaurantAddress = document.createElement("p");
    restaurantAddress.innerText = `${restaurant.address}`;
    restaurantAddress.className = "restaurantAddress finalPageAddress";
    const restaurantPhoneNumber = document.createElement("p");
    restaurantPhoneNumber.innerText = `${restaurant.phoneNumber}`;
    restaurantPhoneNumber.className = "restaurantPhoneNumber finalPageAddress";
    const restaurantDeleteButton = document.createElement("button");
    restaurantDeleteButton.className =
      "restaurantDeleteButton finalPageDeleteButton";
    restaurantDeleteButton.innerText = "Delete";

    const deleteRestaurant = async () => {
      const restaurantToDelete = {
        name: restaurant.name,
      };
      const deleteRestaurant = await fetch(
        "http://localhost:3000/delete_restaurant",
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
          body: JSON.stringify(restaurantToDelete),
        }
      );
      if (deleteRestaurant.status === 200) {
      } else {
        window.alert("Error");
      }
    };
    restaurantDeleteButton.addEventListener("click", () => {
      restaurantDiv.remove();
      deleteRestaurant();
    });
    const restTextDiv = document.createElement("div");
    restTextDiv.className = "restTextDiv finalPageTextDiv";
    restTextDiv.append(
      restaurantName,
      restaurantRating,
      restaurantPrice,
      restaurantPhoneNumber,
      restaurantAddress,
      restaurantDeleteButton
    );
    restaurantDiv.append(restaurantImg, restTextDiv);
    restaurantsContainer.append(restaurantDiv);
  }
  const excursionTitle = document.createElement("p");
  excursionTitle.innerText = "Excursions";
  excursionTitle.className = "excursionTitle finalPageTitle";
  excursionsContainer.append(excursionTitle);
  let j = 0;
  for (const excursion of excursionsJson) {
    j++;
    const excursionDiv = document.createElement("div");
    excursionDiv.className = `excursionDiv${j} excursionDiv finalPageDiv`;
    const excursionName = document.createElement("p");
    excursionName.innerText = `${excursion.name}`;
    excursionName.className = "excursionName finalPageName";
    const excursionImg = document.createElement("img");
    excursionImg.src = `${excursion.imageUrl}`;
    excursionImg.className = "excursionImg finalPageImg";
    excursionImg.height = "200";
    excursionImg.width = "300";
    const excursionRating = document.createElement("p");
    excursionRating.innerText = `Rating: ${excursion.rating}`;
    excursionRating.className = "excursionRating finalPageRating";
    const excursionAddress = document.createElement("p");
    excursionAddress.innerText = `${excursion.address}`;
    excursionAddress.className = "excursionAddress finalPageAddress";
    const excursionPhoneNumber = document.createElement("p");
    excursionPhoneNumber.innerText = `${excursion.phoneNumber}`;
    excursionPhoneNumber.className =
      "excursionPhoneNumber finalPagePhoneNumber";
    const excursionDeleteButton = document.createElement("button");
    excursionDeleteButton.className =
      "excursionDeleteButton finalPageDeleteButton";
    excursionDeleteButton.innerText = "Delete";
    const deleteExcursion = async () => {
      const excursionToDelete = {
        name: excursion.name,
      };
      const deleteExcursion = await fetch(
        "http://localhost:3000/delete_excursion",
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
          body: JSON.stringify(excursionToDelete),
        }
      );
      if (deleteExcursion.status === 200) {
      } else {
        window.alert("Error");
      }
    };
    excursionDeleteButton.addEventListener("click", () => {
      excursionDiv.remove();
      deleteExcursion();
    });
    const exTextDiv = document.createElement("div");
    exTextDiv.className = "exTextDiv finalPageTextDiv";
    exTextDiv.append(
      excursionName,
      excursionRating,
      excursionPhoneNumber,
      excursionAddress,
      excursionDeleteButton
    );
    excursionDiv.append(excursionImg, exTextDiv);

    excursionsContainer.append(excursionDiv);
  }
});
