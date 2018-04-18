var btn = document.getElementById("btn");
var animalContainer = document.getElementById("demo");

btn.addEventListener("click", function () {

    getLocation();

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

});


function renderHTML(data) {

    var htmlString = "";

    var d = new Date();
    var timeNow = d.toString();

    var sunrise = new Date(data.sys["sunrise"] * 1000).toLocaleTimeString();
    var sunset = new Date(data.sys["sunset"] * 1000).toLocaleTimeString();

    var hr = '<hr class="animated fadeInLeft">';
    var p = '<p class="animated fadeInLeft alert alert-primary align-items-center">';
    var celcius = "&#8451;";

    htmlString += hr + p + '<i class="fa fa-clock-o fa-2x"></i>' + " " + timeNow + "</p>" + hr;

    htmlString += p + '<i class="fa fa-globe fa-2x"></i>' + " City: " + data["name"] + "," + data.sys["country"] + "</p><hr>";

    htmlString += p + '<i class="fa fa-bolt fa-2x"></i>' + " Temprature : " + data.main["temp"] + "&#8451;</p><hr>";

    htmlString += p + '<i class="fa fa fa-cloud-download fa-2x"></i>' + " Low : " + data.main["temp_min"] + "&#8451;</p><hr>";

    htmlString += p + '<i class="fa fa fa-cloud-upload fa-2x"></i>' + " High : " + data.main["temp_max"] + "&#8451;</p><hr>";

    htmlString += p + '<i class="fa fa-sun-o fa-2x"></i>' + " Sunrise : " + sunrise + "</p><hr>";

    htmlString += p + '<i class="fa fa-sun-o fa-2x"></i>' + " Sunset : " + sunset + "</p><hr>";


    animalContainer.insertAdjacentHTML('beforeend', htmlString);
} 