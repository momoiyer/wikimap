$(() => {
  $("#btngetMyFavouriteMaps").click(function() {
    getMyFavouriteMaps().then(function(json) {
      console.log("json favourite map:", json);
      $('#myFavouriteMaps').append(`
      <div>
      <h1> My Favourite Map is here!</h1>
      </div>
    `);
    });
  });
});
