// USER RELATED ROUTES //

function logIn(userId) {
  return $.ajax({
    method: "GET",
    url: `/api/user/login/${userId}`,
  });
}

function logout() {
  return $.ajax({
    method: "GET",
    url: "/api/user/logout"
  });
}

function getUserProfile() {
  return $.ajax({
    method: "GET",
    url: "/api/user/"
  });
}

// MAP RELATED ROUTES //

function getAllMapListings() {
  let url = "/api/maps/all";
  return $.ajax({
    method: "GET",
    url: url
  });
}

function getMyMaps() {
  return $.ajax({
    method: "GET",
    url: "/api/maps/mymaps"
  });
}

function getMapToEdit(mapId) {
  return $.ajax({
    method: "GET",
    url: `/api/maps/${mapId}/edit`
  });
}

function getMapDetails(mapId) {
  return $.ajax({
    method: "GET",
    url: `/api/maps/${mapId}`
  });
}

function addNewMap(data) {
  return $.ajax({
    method: "POST",
    url: "/api/maps/new",
    data
  });
}

function updateMap(mapId, data) {
  return $.ajax({
    method: "POST",
    url: `/api/maps/${mapId}`,
    data
  });
}

function deleteMap(mapId, data) {
  return $.ajax({
    method: "POST",
    url: `/api/maps/${mapId}/delete`,
    data
  });
}

// POINT RELATED ROUTES //

function getPoints(mapId) {
  return $.ajax({
    method: "GET",
    url: `/api/points/${mapId}`
  });
}

function addNewPoint(data) {
  return $.ajax({
    method: "POST",
    url: "/api/points/new",
    data
  });
}

function updatePoint(pointId, data) {
  return $.ajax({
    method: "POST",
    url: `/api/points/${pointId}`,
    data
  });
}

function deletePoint(pointId) {
  return $.ajax({
    method: "DELETE",
    url: `/api/points/${pointId}`
  });
}

// FAVORUITES MAP RELATED ROUTES //

function getMyContributedMaps() {
  return $.ajax({
    method: "GET",
    url: "/api/contributions/"
  });
}

function getContributors(mapId) {
  return $.ajax({
    method: "GET",
    url: `/api/contributions/${mapId}`
  });
}

function addContributorToMap(mapId) {
  return $.ajax({
    method: "POST",
    url: `/api/contributions/${mapId}`
  });
}

function removeContributorFromMap(mapId) {
  return $.ajax({
    method: "DELETE",
    url: `/api/contributions/${mapId}`
  });
}

// CONTRIBUTED MAP RELATED ROUTES //

function getMyFavouriteMaps() {
  return $.ajax({
    method: "GET",
    url: "/api/favourites/"
  });
}

function addMapToFavourites(mapId) {
  return $.ajax({
    method: "POST",
    url: `/api/favourites/${mapId}`
  });
}

function removeMapFromFavourites(mapId) {
  return $.ajax({
    method: "DELETE",
    url: `/api/favourites/${mapId}`
  });
}
