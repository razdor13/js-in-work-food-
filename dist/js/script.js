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
    modal = document.querySelector(".modal"),
    modalCloseBtn = document.querySelector("[data-close]");
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
    clearInterval(modalTimerId);
  }
  modalCloseBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => {
    if (e.target === modal) {
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
});
/******/ })()
;
//# sourceMappingURL=script.js.map