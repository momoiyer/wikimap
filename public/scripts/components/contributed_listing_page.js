$(() => {
  $("#btngetMyContributedMaps").click(function() {
    getMyContributedMaps().then(function(json) {
      console.log("json contributed map:", json);
      $('#myContributedMaps').append(`
      <div>
      <h1> My Contributed Map is here!</h1>
      </div>
    `);
    });
  });
});
