$(() => {
  const $userProfilePage = $(`
      <div>
        <h1> User Profile is here!</h1>
      </div>
  `);

  window.$userProfilePage = $userProfilePage;

  $('body').on('click', '#btngetUserProfile', function() {
    getUserProfile().then(function(json) {
      console.log("json user profile:", json);
      views_manager.show('userProfile');
    });
  });

  // $("#btngetUserProfile").click(function() {
  //   getUserProfile().then(function(json) {
  //     console.log("json user profile:", json);
  //     $('#userProfile').append(`
  //     <div>
  //     <h1> User Profile is here!</h1>
  //     </div>
  //   `);
  //   });
  // });
});
