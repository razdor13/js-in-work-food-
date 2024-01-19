const { data } = require("autoprefixer");

document.addEventListener("DOMContentLoaded", () => {
    //виконає увесь код коли dom дерево буде завантажено
    const tabs = document.querySelectorAll(".tabheader__item"); //массив табів
    const tabsContent = document.querySelectorAll(".tabcontent"); //массив контенту для кожного з табів
    const tabsPerent = document.querySelector(".tabheader__items"); // об'єкт елементу dom

    function hideTabContent() {
        tabsContent.forEach((item) => {
            // за допомогою forEach переберає массив ,
            // item.style.display = "none"; // додає кожному з них стиль інлаїн
            item.classList.add("hide"); // додає стилі або прибирає
            item.classList.remove("show", "fade"); // додає стилі або прибирає
        });
        tabs.forEach((item) => {
            item.classList.remove("tabheader__item_active"); // прибирає клас активності на табі у всіх елементів
        });
    }

    function showTabContent(i = 0) {
        // i = 0 це значить що без аргумента по замовченню буде обраний перший індекс (нульовий)
        tabsContent[i].classList.add("fade", "show"); //додає стилі активності типу block замість nono а також анімамацію.
        tabsContent[i].classList.remove("hide"); //додає прибирає display nono
        tabs[i].classList.add("tabheader__item_active"); //ставить клас активності на таб за його індексом
    }

    hideTabContent();

    showTabContent();

    tabsPerent.addEventListener("click", (event) => {
        //функція події використовує техніку делігування , коли відслідковування починається з батьківського елементу
        const target = event.target; //створено змінну з таргетом щоб було зручніше , може ми його будемо використовувати доволі часто

        if (target && target.classList.contains("tabheader__item")) {
            //перевірка таргет це гугл рекомендація котру вони рекомендують перевіряти так як не всі теги мають івен таргет (br)
            //далі йде перевірка на те що таргет має селектор а саме класс tabheader__item за допомогою контеинс (треба почитати про інклюд воно схоже)
            tabs.forEach((item, i) => {
                // далі йде перелік табів і він хопає потрібний таргет за допомогою індекса , знову все приховує
                if (target == item) {
                    // і далі за допомогою showTabContent(i) активує там саме той що ми клікнули бо він перевіряє його target == item
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    const deadline = "2024-06-11";

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(".timer", deadline);

    //modal
    const modalTrigger = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal");
        

    modalTrigger.forEach((btn) => {
        btn.addEventListener("click", openModal);
    });

    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    function openModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        // clearInterval(modalTimerId);
    }

    
    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });

    // const modalTimerId = setTimeout(openModal, 3000);

    function showModalByScroll() {
        if (
            window.scrollY + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight - 1
        ) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }
    window.addEventListener("scroll", showModalByScroll);
    // use class for card
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement("div");

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach((className) =>
                    element.classList.add(className)
                );
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }
    //modal form
    const forms = document.querySelectorAll("form");
    const message = {
        loading: "img/form/spinner.svg",
        succes: "Дякую!Найближчим часом ми зателефонуємо вам",
        fail: "Щось не так ...",
    };
    forms.forEach((item) => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
    
        return await res.json();
    };

    async function getResource(url) {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.DateforEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            });
        });
    
    
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add("menu__item");

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector(".menu .container").append(element);
    //     });
    // }




    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement("afterend", statusMessage);

            const formData = new FormData(form);

            
    
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.succes);
                statusMessage.remove();
            })
            .catch(()=> {
                showThanksModal(message.fail); 
            })
            .finally(()=> {
                form.reset();
            })
        });
    }
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");

        prevModalDialog.classList.add("hide");
        openModal();
        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
                 
                 <div class="modal__close" data-close>×</div>
                 <div class="modal__title">${message}</div>
                 
            </div>
        `;
        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            closeModal();
        }, 4000);
    }
    // slider 

    let offset = 0;
	let slideIndex = 1;

	const slides = document.querySelectorAll(".offer__slide"),
		prev = document.querySelector(".offer__slider-prev"),
		next = document.querySelector(".offer__slider-next"),
		total = document.querySelector("#total"),
		current = document.querySelector("#current"),
		slidesWrapper = document.querySelector(".offer__slider-wrapper"),
		width = window.getComputedStyle(slidesWrapper).width,
		slidesField = document.querySelector(".offer__slider-inner");

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	slidesField.style.width = 100 * slides.length + "%";
	slidesField.style.display = "flex";
	slidesField.style.transition = "0.5s all";

	slidesWrapper.style.overflow = "hidden";

	slides.forEach((slide) => {
		slide.style.width = width;
	});

	next.addEventListener("click", () => {
		if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += +width.slice(0, width.length - 2);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	});

	prev.addEventListener("click", () => {
		if (offset == 0) {
			offset = +width.slice(0, width.length - 2) * (slides.length - 1);
		} else {
			offset -= +width.slice(0, width.length - 2);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	});

    /*showSlides(slideIndex)

    if(slides.length <10) {
        total.textContent = `0${slides.length}`
    }
    else
    {
        total.textContent = slides.length
    }



    function showSlides (n) {
        if (n>slides.length) {
            slideIndex = 1;
        }
        if (n<1) {
            slideIndex = slides.length
        }

        slides.forEach((item)=> {
            item.style.display = 'none'
        })

        slides[slideIndex - 1].style.display = ''


        if(slides.length <10) {
            current.textContent = `0${slideIndex}`
        }
        else
        {
            current.textContent = slideIndex.length
        }
    }
    function plusSlides(n) {
        showSlides(slideIndex += n)

    }

    prev.addEventListener('click',()=>{
        plusSlides(-1)
    })
    next.addEventListener('click',()=>{
        plusSlides(1)
    })*/

});
