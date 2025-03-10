var swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    spaceBetween: 10,
    effect: 'slide', // 'slide', 'fade', 'cube', 'coverflow', 'flip', 'creative' or 'cards'
    //focusableElements: 'swiper-explainable',
    direction: 'horizontal',
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 8000,
    },
    breakpoints: {
        0: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 3,
        },
        1728: {
            slidesPerView: 4,
        },
    },
    on: {
        click: true,
    }
})[0];

swiper.on('click', function(){
    const clickedElement = swiper.clickedSlide;
    var targetElement = clickedElement;
    if (swiper.currentBreakpoint < 1024) {
        if (clickedElement.classList.contains('swiper-slide-active')) {
            targetElement = swiper.clickedSlide.children[1];
            if (targetElement.classList.contains('hidden-element')) {
                targetElement.classList.remove("hidden-element");
            } else {
                targetElement.classList.add("hidden-element");
            }
        }
    }
});

swiper.on('slideChangeTransitionStart', function () {
    const clickedElement = swiper.clickedSlide;
    var targetElement = clickedElement;
    if (swiper.currentBreakpoint < 1024) {
        swiper.slides.forEach(element => {
            if (element.classList.contains('swiper-slide-active')) {
                element.children[1].classList.remove('hidden-element');
            }
        });
    }
});

swiper.on('slideChangeTransitionEnd', function () {
    const clickedElement = swiper.clickedSlide;
    var targetElement = clickedElement;
    if (swiper.currentBreakpoint < 1024) {
        swiper.slides.forEach(element => {
            if (element.children.length > 0) {
                if (element.classList.contains('swiper-slide-prev') || element.classList.contains('swiper-slide-next')) {
                    element.children[1].classList.add('hidden-element');
                }   
            }
        });
    }
});


/*
    CORREÇÕES NECESSÁRIAS:

    -> Quando há a transição de um 'small device' para outra dimensão de tamanho,
    no carrosel, caso tenha sido clicado ou rolado automaticamente o
    carrosel, o elemento de detalhe '.swiper-explainable' permanece visível.

    -> Reduzir a repetição de códigos similares
*/