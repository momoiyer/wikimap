const renderMapCard = function(map) {
  const $html = `
  <article class="map-info-container" id= "map-card-${map.id}">
      <header>
        <div>
          <img class="map-point" src="${map.image_url}">
        </div>
        <div>
          <h6>${map.title}</h6>
          <p><small>created on:${map.created_date}</small></p>
        </div>
      </header>
      <footer>
        <i class="fa-solid fa-heart"></i>
      </footer>
    </article>
    `;
  return $html;
};

const renderMapCardCollection = function(data, element) {
  data.forEach(map => {
    $mapCardListing = $(element);
    const $mapCard = renderMapCard(map);
    $mapCardListing.append($mapCard);
  });
};

function resetPage(element) {
  element.remove();
};

const renderMapListingInitial = function(data) {
  const $html = `
  <!-- append to  #main-content-->
  <header class="for-browse-pages">
    ${data}
  </header>
  <section class="map-cards-here" id="non-carousel-map">
    <!-- append map-cards in here for each map -->
  </section>
  `;
  return $html;
};
