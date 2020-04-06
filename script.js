// NPS API key: BC3dYC7e66JYRo9zARWdKwuCsC4f3bFp93ViUP1Z
const npsURL = "https://developer.nps.gov/api/v1/parks?stateCode=GA&api_key=BC3dYC7e66JYRo9zARWdKwuCsC4f3bFp93ViUP1Z";

// OpenWeather API key: eee981012b240ab34d1f9eee38b81916
const openWeatherEndPoint = "https://api.openweathermap.org/data/2.5/forecast";
const openWeatherAPIkey = "&APPID=eee981012b240ab34d1f9eee38b81916";
var openWeatherURL = openWeatherEndPoint + "?lat=33.7490&lon=-84.3880" + openWeatherAPIkey; // initialize to Atlanta

// This is what the NPS response will look like:
// [
//     {
//       "total": "496",
//       "data": [
//         {
//           "addresses": [
//             {
//               "line1": "2 Officers Row",
//               "line2": "Yellowstone National Park Headquarters",
//               "line3": "",
//               "city": "Yellowstone National Park",
//               "stateCode": "WY",
//               "postalCode": "82190",
//               "type": "Physical"
//             },
//             {
//               "line1": "P.O. Box 168",
//               "line2": "",
//               "line3": "",
//               "city": "Yellowstone National Park",
//               "stateCode": "WY",
//               "postalCode": "82190-0168",
//               "type": "Mailing"
//             }
//           ],
//           "contacts": [
//             {
//               "phoneNumbers": [
//                 {
//                   "phoneNumber": "3073447381",
//                   "description": "",
//                   "extension": "",
//                   "type": "Voice"
//                 },
//                 {
//                   "phoneNumber": "3073442014",
//                   "description": "",
//                   "extension": "",
//                   "type": "Fax"
//                 },
//                 {
//                   "phoneNumber": "3073442386",
//                   "description": "",
//                   "extension": "",
//                   "type": "TTY"
//                 }
//               ],
//               "emailAddresses": [
//                 {
//                   "emailAddress": "yell_visitor_services@nps.gov",
//                   "description": ""
//                 }
//               ]
//             }
//           ],
//           "description": "Visit Yellowstone and experience the world's first national park. Marvel at a volcano's hidden power rising up in colorful hot springs, mudpots, and geysers. Explore mountains, forests, and lakes to watch wildlife and witness the drama of the natural world unfold. Discover the history that led to the conservation of our national treasures 'for the benefit and enjoyment of the people.'",
//           "designation": "National Park",
//           "directionsInfo": "Yellowstone National Park covers nearly 3,500 square miles in the northwest corner of Wyoming (3% of the park is in Montana and 1% is in Idaho). Yellowstone has five entrance stations, and several are closed to regular vehicles during winter. It takes many hours to drive between these entrances, so be sure to check the status of roads at the entrance you intend to use while planning your trip and before you arrive.",
//           "directionsUrl": "https://www.nps.gov/yell/planyourvisit/directions.htm",
//           "entranceFees": [
//             {
//               "cost": 30,
//               "description": "7-day pass for Yellowstone National Park",
//               "title": "Yellowstone (private, non-commercial vehicle)"
//             },
//             {
//               "cost": 25,
//               "description": "7-day pass for Yellowstone National Park. Snowmobile entry limited to guided tours or permit holders.",
//               "title": "Yellowstone (motorcycle or snowmobile)"
//             }
//           ],
//           "entrancePasses": [
//             {
//               "cost": 60,
//               "description": "Annual pass providing free entrance to Yellowstone National Park for one year; valid through the month of purchase. Winter use: On a snowmobile, admits the signers and children (residing in the same household under the age of 21). In a snowcoach or shuttle, it admits the signers and up to three additional persons (16 and older) for a total of four people.",
//               "title": "Yellowstone National Park Annual Pass"
//             }
//           ],
//           "fullName": "Yellowstone National Park",
//           "id": "F58C6D24-8D10-4573-9826-65D42B8B83AD",
//           "images": [
//             {
//               "credit": "NPS/Jim Peaco",
//               "altText": "Crowd watching Aurum Geyser erupt",
//               "title": "Aurum Geyser",
//               "id": 1789,
//               "caption": "Aurum Geyser Erupting",
//               "url": "https://www.nps.gov/common/uploads/structured_data/3C7D2FBB-1DD8-B71B-0BED99731011CFCE.jpg"
//             },
//             {
//               "credit": "NPS/Neal Herbert",
//               "altText": "Photo of bison in Lamar Valley",
//               "title": "Bison in Lamar Valley",
//               "id": 1792,
//               "caption": "Bison in Lamar Valley",
//               "url": "https://www.nps.gov/common/uploads/structured_data/3C7D34E6-1DD8-B71B-0BBB1C0F478318E2.jpg"
//             }
//           ],
//           "latLong": "lat:44.59824417, long:-110.5471695",
//           "name": "Yellowstone",
//           "operatingHours": [
//             {
//               "name": "All Park Hours",
//               "description": "Yellowstone is open daily, year-round, although activities and services are limited at night and certain times of year. The park has five entrance stations, but not all entrance stations are open year-round. Make sure to carefully read about access at each station at different times of year. And remember, all dates are weather dependent!\n\nPlease note that camping is possible only in designated campgrounds.",
//               "standardHours": [
//                 {
//                   "sunday": "All Day",
//                   "monday": "All Day",
//                   "tuesday": "All Day",
//                   "wednesday": "All Day",
//                   "thursday": "All Day",
//                   "friday": "All Day",
//                   "saturday": "All Day"
//                 }
//               ],
//               "exceptions": [
//                 {
//                   "name": "Thanksgiving Day",
//                   "startDate": "{ts '2015-11-26 00:00:00'}",
//                   "endDate": "{ts '2015-11-26 00:00:00'}",
//                   "exceptionHours": [
//                     {
//                       "sunday": "Closed",
//                       "monday": "Closed",
//                       "tuesday": "Closed",
//                       "wednesday": "Closed",
//                       "thursday": "Closed",
//                       "friday": "Closed",
//                       "saturday": "Closed"
//                     }
//                   ]
//                 },
//                 {
//                   "name": "Christmas Day",
//                   "startDate": "{ts '2015-12-25 00:00:00'}",
//                   "endDate": "{ts '2015-12-25 00:00:00'}",
//                   "exceptionHours": [
//                     {
//                       "sunday": "Closed",
//                       "monday": "Closed",
//                       "tuesday": "Closed",
//                       "wednesday": "Closed",
//                       "thursday": "Closed",
//                       "friday": "Closed",
//                       "saturday": "Closed"
//                     }
//                   ]
//                 }
//               ]
//             },
//             {
//               "name": "West Entrance",
//               "description": "Adjacent to the town of West Yellowstone, MT, the West Entrance is usually open (weather dependent) to wheeled vehicles from the third Friday in April through early November, and to tracked-oversnow (snowmobiles and snowcoaches) vehicles from December 15 to March 15.",
//               "standardHours": [
//                 {
//                   "sunday": "Closed",
//                   "monday": "Closed",
//                   "tuesday": "Closed",
//                   "wednesday": "Closed",
//                   "thursday": "Closed",
//                   "friday": "Closed",
//                   "saturday": "Closed"
//                 }
//               ],
//               "exceptions": null
//             }
//           ],
//           "parkCode": "yell",
//           "states": "ID,MT,WY",
//           "url": "https://www.nps.gov/yell/index.htm",
//           "weatherInfo": "Yellowstone's weather can vary quite a bit, even in a single day. In the summer, daytime highs can exceed 70F (25C), only to drop 20 or more degrees when a thunderstorm rolls through. It can snow during any month of the year, and winter lows frequently drop below zero, especially at night. Bring a range of clothing options, including a warm jacket and rain gear, even in the summer."
//         }
//       ],
//       "limit": "50",
//       "start": "1"
//     }
//   ]

