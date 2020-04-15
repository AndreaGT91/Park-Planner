/** @format */

// National Park Service API
const npsURL = "https://developer.nps.gov/api/v1/parks?stateCode=GA&api_key=BC3dYC7e66JYRo9zARWdKwuCsC4f3bFp93ViUP1Z";

const mapBoxAPI = "pk.eyJ1IjoiYW5kcmVhZ3Q5MSIsImEiOiJjazh5d2E1ZjIxbWMzM2xxcWo3N3ZzY2RxIn0.Y7XvFoNwX0QmBjOWDGa6kw";

const parkListName = "parkPlannerList";
var parkList = [];
var parkMap; // Link to map object
var currentLat = 33.749; // initialize to Atlanta
var currentLon = -84.388;

//----Shows and Hides forecast, Latitude and the Map divs.(you can always update the list) ------//
$(document).ready(function () {
	parkMap = L.map("park-map");

	initializeParkData(); // retrieve list of parks and populate parkList and dropdown menu

	$("#parksChooser").change(doParkPick); // onChange event for dropdown list
	// $('.carousel').carousel();

	// Materialize animation code for front - end
	M.AutoInit();
	getFiveDayForecast(currentLat, currentLon);
});

// Retrieves park data from either localstorage or by making API call
function initializeParkData() {
	// Display loading message. This takes several seconds to load. Hide dropdown menu until loaded
	$("#loading").show();
	$("#parksChooserDiv").hide();
	$("#park-info").hide();

	// Make first item selected on page load
	function addDropdownItems(index, name) {
		const parkHtml1 = "<option value=";
		const parkHtml2 = ">";
		const parkHtml2alt = " selected>";
		const parkHtml3 = "</option>";

		if (index===0) {
			$("#parksChooser").append(parkHtml1 + index + parkHtml2alt + name + parkHtml3);
		}
		else {
			$("#parksChooser").append(parkHtml1 + index + parkHtml2 + name + parkHtml3);
		}
	}

	var lsParkList = JSON.parse(localStorage.getItem(parkListName));

	// If valid list returned, set global list to it, otherwise make API call
	if (lsParkList) {
		parkList = lsParkList;

		for (let i = 0; i < parkList.length; i++) {
			addDropdownItems(i, parkList[i].fullName);
		}

		$("#loading").hide();
		$("#parksChooserDiv").show();
		$("#park-info").show();
		loadParkWeatherAndMap(0);
	} else {
		// Make call to National Park Service to get a list of GA parks
		$.ajax({
			url: npsURL,
			method: "GET",
		})
			.then(function (response) {
				// Check to make sure park is only in GA (not multi-state park), then add to parkList
				var newIndex = 0;

				response.data.forEach(function (item) {
					if (item.states === "GA") {
						newIndex = parkList.push(item) - 1; //push returns new length
						addDropdownItems(newIndex, item.fullName);
					}
				});

				if (parkList.length > 0) {
					localStorage.setItem(parkListName, JSON.stringify(parkList));
				}

				// Hide loading, show dropdown menu
				$("#loading").hide();
				$("#parksChooserDiv").show();
				$("#park-info").show();
				loadParkWeatherAndMap(0);
			})
			.catch(function (error) {
				// Hide loading
				$("#loading").hide();
				// TODO: use something other than alert
				alert("Sorry, cannot retrieve park data. Try again later.");
			});
	}
}

// Load park images into array
function loadParkImages(index) {
	const html1 = '<a class="carousel-item"><img src="';
	const html2 = '" alt="';
	const html3 = '"></a>';

	// Make sure index is valid
	if ((index >= 0) && (index < parkList.length)) {
		$("#park-pic").attr({src: parkList[index].images[0].url, alt:parkList[index].images[0].altTex});
		// $("#pic-carousel").empty();

		// for (let i = 0; i < parkList[index].images.length; i++) {
		// 	$("#pic-carousel").append(html1 + parkList[index].images[i].url + html2 + 
		// 		parkList[index].images[i].altText + html3);
		// }
	}
}

function loadParkWeatherAndMap(index) {
	var parkHours = parkList[index].operatingHours[0].standardHours;

	currentLat = parkList[index].latitude;
	currentLon = parkList[index].longitude;

	$("#park-name").val(index);
	$("#park-name").text(parkList[index].fullName);
	$("#park-city").text("City: " + parkList[index].addresses[0].city);
	$("#park-desc").text(parkList[index].description);
	$("#park-cost").text("Entrance Fee: $" + parseFloat(parkList[index].entranceFees[0].cost).toFixed(2));
	$("#sun").text("Sunday: " + parkHours.sunday);
	$("#mon").text("Monday: " + parkHours.monday);
	$("#tue").text("Tuesday: " + parkHours.tuesday);
	$("#wed").text("Wednesday: " + parkHours.wednesday);
	$("#thu").text("Thursday: " + parkHours.thursday);
	$("#fri").text("Friday: " + parkHours.friday);
	$("#sat").text("Saturday: " + parkHours.saturday);

	loadParkImages(index);
	$("#park-weather-map").show();
	getFiveDayForecast(currentLat, currentLon);
	displayMap();
}

// OnChange event for dropdown list
function doParkPick(event) {
	event.preventDefault();
	var index = $(this).val();
	loadParkWeatherAndMap(index);
}

function getFiveDayForecast(lat, lon) {
	var URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=fedf8af71a69ed785569f9a644c3f570&units=imperial`;

	$.getJSON(URL, function (data) {
		makeDailyForecast(data);
	});
}

function makeCurrentForecast(time, data) {
	$("#forecastFiveDay").append(`
	  <div class="col m2">
		<div class="col">
		  <div class="card park-weather" style="width:200px; ">
			<div class="card-content white-text center" style="width: 200px;">
			  <span class="card-title">${time}</span>
			  <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"></img>
			  <p>Temp: ${data.main.temp} °F</p>
			  <br>
			  <p>Humidity: ${data.main.humidity} %</p>
			</div>
		  </div>
		</div>
	  </div>
	`);
}

function makeDailyForecast(data) {
	var dailyData = "";
	var makeTime = "";

	var currentDayData = data.list[0];

	$("#forecastFiveDay").empty();
	for (var i = 6; i < 40; i += 8) {
		dailyData = data.list[i];
		getUnix = dailyData.dt;
		getUnix *= 1000;
		makeTime = new Date(getUnix).toLocaleDateString();

		if (i === 6) {
			makeCurrentForecast("Today", currentDayData);
		}

		$("#forecastFiveDay").append(`
		<div class="col m2">
			<div class="col">
				<div class="card park-weather">
					<div class="card-content white-text center" style="width: 200px;">
						<span class="card-title">${makeTime}</span>
						<img src="http://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png"></img>
						<p>Temp: ${dailyData.main.temp} °F</p>
						<br>
							<p>Humidity: ${dailyData.main.humidity} %</p>
			  </div>
					</div>
				</div>
			</div>
	  `);
	}
}

// Makes API call to display map of park location
function displayMap() {
	parkMap.setView([currentLat, currentLon], 13);

	L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" + mapBoxAPI, {
		attribution:
			'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: "mapbox/streets-v11",
		tileSize: 512,
		zoomOffset: -1,
		accessToken: mapBoxAPI,
	}).addTo(parkMap);

	L.marker([currentLat, currentLon]).addTo(parkMap);
}