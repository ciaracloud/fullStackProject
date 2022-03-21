const resIdButton = document.querySelector(".resIdButton");
const resIdInput = document.querySelector(".resIdInput");
const inputContainer = document.querySelector(".inputContainer");
const vacationContainer = document.querySelector(".vacationContainer");
const hotelContainer = document.querySelector(".hotelContainer");
const restaurantsContainer = document.querySelector(".restaurantsContainer");
const excursionsContainer = document.querySelector(".excursionsContainer");

resIdButton.addEventListener("click", async () => {
  const resId = parseInt(resIdInput.value);
  console.log(resId);
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
    const vacationParagraph = document.createElement("p");

    vacationParagraph.innerText = `\n Hello ${vacation.firstName} ${vacation.lastName}! \n 
    Here are the details for your trip to ${vacation.city}:`;
    vacationParagraph.className = "vacationParagraph";
    vacationContainer.append(vacationParagraph);
    const line = document.createElement("hr");
    line.className = "line";
    vacationParagraph.append(line);
  }
  for (const hotel of hotelJson) {
    const hotelDiv = document.createElement("div");
    hotelDiv.className = `hotelDiv`;
    const hotelTitle = document.createElement("p");
    hotelTitle.innerText = "Hotel:";
    hotelTitle.className = "hotelTitle";

    const hotelName = document.createElement("p");
    hotelName.innerText = `${hotel.name}`;
    hotelName.className = "hotelName";

    const hotelAddress = document.createElement("p");
    hotelAddress.innerText = `${hotel.address}`;
    hotelAddress.className = "hotelAddress";

    const hotelImg = document.createElement("img");
    hotelImg.src = `${hotel.imageUrl}`;
    hotelImg.className = "hotelImg";
    hotelImg.height = "200";
    hotelImg.width = "300";
    const hotelRating = document.createElement("p");
    hotelRating.innerText = `Rating: ${hotel.rating}`;
    hotelRating.className = "hotelRating";
    const hotelPrice = document.createElement("p");
    hotelPrice.innerText = `${hotel.price}`;
    hotelPrice.className = "hotelPrice";
    const hotelPhoneNumber = document.createElement("p");
    hotelPhoneNumber.innerText = `${hotel.phoneNumber}`;
    hotelPhoneNumber.className = "hotelPhoneNumber";
    const hotelDeleteButton = document.createElement("button");
    hotelDeleteButton.className = "hotelDeleteButton";
    hotelDeleteButton.innerText = "Delete";

    const line = document.createElement("hr");
    line.className = "line";

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
    hotelDiv.append(
      hotelTitle,
      hotelName,
      hotelImg,
      hotelAddress,
      hotelRating,
      hotelPrice,
      hotelPhoneNumber,
      hotelDeleteButton
    );

    hotelContainer.append(hotelDiv);
    hotelContainer.append(line);
  }

  const restaurantTitle = document.createElement("p");
  restaurantTitle.innerText = "Restaurants:";
  restaurantTitle.className = "restaurantTitle";
  restaurantsContainer.append(restaurantTitle);
  let i = 0;
  for (const restaurant of restaurantsJson) {
    i++;
    const restaurantDiv = document.createElement("div");
    restaurantDiv.className = `restaurantDiv${i}`;
    const restaurantName = document.createElement("p");
    restaurantName.innerText = `${restaurant.name}`;
    restaurantName.className = "restaurantName";
    const restaurantImg = document.createElement("img");
    restaurantImg.src = `${restaurant.imageUrl}`;
    restaurantImg.className = "restaurantImg";
    restaurantImg.height = "200";
    restaurantImg.width = "300";
    const restaurantRating = document.createElement("p");
    restaurantRating.innerText = `Rating: ${restaurant.rating}`;
    restaurantRating.className = "restaurantRating";
    const restaurantPrice = document.createElement("p");
    restaurantPrice.innerText = `${restaurant.price}`;
    restaurantPrice.className = "restaurantPrice";
    const restaurantAddress = document.createElement("p");
    restaurantAddress.innerText = `${restaurant.address}`;
    restaurantAddress.className = "restaurantAddress";
    const restaurantPhoneNumber = document.createElement("p");
    restaurantPhoneNumber.innerText = `${restaurant.phoneNumber}`;
    restaurantPhoneNumber.className = "restaurantPhoneNumber";
    const restaurantDeleteButton = document.createElement("button");
    restaurantDeleteButton.className = "restaurantDeleteButton";
    restaurantDeleteButton.innerText = "Delete";

    const line = document.createElement("hr");
    line.className = "line";

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
    restaurantDiv.append(
      restaurantName,
      restaurantImg,
      restaurantRating,
      restaurantPrice,
      restaurantPhoneNumber,
      restaurantAddress,
      restaurantDeleteButton
    );
    restaurantsContainer.append(restaurantDiv);
    restaurantsContainer.append(line);
  }
  const excursionTitle = document.createElement("p");
  excursionTitle.innerText = "Excursions:";
  excursionTitle.className = "excursionTitle";
  excursionsContainer.append(excursionTitle);
  let j = 0;
  for (const excursion of excursionsJson) {
    j++;
    const excursionDiv = document.createElement("div");
    excursionDiv.className = `excursionDiv${j} excursionDiv`;
    const excursionName = document.createElement("p");
    excursionName.innerText = `${excursion.name}`;
    excursionName.className = "excursionName";
    const excursionImg = document.createElement("img");
    excursionImg.src = `${excursion.imageUrl}`;
    excursionImg.className = "excursionImg";
    excursionImg.height = "200";
    excursionImg.width = "300";
    const excursionRating = document.createElement("p");
    excursionRating.innerText = `Rating: ${excursion.rating}`;
    excursionRating.className = "excursionRating";
    const excursionAddress = document.createElement("p");
    excursionAddress.innerText = `${excursion.address}`;
    excursionAddress.className = "excursionAddress";
    const excursionPhoneNumber = document.createElement("p");
    excursionPhoneNumber.innerText = `${excursion.phoneNumber}`;
    excursionPhoneNumber.className = "excursionPhoneNumber";
    const excursionDeleteButton = document.createElement("button");
    excursionDeleteButton.className = "excursionDeleteButton";
    excursionDeleteButton.innerText = "Delete";
    const line = document.createElement("hr");
    line.className = "line";
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
    excursionDiv.append(
      excursionName,
      excursionImg,
      excursionRating,
      excursionPhoneNumber,
      excursionAddress,
      excursionDeleteButton
    );
    excursionsContainer.append(excursionDiv);
    excursionsContainer.append(line);
  }
  excursionDeleteButton.addEventListener("click", () => {
    deleteExcursion();
  });
});
