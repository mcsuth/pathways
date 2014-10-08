$(document).ready(function () {
  
  //auto shift box for phone box and SSN
  $("input[maxlength=3],input[maxlength=4],input[maxlength=2]").bind("keyup",function(event){

    var keyCode = event.keyCode;
    if( keyCode == 16 || keyCode == 9 || keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40){
      return;
    }
    var maxLength = parseInt($(this).attr('maxlength'));
      var nextElement = $(this).nextAll( "input[maxlength]:first");
      
    if($(this).val().length == maxLength && nextElement !== undefined){
          
          setTimeout(function(){
              nextElement.focus();
              nextElement.select();
          },300); 
    }

  });
  
  
  //add required to select combo box, JAWS doesn't read "required" for select combo box even it has a img with alt
  $("select").each(function(){
    var selectID = $(this).attr("id");    
    $("label").each(function(){
      if($(this).find("img").attr("alt")=="Required!" && $(this).attr("for") == selectID ){
        $(this).html($(this).html() + " <span class='aria-hidden'>required</span>");
      }
    });   
  });
  
  
   //add place holder to calendar 
  $(".date-picker input").each(function(){
    if(!$(this).attr("value")){
      $(this).attr("placeholder","MM/DD/YYYY");
    }      
  });
  
  
  //JAWS is prevented from reading out "Graphic" 
    $('img').each(function () {
        //clear the alt text
        //assign a variable the value of alt text
        var alttext = $(this).attr("alt");
        if (alttext == "Required!") //add other conditions as necessary
        {
            //make the Required asterisks hidden 
            $(this).attr("aria-hidden", "true");
            //span with a label "Required!", such that it is read in place 
            //of "Graphic Required" 
            $('<a><span aria-label="Required!"></span></a>').insertAfter(this);
            var inpId = $(this).parent().attr("for");
            $("#" + inpId).attr("aria-required", "true");
        }
    });
  
  
  
  //read phone 1,2,3
  if($("#phone1")){
       var hasPhoneLabel = false;
       //if it has label, hasLabel is true
       $("label").each(function(){
         if($(this).attr("for") == "phone1"){
           hasPhoneLabel = true;
         } 
       }); 
       
       //read tooltip if there is tooltip
      /* var phoneTooltip = $("#phone1").closest(".control-group").find("a[rel='tooltip']");
       var phoneTooltipText = "";
       if(phoneTooltip.length > 0){
         phoneTooltipText = " Tooltip help text " + phoneTooltip.attr("data-original-title") + "Tooltip help text finished";
       }*/
       
       //read required if there is require image
       var phoneRequired =  $("#phone1").closest(".control-group").find("img[alt^='Required']");
       var phoneRequiredText = "";
       if(phoneRequired.length > 0){
         phoneRequiredText = " required ";
       }
       
       if(!hasPhoneLabel){
       //if not, add label for it
         $("#phone1").before('<label for="phone1" class="aria-hidden">Phone first three digits'+ phoneRequiredText /*+ phoneTooltipText*/ +'</label>');      
         //if no label for phone, that means no lables for phone2 and phone3
         $("#phone2").before('<label for="phone2" class="aria-hidden">Phone second three digits'+ phoneRequiredText +'</label>');
         $("#phone3").before('<label for="phone3" class="aria-hidden">Phone last four digits'+ phoneRequiredText +'</label>');
       }
       
     }  
  
  
  //read SSN 1,2,3
  if($("#ssn1")){
     var hasSSNLabel = false;
     //if it has label, hasLabel is true
     $("label").each(function(){
       if($(this).attr("for") == "ssn1"){
         hasSSNLabel = true;
       } 
     }); 
     
     //read tooltip if there is tooltip
    /* var ssnTooltip = $("#ssn1").closest(".control-group").find("a[rel='tooltip']");
     var ssnTooltipText = "";
     if(ssnTooltip.length > 0){
       ssnTooltipText = " Tooltip help text " + ssnTooltip.attr("data-original-title") + "Tooltip help text finished";
     }*/
     
     //read required if there is require image
     var ssnRequired =  $("#ssn1").closest(".control-group").find("img[alt^='Required']");
     var ssnRequiredText = "";
     if(ssnRequired.length > 0){
       ssnRequiredText = " required ";
     }
     
     if(!hasSSNLabel){
       $("#ssn1").before('<label for="ssn1" class="aria-hidden">Tax ID Number first three digits'+ ssnRequiredText /*+ ssnTooltipText*/ + '</label>');     
       $("#ssn2").before('<label for="ssn2" class="aria-hidden">Tax ID Number second two digits'+ ssnRequiredText + '</label>');
       $("#ssn3").before('<label for="ssn3" class="aria-hidden">Tax ID Number last four digits'+ ssnRequiredText + '</label>');
     }
       
  }
  
     
    //read tooptip content
    $('[rel="tooltip"]').each(function () {
        var tooltiptext = $(this).attr('data-original-title');
          //$(this).attr('tabindex','-1');
          //for SHOP EMPLOYER plantier.jsp 
          /*if($(this).parent().attr("class") == "collapsetoggle"){*/
            $(this).append( '<span class="aria-hidden"> ' + $(this).parent().text() + ' Help text ' + tooltiptext  + ' Help text finished' + '</span>');
          /*}else{
            $(this).append('<span class="aria-hidden"> Help text ' + tooltiptext  + ' Help text finished' + '</span>');
          }*/

    });    
     
     
     
  //read page   
    $(".pagination a").each(function () {
        //find the numerical value, make sure that it is greater
        //than 0 so it's a regular page number
        var thisval = parseInt($(this).text());
        if (thisval > 0) {
            var itxt = $(this).html();
            //if current page, (.active class), add "current page" to description
            if($(this).parent().hasClass("active") || $(this).parent().parent().hasClass("active"))
            {
                itxt = "<span class='aria-hidden'>Page </span>" + itxt + "<span class='aria-hidden'> Current Page </span>";
            }
            //regular description, "Page X"
                else    
            {
                    itxt = "<span class='aria-hidden'>Page </span>" + itxt;
            }
            $(this).html(itxt);
        }
    });   
    
    
    //add sortable span to link in table
    $('th.sortable a').each(function(){
      var linkConten=$(this).text();
      if($('th a[href*="ASC"]').length>0){
        $(this).html(linkConten + '<span class="offScreen">Sortable Ascending</span>');
      }else if($('th a[href*="DESC"]').length>0){
        $(this).html(linkConten + '<span class="offScreen">Sortable Descending</span>');
      }else{
        $(this).html(linkConten + '<span class="offScreen">Sortable</span>');
      }
    });     
     

    //Dropdown fixes, so that JAWS reads it's a dropdown menu and use can press enter to open it and tab through its options
    $("[data-toggle='dropdown']").each(function () {
       $(this).append('<span class="aria-hidden"> Dropdown Menu. Press enter to open it and tab through its options</span>');
       var lastItem = $(this).next(".dropdown-menu").find("li").last().find("a");
       lastItem.html(lastItem.html() + "<span class='aria-hidden'> End of dropdown</span>");
     });   
    
    //gear dropdown in table, should be added after Dropdown fixes
    $("table tr").each(function(){
      var lastTdwithDropdown = $(this).find("td").last().find("a.dropdown-toggle span.aria-hidden");
      lastTdwithDropdown.text("Update User Infomation " + lastTdwithDropdown.text());
    });
    
    
    //read check mark ok as "yes" for address 
    $("i.icon-ok").each(function(){
       $(this).append("<span class='aria-hidden'>Yes</span>");
    });
     
     
    /*for readonly fields*/
    $("input[readonly]").removeAttr("aria-required").attr("aria-disabled","true");
    
    //for disable link in dashboard
    $("li.disabled a").attr("aria-disabled","true");     
  
    //Read buttons and links in header
    $('div.header').each(function () {      
      if($(this).find("input.btn").length){ 
        var thisHeaderText = $(this).find('h4').text();
        $(this).wrap("<fieldset></fieldset>").prepend("<legend class='aria-hidden'>"+ thisHeaderText +"</legend>");
      }else if($(this).find("a.btn").length){
        $(this).find('a.btn').each(function () {
          var thisHeader = $(this).closest('div.header, div.graydrkaction').find('h4').text();
            var button = $(this).text();
            $(this).html(' <span class="aria-hidden">' + thisHeader +' ' + '</span>' + button);
        });
      }
    });   
  
  
  //tab order for phone box
    $(":input").focus(function(){
     $(".input-mini[maxlength=3],.input-mini[maxlength=4],.input-small[maxlength=3],.input-small[maxlength=4]").attr("tabindex",-1);
     $(".controls").find("input.input-mini[maxlength=3]:first, input.input-small[maxlength=3]:first").attr("tabindex",0);
    }); 
    
    $(".input-mini,.input-small").focus(function() { 
        $(this).siblings(".input-mini,.input-small").attr("tabindex",0);
        $(this).parent().next().children(".input-mini,.input-small").attr("tabindex",0);
        $(this).parent().prev().children(".input-mini,.input-small").attr("tabindex",0);
    }); 
  
    //recaptcha in sign up page
    $("#recaptcha_reload,#recaptcha_switch_audio,#recaptcha_switch_img,#recaptcha_whatsthis").attr("tabindex",0);
    
    
  //Read description and placeholder
    /*$("input[type='text']").each(function(){
      var placeholderText = $(this).attr("placeholder");
      if(placeholderText){
        var inputLabel = $(this).attr("id");

        $("label[for="+inputLabel+"]").append("<span class='aria-hidden'> Sample Text " + placeholderText + "</span>");
      
      };
    });*/
    
  //Description and placeholder
    $("input[type='text'],select").not(".btn").each(function (index) {
        thisid = $(this).attr("id");
        //console.log($(this),'----',$(this).attr("name"), '******',$(this).attr("id"))
        if (typeof thisid === "undefined") {

            if($(this).attr("name") !== ""){
                //make an id:first based on name, then based on value(if button or checkbox), or based on type
                var newId = $(this).attr("name");
                if (typeof newId === "undefined") {
                    if ($(this).attr('type') == "button" || $(this).attr('type') == "checkbox") {
                        newId = $(this).attr("value");
                    } else {
                        newId = $(this).attr("type");
                    }
                }
                //duplicate
                if ($("#" + newId).is("#" + newId)) {
                    //console.log("duplicated"); //console
                    newId = newId + index;
                }
                //remove spaces, ids cannot have them
                //console.log(newId)
                if(newId === "undefined"){
                	newId = newId.replace(/ +/g, "_");
                }
                $(this).attr("id", newId);
                //console.log("\nId: "+newId);  //console
            }
        }
        //id label not found
        if ($("[for='" + thisid + "']").length == 0) {
            if($("#" + thisid).attr("name")=== "undefined"){
                //console.log('111111')
                var lblname = $("#" + thisid).attr("name");
                if (typeof lblname === "undefined") {
                    lblname = $("#" + thisid).attr("id");
                    if (typeof lblname === "undefined") {
                        lblname = " ";
                    }
                }
                //convert from CamelCase, replace -_. with spaces
                lblname = lblname.replace(/-/g, " ");
                lblname = lblname.replace(/_/g, " ");
                lblname = lblname.replace(/\./g, " ");
                lblname = lblname.replace(/([A-Z])/g, " $1").toLowerCase();
                //check to see if label text is there in another label
                if ($(":contains(" + lblname + ")").length != 0) {
                    lblname = " ";
                }
                //create label
                //if radio, must wrap with no label
                if ($(this).attr("type") == "radio") {
                    var lbl = "<label for='" + thisid + "' />";
                    $("#" + thisid).wrap();
                }
                //if not radio, insert  before
                else {
                    var lbl = "<label for='" + thisid + "' class='hide'>" + lblname + "</label>";
                    $(lbl).insertBefore("#" + thisid);
                }

                //console.log("Label had been added"); //console
            }
        }
        //Tooltip fix 
        //selects all tooltips and adds a hidden span to the label  
        //of the form element with the tooltip text  
//        $(this).filter('[rel="tooltip"]').each(function () {
//            var tooltext = $(this).attr("data-original-title");
//            if (tooltext == "" || typeof tooltext === "undefined") {
//                tooltext = $(this).attr("data-title");
//                if (tooltext == "" || typeof tooltext === "undefined") {
//                    tooltext = $(this).attr("title");
//                }
//            }
//            //   console.log($(this).parent().prop("tagName"));    //console
//            $(this).parent().html($(this).parent().html() + '<span class="aria-hidden">help text as follows. ' + tooltext + 'end help text</span>');
//        });

        var ariaLabelValue = $("[for='" + $(this).attr("id") + "']").text();
        if (typeof ariaLabelValue === 'undefined') {
            ariaLabelValue = "";
        }

        //same as above, for placeholder
        var pld = $(this).attr("placeholder");
        if (typeof pld !== "undefined") //CODE CHANGED HERE
        {
            //start new additions
            //if there are capitals next to each other
            //seperate by a space so that they aren't
            //read as one word. Ex: MM -> M M
            pld = pld.replace(/([A-Z])/g, " $1");
            //replace "-" with the word "dash"
            pld = pld.replace(/-/g, " dash ");
            //replace "/" with the word "slash"
            //   pld = pld.replace(/\//g, " slash ");
            //replace "," with the word "comma"
            pld = pld.replace(/,/g, " comma ");
            //replace "," with the word "comma"
            pld = pld.replace(/\./g, " dot ");
            //end new additions

            pld = " Sample text. " + pld;

            if ($(this).val() != "") {
                pld = "";
            }
        } else {
            pld = "";
        }
        if (!(ariaLabelValue + pld == "")) {
            $(this).attr("aria-label", ariaLabelValue + pld);
            //console.log($(this).attr("aria-label"));
        }
    });
    
     
      
    

/**************************************************************************************************/
/******************************************MODAL FIX**********************************************/ 
/************************************************************************************************/
   //Let JAWS reads modal shows and hides
   $(".modal").on("hidden",function(){
     $('body').append("<span class='offScreen' role='alert'>Modal is closed</span>");
   });
   $(".modal").on("show",function(){
     $('body').append("<span class='offScreen' role='alert'>Modal is showing</span>");
   });
   
   
   //Read modals automatically
   $("[data-toggle='modal']").click(function(){     
       $(this).attr('aria-describedby', 'modal-body');
       $(this).find('.modal-body').attr('id', 'modal-body');  
   });
   
   
   //remove "aria-hidden=true" in modal so it can be closed when JAWS opens
  $(".modal *:not(span)").each(function(){
     if($(this).attr("aria-hidden") == "true"){
       $(this).removeAttr("aria-hidden");
     }
   });
  
  //read close on modal top right, rather than times
  $(".modal-header button").each(function(){
    $(this).wrapInner('<span aria-hidden="true"></span>');
    $(this).append('<span class="aria-hidden">close</span>');     
  });
   

/**************************************************************************************************/
/******************************************MODAL FIX END******************************************/ 
/************************************************************************************************/       
    
    

/**************************************************************************************************/
/******************************************SKIP FIX***********************************************/ 
/************************************************************************************************/ 
   //add id=rightpanel to span9 if there is a sidebar
   if( $('#sidebar').length > 0 && $('.span9').length > 0 && $('#rightpanel').length == 0){
     $('.span9').attr('id','rightpanel');
   }

   //skip script
   //if there is a menu, nav skip to menu
   if ($('#menu').length > 0){
     
     $('.skip-nav').attr('href','#menu');
     $('.skip-nav').click(function(){ 
        $('#menu a:first').focus();
     });
     
     //if there is a sidebar, menu skip to sidebar
     if($('#sidebar').length > 0){
       $('#menu :first').before('<a href="#sidebar" name="skip" class="skip-menu" accesskey="m">Skip Menu to Side Bar</a>'); 
       $('.skip-menu').click(function(){  
          $('#sidebar :first').focus();
       });
       
       //if there is a rightpanel, sidebar skip to rightpanel
       if($('#rightpanel').length > 0){
         $('#sidebar :first').before('<a href="#rightpanel" name="skip" class="skip-sidebar" accesskey="s">Skip Side Bar to Main Content</a>');
         $('.skip-sidebar').click(function(){ 
           $('#rightpanel :input:first,#rightpanel a:first').focus();
         });
        }
      //if there is no sidebar and there is a rightpanel, menu skip to rightpanel 
      }else if($('#rightpanel').length > 0){
        $('#menu :first').before('<a href="#rightpanel" name="skip" class="skip-menu" accesskey="m">Skip Menu to Main Content</a>'); 
        $('.skip-menu').click(function(){ 
          $('#rightpanel :input:first,#rightpanel a:first').focus();
        });
      }
     
     //if there is no sidebar and no rightpanel, and there is a footer(always has a footer), menu skip to footer  
     $('#footer :first').before('<a href="#menu" name="skip" class="skip-footer" accesskey="f">Skip Footer to Menu</a>'); 
     $('.skip-footer').click(function(){  
       $('#menu a:first').focus();
     });
   //if there is no menu, and there is a sidebar, nav skip to sidebar
   }else if($('#sidebar').length > 0){
     $('.skip-nav').attr('href','#sidebar');
     $('.skip-nav').click(function(){ 
        $('#sidebar :first').focus();
     });
     //if there is a rightpanel, sidebar skip to rightpanel
     if($('#rightpanel').length > 0){
      $('#sidebar :first').before('<a href="#rightpanel" name="skip" class="skip-sidebar" accesskey="s" >Skip Side Bar to Main Content</a>');
      $('.skip-sidebar').click(function(){  
        $('#rightpanel :input:first,#rightpanel a:first').focus();
      });
     }
     
    //if there is no rightpanel, and there is a footer(always has a footer), sidebar skip to footer 
    $('#footer :first').before('<a href="#sidebar" name="skip" class="skip-footer" accesskey="f">Skip Footer to Side Bar</a>'); 
    $('.skip-footer').click(function(){ 
      $('#sidebar :first').focus();
    });
  //if there is no menu and sidebar, and there is a rightpanel, nav skip to rightpanel
   }else if($('#rightpanel').length > 0){
    $('.skip-nav').attr('href','#rightpanel');
    $('.skip-nav').click(function(){  
      $('#rightpanel :input:first,#rightpanel a:first').focus();
    });
    
    //if there is no rightpanel, and there is a footer(always has a footer), rightpanel skip to footer
    $('#footer :first').before('<a href="#rightpanel" name="skip" class="skip-footer" accesskey="f">Skip Footer to Main Content</a>'); 
    $('.skip-footer').click(function(){ 
      $('#rightpanel :input:first,#rightpanel a:first').focus();
    });
   }else if($('#slides').length > 0){ //for home page
    $('.skip-nav').attr('href','#slides');
    $('.skip-nav').click(function(){  
      $('#slides :input:first,#slides a:first').focus();
    });
    
    //if there is no rightpanel, and there is a footer(always has a footer), rightpanel skip to footer
    $('#footer :first').before('<a href="#slides" name="skip" class="skip-footer" accesskey="f">Skip Footer to Main Content</a>'); 
    $('.skip-footer').click(function(){ 
      $('#slides :input:first,#slides a:first').focus();
    });
   }else{    
     //if there is no menu, sidebar and rightpanel, nav skip to next element
    $('.skip-nav').click(function(){
      $('input:first,a:first,select:first').focus().select();
    });
   }   
   
   
/**************************************************************************************************/
/******************************************SKIP FIX END*******************************************/ 
/************************************************************************************************/ 
     

    
/**************************************************************************************************/
/********************************LANGUAGE PLUGIN AND UPLOAD FIX **********************************/ 
/******************************************FIXED BY SHOVAN***************************************/ 
/***********************************************************************************************/

    /*for counties served plugin*/
    $('.chzn-choices').live('focus',function(){
      if($(this).parents('.control-group').find('.control-label').text()==="Languages"){
        //$(this).attr('aria-hidden','Language');
        if($('.chzn-choices li').length > 1){
          var collection = $(".search-choice");
          jQuery.each( collection, function( i, val ) {
            
            $('#'+$(val).attr('id')).find('span.selectedLang').text('');
            var selectedLanguage = $('#'+$(val).attr('id')).find('span').text();
            
            $('#'+$(val).attr('id')).find('a').find('span.selectedLang').remove();
            
            var anchorTagHTML = $('#'+$(val).attr('id')).find('a');
            anchorTagHTML.html("<span class='selectedLang aria-hidden'>Languages "+selectedLanguage+"</span>");
          });
        }
        if($('.chzn-drop').position().left == 0){
          $('.languageDrop').remove();
          $('.search-field').prepend('<label class="aria-hidden languageDrop">Languages</label>');
        }
      }else if($(this).parents('.selectPlugin').hasClass('selectPlugin')){/*for all the other checkboxes with select dropdown plugin*/
    var titleOfMultipleCheckbox =$(this).parents('.selectPlugin').parents('table').find('thead').text();
    if($('.chzn-drop').position().left == 0){
      $('.languageDrop').remove();
      $('.search-field').prepend('<label class="aria-hidden languageDrop">'+titleOfMultipleCheckbox+' Other Textbox</label>');
    }
  }else{
        $(this).attr('aria-hidden','Counties Served');
        var collection = $(".search-choice");
        jQuery.each( collection, function( i, val ) {
          
          $('#'+$(val).attr('id')).find('span.selectedLang').text('');
          var selectedLanguage = $('#'+$(val).attr('id')).find('span').text();
          
          $('#'+$(val).attr('id')).find('a').find('span.selectedLang').remove();
          
          var anchorTagHTML = $('#'+$(val).attr('id')).find('a');
          anchorTagHTML.html("<span class='selectedLang aria-hidden'>Counties Served "+selectedLanguage+"</span>");
        });
        if($('.chzn-drop').position().left == 0){
          $('.languageDrop').remove();
          $('.search-field').prepend('<label class="aria-hidden languageDrop">Counties Served</label>');
        }
      }
      
    });
    
    
    $('.search-field input').bind('keydown',function(e){
    if(e.keyCode === 13){
      $(this).hide(100).show(100,function(){
        $(this).focus();
      });
    } 
  });
    
  
    /*trigger input upload button on focus (tab/accessibility)*/
    $("input[type='file']").each(function () {     
  $(this).attr('aria-label',"Press Tab and then Space bar to open the choose dialog box.");
    });

/**************************************************************************************************/
/********************************LANGUAGE PLUGIN AND UPLOAD FIX END*******************************/ 
/******************************************FIXED BY SHOVAN***************************************/ 
/***********************************************************************************************/  

    
    

    
    
/**************************************************************************************************/
/**********************************ADA FIX WITH TIMEOUT FUNCTION *********************************/ 
/************************************************************************************************/    
    
    //read all error messages when press button
    $(".btn").bind("click",function(){
      setTimeout(function(){
        var errNo = 0;
        var errMsgs = ""; 
        
        //select all error message div whose id ends with '_error'
        $("[id$='_error']").each(function () {
          var errMsgHTML = $(this).html().trim();
          var errMsgText = $(this).text().trim();
         
          //if there is error message and it's not hidden
          if(errMsgHTML != '' && errMsgHTML.search("none") == -1 && $(this).css("display") != "none"){    
            
            errNo++;
            errMsgs += "Error message " + errNo + " " + errMsgText;
            
            //shift focus to first error element
            if(errNo == 1){             
              $(this).closest("div.controls").find("input:first,select:first").focus(); 
            }           
          }
          
        });
        
        
        if( errNo == 1){
          errMsgs = "Following " + errNo + " error have been found: " + errMsgs;
        }else if( errNo > 1){
          errMsgs = "Following " + errNo + " errors have been found: " + errMsgs; 
        }
        
        //console.log("hehe "+errMsgs); 
        
        //read error messages
        if(errNo > 0){
          $('body').append("<span class='offScreen' role='alert'>" + errMsgs + "</span>");
        }
            
      },500);
    });
     
   
   
   //highlight all phone box if some of them have errors
   $("input,a").bind("click keydown change", function(){
    //this script comes after validation, so use setTimeout function
    setTimeout(
        function(){
          $(".input-mini[maxlength=3],.input-mini[maxlength=4],.input-small[maxlength=3],.input-small[maxlength=4]").each(function(){
            var parentDiv = $(this).closest("div.controls");          
            if($(this).hasClass("error") && parentDiv.find("div label").is(":visible")){
              parentDiv.find("input").addClass("error");
            }else if (!parentDiv.find("div label").is(":visible")){
              parentDiv.find("input").removeClass("error");
            }
          });
        },10

    );
   }); 
   
   
   
   //SHOP EMPLOYER: contribution.jsp
   //html comes from jQuery-UI js, so need to set a timeout
   setTimeout(function(){
     $(".ui-slider-handle").each(function(){
       $(this).attr("role","slider");
       
       var sliderType = $(this).closest("div.slider").attr('id');
       var percentage  = "Employer pays " + $(this).text();
       
     //read different sliders
       if(sliderType == "employeeSlider"){
         percentage += "for employees"; 
       }else if(sliderType == "dependentSlider"){
         percentage += "for dependents"; 
       }
   
       $(this).attr("aria-valuetext",percentage);
       
       //refresh percentage
       $(this).bind("keydown",function(event){        
         
         percentage  = "Employer pays " + $(this).text();
         
         //read different sliders
         if(sliderType == "employeeSlider"){
           percentage += "for employees"; 
         }else if(sliderType == "dependentSlider"){
           percentage += "for dependents"; 
         }
         
         //no less than 50% for employeeSlider 
         if(($(this).text().trim() == "50%") && (sliderType == "employeeSlider")){
           percentage += " In New Mexico minimal contribution towards employee is 50%";
         }
           
         $(this).attr("aria-valuetext",percentage);
         
         
       });
       
     });
     
   },1000);
    
/**************************************************************************************************/
/**********************************ADA FIX WITH TIMEOUT FUNCTION END******************************/ 
/************************************************************************************************/ 
   
   
   
   
   
    
}); 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  /*  
    //Reads out the error once your focus on the next input 
    $("input,select").not(".btn").focusout(function () {
        //takes out the hidden alert, which occurs on form submission  
        //by removing its role alert and inner html  
        $("#alertlabel").attr("role", "");
        $("#alertlabel").html("");

        var thisInp = $(this);
        //finds if there is a placeholder  
        //if there is, prepends it with "sample text"  
        //if there is AND there is a value, or there is none  
        //no placeholder text read out  
        if (thisInp.attr("aria-describedby") == "alertlabel") {
            thisInp.removeAttr("aria-describedby");
        }

        var ariaLabelValue = $("[for='" + $(this).attr("id") + "']").text();
        if (typeof ariaLabelValue === 'undefined') {
            ariaLabelValue = "";
        }

        var pld = $(this).attr("placeholder");
        if (typeof pld !== "undefined") //CODE CHANGED HERE
        {
            //start new additions

            //if there are capitals next to each other
            //separate by a space so that they aren't
            //read as one word. Ex: MM -> M M
            pld = pld.replace(/([A-Z])/g, " $1");
            //replace "-" with the word "dash"
            pld = pld.replace(/-/g, " dash ");
            //replace "/" with the word "slash"
            pld = pld.replace(/\//g, " slash ");
            //replace "," with the word "comma"
            pld = pld.replace(/,/g, " comma ");
            //replace "," with the word "comma"
            pld = pld.replace(/\./g, " dot ");
            //end new additions

            pld = " Sample text. " + pld;
            // console.log($(this).val() + " is the value");
            if ($(this).val() != "") {
                pld = "";
            }
        } else {
            pld = "";
        }
        if (!(ariaLabelValue + pld == "")) {
            $(this).attr("aria-label", ariaLabelValue + pld);
        }
        //used setTimeout because this function needs to wait until
        //validation of the input is complete
        setTimeout(function () {
            var iid = thisInp.attr("id");
            var eid = iid + "_error";
            //       console.log("text inside "+iid+": "+$("#"+eid).html() +"\n"+"index: "+ $("#"+eid).html().search("none"));

            var errH = $("#" + eid).html();

            //adds or removes alert depending on the _error container  
            if ($("#" + eid).text() != "" && $("#" + eid).length > 0) { //CODE CHANGED HERE

                if (errH.search("none") != -1) {
                    //fixed, alert will be removed
                    thisInp.removeAttr("aria-invalid");
                    $("#" + eid).attr("role", "");
                    // console.log(iid + ": error fixed");
                } else {
                    //alert
                    thisInp.attr("aria-invalid", "true");
                    $("#" + eid).attr("role", "alert");
                    //  console.log(iid + ": error found");
                }
            } else {
                //fixed, alert will be removed
                thisInp.removeAttr("aria-invalid");

                $("#" + eid).attr("role", "");
                //  console.log(iid + ": error fixed");
            }
        }, 10);
    });*/
    //////////end error messages

    //Description and placeholder
   /* $("input[type='text'],select").not(".btn").each(function (index) {
        thisid = $(this).attr("id");
        if (typeof thisid === "undefined") {

            //make an id:first based on name, then based on value(if button or checkbox), or based on type
            var newId = $(this).attr("name");
            if (typeof newId === "undefined") {
                if ($(this).attr('type') == "button" || $(this).attr('type') == "checkbox") {
                    newId = $(this).attr("value");
                } else {
                    newId = $(this).attr("type");
                }
            }
            //duplicate
            if ($("#" + newId).is("#" + newId)) {
                //  console.log("duplicated"); //console
                newId = newId + index;
            }
            //remove spaces, ids cannot have them
            //console.log(newId)
            if(newId === "undefined"){
              newId = newId.replace(/ +/g, "_");
            }
            $(this).attr("id", newId);
            //console.log("\nId: "+newId);  //console
        }
        //id label not found
        if ($("[for='" + thisid + "']").length == 0) {
            var lblname = $("#" + thisid).attr("name");
            if (typeof lblname === "undefined") {
                lblname = $("#" + thisid).attr("id");
                if (typeof lblname === "undefined") {
                    lblname = " ";
                }
            }
            //convert from CamelCase, replace -_. with spaces
            lblname = lblname.replace(/-/g, " ");
            lblname = lblname.replace(/_/g, " ");
            lblname = lblname.replace(/\./g, " ");
            lblname = lblname.replace(/([A-Z])/g, " $1").toLowerCase();
            //check to see if label text is there in another label
            if ($(":contains(" + lblname + ")").length != 0) {
                lblname = " ";
            }
            //create label
            //if radio, must wrap with no label
            if ($(this).attr("type") == "radio") {
                var lbl = "<label for='" + thisid + "' />";
                $("#" + thisid).wrap();
            }
            //if not radio, insert  before
            else {
                var lbl = "<label for='" + thisid + "' class='hide'>" + lblname + "</label>";
                $(lbl).insertBefore("#" + thisid);
            }

            //console.log("Label had been added"); //console
        }*/
        //Tooltip fix 
        //selects all tooltips and adds a hidden span to the label  
        //of the form element with the tooltip text  
