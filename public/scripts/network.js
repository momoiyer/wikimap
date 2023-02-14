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


// POINT RELATED ROUTES //

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

// CONTRIBUTED MAP RELATED ROUTES //

function getMyFavouriteMaps() {
  return $.ajax({
    method: "GET",
    url: "/api/favourites/"
  });
}
