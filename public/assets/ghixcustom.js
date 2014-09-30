// JavaScript Document

//$(window).load(function(){
//	$('body').css('height',$(window).height()); // set body height to window height
//}); //window load
$('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });

//$('document').ready(function(){
//	$('i.icon-question-sign').css({ opacity: 0.65 });
//});



$(document).ready(function(){


	$('.resize-img').each(function() {
 		$(this).css('width','auto','height','auto');
 		var maxWidth = 166; // Max width for the image
 		var maxHeight = 60; // Max height for the image
 		var ratio = 0; // Used for aspect ratio
 		var width = $(this).width();
 		var height = $(this).height();
 		// Check if the current width is larger than the max
	 		if(width > maxWidth){
		 		ratio = maxWidth / width; // get ratio for scaling image
		 		$(this).css("width", maxWidth); // Set new width
		 		$(this).css("height", height * ratio); // Scale height based on ratio
		 		height = height * ratio; // Reset height to match scaled image
		 		width = width * ratio; // Reset width to match scaled image
	 		}
	 		// Check if current height is larger than max
	 		if(height > maxHeight){
		 		ratio = maxHeight / height; // get ratio for scaling image
		 		$(this).css("height", maxHeight); // Set new height
		 		$(this).css("width", width * ratio); // Scale width based on ratio
		 		width = width * ratio; // Reset width to match scaled image
	 		} 
	 		$(this).css('display','block');
	    });
// 	$('.carrierlogo').each(function() {
// 		$(this).css('width','auto','height','auto');
// 		var maxWidth = 163; // Max width for the image
// 		var maxHeight = 36; // Max height for the image
// 		var ratio = 0; // Used for aspect ratio
// 		var width = $(this).width();
// 		var height = $(this).height();
// 		// Check if the current width is larger than the max
//	 		if(width > maxWidth){
//		 		ratio = maxWidth / width; // get ratio for scaling image
//		 		$(this).css("width", maxWidth); // Set new width
//		 		$(this).css("height", height * ratio); // Scale height based on ratio
//		 		height = height * ratio; // Reset height to match scaled image
//		 		width = width * ratio; // Reset width to match scaled image
//	 		}
//	 		// Check if current height is larger than max
//	 		if(height > maxHeight){
//		 		ratio = maxHeight / height; // get ratio for scaling image
//		 		$(this).css("height", maxHeight); // Set new height
//		 		$(this).css("width", width * ratio); // Scale width based on ratio
//		 		width = width * ratio; // Reset width to match scaled image
//	 		} 
//	 		$(this).css('display','block');
//	    });
	 	
    
	    /* Replace graydrkaction */
	    $('#rightpanel div').each(function(){
	    	if($(this).hasClass('graydrkaction margin0')){
	    $(this).removeClass('graydrkaction margin0').addClass('header');
	    	}
	    
	    });
	    
	    //Modal resize we need to re-write it. Triggering for more than 600
	  //  var viewportHeight = $(window).height();
	   // if (viewportHeight < 600) {
      	//  $('.container').append('<style>.modal { top: 5%; height: 450px;} .modal.fade.in {top: 5%;} iframe#search {min-height: 400px} .modal-body {height: 300px;} .popup-address {margin-top:0% } div#addressIFrame.modal.popup-address.in  {height: auto;} div#addressIFrame.modal.popup-address.in .modal-body {height: auto}</style>');

	  //  }
	    
	    
	    //Modal resize          
	    //Modal resize
	 	var viewportHeight = $(window).height();
	 	//console.log(viewportHeight,'ghixcustom')
	 	if (viewportHeight < 650) {
	 		$('.container').append('<style>.modal { top: 5%; height: auto;} .modal.fade.in {top: 5%;} iframe#search {min-height: 585px} .modal-body {height: auto;} .popup-address {margin-top:0% } div#addressIFrame.modal.popup-address.in  {height: 370px} div#addressIFrame.modal.popup-address.in .modal-body {height: auto}</style>');
	 	 }else{
	 		$('.container').append('<style>.modal { top: 5%; height: auto;} iframe#search {min-height: 540px} .modal-body {height: auto;}</style> ');
	 	 }
	 	
	 	
	 	
	 	
	 	//Auto Height Modal
	 	//var mymodal = $('#fileUoload').remove
		 
		 
		/*Fix for HIX-23993*/
		/*This will hide the image if the url for the image fails to load*/
		var imgs = $('.resize-img');
		for(var i=0,j=imgs.length;i<j;i++){
				imgs[i].onerror = function(e){
				this.parentNode.removeChild(this);
			}
		}
	 	
		
		
		$('a[href^="http"], a[href^="https"] ').each(function(){
            $(this).live('click',function(e){
            	//e.preventDefault();
            	var that = $(this),
            		getURL = that.attr('href'),
            		getExchangeName = $('#exchangeName').val(),
            		htmlContent = '<h4>You are now leaving a '+getExchangeName+' Web site.</h4> <p>You are about to access: </p>',
            		htmlURL = '<a href="'+getURL+'" target="_blank">'+getURL+'</a>',
            		htmlContent1 = '<p>The '+getExchangeName+' does not endorse the organizations or views represented by this site and takes no responsibility for, and exercises no control over, the accuracy, accessibility, copyright or trademark compliance or legality of the material contained on this site.</p>'+ 
            		'<div><a href="javascript:void(0)" class="btn externalModalClose">No, Take Me Back<span class="aria-hidden">close modal</span></a> <a href="'+getURL+'" class="btn btn-primary" target="_blank" id="yesBtn" aria-hidden="false">Yes, Proceed</a></div>'+	
            		'<p>Thank you for visiting our site.</p>';
            	//console.log(getExchangeName);
            	that.attr('href','javascript:void(0)');
            	$('#warningBox').remove();
            	
            	var warningHTML = $('<div class="modal" id="warningBox"><div class="modal-header" style="border-bottom:0; "><button type="button" class="close externalModalClose" aria-hidden="false"><span aria-hidden="true">&times;</span><span class="aria-hidden">close modal</span></button></div><div class="modal-body gutter10" style="max-height:470px;"><div class="uploadText"></div></div><div class="modal-footer"></div></div>').modal({backdrop:"static",keyboard:"false"});   
            	$(warningHTML).find('div.uploadText').html(htmlContent + htmlURL + htmlContent1);           	
            	
            	$('.externalModalClose').live('click',function(){
            		that.attr('href',getURL);
            		$('#warningBox').modal("hide");
            	});
            	
            	$('#yesBtn').live('click',function(){
            		that.attr('href',getURL);
            		$('#warningBox').modal("hide");
            	});
            });
		});
		
		 $('.accordion-toggle').click(function() {
	            $(this).find('i').addClass('icon-chevron-down');
	          }); 
	   	$('.accordion-group').on('hidden', function () {
	            $(this).find('.accordion-toggle').find('i').removeClass('icon-chevron-down').addClass('icon-chevron-right');
	          });
		
	 	
	});

