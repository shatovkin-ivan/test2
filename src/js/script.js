window.addEventListener('DOMContentLoaded', () => {
    let video = document.querySelector('.intro__video'),
    header = document.querySelector('.header'),
    introHeight = video.clientHeight - header.clientHeight;
    window.addEventListener('resize', () => {
        document.querySelector('.intro').style.height = introHeight + 'px';
    })
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
})