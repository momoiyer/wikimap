$(() => {
  $("#btngetMyMaps").click(function() {
    getMyMaps().then(function(json) {
      console.log("json maps:", json);
      $('#myMaps').append(`
      <div>
      <h1> My Map is here!</h1>
      </div>
    `);
    });
  });
});
