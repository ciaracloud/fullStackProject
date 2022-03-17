const resIdButton = document.querySelector(".resIdButton");
const resIdInput = document.querySelector(".resIdInput");
const inputContainer = document.querySelector(".inputContainer");
const vacationContainer = document.querySelector(".vacationContainer");
const hotelContainer = document.querySelector(".hotelContainer");
const restaurantsContainer = document.querySelector(".restaurantsContainer");
const excursionsContainer = document.querySelector(".excursionsContainer");

// let i = 0;
// for (const hotel of hotelsJson) {
//   i++;
//   const hotelDiv = document.createElement("div");
//   hotelDiv.className = `hotelDiv${i}`;
//   const hotelName = document.createElement("p");
//   hotelName.innerText = hotel.name;
//   hotelName.className = "hotelName";
//   const hotelImg = document.createElement("img");
//   hotelImg.src = hotel.image_url;
//   hotelImg.height = "200";
//   hotelImg.className = "hotelImg";
//   const hotelRating = document.createElement("p");
//   hotelRating.innerText = hotel.rating;
//   hotelRating.className = "hotelRating";
//   const hotelPrice = document.createElement("p");
//   hotelPrice.innerText = hotel.price;
//   hotelPrice.className = "hotelPrice";
//   const hotelAddress = document.createElement("p");
//   hotelAddress.innerText = hotel.location.display_address;
//   hotelAddress.className = "hotelAddress";
//   const hotelPhone = document.createElement("p");
//   hotelPhone.innerText = hotel.display_phone;
//   hotelPhone.className = "hotelPhone";
//   const hotelAddButton = document.createElement("button");
//   hotelAddButton.innerText = "Add";
//   hotelAddButton.className = "hotelAddButton";
//   const addHotelToDB = async () => {
//     hotelsContainer.remove();
//     const hotelToCreate = {
//       name: hotel.name,
//       imageUrl: hotel.image_url,
//       rating: hotel.rating,
//       price: hotel.price,
//       address: hotel.location.address1,
//       phoneNumber: hotel.display_phone,
//       vacationId: vacationId.id,
//     };
//     const createNewHotel = await fetch("http://localhost:3000/create_hotel", {
//       method: "POST",
//       mode: "cors",
//       cache: "no-cache",
//       credentials: "same-origin",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       redirect: "follow",
//       referrerPolicy: "no-referrer",
//       body: JSON.stringify(hotelToCreate),
//     });
//     // const responseFromRest = await createNewRestaurant.json();
//     // console.log(responseFromRest);
//     // // getRestaurantsData(inputCity, responseFromRest);
//     if (createNewHotel.status === 200) {
//       // window.location.assign("/hotels");
//     } else {
//       window.alert("Bruh, you messed up somewhere");
//     }
//   };

//   hotelAddButton.addEventListener("click", async () => {
//     addHotelToDB();
//   });
//   hotelDiv.append(
//     hotelName,
//     hotelImg,
//     hotelRating,
//     hotelPrice,
//     hotelAddress,
//     hotelPhone,
//     hotelAddButton
//   );
//   hotelsContainer.append(hotelDiv);
// }

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
    vacationParagraph.innerText = `Hello ${vacation.firstName} ${vacation.lastName}! \n Here are the details for your trip to ${vacation.city} from ${vacation.startDate} to ${vacation.endDate}:`;
    vacationParagraph.className = "vacationParagraph";
    vacationContainer.append(vacationParagraph);
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
    const hotelImg = document.createElement("img");
    hotelImg.src = `${hotel.imageUrl}`;
    hotelImg.className = "hotelImg";
    hotelImg.height = "200";
    const hotelRating = document.createElement("p");
    hotelRating.innerText = `${hotel.rating}`;
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
    const deleteHotel = async () => {
      hotelDiv.remove();
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
      // const responseFromRest = await createNewRestaurant.json();
      // console.log(responseFromRest);
      // // getRestaurantsData(inputCity, responseFromRest);
      if (deleteHotel.status === 200) {
        // window.location.assign("/hotels");
      } else {
        window.alert("Bruh, you messed up somewhere");
      }
    };
    hotelContainer.append(
      hotelTitle,
      hotelName,
      hotelImg,
      hotelRating,
      hotelPrice,
      hotelPhoneNumber,
      hotelDeleteButton
    );
    hotelDeleteButton.addEventListener("click", () => {
      deleteHotel();
    });
  }
  const restaurantTitle = document.createElement("p");
  restaurantTitle.innerText = "Restaurants:";
  restaurantTitle.className = "restaurantTitle";
  restaurantsContainer.append(restaurantTitle);
  for (const restaurant of restaurantsJson) {
    const restaurantDiv = document.createElement("div");
    restaurantDiv.className = `restaurantDiv`;
    const restaurantName = document.createElement("p");
    restaurantName.innerText = `${restaurant.name}`;
    restaurantName.className = "restaurantName";
    const restaurantImg = document.createElement("img");
    restaurantImg.src = `${restaurant.imageUrl}`;
    restaurantImg.className = "restaurantImg";
    restaurantImg.height = "200";
    const restaurantRating = document.createElement("p");
    restaurantRating.innerText = `${restaurant.rating}`;
    restaurantRating.className = "restaurantRating";
    const restaurantPrice = document.createElement("p");
    restaurantPrice.innerText = `${restaurant.price}`;
    restaurantPrice.className = "restaurantPrice";
    const restaurantAddress = document.createElement("p");
    restaurantAddress.innerText = `${restaurant.address}`;
    const restaurantPhoneNumber = document.createElement("p");
    restaurantPhoneNumber.innerText = `${restaurant.phoneNumber}`;
    restaurantPhoneNumber.className = "restaurantPhoneNumber";
    const restaurantDeleteButton = document.createElement("button");
    restaurantDeleteButton.className = "restaurantDeleteButton";
    restaurantDeleteButton.innerText = "Delete";
    const deleteRestaurant = async () => {
      restaurantDiv.remove();
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
      // const responseFromRest = await createNewRestaurant.json();
      // console.log(responseFromRest);
      // // getRestaurantsData(inputCity, responseFromRest);
      if (deleteRestaurant.status === 200) {
        // window.location.assign("/hotels");
      } else {
        window.alert("Bruh, you messed up somewhere");
      }
    };
    restaurantsContainer.append(
      restaurantName,
      restaurantImg,
      restaurantRating,
      restaurantPrice,
      restaurantPhoneNumber,
      restaurantAddress,
      restaurantDeleteButton
    );
    restaurantDeleteButton.addEventListener("click", () => {
      deleteRestaurant();
    });
  }

  console.log("vacation data:", vacationJson);
  console.log("hotel data:", hotelJson);
  console.log("excursions data:", excursionsJson);
  console.log("restaurants data:", restaurantsJson);
});
