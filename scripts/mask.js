// (function ($) {
  
//   // узнать позицию курсора
//   $.fn.getCursorPosition = function () {
//       var input = this.get(0);
//       if (!input) return;
//       if ('selectionStart' in input) {
//           return input.selectionStart;
//       } else if (document.selection) {
//           input.focus();
//           var sel = document.selection.createRange();
//           var selLen = document.selection.createRange().text.length;
//           sel.moveStart('character', -input.value.length);
//           return sel.text.length - selLen;
//       }
//   }
//   // установить позицию курсора
//   $.fn.setCursorPosition = function (pos) {
//       if ($(this).get(0).setSelectionRange) {
//           $(this).get(0).setSelectionRange(pos, pos);
//       } else if ($(this).get(0).createTextRange) {
//           var range = $(this).get(0).createTextRange();
//           range.collapse(true);
//           range.moveEnd('character', pos);
//           range.moveStart('character', pos);
//           range.select();
//       }
//   }
//   // удалить выделенный текст
//   $.fn.delSelected = function () {
//       var input = $(this);
//       var value = input.val();
//       var start = input[0].selectionStart;
//       var end = input[0].selectionEnd;
//       input.val(
//               value.substr(0, start) + value.substring(end, value.length)
//       );
//       return end - start;
//   };

//   $.fn.phoneFormat = function () {

//       function phoneFormatted(element) {
//         // var newVal = /^(8|\+7)910\d{7}$/;
//         // var newVall =  newVal.test(element);
//         var re = /^\d[\d\(\)\ -]{4,14}\d$/;
//         var myPhone = document.getElementById('phone').value;
//         var valid = re.test(myPhone);
//         if (valid) output = 'Номер телефона введен правильно!';
//     else output = 'Номер телефона введен неправильно!';
//     document.getElementById('message').innerHTML = document.getElementById('message').innerHTML+'<br />'+output;
//         return valid;
//         // if(!element) return '';
//         // return newVall;
//         // if(!element) return '';
//         // var res = '';
//         // for (var i = 0; i < newVall.length; i++) {
//         //   if (i == 0) {
//         //       res += ' '+'(';
//         //       res += newVall.charAt(i);
//         //       } else if (i == 3) {
//         //       res += ')' + ' ';
//         //       res += newVall.charAt(i);
//         //       } else if (i == 6 || i == 8 ) {
//         //       res += '-';
//         //       res += newVall.charAt(i);
//         //       } else {
//         //       res += newVall.charAt(i);
//         //       }
//         //   }
//         //   return res;
//       }

//       $(this)
//               .keydown(function (event) {
//                   var cursor = $(this).getCursorPosition();
//                   var code = event.keyCode;
//                   var startValue = $(this).val();
                  
//                   if ((event.ctrlKey === true && code == 86) || // Ctrl+V | Shift+insert
//                       (event.metaKey === true && code == 86) || 
//                           (event.shiftKey === true && code == 45)) {
//                       return false;
//                   } else if (
//                           code == 9 || // tab
//                                   code == 27 || // ecs
//                                   event.ctrlKey === true || // все что вместе с ctrl
//                                   event.metaKey === true ||
//                                   event.altKey === true || // все что вместе с alt
//                                   event.shiftKey === true || // все что вместе с shift
//                                   (code >= 112 && code <= 123) || // F1 - F12
//                                   (code >= 35 && code <= 39)) // end, home, стрелки
//                   {
//                       return false; 

//                   } else if (code == 8) {// backspace

//                       var delCount = $(this).delSelected();
//                       if (!delCount) {
//                           if (startValue[cursor - 1] === ' ') {
//                               cursor--;
//                           }
//                           $(this).val(startValue.substr(0, cursor - 1) + startValue.substring(cursor, startValue.length));
//                       }
//                       $(this).val(phoneFormatted($(this).val()));
//                       $(this).setCursorPosition(cursor - (startValue.length - $(this).val().length - delCount));

                    
//                     //   if (cursor == 7){
//                     //     $(this).setCursorPosition(cursor + 2 - (startValue.length - $(this).val().length - delCount));
//                     //   }
//                     //   if (cursor == 9) {
//                     //     $(this).setCursorPosition(cursor + 1 - (startValue.length - $(this).val().length - delCount));
//                     //   }
//                     //   if ((cursor == 14) || (cursor == 6)){
//                     //     $(this).setCursorPosition(cursor - 1 - (startValue.length - $(this).val().length - delCount));
//                     //   }

//                   } else if (code == 46) { // delete

//                       var delCount = $(this).delSelected();
//                       if (!delCount) {
//                           if (startValue[cursor] === ' ') {
//                               cursor++;
//                           }
//                           $(this).val(startValue.substr(0, cursor) + startValue.substring(cursor + 1, startValue.length));
//                       }
//                       if (!delCount)delCount = 1;
//                       $(this).val(phoneFormatted($(this).val()));
//                       $(this).setCursorPosition(cursor - (startValue.length - $(this).val().length - delCount));

//                   } else {
//                       $(this).delSelected();
//                       startValue = $(this).val();
//                       var key = false;
//                       // цифровые клавиши
//                       if ((code >= 48 && code <= 57)) {
//                           key = (code - 48);
//                       }
//                       // numpad
//                       else if ((code >= 96 && code <= 105 )) {
//                           key = (code - 96);
//                       } else {
//                           $(this).val(phoneFormatted($(this).val()));
//                           $(this).setCursorPosition(cursor);
//                           return false;
//                       }
//                       var length = startValue.length
//                       var value = startValue.substr(0, cursor) + key + startValue.substring(cursor, length);
//                       $(this).val(phoneFormatted(value));
//                       $(this).setCursorPosition(cursor + $(this).val().length - length);
                
//                     //   if ((cursor == 15) || (cursor == 14) || (cursor == 12) || (cursor == 9)) {
//                     //     $(this).setCursorPosition(cursor + 1 + $(this).val().length - length);
//                     //   }
//                     //   if ((length > 8) && (cursor == 8)) {
//                     //      $(this).setCursorPosition(cursor - 1 + $(this).val().length - length);
//                     //   }
//                     //   if (cursor == 4 ) {
//                     //     $(this).setCursorPosition(cursor + 2 + $(this).val().length - length);
//                     // }
//                   }
//                   event.preventDefault();
//               });
//   };
// })(jQuery);

// $(document).ready(function () {
//   $('#phone').phoneFormat();
// });

