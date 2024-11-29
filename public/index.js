$(document).ready(function () {
  const resetActive = () => {
    var cardElements = $('.card');
    var cardLength = cardElements.length;
    for (var i = 0; i < cardLength; i++) {
      cardElements.eq(i).removeClass('active');
    }
  };

  const focusOnCard = (id) => {
    const $card = $(`.card[id="${id}"]`);

    $('html, body').animate(
      {
        scrollTop: $card.offset().top,
      },
      100,
    );

    $card.addClass('active');
  };

  const toast = (message) => {
    $('#error').text(message);
  };

  const submit = () => {
    const code = $('#search').val().trim();
    resetActive();

    $.ajax({
      url: `/provinces/search?keyword=${code}`,
      type: 'GET',
    })
      .done(function (res) {
        if (res.data.length > 0) {
          const id = res.data[0].id;
          focusOnCard(id);
          toast('');
          return;
        }
        toast('Không tìm thấy kết quả');
      })
      .fail(function (err) {
        toast(err.responseJSON.message);
      });
  };

  $('#btn-search').on('click', submit);

  $('#search').keypress(function (e) {
    if (e.which == 13) {
      submit();
    }
  });
});
