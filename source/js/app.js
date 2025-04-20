/////////////////////////////////////////////////////////////////////////////
//АНИМАЦИЯ КНОПКИ ПОЛИТИКИ КОНФИДЕНЦИАЛЬНОСТИ
////////////////////////////////////////////////////////////////////////////
function initAnchorBtn() {
  $('[data-scroll-top]').on('click', function () {
    $('.modal-scrollable').animate(
      {
        scrollTop: 0,
      },
      1000,
    )
  })
}

//////////////////////////////////////////////////////////////////////////
//ВАЛИДАЦИЯ ИНПУТА
//////////////////////////////////////////////////////////////////////////
function filterInvalidCharacters() {
  $('input[name="name"]').on('input', function() {
    let value = $(this).val();
    $(this).val(value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, ''));
  });
}

$(document).ready(function () {
  initAnchorBtn()
  filterInvalidCharacters()

  $('input').inputmask()
})
