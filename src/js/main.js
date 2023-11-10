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
});
