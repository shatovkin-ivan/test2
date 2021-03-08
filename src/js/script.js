const swiper = new Swiper('.reviews-slider', {
    slidesPerView: 3,
    direction: 'horizontal',
    loop: true,
    spaceBetween: 30,
  
    pagination: {
      el: '.swiper-pagination',
    },
});

if (window.innerWidth <= 768) {
    const swiper = new Swiper('.about-slider', {
        slidesPerView: 1,
        direction: 'horizontal',
        loop: true,
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
        callback = document.querySelector('.callback');
    showMapBtn.addEventListener('click', (e) => {
        e.preventDefault();
        callback.classList.toggle('active');
        if (callback.classList.contains('active')) {
            showMapBtn.innerHTML = "Скрыть карту"
        }
        else {
            showMapBtn.innerHTML = "Показать карту"
        }
    })

    let menu = document.querySelector('.menu-mobile');
        
        menu.addEventListener('click', () => {
            console.log(header);
            header.classList.add('active');
            overlay.classList.add('active');
        })
        overlay.addEventListener('click', () => {
            overlay.classList.remove('active');
            header.classList.remove('active')
        })
    
    let dropTrigger = document.querySelectorAll('.answers__item');
    document.querySelector('.answers__item').classList.add('active');
    dropTrigger.forEach(dropItem => {
        dropItem.addEventListener('click', () => {
            dropItem.classList.toggle('active');
        })
    })
})