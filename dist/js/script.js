/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
document.addEventListener("DOMContentLoaded", () => {
  //виконає увесь код коли dom дерево буде завантажено
  const tabs = document.querySelectorAll(".tabheader__item"); //массив табів
  const tabsContent = document.querySelectorAll(".tabcontent"); //массив контенту для кожного з табів
  const tabsPerent = document.querySelector(".tabheader__items"); // об'єкт елементу dom

  function hideTabContent() {
    tabsContent.forEach(item => {
      // за допомогою forEach переберає массив ,
      // item.style.display = "none"; // додає кожному з них стиль інлаїн
      item.classList.add("hide"); // додає стилі або прибирає
      item.classList.remove("show", "fade"); // додає стилі або прибирає
    });

    tabs.forEach(item => {
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
  tabsPerent.addEventListener("click", event => {
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
      seconds = Math.floor(t / 1000 % 60),
      minutes = Math.floor(t / 1000 / 60 % 60),
      hours = Math.floor(t / (1000 * 60 * 60) % 24);
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
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
  modalTrigger.forEach(btn => {
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

  modal.addEventListener("click", e => {
    if (e.target === modal || e.target.getAttribute('data-close') === '') {
      closeModal();
    }
  });
  document.addEventListener("keydown", e => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  // const modalTimerId = setTimeout(openModal, 3000);

  function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
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
        this.classes.forEach(className => element.classList.add(className));
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
  new MenuCard("img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 9, ".menu .container").render();
  new MenuCard("img/tabs/post.jpg", "post", 'Меню "Постное"', "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.", 14, ".menu .container").render();
  new MenuCard("img/tabs/elite.jpg", "elite", "Меню “Премиум”", "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!", 21, ".menu .container").render();
  //modal form
  const forms = document.querySelectorAll("form");
  const message = {
    loading: "img/form/spinner.svg",
    succes: "Дякую!Найближчим часом ми зателефонуємо вам",
    fail: "Щось не так ..."
  };
  forms.forEach(item => {
    postData(item);
  });
  function postData(form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      /* //відправка форми у форматі об'єкта
      const statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      statusMessage.textContent = message.loading;
      form.append(statusMessage);
      const request = new XMLHttpRequest();
      request.open("POST", "server.php");
        const formData = new FormData(form);
      request.send(formData);
      request.addEventListener("load", () => {
          if (request.status === 200) {
              console.log(request.response);
              statusMessage.textContent = message.succes;
              form.reset();
              setTimeout(() => {
                  statusMessage.remove();
              }, 2000);
          } else {
              statusMessage.textContent = message.fail;
          }
      });*/

      /* відправка у форматі json */
      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
      form.insertAdjacentElement('afterend', statusMessage);
      const request = new XMLHttpRequest();
      request.open("POST", "server.php");
      request.setRequestHeader("Content-type", "application/json");
      const formData = new FormData(form);
      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      const json = JSON.stringify(object);
      request.send(json);
      request.addEventListener("load", () => {
        if (request.status === 200) {
          console.log(request.response);
          showThanksModal(message.succes);
          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        } else {
          showThanksModal(message.fail);
        }
      });
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
});
/******/ })()
;
//# sourceMappingURL=script.js.map