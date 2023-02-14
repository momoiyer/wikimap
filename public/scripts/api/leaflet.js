$(document).ready(function() {
  var map = L.map('map').setView([51.1784, -0.09], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  var marker = L.marker([51.5, -0.09]).addTo(map);
  marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
  // var circle = L.circle([51.508, -0.11], {
  //   color: 'red',
  //   fillColor: '#f03',
  //   fillOpacity: 0.5,
  //   radius: 500
  // }).addTo(map);
  // var polygon = L.polygon([
  //   [51.509, -0.08],
  //   [51.503, -0.06],
  //   [51.51, -0.047]
  // ]).addTo(map);
  // circle.bindPopup("I am a circle.");
  // polygon.bindPopup("I am a polygon.");
  var popup = L.popup()
    .setLatLng([51.513, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(map);


  var marker1 = L.marker([51.496881, -0.095271]).addTo(map);

  function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
  }

  map.on('click', onMapClick);

  var popup = L.popup();

  function onMapClick(e) {
    console.log('onclick result:', e);
    console.log('lat type:', typeof e.latlng.lat);

    reverseGeocoding(e.latlng.lat, e.latlng.lng);

    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
  }

  map.on('click', onMapClick);
});
