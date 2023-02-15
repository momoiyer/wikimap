const renderInitialHomePage = function() {
  const $allMapListingPage = $(`
      <div>
        <h1> Maps are here!</h1>

      <button type="button" id="btngetmapDetails">Get Details of this Maps</button>
      </div>

      <!-- append to  #main-content-->
      <header class="for-browse-pages" id="home-page">
        Explore maps near you
      </header>
      <section class="map-cards-here" id="map-card-collection">
        <!-- append map-cards in here for each map -->
      </section>
  `);

  window.$allMapListingPage = $allMapListingPage;
};

const renderMapCardToHomePage = function(data) {
  data.maps.forEach(map => {
    $mapCardListing = $('#map-card-collection');
    const $mapCard = renderMapCard(map);
    $mapCardListing.append($mapCard);
  });
};

const renderMapCard = function(map) {
  const html = `
  <article class="map-info-container" id= "map-card-${map.id}">
      <header>
        <div>
          <img class="map-point" src="${map.image_url}">
        </div>
        <div>
          <h6>${map.title}</h6>
          <p>${map.description}</p>
          <p><small>created on:${map.created_date}</small></p>
        </div>
      </header>
      <footer>
        <i class="fa-solid fa-heart"></i>
      </footer>
    </article>
    `;
  return html;
};

$(() => {
  $('body').on('click', '.map-info-container', function(event) {
    console.log("event", event.currentTarget.id);
    const mapCardId = event.currentTarget.id;
    const mapId = mapCardId.slice(9);
    getMapDetails(mapId).then(function(json) {
      views_manager.show('mapDetails');
    });
  });
})

