$(() => {
  const $myFavouriteMapPage = $(`
      <div>
      <h1> My Favourite Maps are here!</h1>
      </div>
  `);

  window.$myFavouriteMapPage = $myFavouriteMapPage;

  $('body').on('click', '#btngetMyFavouriteMaps', function() {
    getMyFavouriteMaps().then(function(json) {
      console.log("json favourite map:", json);
      views_manager.show('myFavouriteMap');
    });
  });
});