//        $(this).filter('[rel="tooltip"]').each(function () {
//            var tooltext = $(this).attr("data-original-title");
//            if (tooltext == "" || typeof tooltext === "undefined") {
//                tooltext = $(this).attr("data-title");
//                if (tooltext == "" || typeof tooltext === "undefined") {
//                    tooltext = $(this).attr("title");
//                }
//            }
//            //   console.log($(this).parent().prop("tagName"));    //console
//            $(this).parent().html($(this).parent().html() + '<span class="aria-hidden">help text as follows. ' + tooltext + 'end help text</span>');
//        });

      /*  var ariaLabelValue = $("[for='" + $(this).attr("id") + "']").text();
        if (typeof ariaLabelValue === 'undefined') {
            ariaLabelValue = "";
        }

        //same as above, for placeholder
        var pld = $(this).attr("placeholder");
        if (typeof pld !== "undefined") //CODE CHANGED HERE
        {
            //start new additions
            //if there are capitals next to each other
            //seperate by a space so that they aren't
            //read as one word. Ex: MM -> M M
            pld = pld.replace(/([A-Z])/g, " $1");
            //replace "-" with the word "dash"
            pld = pld.replace(/-/g, " dash ");
            //replace "/" with the word "slash"
            //   pld = pld.replace(/\//g, " slash ");
            //replace "," with the word "comma"
            pld = pld.replace(/,/g, " comma ");
            //replace "," with the word "comma"
            pld = pld.replace(/\./g, " dot ");
            //end new additions

            pld = " Sample text. " + pld;

            if ($(this).val() != "") {
                pld = "";
            }
        } else {
            pld = "";
        }
        if (!(ariaLabelValue + pld == "")) {
            $(this).attr("aria-label", ariaLabelValue + pld);
            //console.log($(this).attr("aria-label"));
        }
    });*/
    
  
  
