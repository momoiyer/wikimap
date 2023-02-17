const renderInitialMapDetailPage = function() {
  const $mapDetailsPage = $(`
    <section id="map-details-page">
      <!--map detail card with favourite icon, edit map form and add/edit point form points list in this div-->
      <div id="left-half">
        <article id="map-card-for-detail-page"></article>
        <section class="vertical-scroll-container" id="points-list">
          <div class="inside-scroll">

          <article class="add-point-form">
          </article>
            <article class="add-point-card">
              <i class="fa-solid fa-xl fa-plus"></i>
            </article>
            <!-- points cards will be appended in here -->
          </div>
        </section>
      </div>
      <!-- delete map button manage contributors form, interactive map -->
      <div id="right-half">
      <div class="map-options"><span id="btnManageContributors">manage contributors&nbsp;<i class="fa-solid fa-chevron-down"></i></span>
          <span id="delete-map">delete map&nbsp;<i  class="delete fa-solid  fa-trash-can"></i></span>
        </div>
        <section class="contributors-form"></section>

        <!--is in section.append-forms on map details page, will more likely need jquery slidedown on click-->
        <section class="leaflet-map"></section>
      </div>
    </section>
  `);


  // const isUserLoggedIn = $('#userLoggedIn').val();
  // console.log("isUserLoggedIn: ", isUserLoggedIn);

  // if (isUserLoggedIn === "false") {
  //   console.log("isUserLoggedIn: ", false);
  // }
  checkIsLoggedIn().then(function(json) {
    const userLoggedIn = json.hasUserId;
    if (!userLoggedIn) {
      $('#btnManageContributors').hide();
      $('#btngetMapToEdit').hide();
      $('#delete-map').hide();
      $('.add-point-card').hide();
      $('.fa-heart').hide();
      $('.edit-delete-point').hide();
    }
  });

  window.$mapDetailsPage = $mapDetailsPage;
};

const loadMapDetailPage = function(mapId) {
  //retrieve map detail data from database
  getMapDetails(mapId).then(function(json) {

    //prepare for map data section
    const mapData = json.results[0];

    console.log("mapData:", mapData);
    const ownerId = mapData.owner_id;
    console.log("ownerId:", ownerId);

    const userId = $('#userId').val();
    console.log("userId: ", userId);

    checkIsLoggedIn().then(function(json) {
      const userLoggedIn = json.hasUserId;
      if (userLoggedIn) {
        const userId = json.userId;
        if (userId != ownerId) {
          console.log("you are not the owner of the map");
          $('#btnManageContributors').hide();
          $('#btngetMapToEdit').hide();
          $('#delete-map').hide();
          // $('.add-point-card').hide();
        }
      }
    });

    const $mapCard = renderMapCardForDetailPage(mapData);

    //reset and mount the page
    mountDetailPage($mapCard);

    //append point data section
    const pointData = json.results[1];
    appendPointSection(pointData);

    //append contributor section and hide
    const mapId = $('#mapId').val();
    appendContributorSection(mapId, true, ownerId);

    //append leaflet map
    const $mapSession = $('.leaflet-map');
    $mapSession.append('<div id="map"></div>');

    let coord = [];
    if (pointData.length > 0) {
      const firstPoint = pointData[0];
      coord = [firstPoint.lat, firstPoint.lon];
    }
    const defaultCord = coord.length === 0 ? [49.2812893631339, -123.1148099151001] : coord; 89;

    const leafletMap = loadMap(defaultCord);
    leafletMap.on('click', onMapClick);

    addPointAsMarker(pointData, leafletMap);
  });

};

const onMapClick = function(e) {
  console.log('onclick result:', e);

  reverseGeocoding(e.latlng.lat, e.latlng.lng)
    .then((result) => {
      const addPointFormData = [result.address_line_1, result.address_line_2, result.lat, result.lng];
      // console.log("result: ", result);
      console.log("addPointFormData: ", addPointFormData);
      L.popup()
        .setLatLng(e.latlng)
        .setContent(`${result.address_line_1}, ${result.address_line_2}`)
        .openOn(this);

      $('#address_line_1').val(addPointFormData[0]);
      $('#address_line_1_hidden').val(addPointFormData[0]);
      $('#address_line_2').val(addPointFormData[1]);
      $('#address_line_2_hidden').val(addPointFormData[1]);
      $('#latitude').val(addPointFormData[2]);
      $('#latitude_hidden').val(addPointFormData[2]);
      $('#longitude').val(addPointFormData[3]);
      $('#longitude_hidden').val(addPointFormData[3]);
    });

};

const addPointAsMarker = function(pointData, map) {
  pointData.forEach(point => {
    const coords = [point.lat, point.lon];
    let marker = L.marker(coords).addTo(map);
    marker.bindPopup(`${point.title}`);
  });
};

const mountDetailPage = function($mapCard) {
  //reset page
  resetPage($mapDetailsPage);
  renderInitialMapDetailPage();

  //mount page
  views_manager.show('mapDetails');

  //append map data section
  const $mapCardForDetailPage = $('#map-card-for-detail-page');
  $mapCardForDetailPage.append($mapCard);
};

