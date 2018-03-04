
(function($) {

  $('.list_item').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('.list_item').removeClass('active');
    $('.article').removeClass('active');
    $(this).addClass('active');
    $('#'+tab_id).addClass('active');
  });

  $('.fill_form').on('click', function() {
    $('form').slideToggle('slow');
  });

  var validators = {
    name: /^[a-zA-Zа-яА-Я]+\s[a-zA-Zа-яА-Я]+|[a-zA-Zа-яА-Я]+$/i,
    email: /^\w+@\w+\.\w+|\w+\.\w+@\w+\.\w+|\w+-\w+@\w+\.\w+$/i,
    phone: /^\+\d\(\d{3}\)\d{3}-\d{4}$/,
    city: /^[a-zA-Zа-яА-Я]+\s[a-zA-Zа-яА-Я]+|[a-zA-Zа-яА-Я]+$/i,
    default: /^[a-zA-Zа-яА-Я]+$/i
  };

  $('.submit').on('click', function() {
    var result = $('.form__field').filter(function (index) {
      return ! validators[this.name].test(this.value);
    }).addClass('invalid');

    return result.length === 0;
  });

  $.ajax({
    url: 'http://geoapi.spacenear.ru/api.php?method=getCities&countryId=1',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      $(data)
      .filter(function (index) {
        return this.name != '';
      })
      .each(function(i, item) {
        $('select').append($('<option>', {
          value: item.name,
          text: item.name
        }));
      });
    }
  });

  $.ajax({
    url: 'http://geoapi.spacenear.ru/api.php?method=getCities&countryId=1',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      $('<datalist id=availableCities></datalist>').insertAfter('.city');
      $(data)
      .filter(function (index) {
        return this.name != '';
      })
      .each(function(i, item) {
        $('datalist').append($('<option>', {
          value: item.name
        }));

        $('.city').on('input', function(e) {
          var input = $(e.target);
          var datalist = input.attr('data-list');

          if(input.val().length < 4) {
              input.attr('list', '');
          } else {
              input.attr('list', datalist);
          }
        });
      });
    }
  });
}) (jQuery)
