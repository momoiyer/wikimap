// Client facing scripts here
// home page loading

$(() => {
  const $loadHomePage = function() {
    getAllMapListings().then(function(json) {
      console.log("json maps:", json);
      views_manager.show('allMapListings');
    });
  };

  //get all maps listing for home page
  $loadHomePage();

  $("#btnLogin").click(function() {
    //pass user id from the input?
    //do we need this?
    logIn(10);
    alert("User Logged In");
    $loadHomePage();
  });

  $("#btnLogout").click(function() {
    logout();
    alert("User Logged Out");
    $loadHomePage();
  });

  $("#btnHome").click(function() {
    $loadHomePage();
  });

});
