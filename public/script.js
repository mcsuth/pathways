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
  $("#triangle").click(function(){
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
  var templateDestination = '<div class="destination1">'
          + '<h1>'
          + 'Then, I\'m going to'
          + '<input type="text" value="Golden Gate Bridge">'
          + '<div class="actions" style="display: inline">'
          + '<a class="add btn btn-primary">[ + ]</a>'
          + '<a class="remove btn btn-primary">[ - ]</a>'
          + '</div>'
          + '</h1>'
          + '</div>'
  $('.destinations').on('click', '.add', function() {
    $(templateDestination).appendTo('form.destinations')
    debugger
  })
  $('.destinations').on('click', '.remove', function() {
    $(this).parent().parent().closest('div').remove();
  })
});