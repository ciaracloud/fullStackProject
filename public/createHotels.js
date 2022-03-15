const imp_api_key = process.env.IMP_API_KEY;

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

  const getHotelData = async () => {
    let url = `https://api.impala.travel/v1/hotels?end=2022-07-05&latitude=40.7128&longitude=-74.0060&radius=5000&sortBy=distance_m:desc&start=2022-07-01`;
    let hotels = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${imp_api_key}`,
      },
    });
    let hotelJson = await hotels.json();
    const amenitiesArray = [hotelJson.data[0]["address"]["line1"]];
    const addressArray = [...hotelJson.data[0]["address"]];
    console.log(addressArray);
    const hotelDataObject = {
      name: hotelJson.data[0]["name"],
      description: hotelJson.data[0]["description"]["short"],
      starRating: hotelJson.data[0]["starRating"],
      phoneNumber: hotelJson.data[0]["phoneNumbers"],
      email: hotelJson.data[0]["emails"],
      amenities: hotelJson.data[0]["name"],
      hotelImageUrl: hotelJson.data[0]["images"][0]["url"],
      room1ImageUrl: hotelJson.data[0]["images"],
      rooom2ImageUrl: hotelJson.data[0]["images"],
      address: addressArray,
      vacationId: "",
    };
  };
  const hotelData = await getHotelData();

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
