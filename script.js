/** @format */

// National Park Service API
const npsURL = "https://developer.nps.gov/api/v1/parks?stateCode=GA&api_key=BC3dYC7e66JYRo9zARWdKwuCsC4f3bFp93ViUP1Z";

// OpenWeatherMAP API
const openWeatherEndPoint = "https://api.openweathermap.org/data/2.5/forecast";
const openWeatherAPIkey = "&APPID=eee981012b240ab34d1f9eee38b81916";
var openWeatherURL = openWeatherEndPoint + "?lat=33.7490&lon=-84.3880" + openWeatherAPIkey; // initialize to Atlanta

const parkListName = "parkPlannerList";
var parkList = [];

/* 

const parkListName = "parkPlannerList";
var parkList = [];

/* 
$.get("https://developer.nps.gov/api/v1/parks?parkCode=&q=georgia").then(function (res) {
    console.log(res)
}) */

//----Shows and Hides forecast, Latitude and the Map divs.(you can always update the list) ------//
$(document).ready(function () {
	initializeParkData(); // retrieve list of parks and populate parkList and pulldown menu

	$(".dropdown-trigger").dropdown({ hover: false }); // Activate park drop down menu

	$("select").formSelect();
	$("#parkInfo2 li").on("click", function () {
		console.log($(this).attr("id"));
		const action = $(this).attr("id");
		if (action === "showWeather") {
			$("#forcast").show();
			$("#showLatitude").hide();
			$("#customMap").hide();
		} else if (action === "latitude") {
			$("#forcast").hide();
			$("#showLatitude").show();
			$("#customMap").hide();
		} else {
			$("#forcast").hide();
			$("#showLatitude").hide();
			$("#customMap").show();
		}
	});
	$(".carousel.carousel-slider").carousel({
		fullWidth: true,
	});
	// $(".sidenav-trigger").sidenav();
});

//--------Function below displays the park Name on the card when ever the User picks a Park from the option tab -----//
$("#parksChooser").on("change", function () {
	var value = $(this).val();
	console.log("clicked");
	console.log(value);
	$("#parkName").text(value);
	//make api call to get park info
});

// Retrieves park data from either localstorage or by making API call
function initializeParkData() {
	// Display throbber. This takes several seconds to load. Hide dropdown menu until loaded
	$("#loading").show();
	$("#parksChooserDiv").hide();

	const parkHtml1 = '<li style="width: 100px"><a href="#!" value=';
	const parkHtml2 = ">";
	const parkHtml3 = "</a></li>";

	var lsParkList = JSON.parse(localStorage.getItem(parkListName));

	// If valid list returned, set global list to it, otherwise make API call
	if (lsParkList) {
		parkList = lsParkList;

		for (let i = 0; i < parkList.length; i++) {
			$("#parksChooser").append(parkHtml1 + i + parkHtml2 + parkList[i].fullName + parkHtml3);
		}

		$("ul.dropdown-content li").click(doParkPick); // add event handler to list items
		$("#loading").hide();
		$("#parksChooserDiv").show();
	} else {
		// Make call to National Park Service to get a list of GA parks
		$.ajax({
			url: npsURL,
			method: "GET",
		})
			.then(function (response) {
				console.log(response);

				// Check to make sure park is only in GA (not multi-state park), then add to parkList
				var newIndex = 0;

				response.data.forEach(function (item) {
					if (item.states === "GA") {
						newIndex = parkList.push(item) - 1; //push returns new length
						$("#parksChooser").append(parkHtml1 + newIndex + parkHtml2 + item.fullName + parkHtml3);
					}
				});

				if (parkList.length > 0) {
					localStorage.setItem(parkListName, JSON.stringify(parkList));
				}

				// Hide throbber, show dropdown menu
				$("ul.dropdown-content li").click(doParkPick); // add event handler to list items
				$("#loading").hide();
				$("#parksChooserDiv").show();
			})
			.catch(function (error) {
				// Hide throbber
				$("#loading").hide();
				// TODO: use something other than alert
				alert("Sorry, cannot retrieve park data. Try again later.");
			});
	}
}

// Retrieves park data from either localstorage or by making API call
function initializeParkData() {
	// Display throbber. This takes several seconds to load. Hide dropdown menu until loaded
	$("#loading").show();
	$("#parksChooserDiv").hide();

	const parkHtml1 = '<li style="width: 100%"><a href="#!" value=';
	const parkHtml2 = ">";
	const parkHtml3 = "</a></li>";

	var lsParkList = JSON.parse(localStorage.getItem(parkListName));

	// If valid list returned, set global list to it, otherwise make API call
	if (lsParkList) {
		parkList = lsParkList;

		for (let i = 0; i < parkList.length; i++) {
			$("#parksChooser").append(parkHtml1 + i + parkHtml2 + parkList[i].fullName + parkHtml3);
		}

		$("ul.dropdown-content li").click(doParkPick); // add event handler to list items
		$("#loading").hide();
		$("#parksChooserDiv").show();
	} else {
		// Make call to National Park Service to get a list of GA parks
		$.ajax({
			url: npsURL,
			method: "GET",
		})
			.then(function (response) {
				console.log(response);

				// Check to make sure park is only in GA (not multi-state park), then add to parkList
				var newIndex = 0;

				response.data.forEach(function (item) {
					if (item.states === "GA") {
						newIndex = parkList.push(item) - 1; //push returns new length
						$("#parksChooser").append(parkHtml1 + newIndex + parkHtml2 + item.fullName + parkHtml3);
					}
				});

				if (parkList.length > 0) {
					localStorage.setItem(parkListName, JSON.stringify(parkList));
				}

				// Hide throbber, show dropdown menu
				$("ul.dropdown-content li").click(doParkPick); // add event handler to list items
				$("#loading").hide();
				$("#parksChooserDiv").show();
			})
			.catch(function (error) {
				// Hide throbber
				$("#loading").hide();
				// TODO: use something other than alert
				alert("Sorry, cannot retrieve park data. Try again later.");
			});
	}
}

function doParkPick(event) {
	var pickedPark = event.target.getAttribute("value");
	console.log("in doParkPick " + pickedPark);
	// TODO: display data for picked park
}

// initialize the map
// initialize the map on the "map" div with a given center and zoom
