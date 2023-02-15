const renderInitialHomePage = function() {
  const $allMapListingPage = $(`
      <div>
        <h1> Maps are here!</h1>

      <!-- <button type="button" id="btngetmapDetails">Get Details of this Maps</button> -->
      </div>

      <!-- append to  #main-content-->
      <header class="for-browse-pages" id="home-page">
        Explore maps near you
      </header>
      <section class="map-cards-here" id="non-carousel-map">
        <!-- append map-cards in here for each map -->
      </section>
  `);

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
    console.log("event", event.currentTarget.id);
    const mapCardId = event.currentTarget.id;
    const mapId = mapCardId.slice(9);
    getMapDetails(mapId).then(function(json) {
      views_manager.show('mapDetails');
    });
  });
})

