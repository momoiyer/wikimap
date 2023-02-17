const renderInitialHomePage = function() {
  const mapInitialElements = renderMapListingInitial("Explore maps near you");
  const $allMapListingPage = $(mapInitialElements);

  checkIsLoggedIn().then(function(userLoggedIn) {
    if (!userLoggedIn) {
      console.log("checkIsLoggedIn: ", false);
      $('.fa-heart').hide();
    }
  });

  window.$allMapListingPage = $allMapListingPage;
};

$(() => {
  //render basic HTML of home page
  renderInitialHomePage();

  const $loadHomePage = function() {
    getAllMapListings().then(function(json) {
      console.log("json: ", json);
      resetPage($allMapListingPage);
      renderInitialHomePage();
      views_manager.show('allMapListings');
      renderMapCardCollection(json.maps, '#non-carousel-map');

    });
  };

  //get all maps listing for home page
  $loadHomePage();

  window.$loadHomePage = $loadHomePage;

  $('body').on('click', '.map-card-header', function(event) {
    const mapCardId = event.currentTarget.id;
    const mapId = mapCardId.slice(16);
    console.log("mapId after slice: ", mapId);
    // const mapId = $('#mapId').val();
    loadMapDetailPage(mapId);
  });

  $('body').on('click', '.fa-heart', function(event) {
    console.log("clicked fav!");
    $(this).toggleClass("is-favourite");
    const mapCardId = event.currentTarget.id;
    let mapId = mapCardId.slice(10);
    if (!mapId) {
      mapId = $('#mapId').val();
    }
    console.log("mapId: ", mapId);
    toggleFavourite(mapId).then(function(json) {
      console.log("toggleFavourite:", json);
      const $main = $('#main-content');
      const $spanTag = $main.children().find('span');
      const $page = $spanTag.attr('id');

      if ($page === 'fav-page') {
        console.log("hello from fave page");
        loadFavouritePage();
      }

      if ($page === 'user-page') {
        loadUserProfilePage();
      }
    });
  });
})

