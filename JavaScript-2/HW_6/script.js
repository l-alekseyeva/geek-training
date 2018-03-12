(function($) {
  $(function() {

    $('.fill_form').on('click', function() {
      $('form').slideToggle('slow');
    });

    var validators = {
      name: /^[a-zA-Zа-яА-Я]+\s[a-zA-Zа-яА-Я]+|[a-zA-Zа-яА-Я]+$/i,
      email: /^\w+@\w+\.\w+|\w+\.\w+@\w+\.\w+|\w+-\w+@\w+\.\w+$/i,
      date: /^\d{2}.\d{2}.\d{4}/,
      phone: /^\+\d\(\d{3}\)\d{3}-\d{4}$/,
      city: /^[a-zA-Zа-яА-Я]+\s[a-zA-Zа-яА-Я]+|[a-zA-Zа-яА-Я]+$/i,
      default: /^[a-zA-Zа-яА-Я]+$/i
    };

    var error_messages = {
      name: 'Ошибка в имени',
      email:'Ошибка в формате электронной почты',
      date: 'Ошибка в формате даты',
      phone:'Ошибка в формате номера телефона',
      city: 'Ошибка в названиии города',
      default: 'Ошибочная ошибка, ничего ошибочного'
    };

    $('#dialog').dialog({ autoOpen: false });

    // проверяем на ошибки

    $('main').on('click', 'button[name=sendForm]', function(event) {

      var result = $('.form__field').filter(function (index) {
        var field_name = (this.name in validators)? this.name : 'default';
        var validator = validators[field_name];
        var result = !validator.test(this.value);
        if (result) {
          var $p = $('<p/>').text(error_messages[field_name]);
          $('#dialog').append($p);
        }
        return result;
      }).addClass('invalid').effect( "bounce", { times: 3 }, "slow" );

      if (result.length > 0) {
        $('#dialog').dialog('open');
      }

      return result.length === 0;
    });

    $(document).ready(function() {
      $("input[name=date]").datepicker({
        monthNames:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь"
        ,"Ноябрь","Декабрь"],
        dayNamesMin:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],
        firstDay:1,
        dateFormat:"dd.mm.yy"
      });
    });

    $.ajax({
      url: 'http://geoapi.spacenear.ru/api.php?method=getCities&countryId=1',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        $(data)
        .filter(function (index) {
          return this.name !== '';
        })
        .each(function(i, item) {
          $('select').append($('<option>', {
            value: item.name,
            text: item.name
          }));
        });
      }
    });

    $(document).ready(function(){
      $('.single-item').slick({
        autoplay: true
      });
    });


  });
})(jQuery);
