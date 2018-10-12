// вход: значение input.val()
// выход: отформатированное значение input.val()
// алгоритм:
// 1) Взять только цифры;
// 2) Отформатировать цифры по маске;
// 3) Обрезать лишние символы после последней введённой цифры.

// Поддерживать ситуации:
// 1) Копирование из буфера обмена;
// 2) Восстановление позиции каретки при удалении нескольких символов;

$(document).ready(function(){

    var FORMAT_MASK = "($1) $2-$3-$4";
    var FORMAT_REGEXP = /^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/;

    function getNumbers (inputNumbers) {

        var stringNumbers = inputNumbers.replace(/\D/g, '');
        return stringNumbers;
    }

    function applyMask (stringNumbers) {

        var formattedString = stringNumbers.replace(FORMAT_REGEXP, FORMAT_MASK);
        return formattedString;
    }

    function truncateResult (formattedString, numbersCount) {
        var regexp = truncateRegexp(numbersCount);
        var resultPhone = formattedString.replace(regexp, "$1");
        return resultPhone;
    }

    function truncateRegexp (numbersCount) {
        var partRegexp1 = '^((\\D*\\d){';
        var partRegexp2 = '})(\\D*)$';
        var regExp = new RegExp (partRegexp1 + numbersCount + partRegexp2);
        return regExp;
    }

    function getInputMetadata(input) {
        var $input = $(input);
        var inputValue = $input.val();
        var rawValue = getNumbers(inputValue);
        var start = input.selectionStart;
        var leftPart = inputValue.slice(0, start);
        var position = getNumbers(leftPart).length;

        return {
            rawValue: rawValue,
            position: position,
        };
    }

    function getCaretPosition(phoneNumber, numberPosition) {
        var numbersCount = 0;

        for (var i = 0; i <= phoneNumber.length; ++i) {
            if (numberPosition === numbersCount) return i;
            numbersCount += /\d/.test(phoneNumber[i]) ? 1 : 0;
        }
    }

    $('.phone').on('input', function () {
        var $input = $(this);
        var inputNumbers = $input.val();
        var metadata = getInputMetadata(this);

        var numbers = getNumbers(inputNumbers);
        var numbersCount = numbers.length;
        var formattedNumbers = applyMask(numbers);
        var phoneNumber = truncateResult(formattedNumbers, numbersCount);

        $input.val(phoneNumber);

        var numberPosition = metadata.position;
        var caretPosition = getCaretPosition(phoneNumber, numberPosition);

        this.setSelectionRange(caretPosition, caretPosition);
    });

    console.log(getNumbers("9854-55_frs") === "985455");
    console.log(getNumbers("8(000)987-65-43") === "80009876543");
    console.log(getNumbers("") === "");
    console.log(getNumbers("ф (ффф) ффф-фф-фф") === "");
    console.log(getNumbers("------,-.--") === "");

    console.log(applyMask("84587834") === "(845) 878-34-");
    console.log(applyMask("8458783") === "(845) 878-3-");
    console.log(applyMask("84") === "(84) --");
    console.log(applyMask("8451087090") === "(845) 108-70-90");
    console.log(applyMask("") === "() --");

    console.log(truncateResult("(845) 878-34-", 8) === "(845) 878-34");
    console.log(truncateResult("(84) --", 2) === "(84");
    console.log(truncateResult("(845) 108-70-90", 10) === "(845) 108-70-90");
    console.log(truncateResult("() --", 0 ) === "");
    console.log(truncateResult("(845) 878-3-", 7) === "(845) 878-3");
    console.log(truncateResult("(8) --", 1 ) === "(8");
    console.log(truncateResult("(845) 1--", 4) === "(845) 1");
});
