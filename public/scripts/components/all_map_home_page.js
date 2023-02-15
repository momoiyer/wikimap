const renderInitialHomePage = function() {
  const mapInitialElements = renderMapListingInitial("Explore maps near you");
  const $allMapListingPage = $(mapInitialElements);
  window.$allMapListingPage = $allMapListingPage;
};

$(() => {
  //render basic HTML of home page
  renderInitialHomePage();

  const $loadHomePage = function() {
    getAllMapListings().then(function(json) {
      resetPage($allMapListingPage);
      renderInitialHomePage();
      views_manager.show('allMapListings');
      renderMapCardCollection(json.maps, '#non-carousel-map');
    });
  };

  //get all maps listing for home page
  $loadHomePage();

  window.$loadHomePage = $loadHomePage;

  $('body').on('click', '.map-info-container', function(event) {
    const mapCardId = event.currentTarget.id;
    const mapId = mapCardId.slice(9);
    loadMapDetailPage(mapId);
  });
})

