function reverseGeocoding(lat, lng) {
  var requestOptions = {
    method: 'GET',
  };

  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=41cf5e6cbdf4420886ffe2759b04d4ca`;

  return fetch(url, requestOptions)
    .then(response => {
      console.log("fetch response:", response.json);
      return response.json();
    })
    .then((result) => {
      const reverseGeoData = result.features[0].properties;
      const leafletPointData = {
        address_line_1: reverseGeoData.address_line1,
        address_line_2: reverseGeoData.address_line2,
        lat,
        lng,
      };
      console.log("pointData object: ", leafletPointData);
      return leafletPointData;
    })
    .catch((error) => {
      console.log('error', error);
    });
}
