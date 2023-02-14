$(() => {

  $("#btngetmapDetails").click(function() {
    //pass map id from input
    getMapDetails(2).then(function(json) {
      console.log("json map details:", json);
      $('#mapDetails').append(`
      <div>
      <h1> Map detail is here!</h1>
      </div>
    `);
    });
  });

  $("#btngetMapToEdit").click(function() {
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
});
