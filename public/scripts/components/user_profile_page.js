$(() => {
  $("#btngetUserProfile").click(function() {
    getUserProfile().then(function(json) {
      console.log("json user profile:", json);
      $('#userProfile').append(`
      <div>
      <h1> User Profile is here!</h1>
      </div>
    `);
    });
  });
});