// This is what the OpenWeather response looks like
// {
//     "cod": "200",
//     "message": 0,
//     "cnt": 40,
//     "list": [
//       {
//         "dt": 1578409200,
//         "main": {
//           "temp": 284.92,
//           "feels_like": 281.38,
//           "temp_min": 283.58,
//           "temp_max": 284.92,
//           "pressure": 1020,
//           "sea_level": 1020,
//           "grnd_level": 1016,
//           "humidity": 90,
//           "temp_kf": 1.34
//         },
//         "weather": [
//           {
//             "id": 804,
//             "main": "Clouds",
//             "description": "overcast clouds",
//             "icon": "04d"
//           }
//         ],
//         "clouds": {
//           "all": 100
//         },
//         "wind": {
//           "speed": 5.19,
//           "deg": 211
//         },
//         "sys": {
//           "pod": "d"
//         },
//         "dt_txt": "2020-01-07 15:00:00"
//       },
      
//       ...
      
//   "city": {
//       "id": 2643743,
//       "name": "London",
//       "coord": {
//         "lat": 51.5073,
//         "lon": -0.1277
//       },
//       "country": "GB",
//       "timezone": 0,
//       "sunrise": 1578384285,
//       "sunset": 1578413272
//     }
//   }

var parkList = [];

initializeParkData(); // retrieve list of parks and populate parkList and pulldown menu

$("#parksChooser").change(parkChooser); // event handler for dropdown menu

loadWeather(33.7490, -84.3880); // TODO: for testing only

function initializeParkData() {
    // Display throbber. This takes several seconds to load. Hide dropdown menu until loaded
    $("#loading").show();
    $("#parksChooserDiv").hide();

    // Make call to National Park Service to get a list of GA parks
    $.ajax({
        url: npsURL,
        method: "GET"
    }).then(function (response) {s
        console.log(response);

        // Check to make sure park is only in GA (not multi-state park), then add to parkList
        var newIndex = 0;
        var newOption;
        response.data.forEach(function (item) {
            if (item.states === "GA") {
                newIndex = parkList.push(item) - 1; //push returns new length
                newOption = $("<option>"); // create new option for dropdown menu
                newOption.text(item.fullName);
                newOption.val(newIndex);
                $("#parksChooser").append(newOption);
            }
        })

        // Hide throbber, show dropdown menu
        $("#loading").hide();
        $("#parksChooserDiv").show();
    }).catch(function (error) {
        // Hide throbber
        $("#loading").hide();
        // TODO: use something other than alert
        alert("Sorry, cannot retrieve park data. Try again later.")
    });
}

function parkChooser() {
    // TODO: replace alert with displaying park information
    alert("You chose " + parkList[$(this).val()].fullName);
}

function loadWeather(lat, lon) {
    openWeatherURL = openWeatherEndPoint + "?lat=" + lat + "&lon=" + lon    + openWeatherAPIkey;

    $.ajax({
        url: openWeatherURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        // TODO: use something other than alert
        alert("Sorry, cannot retrieve weather data. Try again later.")
    });
}