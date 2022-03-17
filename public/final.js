const resIdButton = document.querySelector(".resIdButton");
const resIdInput = document.querySelector(".resIdInput");

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
  console.log("vacation data:", vacationJson);
  console.log("hotel data:", hotelJson);
  console.log("excursions data:", excursionsJson);
  console.log("restaurants data:", restaurantsJson);
});