/*    //modal shows and hides
   $(".modal").on("hidden",function(){
     $('body').append("<span class='offScreen' role='alert'>Modal is closed</span>");
    });
    
    $(".modal").on("show",function(){
      $('body').append("<span class='offScreen' role='alert'>Modal is showing</span>");
    });

    //Read modals automatically
    $("[data-toggle='modal']").click(function(){ 
            
        $(this).attr('aria-describedby', 'modal-body');
        $(this).find('.modal-body').attr('id', 'modal-body');
        //add hit escape to close dialog box
   
    });
    
  //read close, rather than times
    $(".modal-header button").each(function(){
      $(this).attr("aria-hidden","false");
      $(this).wrapInner("<span aria-hidden='true'></span>");
      $(this).append("<span class='aria-hidden'>close modal</span>");
        
    });*/
    
    
    

    




//    $('ul.dropdown-menu').each(function(){
//        $(this).attr('role', 'menu');
//        $(this).prev('a').attr('role', 'menubar');
//        $(this).children('li').attr('role', 'menuitem');
//
//    });

    
    //changed submit
   
 /*   $(".btn").filter(cancel_filter).click(function () { 
      
      //console.log("fired");
        $("input,select").attr("role", "");
        setTimeout(function () {

            var errId = "";
            var isFirst = 0;
            var alertlabel = "";
            var index = 1;

            $("[id$='_error']").each(function () {
                var errH = $(this).html();
                if ($(this).text() != "") {
                    if (errH.search("none") == -1) {
                        alertlabel += "Error " + index + " " + $(this).text() + " ";
                        index = index + 1;

                        //see if it has found the first input to select
                        if (isFirst == 0) { //CODE CHANGED HERE
                          var iid = $(this).attr("id").replace("_error", "");
                            var eTag = $("#" + iid).prop("tagName").toLowerCase();

                            if (eTag == "input" || eTag == "select") {
                                errId = iid;
                                isFirst = 1;
                            } else {

                                if (typeof $("#" + iid).find("input,select").first().attr("id") !== "undefined") {
                                    errId = $("#" + iid).find("input,select").first().attr("id");
                                    isFirst = 1;
                                }
                            }
                        }
                    }
                }
            });
            //if none found, jump to top
            if (errId == "") {
                errId = $("input,select").first().attr("id");
            }

            //shift focus IF errors have been found
            if (alertlabel.length > 5) {            
                alertlabel = "The following errors have been found: " + alertlabel;
                $("#" + errId).attr("aria-label", alertlabel);
               
               // $("#" + errId).focus();
                //if phone number, focus in first box
                if($("#" + errId).attr("maxlength") == 4 || $("#" + errId).attr("maxlength") == 3){
                                  
                  var parentDiv = $("#" + errId).closest("div.controls");         
          parentDiv.find("input[type=text]:first").focus();
  
                  
                }else{
                  $("#" + errId).focus();
                }
               // alert(alertlabel);
                $("input,select,#alertlabel").attr("role", "");
                //create a new one
                if ($("#alertlabel").length <= 0) {
                    var htmlalert = '<p style="position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden;" role="alert" id="alertlabel">' + alertlabel + ' End errors found</p>';
                    //$("#" + errId + "_error").after(htmlalert);       //REMOVED
                    $("#" + errId + "_error").attr("aria-describedby", "alertlabel");
                }
                //or update it
                else {
                    $("#alertlabel").text(alertlabel + " End errors found.");
                }
                
                
                //populationServerd jsp
            //    if(!$("#hiddenLangPercentageTotal_error").is(':empty')){
                  if($("#hiddenLangPercentageTotal_error label").is(":visible") || $("#verifyOtherEthnicity_error label").is(":visible") ){
                        $("#langPercentageTotal").attr("aria-label",alertlabel);
                        $("#langPercentageTotal").focus();
            //      }
                  
                 
                }else //if(!("#hiddenEthnicityPercentageTotal_error").is(':empty')){
                  if($("#hiddenEthnicityPercentageTotal_error label").is(":visible")){
                      $("#ethnicityPercentageTotal").attr("aria-label",alertlabel);
                       $("#ethnicityPercentageTotal").focus();
                //  }         
                  
                 }else //if(!("#hiddenIndustryPercentageTotal_error").is(':empty')){
                   if($("#hiddenIndustryPercentageTotal_error label").is(":visible")){
                      $("#industryPercentageTotal").attr("aria-label",alertlabel);
                       $("#industryPercentageTotal").focus();
                   }
                  
                  
          //      }
            }
            //console.log("errId is: " + errId); //console
            //console.log("the errors are in this log: " + $("#alertlabel").text());        //console
        }, 400);
    });*/

