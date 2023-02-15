const renderInitialMyMapPage = function() {
  const mapInitialElements = renderMapListingInitial("MY MAPS");
  const $myMapPage = $(mapInitialElements);
  window.$myMapPage = $myMapPage;
};

$(() => {
  //render basic HTML of my map page
  renderInitialMyMapPage();

  $('body').on('click', '#btngetMyMaps', function() {
    getMyMaps().then(function(json) {
      resetPage($myMapPage);
      renderInitialMyMapPage();
      console.log("json maps:", json);
      views_manager.show('myMaps');
      renderMapCardCollection(json.maps, '#non-carousel-map');
    });
  });
});
