const loadMap = function(coord) {
  console.log("coord from leaflet: ", coord);

  // const defaultCord = !coord ? [55.021471439082184, -104.28103937834645] : coord;

  const map = L.map('map').setView(coord, 11);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  // var marker = L.marker([51.5, -0.09]).addTo(map);
  // marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

  // var popup = L.popup()
  //   .setLatLng([51.513, -0.09])
  //   .setContent("I am a standalone popup.")
  //   .openOn(map);


  // var marker1 = L.marker([51.496881, -0.095271]).addTo(map);

  // map.on('click', onMapClick);

  // var popup = L.popup();

  return map;
};


