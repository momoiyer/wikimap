$(() => {
  const $myContributedMapPage = $(`
      <div>
      <h1> My Contributed Maps are here!</h1>
      </div>
  `);

  window.$myContributedMapPage = $myContributedMapPage;

  $('body').on('click', '#btngetMyContributedMaps', function() {
    getMyContributedMaps().then(function(json) {
      console.log("json contributed map:", json);
      views_manager.show('myContributedMap');
    });
  });
});
