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

function phoneFormatter() {
    $('.phone').on('input', function() {
      var number = $(this).val().replace(/[^\d]/g, '')
        number = number.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "($1) $2-$3-$4");
      $(this).val(number)
    });
  };
  
  $(phoneFormatter);