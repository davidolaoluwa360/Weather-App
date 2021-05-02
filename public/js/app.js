const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

weatherForm.addEventListener("submit", (event) => {
  messageOne.innerHTML = "loading...";
  messageTwo.innerHTML = "";
  fetch(`/weather?address=${search.value}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        messageOne.innerHTML = data.error;
      } else {
        messageOne.innerHTML = `The temperature at ${data.place} is ${data.temperature} fahrenheit `;
        messageTwo.innerHTML = ` The temperature feels like ${data.feelslike} fahrenheit`;
      }
    })
    .catch((err) => {
      messageOne.innerHTML = "Could not fetch the specified location";
    });

  event.preventDefault();
});
