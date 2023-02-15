const renderInitialContributedMapPage = function() {
  const mapInitialElements = renderMapListingInitial("SHARED MAPS");
  const $myContributedMapPage = $(mapInitialElements);
  window.$myContributedMapPage = $myContributedMapPage;
};

$(() => {
  //render basic HTML of my contribution page
  renderInitialContributedMapPage();

  $('body').on('click', '#btngetMyContributedMaps', function() {
    getMyContributedMaps().then(function(json) {
      resetPage($myContributedMapPage);
      renderInitialContributedMapPage();
      console.log("json contributed map:", json);
      views_manager.show('myContributedMap');
      renderMapCardCollection(json.sharedMaps, '#non-carousel-map');
    });
  });
});
