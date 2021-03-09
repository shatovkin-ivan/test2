const swiper = new Swiper('.reviews-slider', {
    
    direction: 'horizontal',
    loop: true,
  
    pagination: {
      el: '.swiper-pagination',
    },
    breakpoints: {
        769: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        320: {
          slidesPerView: 1
    },
}
});

if (window.innerWidth <= 768) {
    const swiper = new Swiper('.about-slider', {
        slidesPerView: 1,
        direction: 'horizontal',
        loop: false,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,

    });
}
window.addEventListener('DOMContentLoaded', () => {
    let body = document.querySelector('body'),
    video = document.querySelector('.intro__video'),
    header = document.querySelector('.header'),
    overlay = document.querySelector('.overlay')
    introHeight = video.clientHeight - header.clientHeight;
    document.querySelector('.intro').style.height = introHeight + 'px';

    let showMapBtn = document.querySelector('.show-map'),
        callback = document.querySelector('.callback'),
        input = document.querySelectorAll('.input');
        
    showMapBtn.addEventListener('click', (e) => {
        e.preventDefault();
        input.forEach(inputItem => {
            console.log(inputItem.value);
            if (inputItem.value != '') {
                callback.classList.toggle('active');
                if (callback.classList.contains('active')) {
                    showMapBtn.innerHTML = "Скрыть карту";
                }
                else {
                    showMapBtn.innerHTML = "Показать карту";
                }
            }
            else {
                inputItem.classList.add('error');
            }
        })
        
    })

    let menu = document.querySelector('.menu-mobile'),
        close = document.querySelector('.close-mobile');
        
        menu.addEventListener('click', () => {
            console.log(header);
            header.classList.add('active');
            overlay.classList.add('active');
        })
        overlay.addEventListener('click', () => {
            overlay.classList.remove('active');
            header.classList.remove('active');
        })
        close.addEventListener('click', () => {
            overlay.classList.remove('active');
            header.classList.remove('active');
        })

    
    let dropTrigger = document.querySelectorAll('.answers__item');
    document.querySelector('.answers__item').classList.add('active');
    dropTrigger.forEach(dropItem => {
        dropItem.addEventListener('click', () => {
            dropItem.classList.toggle('active');
        })
    })


    let anchors = document.querySelectorAll('a[href*="#"]');
    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            let blockID = anchor.getAttribute('href').substr(1);
            document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
            })
        })
    }
    
})