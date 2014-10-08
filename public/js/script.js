$(document).ready(function(){
  // ******************* FOR IE'S SAKE ******************* //
  // ***************************************************** //
  var log = function(input) {
    try {
      console.log(input)
    } catch(e) {}
  }

  // ******************* TOGGLE DOWN jQUERY ************** //
  // This section contains the functions (2) that control  //
  // the toggling up/down of the form fields.              //
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
  // This section will trigger the AJAX (1) request.       //
  // ***************************************************** //
  $('#message2').on('click', function(){
    debugger
    log("AJAX request to GET")
  })

  // ******************* ADD BUTTON ********************** //
  // This section contains a randomizer to generate        //
  // 'fun phrases' when the user the function to add more  //
  // ***************************************************** //
  var counter = 0;
  var cloned;
  $('.destinations').on('click', '.add', function() {
    counter++;
    var funphrases = {
      0: "Then I\'m going to",
      1: "Later, I\'m going to bounce to", 
      2: "Later, zooming off to", 
      3: "Then, I\'m going to split it to",
      4: "Then, peacing-out to"
    };
    var randomfunphrase = Math.floor(Math.random() * 4 + 0);
    var templateDestination = '<div class="destination'+counter+'">'
    + '<h1>'
    + funphrases[randomfunphrase]
    + '<input type="text" value="Golden Gate Bridge">'
    + '<div class="actions" style="display: inline">'
    + '<a class="add btn btn-primary"> [ + ]</a> '
    + '<a class="remove btn btn-primary">[ - ]</a>'
    + '</div>'
    + '</h1>'
    + '</div>'
    $(templateDestination).appendTo('form.destinations')
    $(this).closest('div').find('.add').hide()
    log( Math.floor(Math.random() * 4 + 0) )
  })
  // ******************* ADD BUTTON ********************** //
  // This section contains the function to remove input    //
  // fields and reshow the 'add' button to the previous    //
  // div.                                                  //
  // ***************************************************** //
  $('.destinations').on('click', '.remove', function() {
    $(this).parent().parent().closest('div').remove();
    $('form.destinations >').last().find('.add').show()
  })
});