$(() => {

  const $mapDetailsPage = $(`
      <div>
        <h1> Map detail is here!</h1>

        <section id="mapToEdit"></section>
        <button type="button" id="btngetMapToEdit">Edit this Maps</button>

        <section id="contributors"></section>
        <button type="button" id="btngetContributors">Get this Map's contirbutors</button>
      </div>
  `);

  window.$mapDetailsPage = $mapDetailsPage;

  $('body').on('click', '#btngetmapDetails', function() {
    //pass map id from input
    getMapDetails(2).then(function(json) {
      console.log("json map details:", json);
      views_manager.show('mapDetails');
    });
  });

  $('body').on('click', '#btngetMapToEdit', function() {
    //pass map id from input
    getMapToEdit(2).then(function(json) {
      console.log("json map to edit:", json);
      $('#mapToEdit').append(`
      <div>
      <h1> Map detail to edit is here!</h1>
      </div>
    `);
    });
  });

  $('body').on('click', '#btngetContributors', function() {
    //pass map id from input
    getContributors(2).then(function(json) {
      console.log("json this map's contributor list:", json);
      $('#contributors').append(`
      <div>
      <h1> This Map's Contributor list is here!</h1>
      </div>
    `);
    });
  });
});
