const renderInitialFavouriteMapPage = function() {
  const mapInitialElements = renderMapListingFavourite("MY FAVOURITE MAPS");
  const $myFavouriteMapPage = $(mapInitialElements);

  window.$myFavouriteMapPage = $myFavouriteMapPage;
};

const loadFavouritePage = function() {
  getMyFavouriteMaps().then(function(json) {
    resetPage($myFavouriteMapPage);
    renderInitialFavouriteMapPage();
    console.log("json favourite map:", json);
    views_manager.show('myFavouriteMap');
    renderMapCardCollection(json.faveMaps, '#non-carousel-map');
  });
};

$(() => {
  //render basic HTML of my favourite page
  renderInitialFavouriteMapPage();

  $('body').on('click', '#btngetMyFavouriteMaps', function() {
    loadFavouritePage();
  });
});
