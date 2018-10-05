// $(document).ready(function(){

//     $('input#phone').unbind().blur( function(){
        
//         var val = $(this).val();
//         if (val.length > 15 && val != '')  
//         {  
//             $(this).addClass('not_error');
//             $(this).next('.error-box').text('')     
//         } else if ( val.length < 15 && val.length > 1) {
//             $(this).removeClass('not_error').addClass('error');
//             $(this).next('.error-box').html('&bull; полный номер телефона')
//                                         .css('color','red')
//                                         .animate({'paddingLeft':'10px'},400)
//                                         .animate({'paddingLeft':'5px'},400);
//         } else if (val.length == 0) {
//             $(this).removeClass('not_error').addClass('error');
//             $(this).next('.error-box').html('&bull; поле обязательно для заполнения')
//                                         .css('color','red')
//                                         .animate({'paddingLeft':'10px'},400)
//                                         .animate({'paddingLeft':'5px'},400);
//         }
//     });

//     $("#ajaxform").submit(function(e){ 

        
//         e.preventDefault();
        
//         if ($('.not_error').length == 1) {  
//             $('input#phone').removeClass('error').next('.error-box').text('')
//                                                     .css('border-color','green');
//             $('input#phone').next('.error-box').text('');
//             alert('all are ok');
//         } else {
//             $('input#phone').removeClass('not_error').addClass('error');
//             $('input#phone').next('.error-box').html('&bull; обязательное поле ввода')
//                                         .css('color','red')
//                                         .animate({'paddingLeft':'10px'},400)
//                                         .animate({'paddingLeft':'5px'},400);
//             }
//     }); 


//  }); // end script

$('.phone').on('input', function() {
    var number = $(this).val().replace(/[^\d]/g, '');
    if (number.length <= 0) {
        number = number.replace(/(\D*\d{0,3})/, "");
    } else if (number.length <=2) {
        number = number.replace(/(\D*\d{0,3})/, "($1");
    } else if (number.length <= 3) {
        number = number.replace(/(\D*\d{0,3})/, "($1");
    } else if (number.length <= 5) {
        number = number.replace(/(\D*\d{0,3})/, "($1) ");
    } else if (number.length <= 6) {
        number = number.replace(/(\D*\d{0,3})(\D*\d{0,3})/, "($1) $2");
    } else if (number.length <= 8) {
        number = number.replace(/(\D*\d{0,3})(\D*\d{0,3})(\d{0,2})/, "($1) $2-$3");
    } else if (number.length <= 11) {
      number = number.replace(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/, "($1) $2-$3-$4");  
    }       
    console.log(number.length)                       
    $(this).val(number);
});
