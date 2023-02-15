const renderInitialUserProfilePage = function() {
  const $userProfilePage = $(`
  <!-- section to use for view manager, append to main id#main-content -->
  <section id="user-profile-page">
    <!-- html for user profile header to append -->
    <header id="user-profile"> </header>

    <section class="scrolling-wrapper" id="my-maps">
    <h5>my maps</h5>
    <button type="button" id="btngetMyMaps">View All</button>
    <div class="inner-scroll" id="my-maps-carousel">
      <!-- append map cards for my maps here -->

    </div>
    </section>


  <section class="scrolling-wrapper" id="my-favourites">
    <h5>my favourites</h5>
    <button type="button" id="btngetMyFavouriteMaps">View All</button>
    <div class="inner-scroll" id="favourites-carousel">
      <!-- append map cards for favourite maps here -->

    </div>
  </section>

  <section class="scrolling-wrapper" id="my-contributions">
    <h5>my shared maps</h5>
    <button type="button" id="btngetMyContributedMaps">View All</button>
    <div class="inner-scroll" id="contributed-maps-carousel">
      <!-- append map cards for contributed maps here -->

    </div>
  </section>

  </section>
`);

  window.$userProfilePage = $userProfilePage;
};

const $renderHeader = function(user) {
  const $html = `
  <div id="user-pic-name">
    <img src='${user.profile_image}''>
    <span><h6>${user.name}</h6></span>
    </div>

    <div id="user-location">
    <div id="user-city">${user.city}</div>
    <div id="user-country">${user.country}</div>
  </div>
  `;
  $userHeader = $('#user-profile');
  $userHeader.append($html);
};

$(() => {
  //render basic HTML of user profile page
  renderInitialUserProfilePage();

  $('body').on('click', '#btngetUserProfile', function() {
    getUserProfile().then(function(json) {
      resetPage($userProfilePage);
      renderInitialUserProfilePage();
      console.log("json user profile:", json);
      views_manager.show('userProfile');
      const $userData = json.results[0];
      $renderHeader($userData);
      const $myMapData = json.results[1];
      renderMapCardCollection($myMapData, '#my-maps-carousel');
      const $myFavouriteMapsData = json.results[2];
      renderMapCardCollection($myFavouriteMapsData, '#favourites-carousel');
      const $myContributedMapsData = json.results[3];
      renderMapCardCollection($myContributedMapsData, '#contributed-maps-carousel');
    });
  });
});
