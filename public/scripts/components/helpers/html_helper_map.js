const renderMapCard = function(map) {
  map.favClass = map.isfavourite ? "is-favourite" : "";
  const $html = `
  <article class="map-info-container" id= "map-card">
      <header class="map-card-header" id="map-card-header-${map.id}">
        <div>
          <img class="map-point" src="${map.image_url}">
        </div>
        <div>
          <h6>${map.title}</h6>
          <p>created on: ${map.created_date}</p>
        </div>
      </header>
      <footer>
        <i class="fa-solid fa-lg fa-heart ${map.favClass}"  id="favourite-${map.id}"></i>
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

const renderMapListingFavourite = function(data) {
  const $html = `
  <!-- append to  #main-content-->
  <header class="for-browse-pages">
  <span id="fav-page" ></span>
    ${data}
  </header>
  <section class="map-cards-here" id="non-carousel-map">
    <!-- append map-cards in here for each map -->
  </section>
  `;
  return $html;
};

const renderLoggedInNav = function() {
  const $html = `<span id="btnHome" class="desktop-nav"><i id="logo" class="fa-solid fa-2xl fa-map-location-dot"></i>&nbsp;&nbsp;Treasure Maps</span>

  <span id="drop-down">
    <span id="btngetUserProfile" class="desktop-nav hamburger iconic"><i class="fa-solid fa-user"></i>profile&nbsp;</span>
    <span id="btngetMyMaps" class="desktop-nav hamburger iconic"><i class="fa-solid fa-map"></i>my maps&nbsp;</span>
    <span id="btngetMyFavouriteMaps" class="desktop-nav hamburger iconic"><i class="fa-solid fa-hand-holding-heart"></i></i>favourites&nbsp;</span>
    <span id="btngetMyContributedMaps" class="desktop-nav hamburger iconic"><i class="fa-solid fa-users-rectangle"></i>shared maps&nbsp;</span>
    <span id="btnCreateMap" class="desktop-nav hamburger iconic"><i class="fa-solid fa-square-plus"></i></i>create map&nbsp;</span>

    <span id="btnLogout" class="desktop-nav hamburger"><button type="button" class="desktop-nav btn btn-outline-light">logout</button></span>
  </span>
  <span>
    <span id="menu" class="desktop-nav"><i class="fa-solid fa-xl fa-bars"></i></span>
  </span>`;
  return $html;
};

const renderLoggedOutNav = function() {
  const $html = `<span id="btnHome" class="desktop-nav"><i id="logo" class="fa-solid fa-2xl fa-map-location-dot"></i>&nbsp;&nbsp;Treasure Maps</span>
    <span id="btnLogin" class="desktop-nav hamburger"><button type="button" class="desktop-nav btn btn-outline-light">login</button></span>`;
  return $html;
};