/////////////////////////////////////////////////////////to be added

//the aria-hidden class: can be removed/commented out if it is already in the css
//    var headML = $("head").html();
//     $("head").html(headML);
//     //select the links present in pagination
//    $(".pagination a").each(function () {
        //find the numerical value, make sure that is is greater
        //than 0 so it's a regular page number
//        var thisval = parseInt($(this).text());
//        if (thisval > 0) {
//            var itxt = $(this).html();
            //if current page, (.active class), add "current page" to description
//            if($(this).parent().hasClass("active") || $(this).parent().parent().hasClass("active"))
//            {
//                itxt = "<span class='aria-hidden'>Page </span>" + itxt + "<span class='aria-hidden'> Current Page </span>";
//            }
            //regular description, "Page X"
//                else    
//            {
//                    itxt = "<span class='aria-hidden'>Page </span>" + itxt;
//            }
//            $(this).html(itxt);
//        }
//    });
//    //[2] Characters that convey meaning (i.e., >>, >, <, << symbols) must have alt-text.
//    //ch: the character
//    //val: corresponding value 
//    //add more characters and values as needed by specifying cha and val
//    var charArr = [{
//        cha: ">>",
//        val: "next"
//    }, {
//        cha: ">",
//        val: "next"
//    }, {
//        cha: "<<",
//        val: "previous"
//    }, {
//        cha: "\u00BB",
//        val: "next"
//    }, {
//        cha: "\u00BB",
//        val: "next"
//    }, {
//        cha: "\u203A",
//        val: "next"
//    }, {
//        cha: "\u2192",
//        val: "next"
//    }, {
//        cha: "<",
//        val: "previous"
//    }, {
//        cha: "\u00AB",
//        val: "previous"
//    }, {
//        cha: "\u2039",
//        val: "previous"
//    }, {
//        cha: "\u2190",
//        val: "previous"
//    }, {
//        cha: "/mo",
//        val: "per month"
//    }, {
//        cha: "EIN",
//        val: "employee identification number"
//
//    }];
//    //note: there will be duplicates regarding nested tags. to remedy this
//    //first I make sure that the selected element is the innermost child containing
//    //the string to replace
//    for (var i = 0; i < charArr.length; i++) {
//    //find elements with cha text inside
//        $("body").find(":contains(" + charArr[i].cha + ")").not("script,style").each(function (index) {
//            //for cases such as matching >>, to avoid having it match three times (>>, > and another >)
//            //checks to see if there is an "aria-hidden" class, denoting supplementary text
//            var nonp = (typeof $(this).attr("aria-hidden") !== 'undefined') && ($(this).attr("aria-hidden") !== false);
//            //finds it and checks previously mentioned condition
//            if ($(this).find(":contains(" + charArr[i].cha + ")").length <= 0 && !nonp) {
//                var txt = $(this).text();
//                //the character, now hidden from aria
//                var repText = '<span aria-hidden="true">' + charArr[i].cha + '</span>';
//                //what the character means
//                //if it already has the value in the string
//                if (txt.search(new RegExp(charArr[i].val, "i")) == -1) {
//                    repText += '<span class="aria-hidden">' + charArr[i].val + '</span>';
//                }
//                txt = txt.replace(new RegExp(charArr[i].cha, "g"), repText);
//                //console.log("rep text: " + repText);      //console
//                //console.log("txt: " + txt);             //console
//                $(this).html(txt);
//            }
//        });
//    }
//    ////////////////////////////////////end new additions
    
  //Dropdown fixes
