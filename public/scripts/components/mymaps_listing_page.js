$(() => {

  const $myMapPage = $(`
    <div>
      <h1> My Maps are here!</h1>
    </div>
  `);

  window.$myMapPage = $myMapPage;

  $('body').on('click', '#btngetMyMaps', function() {
    getMyMaps().then(function(json) {
      console.log("json maps:", json);
      views_manager.show('myMaps');
    });
  });
});
