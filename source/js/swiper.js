function initSwiperBullet() {
  const swiper = new Swiper('.swiper-bullet', {
    speed: 450,
    effect: 'coverflow',
    rewind: true,
    pagination: {
      el: '.bullet-pagination',
      clickable: true,
    },
    updateOnWindowResize: true,
    spaceBetween: 20,
    breakpoints: {
      200: {
        slideToClickedSlide: true,
        coverflowEffect: {
          rotate: 60,
          stretch: 14,
          depth: 500,
          scale: 0.7,
          modifier: 1,
          slideShadows: false,
        },
        allowTouchMove: true,
      },
      768: {
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 0,
          slideShadows: false,
        },
        allowTouchMove: false,
        spaceBetween: 0,
      },
    },
  })
}

$(document).ready(function () {
  initSwiperBullet()
})
