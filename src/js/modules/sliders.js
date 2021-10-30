function sliders() {
    //slider and carusel constants

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;
    //add dots
    slider.style.position = 'relative';

    const dots = document.createElement('ol');
    const dotsArray = [];
    dots.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`;
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .4;
        transition: opacity .6s ease;
`;
        dots.append(dot);

        if (i == 0) {
            dot.style.opacity = '1';
        }
        dotsArray.push(dot);
    };

    dotsArray.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            console.log(slideTo);
            slideIndex = slideTo;
            offset = parseInt(width, 10) * (slideTo - 1);

            slideTranslate();
            slideText();
            dotsOpacity();

        })
    })

    //carusel

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';


    slides.forEach(slide => {
        slide.style.width = width;
    });

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
        total.textContent = slides.length;
    }


    next.addEventListener('click', () => {
        if (offset == parseInt(width, 10) * (slides.length - 1)) {
            offset = 0;
        } else {
            console.log(parseInt(width, 10) * (slides.length));
            offset += parseInt(width, 10);
        }
        slideTranslate();

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        slideText();
        dotsOpacity();

    });

    prev.addEventListener('click', () => {

        if (offset == 0) {
            offset = parseInt(width, 10) * (slides.length - 1);
        } else {
            offset -= parseInt(width, 10);
        }

        slideTranslate();
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        slideText();
        dotsOpacity();
    })



    function dotsOpacity() {
        dotsArray.forEach(dot => dot.style.opacity = '.5');
        dotsArray[slideIndex - 1].style.opacity = 1;
    }

    function slideText() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function slideTranslate() {
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    //simple slider

    /* 

    showSlids(slideIndex);

    if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    } else {
    total.textContent = slides.length;
    }

    function showSlids(n) {
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    slides.forEach(item => {
        item.style.display = "none";
    });

        slides[slideIndex - 1].style.display = 'block';

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
    }

    function plussSlides(n) {
    showSlids(slideIndex += n);
    }
    prev.addEventListener('click', () => {
    plussSlides(-1);
    })
    next.addEventListener('click', () => {
    plussSlides(1);
    })
    */
}
module.exports = sliders;