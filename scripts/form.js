$(document).ready(function() { 
	$("#ajaxform").submit(function(){ 
        $(this).find('#phone').each(function(){
            var error = false;  
            if ($(this).val().length == 0 ) { 
                document.getElementById("namef").innerHTML="данное поле обязательно для заполнения";
            } else if (($(this).val().length < 16) && ($(this).val().length > 1)) {
                document.getElementById("namef").innerHTML="введённый номер телефона короткий";
            } else if (($(this).val().length == 16 ) || $(this).keyup) {
                document.getElementById("namef").remove();
            } 
            console.log($(this).val().length);
            error = true;
            
            // $(this).on('keyup',function(){
            //     document.getElementById("namef").remove(); 
            // })
        
        }); 
        $(this).on('keyup',function(){
            document.getElementById("namef").remove(); 
        })
        return false;
    });
    // $("#ajaxform").find('#phone').each( function(){ 
    //     $(this).on('keyup',function(){
    //         document.getElementById("namef").hide(); 
    //     })  
    // });
});