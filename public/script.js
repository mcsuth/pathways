$(document).ready(function(){
  // ******************* FOR IE'S SAKE ******************* //
  // ***************************************************** //
  var log = function(input) {
    try {
      console.log(input)
    } catch(e) {}
  }

  // ******************* TOGGLE jQUERY ******************* //
  // ***************************************************** //
  $("#toggledrawer").click(function(){
    $('#menu').slideToggle();
    $('#message1').toggle()
    $('#message2').toggle()
  });
  $('#message2').on('click', function(){
    log("AJAX request to GET")
  })
  // ******************* ADD MORE FIELDS ***************** //
  // ***************************************************** //
  var counter = 1;
  var cloned;
  $('.more').on('click', function() {
    $('.destination0').clone().attr('class', 'destination'+counter++).appendTo('#menu');
  })
});