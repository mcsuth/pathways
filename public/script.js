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

  // ******************* TOGGLE jQUERY ******************* //
  // ***************************************************** //
  $('#message2').on('click', function(){
    log("AJAX request to GET")
  })
  // ******************* ADD/REMOVE BUTTONS ************** //
  // ***************************************************** //
  var counter = 1;
  var cloned;
  $('.destinations').on('click', '.add', function() {
    $('.destination0').clone().attr('class', 'destination'+counter++).appendTo('form.destinations');
  })
  $('.destinations').on('click', '.remove', function() {
    $(this).parent().parent().closest('div').remove();
  })
});