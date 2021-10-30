function modal() {
    //modal 

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        openModalId = setTimeout(openModalWindow, 500000); //off



    function modalOpen() {
        modalTrigger.forEach((button) => {
            button.addEventListener('click', openModalWindow);
        })
    }

    function closeModalWindow() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    function openModalWindow() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(openModalId);
    }

    modalOpen();


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModalWindow();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display) {
            closeModalWindow();
        }
    })



    //scroll activation 


    function showModalByScroll() {
        //console.log(window.pageYOffset);
        // console.log(document.documentElement.clientHeight);
        // console.log(document.documentElement.scrollHeight);
        if ((window.pageYOffset + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
            openModalWindow();
            window.removeEventListener('scroll', showModalByScroll); //show just once
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    // use classes for add card to site


    /*  axios.get('http://localhost:3000/menu')
             .then(data => {
                 data.data.forEach( ({img, altimg, title, descr, price}) => {
                 new MenuCard(img, altimg, title, descr, price, '.menu .container', "menu__item").render();
             });
         }); */
    /* new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        11,
        '.menu .container',
        "menu__item"
    ).render();//"vizov na meste" -- for using once--or use with constants
        
    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
        17,
        '.menu .container',
        "menu__item"
    ).render();


    new MenuCard(
        "img/tabs/elite.jpg",
        "ellite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        '.menu .container',
    ).render();
 */

    //show modal message 

    function showThanksModal(message) {

        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.style.display = 'none';
        modalOpen();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
                <div class="modal__content">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>

               </div>
                `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.style.display = 'block';
            closeModalWindow();
        }, 4000);
    };

    /*    fetch('db.json')
        .then(data => data.json())
        .then(res => console.log(res));
 */

}

module.exports = modal;