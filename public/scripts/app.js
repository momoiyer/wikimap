// Client facing scripts here
// home page loading

const renderNavBar = function() {
  console.log("renderNavBar!");
  checkIsLoggedIn().then(function(json) {
    const userLoggedIn = json.hasUserId;
    const userId = json.userId;
    $('nav.mobile-top-nav').empty();
    if (userLoggedIn) {
      $('nav.mobile-top-nav').append(renderLoggedInNav());
      $('#main-content').append('<input type="hidden" id="userLoggedIn" name="userLoggedIn" value="true">');
      $('#main-content').append(`<input type="hidden" id="userId" name="userId" value=${userId}>`);
    }
    else {
      $('nav.mobile-top-nav').append(renderLoggedOutNav());
      $('#main-content').append('<input type="hidden" id="userLoggedIn" name="userLoggedIn" value="false">');

    }
  });
};
$(() => {

  renderNavBar();

  $('body').on('click', "#btnLogin", function() {
    // prompt("Enter User ID");
    let userInputId = prompt("Enter User ID", "");
    if (userInputId != null) {
      console.log("userInputId: ", userInputId);
      logIn(userInputId).then(function(json) {
        alert("User Logged In");
        $loadHomePage();
        renderNavBar();
      });
    }

  });

  $('body').on('click', "#btnLogout", function() {
    logout();
    alert("User Logged Out");
    $loadHomePage();
    renderNavBar();
  });

  $('body').on('click', "#btnHome", function() {
    $loadHomePage();
  });

  $('body').on('click', "#menu", function() {
    $("#drop-down").slideToggle();
  });

});