//    
//   $("[data-toggle='dropdown']").each(function () {
//        //make it appear as a menu with a popup that
//        //is collapsed
//        $(this).attr("role", "menu");
//        $(this).attr("aria-haspopup", "true");
//        $(this).attr("aria-expanded", "false");
//    });
//    $(".dropdown-menu").each(function () {
//        //give each option in the menu a role
//        $(this).attr("role", "presentation");
//        $("li[role]").removeAttr("role");
//        //$(this).attr("role", "presentation");
//        $(this).find("a").attr("role", "menuitem");
//
//    });
//
//    //when the dropdown is activated
//    $("[data-toggle='dropdown']").keyup(function (e) {
//        //if collapsed
//      if(e.which==13 || e.which==32){
//        if ($(this).parent().hasClass("open")) {
//            //console.log("closed");    //console
//            $(this).attr("aria-expanded", "false");
//            //if expanded
//        } else {
//            //console.log("open");  //console
//            $(this).attr("aria-expanded", "true");
//        }
//      }
//    });



/*}); //End

function cancel_filter() {
    return ($(this).text() + "").search(/cancel/ig) == -1 && ($(this).attr("value") + "").search(/cancel/ig) == -1;
}
*/

//##########################################################################################
//##########################################################################################
//#####################################     paco       #####################################
//##########################################################################################
//##########################################################################################

