function reverseGeocoding(lat, lng) {
  var requestOptions = {
    method: 'GET',
  };

  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=41cf5e6cbdf4420886ffe2759b04d4ca`;

  fetch(url, requestOptions)
    .then(response => {
      // console.log("fetch response:", response);
      return response.json();
    })
    .then(result => console.log("Reverse Geocoding Result: ", result.features[0].properties))
    .catch(error => console.log('error', error));
}
