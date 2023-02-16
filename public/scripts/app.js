// Client facing scripts here
// home page loading

$(() => {

  $("#btnLogin").click(function() {
    //pass user id from the input?
    //do we need this?
    logIn(10);
    alert("User Logged In");
    $loadHomePage();
  });

  $("#btnLogout").click(function() {
    logout();
    alert("User Logged Out");
    $loadHomePage();
  });

  $("#btnHome").click(function() {
    $loadHomePage();
  });

  const $kids = $('.mobile-top-nav').children();
  $kids.hover(function() {
    $(this).addClass('fa-bounce');
  }, function() { $(this).removeClass('fa-bounce'); });

  $("#menu").click(function() {
    $("#drop-down").slideToggle();
  })
});
