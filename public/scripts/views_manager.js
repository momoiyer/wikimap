$(() => {
  const $main = $('#main-content');
  window.views_manager = {};
  window.views_manager.show = function(item) {
    $allMapListingPage.detach();
    $userProfilePage.detach();
    $myMapPage.detach();
    $mapDetailsPage.detach();
    $myContributedMapPage.detach();
    $myFavouriteMapPage.detach();

    switch (item) {
      case 'allMapListings':
        $allMapListingPage.appendTo($main);
        break;
      case 'userProfile':
        $userProfilePage.appendTo($main);
        break;
      case 'myMaps':
        $myMapPage.appendTo($main);
        break;
      case 'mapDetails':
        $mapDetailsPage.appendTo($main);
        break;
      case 'myContributedMap':
        $myContributedMapPage.appendTo($main);
        break;
      case 'myFavouriteMap':
        $myFavouriteMapPage.appendTo($main);
        break;
    }
  };
});
