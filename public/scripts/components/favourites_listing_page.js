const renderInitialFavouriteMapPage = function() {
  const mapInitialElements = renderMapListingInitial("MY FAVOURITE MAPS");
  const $myFavouriteMapPage = $(mapInitialElements);

  window.$myFavouriteMapPage = $myFavouriteMapPage;
};

$(() => {
  //render basic HTML of my favourite page
  renderInitialFavouriteMapPage();

  $('body').on('click', '#btngetMyFavouriteMaps', function() {
    getMyFavouriteMaps().then(function(json) {
      resetPage($myFavouriteMapPage);
      renderInitialFavouriteMapPage();
      console.log("json favourite map:", json);
      views_manager.show('myFavouriteMap');
      renderMapCardCollection(json.faveMaps, '#non-carousel-map');
    });
  });
});
