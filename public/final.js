const resIdButton = document.querySelector(".resIdButton");
const resIdInput = document.querySelector(".resIdInput");

resIdButton.addEventListener("click", () => {
  const resId = resIdInput.value;
  console.log(resId);
});
