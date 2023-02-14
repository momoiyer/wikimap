// Client facing scripts here
$(() => {

  //get all maps listing for home page
  getAllMapListings().then(function(json) {
    console.log("json maps:", json);
    $('#mapListings').append(`
      <div>
      <h1> Maps are here!</h1>
      </div>
    `);
  });

  $("#btnLogin").click(function() {
    //pass user id from the input?
    //do we need this?
    logIn(10);
    alert("User Logged In");
  });

  $("#btnLogout").click(function() {
    logout();
    alert("User Logged Out");
  });

});