/*$(document).ready(function(){
  //tab order for phone fields
  $(":input").focus(function(){
      $(".input-mini:not(#dob_mm_0,#dob_dd_0,#dob_yy_0,#submit),.input-small:not(#dob_mm_0,#dob_dd_0,#dob_yy_0,#submit)").attr("tabindex",-1);
      $(".input-mini[maxlength=3],.input-mini[maxlength=4],.input-small[maxlength=3],.input-small[maxlength=4]").attr("tabindex",-1);
    $(".controls").find("input:first").attr("tabindex",0);
  }); 
  
  $(".input-mini,.input-small").focus(function() { 
      $(this).siblings(".input-mini,.input-small").attr("tabindex",0);
      $(this).parent().next().children(".input-mini,.input-small").attr("tabindex",0);
      $(this).parent().prev().children(".input-mini,.input-small").attr("tabindex",0);
 });  
  
  
  
  //add id to span9 
  if( $('#sidebar').length > 0 && $('.span9').length > 0 && $('#rightpanel').length == 0){
    $('.span9').attr('id','rightpanel');
  }

  //skip script
  if ($('#menu').length > 0){
    $('.skip-nav').attr('href','#menu');
    //nav->menu
    $('.skip-nav').click(function(){  
        $('#menu a:first').focus();
    });
    //add skip-menu
    if($('#sidebar').length > 0){
      //if sidebar, skip to sidebar
      $('#menu :first').before('<a href="#sidebar" name="skip" class="skip-menu" accesskey="m">Skip Menu to Side Bar</a>'); 
      //menu->sidebar
      $('.skip-menu').click(function(){ 
          $('#sidebar :first').focus();
        });         
      //add skip-sidebar
      if($('#rightpanel').length > 0){
        $('#sidebar :first').before('<a href="#rightpanel" name="skip" class="skip-sidebar" accesskey="s">Skip Side Bar to Main Content</a>');
        //sidebar->rightpanel
        $('.skip-sidebar').click(function(){  
            $('#rightpanel :input:first,#rightpanel a:first').focus();
          });
      }   
    }else if($('#rightpanel').length > 0){
      //if no sidebar, skip to rightpanel
      $('#menu :first').before('<a href="#rightpanel" name="skip" class="skip-menu" accesskey="m">Skip Menu to Main Content</a>'); 
      //menu->rightpanel
      $('.skip-menu').click(function(){ 
          $('#rightpanel :input:first,#rightpanel a:first').focus();
        });
    }
    //skip footer
    $('#footer :first').before('<a href="#menu" name="skip" class="skip-footer" accesskey="f">Skip Footer to Menu</a>'); 
    $('.skip-footer').click(function(){ 
      $('#menu a:first').focus();
    });
    //no menu
  }else if($('#sidebar').length > 0){
    $('.skip-nav').attr('href','#sidebar');
    //nav->sidebar
    $('.skip-nav').click(function(){  
        $('#sidebar :first').focus();
    });
    //add skip-sidebar
    if($('#rightpanel').length > 0){
      $('#sidebar :first').before('<a href="#rightpanel" name="skip" class="skip-sidebar" accesskey="s" >Skip Side Bar to Main Content</a>');
      //sidebar->rightpanel
      $('.skip-sidebar').click(function(){  
          $('#rightpanel :input:first,#rightpanel a:first').focus();
        });
    }
    //skip footer
    $('#footer :first').before('<a href="#sidebar" name="skip" class="skip-footer" accesskey="f">Skip Footer to Side Bar</a>'); 
    $('.skip-footer').click(function(){ 
      $('#sidebar :first').focus();
    });
    //no menu and sidebar
  }else if($('#rightpanel').length > 0){
    $('.skip-nav').attr('href','#rightpanel');
    //nav->rightpanel
    $('.skip-nav').click(function(){  
      $('#rightpanel :input:first,#rightpanel a:first').focus();
    });
    //skip footer
    $('#footer :first').before('<a href="#rightpanel" name="skip" class="skip-footer" accesskey="f">Skip Footer to Main Content</a>'); 
    $('.skip-footer').click(function(){ 
      $('#rightpanel :input:first,#rightpanel a:first').focus();
    });
  }else{
    //no menu, sidebar and rightpanel
    $('.skip-nav').click(function(){
      $('input:first,a:first,select:first').focus().select();
    });
  }
  
  

  

  

   
   //add input to first radio
   $("input[type='radio']:first").before("<input type='text' id='radionAccessibility' tabindex='0' style='left:-100000000px;top:-10000px;height: 0px;width: 0px;overflow:hidden;position: absolute;'>");
   $("#radionAccessibility").focus(function(){
     $(this).next("input[type='radio']").focus();
   });
   
   
   
   */