const appendPointSection = function(points) {
  const $pointCardsCollection = $('#point-collection');
  $pointCardsCollection.remove();
  const $pointsCollection = renderPointCardCollection(points);
  const $addPointCardArticle = $('.add-point-card');
  $addPointCardArticle.after($pointsCollection);
};

const appendContributorSection = function(mapId, onLoad = false, owner_id = -1) {
  getContributors(mapId).then(function(json) {

    checkIsLoggedIn().then(function(result) {
      const userLoggedIn = result.hasUserId;
      if (userLoggedIn) {
        const userId = result.userId;
        let isContributor = false;
        json.listOfContributors.forEach(contributor => {
          if (contributor.user_id == userId) {
            isContributor = true;
          }
        });

        let isOwner = false;
        if (userId == owner_id) {
          isOwner = true;
        }
        if (!isContributor && !isOwner) {
          $('.add-point-card').hide();
        }
      }
    });

    const $contributorsForm = renderManageContributorForm(json.listOfContributors);
    const $contributorsFormSection = $('.contributors-form');
    $contributorsFormSection.append($contributorsForm);
    if (onLoad) {
      //hide contributor section on load
      $(".manage-contributors").hide();
    }
  });
};

$(() => {



  renderInitialMapDetailPage();


  $('.add-point-form').hide();
  $('#btngetMapToEdit').hide();


  $('body').on('click', '#btngetMapToEdit', function() {
    //get mapId from hidden field
    const mapId = $('#mapId').val();

    //retrieve map data to edit
    getMapToEdit(mapId).then(function(json) {
      console.log("getMapToEdit: ", json);
      //replace map card detail session with map edit form
      const mapData = json.results;
      const $mapEditForm = renderMapEditForm(mapData);
      const $mapCardForDetailPage = $('#map-card-for-detail-page');
      $mapCardForDetailPage.empty();
      $mapCardForDetailPage.append($mapEditForm);
    });
  });


  $('body').on('click', '#btnManageContributors', function() {
    $(".manage-contributors").slideToggle("slow", function() { });
  });

  $('body').on('click', '#btnCreateMap', function() {
    const $mapEditForm = renderCreateMapForm();
    mountDetailPage($mapEditForm);
    $('#right-half').hide();
    $('#points-list').hide();
  });

  $("body").on('submit', ".new-map", (function(event) {
    // prevent the default form submission behaviour
    event.preventDefault();

    const createMapString = $(this).serialize().replaceAll("%20", " ");
    const splitedTextArray = createMapString.split('&');
    const title = splitedTextArray[0].slice(6);
    const description = splitedTextArray[1].slice(12);
    const input = {
      title,
      description
    };
    console.log("input>>", input);
    addNewMap(input).then(function(json) {
      console.log("json: ", json);
      const mapId = json.map[0].id;
      loadMapDetailPage(mapId);
    });
  }));

  $("body").on('submit', ".edit-map", (function(event) {
    // prevent the default form submission behaviour
    event.preventDefault();

    const editMapString = $(this).serialize().replaceAll("%20", " ");
    const splitedTextArray = editMapString.split('&');
    console.log("splitedTextArray: ", splitedTextArray);
    const mapId = splitedTextArray[0].slice(6);
    const title = splitedTextArray[1].slice(6);
    const description = splitedTextArray[2].slice(12);
    const input = {
      title,
      description
    };
    console.log("input>>", input);
    console.log("mapId>>", mapId);
    updateMap(mapId, input).then(function(json) {
      console.log("json: ", json);
      const mapId = json.map[0].id;
      loadMapDetailPage(mapId);
    });
  }));

  $('body').on('click', '#cancel-edit-map', function() {
    const mapId = $('#mapId').val();
    loadMapDetailPage(mapId);
  });

  $('body').on('click', '#delete-map', function() {
    const mapId = $('#mapId').val();
    const messgage = "Are you sure you want to delete current map?";
    if (confirm(messgage) == true) {
      deleteMap(mapId).then(function(json) {
        console.log("json result: ", json);
        $loadHomePage();
      });
    }
  });


  $('body').on('click', '#delete-contributor', function() {
    const mapId = $('#mapId').val();
    const parent = this.parentNode;
    const contributorId = $(parent).find("#contributorId").val();

    const messgage = "Are you sure you want to delete current contributor?";
    if (confirm(messgage) == true) {
      removeContributorFromMap(mapId, contributorId).then(function(json) {
        appendContributorSection(mapId);
      });
    }
  });

  $("body").on('submit', ".add-contributors", (function(event) {
    // prevent the default form submission behaviour
    event.preventDefault();
    const mapId = $('#mapId').val();
    const contributorString = $(this).serialize().replaceAll("%20", " ");
    const splitedTextArray = contributorString.split('&');
    const userName = splitedTextArray[0].slice(5);
    const input = { mapId, userName };
    addContributorToMap(input).then(function(json) {
      console.log("json: ", json);
      if (json.error) {
        alert(json.error);
      }
      else {
        appendContributorSection(mapId);
      }
    });
  }));


  $('body').on('click', '.add-point-card', function() {
    const $addPointForm = renderAddPoint();
    const $addPointFormArticle = $('.add-point-form');
    $('.add-point-form').empty();
    $addPointFormArticle.append($addPointForm);
    $('.add-point-card').hide();
    $('.add-point-form').slideDown();
    $('#title').focus();
  });

  $("body").on('submit', ".add-point", (function(event) {
    // prevent the default form submission behaviour
    event.preventDefault();

    const addPointString = decodeURIComponent($(this).serialize());
    const splitedTextArray = addPointString.split('&');
    console.log("splitedTextArray: ", splitedTextArray);

    const title = splitedTextArray[0].slice(6);
    const description = splitedTextArray[1].slice(12);
    const image_url = splitedTextArray[2].slice(10);
    const address_line_1 = splitedTextArray[3].slice(15);
    const address_line_2 = splitedTextArray[4].slice(15);
    const lat = splitedTextArray[5].slice(9);
    const lon = splitedTextArray[6].slice(10);
    const map_id = $('#mapId').val();

    const input = {
      title,
      description,
      image_url,
      address_line_1,
      address_line_2,
      lat,
      lon,
      map_id
    };

    console.log("input:", input);

    addNewPoint(input)
      .then(function(json) {
        return getPoints(map_id);
      })
      .then(function(json) {
        const pointData = json.results;

        loadMapDetailPage(map_id);
        // appendPointSection(pointData);

        // $('.add-point-form').slideUp();
        // $('.add-point-card').show();
      });
  }));

  $('body').on('click', '#cancel-edit-point', function() {
    console.log("Cancel add/edit form");
    $('.add-point-form').slideUp();
    $('.add-point-card').show();
  });


  $('body').on('click', '#delete-point', function() {
    const parent = this.parentNode;
    const pointId = $(parent).find("#pointId").val();
    const messgage = "Are you sure you want to delete current point?";
    if (confirm(messgage) == true) {
      const mapId = $('#mapId').val();
      console.log("mapId result: ", mapId);
      deletePoint(pointId)
        .then(function(json) {
          return getPoints(mapId);
        })
        .then(function(json) {
          const pointData = json.results;
          appendPointSection(pointData);
        });
    }
  });

  $('body').on('click', '#edit-point', function() {

    const parent = this.parentNode;
    const grandParent = parent.parentNode;
    const greatGrandParent = grandParent.parentNode;

    const id = $(parent).find("#pointId").val();
    const lat = $(parent).find("#lat").val();
    const lon = $(parent).find("#lon").val();
    const image_url = $(grandParent).find("#point-img").prop('src');
    const title = $(greatGrandParent).find("#point_title").html();
    const description = $(greatGrandParent).find("#point_desc").html();
    const address_line_1 = $(greatGrandParent).find("#point_add1").html();
    const address_line_2 = $(greatGrandParent).find("#point_add2").html();

    const points = {
      id,
      image_url,
      title,
      description,
      address_line_1,
      address_line_2,
      lat,
      lon,
    };

    const $editPointForm = renderEditPoint(points);
    const $addPointFormArticle = $('.add-point-form');
    $('.add-point-form').empty();
    $addPointFormArticle.append($editPointForm);
    $('.add-point-card').hide();
    $('.add-point-form').slideDown();
    $('#title').focus();

  });


  $("body").on('submit', ".edit-point", (function(event) {
    // prevent the default form submission behaviour
    event.preventDefault();

    const parent = this.parentNode;
    const pointId = $(parent).find("#pointId").val();

    //console.log("current point to submit edit: ", pointId);

    const addPointString = decodeURIComponent($(this).serialize());
    const splitedTextArray = addPointString.split('&');
    // console.log("splitedTextArray: ", splitedTextArray);
    // console.log("addPointString: ", addPointString);
    // console.log("decoded addPointString: ", decodeURIComponent(addPointString));

    const point_id = splitedTextArray[0].slice(8);
    const title = splitedTextArray[1].slice(6);
    const description = splitedTextArray[2].slice(12);
    const image_url = splitedTextArray[3].slice(10);
    const address_line_1 = splitedTextArray[4].slice(15);
    const address_line_2 = splitedTextArray[5].slice(15);
    const lat = splitedTextArray[6].slice(9);
    const lon = splitedTextArray[7].slice(10);
    const map_id = $('#mapId').val();

    const input = {
      title,
      description,
      image_url,
      address_line_1,
      address_line_2,
      lat,
      lon,
      map_id
    };

    console.log("input:", input);

    updatePoint(point_id, input)
      .then(function(json) {
        console.log("json update point: ", json);
        return getPoints(map_id);
      })
      .then(function(json) {
        const pointData = json.results;

        loadMapDetailPage(map_id);
        //   appendPointSection(pointData);

        //   $('.add-point-form').slideUp();
        //   $('.add-point-card').show();
      });

  }));
});


