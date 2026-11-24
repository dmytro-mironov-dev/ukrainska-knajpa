/* Ukraińska Knajpa — shared content + i18n logic (UA / PL / EN).
   A page can define window.KNAJPA = { i18n:{uk:{},pl:{},en:{}}, card(dish, t, lang, index) }
   before loading this file to override texts or the dish-card markup. */
(function () {
  "use strict";

  var T = {
    uk: {
      navHome: "Головна", navMenu: "Меню", navAbout: "Про нас", navVisit: "Контакти",
      reserve: "Забронювати", eyebrow: "Смак України у Вроцлаві",
      heroTitle: "Тут смакує<br>по-домашньому.",
      heroText: "Борщ, вареники, бограч і щира українська гостинність — у самому серці Вроцлава. Заходьте на обід, залишайтеся заради атмосфери.",
      menuCta: "Дивитися меню", storyCta: "Наша історія",
      heroNote: "Тепло, щедро і з любов’ю до традицій",
      stamp: "З любов’ю<br>з України",
      menuEyebrow: "Те, за чим повертаються", menuTitle: "Хіти української кухні",
      menuIntro: "Знайомі з дитинства смаки, щедрі порції та рецепти, які хочеться передати далі.",
      all: "Усе", soups: "Супи", mains: "Основні страви", sides: "До столу",
      moreTitle: "А ще в меню", moreNote: "Повне меню з цінами — у закладі.",
      aboutEyebrow: "Трохи України — у серці Вроцлава", aboutTitle: "Готуємо так, як для своїх.",
      aboutText: "Ukraińska Knajpa — місце, де можна видихнути, зустріти друзів і відчути смак дому. Ми зібрали улюблені страви української кухні й подаємо їх із тією самою щедрістю, з якою українці зустрічають гостей.",
      storyBadge: "Бо найкращі розмови починаються за спільним столом.",
      value1: "Знайомі рецепти", value2: "Щира гостинність", value3: "Український характер",
      visitEyebrow: "Завітайте до нас", visitTitle: "Чекаємо на вас у Вроцлаві",
      visitText: "Приходьте на сімейний обід, вечерю з друзями або просто на тарілку гарячого борщу.",
      addressLabel: "Адреса", phoneLabel: "Телефон", bookingLabel: "Бронювання",
      bookingText: "Зателефонуйте нам", welcomeLabel: "Гостям", welcomeText: "Завжди раді!",
      callCta: "Зателефонувати", mapCta: "Відкрити мапу",
      footerLine: "Українська кухня · Вроцлав · Kotlarska 40",
      popular: "Улюблене гостей", classic: "Класика", house: "Фірмова страва", share: "До спільного столу",
      ask: "Запитайте про наявність", openMenu: "Меню"
    },
    pl: {
      navHome: "Start", navMenu: "Menu", navAbout: "O nas", navVisit: "Kontakt",
      reserve: "Zarezerwuj", eyebrow: "Smak Ukrainy we Wrocławiu",
      heroTitle: "Smakuje jak<br>w rodzinnym domu.",
      heroText: "Barszcz, pierogi, bogracz i prawdziwa ukraińska gościnność — w samym sercu Wrocławia. Wpadnij na obiad, zostań dla atmosfery.",
      menuCta: "Zobacz menu", storyCta: "Nasza historia",
      heroNote: "Ciepło, hojnie i z miłością do tradycji",
      stamp: "Z miłością<br>z Ukrainy",
      menuEyebrow: "Po to wracają nasi goście", menuTitle: "Przeboje kuchni ukraińskiej",
      menuIntro: "Smaki znane od dzieciństwa, solidne porcje i przepisy, którymi warto się dzielić.",
      all: "Wszystko", soups: "Zupy", mains: "Dania główne", sides: "Do stołu",
      moreTitle: "A w karcie także", moreNote: "Pełne menu z cenami — na miejscu.",
      aboutEyebrow: "Kawałek Ukrainy w sercu Wrocławia", aboutTitle: "Gotujemy jak dla swoich.",
      aboutText: "Ukraińska Knajpa to miejsce, w którym można złapać oddech, spotkać przyjaciół i poczuć smak domu. Zebraliśmy ulubione dania kuchni ukraińskiej i podajemy je z taką hojnością, z jaką Ukraińcy witają gości.",
      storyBadge: "Bo najlepsze rozmowy zaczynają się przy wspólnym stole.",
      value1: "Znane przepisy", value2: "Szczera gościnność", value3: "Ukraiński charakter",
      visitEyebrow: "Odwiedź nas", visitTitle: "Czekamy na Ciebie we Wrocławiu",
      visitText: "Wpadnij na rodzinny obiad, kolację ze znajomymi albo po prostu na talerz gorącego barszczu.",
      addressLabel: "Adres", phoneLabel: "Telefon", bookingLabel: "Rezerwacja",
      bookingText: "Zadzwoń do nas", welcomeLabel: "Goście", welcomeText: "Zawsze mile widziani!",
      callCta: "Zadzwoń", mapCta: "Otwórz mapę",
      footerLine: "Kuchnia ukraińska · Wrocław · Kotlarska 40",
      popular: "Hit gości", classic: "Klasyka", house: "Specjalność domu", share: "Do wspólnego stołu",
      ask: "Zapytaj o dostępność", openMenu: "Menu"
    },
    en: {
      navHome: "Home", navMenu: "Menu", navAbout: "About", navVisit: "Contact",
      reserve: "Book a table", eyebrow: "A taste of Ukraine in Wrocław",
      heroTitle: "Comfort food<br>with a Ukrainian soul.",
      heroText: "Borscht, varenyky, bograch and genuine Ukrainian hospitality — right in the heart of Wrocław. Come for lunch, stay for the atmosphere.",
      menuCta: "See the menu", storyCta: "Our story",
      heroNote: "Warm, generous and made with love for tradition",
      stamp: "Made with<br>love in Ukraine",
      menuEyebrow: "The dishes you come back for", menuTitle: "Ukrainian kitchen favourites",
      menuIntro: "Childhood flavours, generous portions and recipes worth passing on.",
      all: "All", soups: "Soups", mains: "Mains", sides: "To share",
      moreTitle: "Also on the menu", moreNote: "Full menu with prices available in the restaurant.",
      aboutEyebrow: "A little Ukraine in the heart of Wrocław", aboutTitle: "We cook as if you were family.",
      aboutText: "Ukraińska Knajpa is a place to slow down, meet friends and feel a taste of home. We bring together much-loved Ukrainian dishes and serve them with the same generosity with which Ukrainians welcome their guests.",
      storyBadge: "Because the best conversations happen around a shared table.",
      value1: "Beloved recipes", value2: "Heartfelt hospitality", value3: "Ukrainian spirit",
      visitEyebrow: "Come and see us", visitTitle: "We’re waiting for you in Wrocław",
      visitText: "Join us for a family lunch, dinner with friends or simply a bowl of hot borscht.",
      addressLabel: "Address", phoneLabel: "Phone", bookingLabel: "Reservations",
      bookingText: "Give us a call", welcomeLabel: "Guests", welcomeText: "Always welcome!",
      callCta: "Call us", mapCta: "Open map",
      footerLine: "Ukrainian cuisine · Wrocław · Kotlarska 40",
      popular: "Guest favourite", classic: "Classic", house: "House special", share: "For the table",
      ask: "Ask about availability", openMenu: "Menu"
    }
  };

  var DISHES = [
    { id: "borsch", cat: "soups", img: "assets/borsch.jpg", badge: "popular",
      tag: { uk: "Хіт гостей", pl: "Hit gości", en: "Guest favourite" },
      name: { uk: "Український борщ", pl: "Barszcz ukraiński", en: "Ukrainian borscht" },
      desc: { uk: "Насичений борщ на свинині зі сметаною, подаємо з часниковими пампушками.", pl: "Aromatyczny barszcz na wieprzowinie ze śmietaną, podawany z czosnkowymi pampuszkami.", en: "Rich beetroot soup cooked on pork, with sour cream and garlic pampushky on the side." } },
    { id: "varenyky", cat: "mains", img: "assets/varenyky.jpg", badge: "classic",
      tag: { uk: "Традиція", pl: "Tradycja", en: "Tradition" },
      name: { uk: "Вареники", pl: "Pierogi ukraińskie", en: "Varenyky" },
      desc: { uk: "З картоплею, грибами, капустою, сиром чи печінкою. Зі шкварками або маслом.", pl: "Z ziemniakami, grzybami, kapustą, twarogiem lub wątróbką. Ze skwarkami lub masłem.", en: "Filled with potato, mushrooms, cabbage, cheese or liver. Served with crackling or butter." } },
    { id: "bograch", cat: "soups", img: "assets/bograch.jpg", badge: "house",
      tag: { uk: "По-закарпатськи", pl: "Po karpacku", en: "Carpathian style" },
      name: { uk: "Бограч", pl: "Bogracz karpacki", en: "Carpathian bograch" },
      desc: { uk: "Густий гостренький гуляш із трьох видів м’яса — реберця, свинина, яловичина.", pl: "Gęsty, pikantny gulasz z trzech rodzajów mięsa — żeberka, wieprzowina, wołowina.", en: "A thick, spicy stew of three meats — ribs, pork and beef. Warming from the first spoon." } },
    { id: "deruny", cat: "mains", img: "assets/deruny.jpg", badge: "popular",
      tag: { uk: "Золотисті", pl: "Chrupiące", en: "Golden & crispy" },
      name: { uk: "Деруни", pl: "Deruny", en: "Deruny" },
      desc: { uk: "Картопляні деруни — хрусткі зовні, ніжні всередині. Найкраще зі сметаною.", pl: "Placki ziemniaczane — chrupiące z zewnątrz, miękkie w środku. Najlepsze ze śmietaną.", en: "Potato pancakes — crisp outside, soft inside. Best with a spoon of sour cream." } },
    { id: "holubtsi", cat: "mains", img: "assets/holubtsi.jpg", badge: "classic",
      tag: { uk: "По-домашньому", pl: "Domowe", en: "Homemade" },
      name: { uk: "Голубці", pl: "Gołąbki", en: "Holubtsi" },
      desc: { uk: "Капустяні голубці з ніжною начинкою, тушковані в томатному соусі.", pl: "Gołąbki z delikatnym farszem, duszone w sosie pomidorowym.", en: "Cabbage rolls with a tender filling, slowly braised in tomato sauce." } },
    { id: "pampushky", cat: "sides", img: "assets/hero-table.jpg", badge: "share",
      tag: { uk: "До борщу", pl: "Do barszczu", en: "With borscht" },
      name: { uk: "Часникові пампушки", pl: "Pampuszki czosnkowe", en: "Garlic pampushky" },
      desc: { uk: "М’які булочки з часником і зеленню. Ідеальна пара до борщу.", pl: "Miękkie bułeczki z czosnkiem i ziołami. Idealne do barszczu.", en: "Soft little buns brushed with garlic and herbs. Borscht’s best friend." } }
  ];

  var MORE = {
    uk: ["Козацька дошка", "Реберця в медово-гірчичному соусі", "Грибна юшка", "Домашній бульйон", "Сало трьох видів", "Оселедець з картоплею", "Холодець", "Вінегрет", "Салат «Шуба»"],
    pl: ["Deska kozacka", "Żeberka w sosie miodowo-musztardowym", "Zupa grzybowa", "Rosół domowy", "Słonina trzech rodzajów", "Śledź z ziemniakami", "Galareta z kurczaka", "Winegret", "Sałatka śledziowa"],
    en: ["Cossack sharing board", "Ribs in honey-mustard sauce", "Mushroom soup", "Homemade broth", "Three kinds of salo", "Herring with potatoes", "Chicken aspic", "Vinegret salad", "Herring salad"]
  };

  var cfg = window.KNAJPA || {};
  if (cfg.i18n) {
    Object.keys(cfg.i18n).forEach(function (l) {
      Object.keys(cfg.i18n[l]).forEach(function (k) { T[l][k] = cfg.i18n[l][k]; });
    });
  }

  function defaultCard(d, t, l) {
    return '<div class="dish-img"><img loading="lazy" src="' + d.img + '" alt="' + d.name[l] + '"><span class="dish-tag">' + d.tag[l] + '</span></div>' +
      '<div class="dish-body"><h3>' + d.name[l] + '</h3><p>' + d.desc[l] + '</p>' +
      '<div class="dish-foot"><span>' + t[d.badge] + '</span><small>' + t.ask + '</small></div></div>';
  }
  var card = cfg.card || defaultCard;

  var lang = "uk", filter = "all";
  try { var saved = localStorage.getItem("knajpa-lang"); if (T[saved]) lang = saved; } catch (e) {}

  function renderMenu() {
    var grid = document.getElementById("menuGrid");
    if (grid) {
      grid.innerHTML = "";
      DISHES.filter(function (d) { return filter === "all" || d.cat === filter; }).forEach(function (d, i) {
        var el = document.createElement("article");
        el.className = "dish";
        el.innerHTML = card(d, T[lang], lang, i);
        grid.appendChild(el);
      });
    }
    var more = document.getElementById("moreList");
    if (more) more.innerHTML = MORE[lang].map(function (x) { return "<li>" + x + "</li>"; }).join("");
  }

  function setLang(l) {
    lang = l;
    try { localStorage.setItem("knajpa-lang", l); } catch (e) {}
    document.documentElement.lang = l === "uk" ? "uk" : l;
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      var on = b.dataset.lang === l;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = T[l][el.dataset.i18n];
      if (v) el.innerHTML = v;
    });
    renderMenu();
  }

  document.querySelectorAll("[data-lang]").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.lang); });
  });
  document.querySelectorAll("[data-filter]").forEach(function (b) {
    b.addEventListener("click", function () {
      filter = b.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach(function (x) { x.classList.toggle("active", x === b); });
      renderMenu();
    });
  });
  var toggle = document.getElementById("mobileToggle"), nav = document.getElementById("navlinks");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); });
    });
  }
  var header = document.querySelector("header");
  if (header) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 10); };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  setLang(lang);
})();
