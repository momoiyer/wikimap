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

// CONTRIBUTED MAP RELATED ROUTES //
