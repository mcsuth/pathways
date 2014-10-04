$(document).ready(function(){
  // ******************* FOR IE'S SAKE ******************* //
  // ***************************************************** //
  var log = function(input) {
    try {
      console.log(input)
    } catch(e) {}
  }

  // ******************* TOGGLE DOWN jQUERY ************** //
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

  // ******************* TOGGLE UP jQUERY **************** //
  // ***************************************************** //
  $('#message2').on('click', function(){
    log("AJAX request to GET")
  })

  // ******************* ADD BUTTON ********************** //
  // ***************************************************** //
  var counter = 0;
  var cloned;

  $('.destinations').on('click', '.add', function() {
    counter++;
    var templateDestination = '<div class="destination'+counter+'">'
    + '<h1>'
    + 'Then, I\'m going to'
    + '<input type="text" value="Golden Gate Bridge">'
    + '<div class="actions" style="display: inline">'
    + '<a class="add btn btn-primary"> [ + ]</a> '
    + '<a class="remove btn btn-primary">[ - ]</a>'
    + '</div>'
    + '</h1>'
    + '</div>'
    $(templateDestination).appendTo('form.destinations')
    $(this).closest('div').find('.add').hide()
    // debugger
  })
  $('.destinations').on('click', '.remove', function() {
    $(this).parent().parent().closest('div').remove();
  })
});