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
