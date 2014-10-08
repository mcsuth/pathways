$(document).ready(function(){
	
	//add .header to thead tr
    $('.table thead tr').addClass('header');
    
    $('.clearForm').click(function(){
        $(this).parents("form").find("input").not(':button,:hidden').val("");
        $('label.error').hide();
	});
    
   $('#rightpanel .graydrkbg').find('.btn').addClass('btn-small');
    
	
	//HIX-22629
	$('a[title="Account"]').append(' <i class="caret"></i>');	
	
	/*HIX-25202 fixed as per changed requirement*/
	$('#hidekeep-currentplnTab').hide();
	
	/* HIX-35709 */
	$('#ticketStatus').removeAttr('multiple').removeAttr('size');
});