/*for counties served plugin*/
/*$('.chzn-choices').live('focus',function(){
  if($(this).parents('.control-group').find('.control-label').text()==="Languages"){
    //$(this).attr('aria-hidden','Language');
    if($('.chzn-choices li').length > 1){
      var collection = $(".search-choice");
      jQuery.each( collection, function( i, val ) {
        
        $('#'+$(val).attr('id')).find('span.selectedLang').text('');
        var selectedLanguage = $('#'+$(val).attr('id')).find('span').text();
        
        $('#'+$(val).attr('id')).find('a').find('span.selectedLang').remove();
        
        var anchorTagHTML = $('#'+$(val).attr('id')).find('a');
        anchorTagHTML.html("<span class='selectedLang aria-hidden'>Languages "+selectedLanguage+"</span>");
      });
    }
    if($('.chzn-drop').position().left == 0){
      $('.search-field').prepend('<label class="aria-hidden languageDrop">Languages</label>');
    }
  }else{
    $(this).attr('aria-hidden','Counties Served');
    var collection = $(".search-choice");
    jQuery.each( collection, function( i, val ) {
      
      $('#'+$(val).attr('id')).find('span.selectedLang').text('');
      var selectedLanguage = $('#'+$(val).attr('id')).find('span').text();
      
      $('#'+$(val).attr('id')).find('a').find('span.selectedLang').remove();
      
      var anchorTagHTML = $('#'+$(val).attr('id')).find('a');
      anchorTagHTML.html("<span class='selectedLang aria-hidden'>Counties Served "+selectedLanguage+"</span>");
    });
    if($('.chzn-drop').position().left == 0){
      $('.search-field').prepend('<label class="aria-hidden languageDrop">Counties Served</label>');
    }
  }
  
});

trigger input upload button on focus (tab/accessibility)
$("input[type='file']").each(function () {     
  $(this).attr('aria-label',"Press Tab and then Space bar to open the choose dialog box.");
});

$(".selectLang").each(function(){
  $(this).parent().prepend("<span class='aria-hidden'>Language</span>");
  
});


$('input').live('keydown', function(event){
var code = event.keyCode || event.which;
  if (code == 13) {
    $('.chzn-choices .search-choice span').each(function(){
      
      var list = $(this).text();
      console.log(list);
      $('.search-field input').append("<span class='selectedLang aria-hidden'>" + list + " </span>");
    });
}
});
  
$('.chzn-choices .search-choice span').each(  function(){
  var list = $(this).text();
  console.log(list);
  $('.search-field input').append("<span class='selectedLang aria-hidden'>" + list + " </span>");
});
  
  //check focus on language spoken
  window.onkeyup = checkLanguageFocus;


//highlight all phone box for error
$("input,a").bind("click keydown change", function(){
  //this script comes after validation, so use setTimeout function
  setTimeout(
      function(){
        $(".input-mini[maxlength=3],.input-mini[maxlength=4],.input-small[maxlength=3],.input-small[maxlength=4]").each(function(){
          var parentDiv = $(this).closest("div.controls");          
          if($(this).hasClass("error") && parentDiv.find("div label").is(":visible")){
            parentDiv.find("input").addClass("error");
          }else if (!parentDiv.find("div label").is(":visible")){
            parentDiv.find("input").removeClass("error");
          }
        });
      },10

  );
});  
  



$("label").each(function(){
  var selectID = $(this).attr("for");
  
  if($("#"+selectID).prop("tagName") == "select" || $("#"+selectID).prop("tagName") == "SELECT"){
    //if there is a required img, insert before img
    if($(this).find("img")){
      $(this).find("img").before('<span class="aria-hidden" aria-live="assertive">required</span>');
    }else {
      $(this).append('<span class="aria-hidden" aria-live="assertive">required</span>');
    }
    
  }

});

});






//language spoken
function checkLanguage

(){
    if($(".search-field input").is(":focus")){
       var spokenText = "<label class='hide' for='languageInputList'>Language combo box, to change the selection use the arrow key</label>";
       $(".search-field input").attr("id","languageInputList");
       $(".search-field input").before(spokenText);
    }


};



for all the input text with placeholder text
$("input[type='text']").live('focus',function () {
     var ariaLabelValue = $("[for='" + $(this).attr("id") + "']").text();
    if (typeof ariaLabelValue === 'undefined') {
        ariaLabelValue = "";
    }
     var pld = $(this).attr("placeholder");
     if (typeof pld !== "undefined") //CODE CHANGED HERE
     {
         //start new additions

         //if there are capitals next to each other
         //separate by a space so that they aren't
         //read as one word. Ex: MM -> M M
         pld = pld.replace(/([A-Z])/g, " $1");
         //replace "-" with the word "dash"
         pld = pld.replace(/-/g, " dash ");
         //replace "/" with the word "slash"
         pld = pld.replace(/\//g, " slash ");
         //replace "," with the word "comma"
         pld = pld.replace(/,/g, " comma ");
         //replace "," with the word "comma"
         pld = pld.replace(/\./g, " dot ");
         //end new additions
         pld = " Sample text. " + pld;
     } else {
         pld = "";
     }
     
     if (!(ariaLabelValue + pld == "")) {
         $(this).attr("aria-label", ariaLabelValue + pld);
     }
 });
*/