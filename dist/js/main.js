"use strickt"
window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(tab => {
            tab.style.display = 'none';
        });
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((tab, i) => {
                if (target == tab) {
                    hideTabContent();
                    showTabContent(i);            
                }
            })
        }
    })
/* 
    const sliderNext = document.querySelector('.offer__slider-next'),
        sliderPrev =  document.querySelector('.offer__slider-prev');

    sliderNext.addEventListener('click', (e) => {
        console.log(e.timeStamp);
    })

 */


    //timer 
    const deadline1 = new Date();

    const deadline = `2021-${deadline1.getMonth()+1}-${deadline1.getDay()+12}`;


    function getTimeRemaining(endtime) {
        const toTime = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(toTime /(1000*60*60*24)),
            hours = Math.floor(toTime /(1000*60*60) % 24),
            minutes = Math.floor((toTime /1000/60)%60),
            seconds = Math.floor((toTime /1000)%60);
            return {
                'total' : toTime,
                'days' : days,
                'hours':hours,
                'minutes' : minutes,
                'seconds': seconds
            }
    }

    function addZero(num) {
        if (num >= 0 && num <10) {
            return `0${num}`;
        } else 
        return num;
    }


    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days =timer.querySelector('#days'),
            hourse =timer.querySelector('#hourse'),
            minutes =timer.querySelector('#minutes'),
            seconds =timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

            updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);
                days.innerHTML = addZero(t.days);
                hours.innerHTML = addZero(t.hours);
                minutes.innerHTML = addZero(t.minutes);
                seconds.innerHTML = addZero(t.seconds);

                if (t.total <= 0) {
                    clearInterval(timeInterval);
                }
        }

    }

    setClock('.timer', deadline);


//modal 

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        openModalId = setTimeout(openModalWindow, 500000);//off

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
        if (e.target === modal || e.target.getAttribute('data-close' ) == '') {
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
        if ((window.pageYOffset +document.documentElement.clientHeight) >= document.documentElement.scrollHeight ) {
            openModalWindow();
            window.removeEventListener('scroll', showModalByScroll);//show just once
        }
    }
    window.addEventListener('scroll', showModalByScroll);
    
    // use classes for add card to site
    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.title = title;
            this.alt= alt;
            this.description =description;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.exchCourse = 26.5;
            this.changeToUan();
        }

        changeToUan() {
            this.price = this.price * this.exchCourse;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));

            }

            element.innerHTML = `
                <img src=${this.src} alt='${this.alt}'>
                <h3 class="menu__item-subtitle">'${this.title}'</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
        this.parent.append(element);
        }
    }


    new MenuCard(
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

        //forms

       const forms = document.querySelectorAll('form'),
            message = {
                loading : 'img/spinner.svg',
                success: 'thanks we will phone you later',
                failure: 'somthing wrong...'
            };
        
        console.log(forms);
        forms.forEach((item)=> {
                postData(item);  
            });


    function postData(form) {
           form.addEventListener('submit', (e) => {
               e.preventDefault();
              
               const statusMessage = document.createElement('img');
               statusMessage.src = message.loading;
               statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
               `;
               form.insertAdjacentElement('afterend', statusMessage);
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000); 
           
             //   const request = new XMLHttpRequest();old method - will use fetch()
              //request.open('POST', 'server.php');
            


            const formData = new FormData(form); 

            const obj = {};

            formData.forEach( (value, key) => {
                obj[key] = value;
            });
            


            fetch('server.php', {
                 method: 'POST',
                 headers: {
                        'Content-type': 'multipart/form-data'
                        },
                 body: JSON.stringify(obj)
             })
             .then(data => data.text())
             .then(data => {
                console.log(data);
                showThanksModal(message.success);
                form.reset();     
                statusMessage.remove();
             }).catch(() => {
                showThanksModal(message.failure);
             }).finally(() => {
                form.reset(); 
            });
        })   
}       
            //JSON form

       

           /*  request.send(json);

               console.log(request.response); */
              /*  request.addEventListener('load', () => {
                   if (request.status === 200) {
                       showThanksModal(message.success);
                        form.reset(); 
                   } else {
                       showThanksModal(message.failure);
                   }
               }); 
           });*/
      


//show modal message 

    function showThanksModal(message){

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
        }

        fetch('db.json')
        .then(data => data.json())
        .then(res => console.log(res));
});