function logIn(param) {
  return $.ajax({
    method: "GET",
    url: `/api/user/login/${param}`,
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

function getAllMapListings(param) {
  let url = "/api/maps/all";
  if (param) {
    url += `all/${param}`;
  }
  return $.ajax({
    method: "GET",
    url: url
  });
}
