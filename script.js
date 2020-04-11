/* 
<<<<<<< HEAD
=======


>>>>>>> 4165d4eb7a09b3cce3e8bffb497532a2cfa00850
$.get("https://developer.nps.gov/api/v1/parks?parkCode=&q=georgia").then(function (res) {
    console.log(res)
}) */

//----Shows and Hides forecast, Latitude and the Map divs.(you can always update the list) ------//
$(document).ready(function () {
    $('select').formSelect();
    $("#parkInfo2 li").on("click", function () {
        console.log($(this).attr("id"))
        const action = $(this).attr("id")
        if (action === 'showWeather') {
            $("#forcast").show();
            $("#showLatitude").hide()
            $("#customMap").hide()
        } else if (action === 'latitude') {
            $("#forcast").hide();
            $("#showLatitude").show()
            $("#customMap").hide()
        } else {
            $("#forcast").hide();
            $("#showLatitude").hide()
            $("#customMap").show()
        }
    })

});

// $(document).ready(function () {
// $(".sidenav-trigger").sidenav();

// });

$(document).ready(function () {
    $('.carousel.carousel-slider').carousel({
        fullWidth: true
    });
});

//--------Function below displays the park Name on the card when ever the User picks a Park from the option tab -----//
$("#parksChooser").on("change", function () {
    var value = $(this).val();
    console.log("clicked")
    console.log(value);
    $("#parkName").text(value);
    //make api call to get park info 
})


// initialize the map
// initialize the map on the "map" div with a given center and zoom