var last, diff;

$(document).ready(function () {
    $('.container').removeClass('animated fadeInRight').addClass('animated fadeInRight').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {

        $(this).removeClass("animated fadeInRight");
    });
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

        function showPosition(position) {

            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            var ourRequest = new XMLHttpRequest();

            ourRequest.open('GET', 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + lon);

            ourRequest.onload = function () {
                if (ourRequest.status >= 200 && ourRequest.status < 400) {
                    var ourData = JSON.parse(ourRequest.responseText);
                    renderHTML(ourData);
                }
                else {
                    console.log("We connected to the server, but it returned an error.");
                }
            };
            ourRequest.onerror = function () {
                console.log("Connection error");
            };
            ourRequest.send();
        }

    } else {
        x.innerHTML = "Weather Data Cannot be retrieved from server as Geolocation is not supported by this browser.";
    }
}

$(".fa-sync-alt").click(function () {
    getLocation();
    var now = new Date(Date.now());
    checked = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

    $('.card-footer').removeClass('animated flip').addClass('animated flip').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(".refresh").text(" Last Checked " + checked);
        $(this).removeClass("animated flip");
    });

});

$('.fa-sync-alt').hover(function () {
    $(this).addClass('fa-spin');
}, function () {
    $(this).removeClass('fa-spin');
})

function renderHTML(data) {

    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thur";
    weekday[5] = "Fri";
    weekday[6] = "Sat";


    var month = new Array(11);
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    var now = new Date(Date.now());

    var formatted = weekday[now.getDay()] + ' , ' + month[now.getMonth()] + ' ' + now.getDate() + ' ' + now.getFullYear() + ' ' + now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    var sunrise = new Date(data.sys["sunrise"] * 1000).toLocaleTimeString();
    var sunset = new Date(data.sys["sunset"] * 1000).toLocaleTimeString();

    var weatherStatus = data.weather[0].main;
    var logo = data.weather[0].icon;
    // var celcius = "&#8451;";

    var location = data["name"] + ' , ' + data.sys["country"];
    var tempNow = data.main["temp"] + "°";
    var minmaxtemp = 'High ' + data.main["temp_max"] + "°" + " | " + "Low " + data.main["temp_min"] + "°";

    $('.location , .timeNow , .weatherStatus,.min-max-temp,.card-title').removeClass('animated zoomIn').addClass('animated zoomIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass("animated zoomIn");
    });

    $(".location").text(location);
    $(".timeNow").text(formatted);
    $(".weatherStatus").text(weatherStatus);
    $(".min-max-temp").text(minmaxtemp);
    $('#img-status').replaceWith('<img src=' + logo + '>' + tempNow + '');

}