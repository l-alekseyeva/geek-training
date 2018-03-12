(function($) {
  $(function() {
    $.ajax({
      url: 'http://localhost:3000/goods',
      dataType: 'json',
      success: function(goods) {
        var $ul = $('<ul/>');
        goods.forEach(function(good) {
          var $li = $('<li/>').text(good.name + ' / стоимость: ' + good.price);
          var $img = $('<img>').attr('src', good.img);

          var $input = $('<input value=1>');
          $input.attr({
            'id': 'input_'+good.id
          });

          $li.append($img);
          $li.append($input);

          $li.append( $('<a/>').text('Купить').attr({
            href: '#',
            'data-id': good.id,
            'data-price': good.price,
            'data-name': good.name
          }) );
          $ul.append( $li );
        });
        $('#goods').append( $ul );
      }
    });

    $('#goods').on('click', 'li > a', function(event) {
      var good_id = $(this).attr('data-id');
      var $input = $('#input_'+good_id).val();

      $.ajax({
        url: 'http://localhost:3000/cart',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          id: $(this).attr('data-id'),
          price: $(this).attr('data-price'),
          name: $(this).attr('data-name'),
          quantity: $input,
          total: $(this).attr('data-price')*$input
        }),
        success: function(data) {
          var $p = $('<p/>');
          $p.attr({
            'id': data.id,
            'data-total': data.total
          });
          var $button = $('<button/>');
          $button.text('Удалить').attr({
            'data-id': data.id,
          });
          $p.text(data.name + ' / количество: ' + data.quantity + ' / стоимость: ' + data.total);
          $p.append($button);
          $('#cart').append($p);
        }
      });

      // подсчет суммы
      var total_sum = 0;
      var $all_p = $('#cart > p');

      for (var i = 0; i <$all_p.length; i++) {
        total_sum += parseInt($all_p.eq(i).attr('data-total'));
      }

      total_sum += parseInt($(this).attr('data-price')*$input);

      $('#total').attr({
        'total-sum': total_sum
      }).text('Итого: ' + total_sum);

      event.preventDefault();
    });

    // удаление товара и пересчет суммы
    $('#cart').on('click', 'p > button', function (event){
      var good_id = $(this).attr('data-id');
      $.ajax({
        url: 'http://localhost:3000/cart/'+good_id,
        type: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify({
          id: $(this).attr('data-id'),
          price: $(this).attr('data-price'),
          name: $(this).attr('data-name'),
          total: $(this).attr('data-total')
        }),
        success: function(data) {
          var $whole_sum = $('#total').attr('total-sum');
          var $sum_toRemove = $('#'+good_id).attr('data-total');
          var $new_sum = $whole_sum - $sum_toRemove;
          $('#total').attr({'total-sum': $new_sum}).text('Итого: ' + $new_sum);

          $('#'+good_id).remove();
        }
      });
    });

    //отправка отзыва на модерацию
    $('#submit').on('click', function(event){
      $input = $('#name');
      $textarea = $('textarea');
      $.ajax({
        url: 'http://localhost:3000/review',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          id: $($input).attr('value'),
          name: $($input).val(),
          text: $($textarea).val(),
          checked: false
        }),
        success: function(data) {
          alert('Спасибо! Ваш отзыв передан на модерацию.');
          $('#reviews').children().val('');
        }
      });
    });

    // вывод одобренного отзыва
    $.ajax({
      url: 'http://localhost:3000/review',
      dataType: 'json',
      success: function(reviews) {
        reviews.forEach(function(review) {
          if (review.checked === true) {
            var $p = $('<p/>').text('Пользователь: '+ review.name + '. Его отзыв: ' + review.text);
            $('#clients_reviews').append($p);
          }
        });
      }
    });

    // вывод сообщений для модерации
    $.ajax({
      url: 'http://localhost:3000/review',
      dataType: 'json',
      success: function(moderate) {
        moderate.forEach(function(review) {
            var $div = $('<div/>').attr({
              'reviever-id': review.id,
            });
            var $lable = $('<Lable/>');
            var $input = $('<input/>').attr({
              'type': 'checkbox',
              'ckeck-id': review.id,
              'checked': false,
            });
            $div.append($lable).text('ID: '+ review.id + '. Пользователь: '+ review.name + '. Его отзыв: ' + review.text).append($input);
            $('#toModerate').append($div);
        });
        var $button = $('<button/>').attr({
          'id': 'sendToModerate',
        }).text('Отправить на модерацию');
        $('#toModerate').append($button);
      }
    });

    // отправка отмодерированных сообщений
    // пока не получилось реализовать до конца

    // $('#toModerate').on('click', '#sendToModerate', function(event) {
    //
    //   var $inputToSend = $('input[ckeck-id]');
    //   console.log($inputToSend);
    //
    //   $inputToSend.each(function(index) {
    //     if ($inputToSend[index].checked === true)
    //
    //     {
    //       $.ajax({
    //         url: 'http://localhost:3000/review',
    //         type: 'PUT',
    //         contentType: 'application/json',
    //         data: JSON.parse({
    //           id: $inputToSend.attr('ckeck-id'),
    //           checked: false,
    //         }),
    //         success: function(data) {
    //           data.forEach(function(review) {
    //             this.checked = true;
    //           });
    //
    //         }
    //       });
    //     }
    //   });
    // });

  });
})(jQuery);
