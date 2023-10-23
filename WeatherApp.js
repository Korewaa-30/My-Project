function currentCity(event) {
	event.preventDefault();
	let h2 = document.querySelector(".location");
	let cityInput = document.querySelector(".form-control");
	let city = cityInput.value.trim();
	h2.innerHTML = "Location";

	if (city) {
		h2.innerHTML = city;
		let apiKey = "08cb528bbd88a308d62a5462083d7212";
		let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

		axios.get(apiUrl).then(currentTemperature);
	}
}

function fetchCityNameFromNominatim(latitude, longitude) {
	const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

	return fetch(apiUrl)
		.then((response) => response.json())
		.then((data) => {
			return data.address.city;
		})
		.catch((error) => {
			console.error("Error fetching city name from Nominatim: " + error);
			return null;
		});
}

function currentTemperature(response) {
	console.log(response);
	let temperature = Math.round(response.data.main.temp);
	let temperatureDisplay = document.querySelector(".temp-value");
	temperatureDisplay.innerHTML = `${temperature}`;
}

function getCurrentLocationWeather() {
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function (position) {
			let apiKey = "08cb528bbd88a308d62a5462083d7212";
			let latitude = position.coords.latitude;
			let longitude = position.coords.longitude;
			let h2 = document.querySelector(".location");

			fetchCityNameFromNominatim(latitude, longitude).then((cityName) => {
				if (cityName) {
					h2.innerHTML = cityName;
				} else {
					h2.innerHTML = "Current Location";
				}

				let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
				axios.get(weatherApiUrl).then(currentTemperature);
			});
		});
	} else {
		alert("Geolocation is not available in your browser.");
	}
}

let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", currentCity);

let currentLocationButton = document.getElementById("currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocationWeather);

//******************************************* */
let current = new Date();
let now = document.querySelector(".date");

let date = current.getDate();
let year = current.getFullYear();
let minutes = current.getMinutes();
let hours = current.getHours();

let ampm = hours >= 12 ? "PM" : "AM";
hours = hours % 12 || 12;
let timeString = `${hours}:${(minutes < 10 ? "0" : "") + minutes} ${ampm}`;

let days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
let day = days[current.getDay()];

let months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
let month = months[current.getMonth()];

now.innerHTML = `${day} ${month} ${date}, ${timeString}, ${year}`;

function searchButton(event) {
	event.preventDefault();

	let searchInput = document.querySelector(".form-control");
	let cityName = searchInput.value;

	let h2 = document.querySelector(".location");
	h2.innerHTML = cityName;
}
let search = document.querySelector("form");
search.addEventListener("submit", searchButton);

function celsius(event) {
	event.preventDefault();
	if (!isCelsius) {
		let fahrenheitTemp = parseFloat(tempValue.textContent);
		let celsiusTemp = Math.round((fahrenheitTemp - 32) * (5 / 9));
		tempValue.textContent = celsiusTemp;
		isCelsius = true;
	}
}

function fahrenheit(event) {
	event.preventDefault();
	if (isCelsius) {
		let celsiusTemp = parseFloat(tempValue.textContent);
		let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
		tempValue.textContent = fahrenheitTemp;
		isCelsius = false;
	}
}

let celsiusLink = document.getElementById("celsius-link");
let fahrenheitLink = document.getElementById("fahrenheit-link");
let tempValue = document.querySelector(".temp-value");
let isCelsius = true;

celsiusLink.addEventListener("click", celsius);
fahrenheitLink.addEventListener("click", fahrenheit);
