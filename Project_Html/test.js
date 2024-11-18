var map = L.map("map").setView([52.373, 4.893], 14);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 500,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

fetch(
  "http://api.geonames.org/findNearbyWikipediaJSON?lat=52.373&lng=4.893&radius=20&username=julian_agius"
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    markers(data);
  });

function markers(data) {
  for (x = 0; x < data.geonames.length; x++) {
    var marker = L.marker([data.geonames[x].lat, data.geonames[x].lng]).addTo(
      map
    );

    const img = new Image();
    img.src = data.geonames[x].thumbnailImg;
    var imgs = data.geonames[x].thumbnailImg;
    img.onerror = function () {
      imgs = null;
    };

    let template = `
      <header class = "leaflet-popup-content-header">${data.geonames[x].title}:</header><br>
      ${data.geonames[x].summary}:<br> <br>
      Rank: ${data.geonames[x].rank}
    `;

    if (imgs == null) {
      marker.bindPopup(template);
    } else {
      const finaltemp =
        template +
        `<br><header class = "leaflet-popup-content-header">Image</header><br>
         <img src = ${data.geonames[x].thumbnailImg} style =  width: 100%; height = 150px/>`;
      marker.bindPopup(finaltemp);
    }
  }

  function interval() {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Amsterdam&units=metric&appid=7868a4789180455d860f8d58890addd3"
    )
      .then((res) => res.json())
      .then((data) => weather(data));

    function weather(data) {
      console.log(data);
      let template = "";
      if (data.weather[0].main == "Clouds") {
        template = `<img src = cloudy.png class = "image_weather"/>`;
      } else if (data.weather[0].main == "Clear") {
        template = `<img src = day_clear.png  class = "image_weather"/>`;
      } else if (data.weather[0].main == "Rain") {
        template = `<img src = rain.png class = "image_weather"/>`;
      } else if (data.weather[0].main == "Thunderstorm") {
        template = `<img src = thunder.png class = "image_weather"/>`;
      } else if (data.weather[0].main == "Snow") {
        template = `<img src = snow.png class = "image_weather"/>`;
      } else if (data.weather[0].main == "Mist") {
        template = `<img src = mist.png class = "image_weather"/>`;
      } else if (data.weather[0].main == "Fog") {
        template = `<img src = fog.png class = "image_weather"/>`;
      } else if (data.weather[0].main == "Tornado") {
        template = `<img src = tornado.png class = "image_weather"/>`;
      }
      template = `
  <div class = "template">
    <div class= "image_weather"> ${template} </div>
    <div class="text_weather">
      <div style="width:auto;">${data.name}</div>
      <div>${data.main.temp}°C</div>
    </div>
  </div>`;
      document.getElementById("temp").innerHTML = template;
    }
  }
  interval();
  setInterval(interval, 30000);
}
