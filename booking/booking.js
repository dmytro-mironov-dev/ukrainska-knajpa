/* Ukraińska Knajpa — demo table booking popup (UA / PL / EN).
   Demo only: nothing is sent to a server. Requests and admin settings live in
   this browser's localStorage so the demo admin page (/admin-demo/) can show them. */
(function () {
  "use strict";

  var ADMIN_KEY = "knajpa-demo-admin";
  var BOOKINGS_KEY = "knajpa-demo-bookings";

  var TABLES = [
    { id: "H1", zone: "hall", seats: 2, shape: "rect", x: 200, y: 62, w: 52, h: 32, chairs: "lr" },
    { id: "H2", zone: "hall", seats: 2, shape: "rect", x: 340, y: 110, w: 46, h: 38, chairs: "tb" },
    { id: "H3", zone: "hall", seats: 2, shape: "rect", x: 340, y: 196, w: 46, h: 38, chairs: "tb" },
    { id: "H4", zone: "hall", seats: 3, shape: "round", x: 300, y: 262, r: 23 },
    { id: "H5", zone: "hall", seats: 4, shape: "rect", x: 92, y: 250, w: 64, h: 40, chairs: "tb2" },
    { id: "T1", zone: "terrace", seats: 2, shape: "round", x: 90, y: 92, r: 18 },
    { id: "T2", zone: "terrace", seats: 2, shape: "round", x: 200, y: 92, r: 18 },
    { id: "T3", zone: "terrace", seats: 4, shape: "rect", x: 110, y: 214, w: 64, h: 40, chairs: "tb2" },
    { id: "T4", zone: "terrace", seats: 4, shape: "rect", x: 290, y: 200, w: 64, h: 40, chairs: "tb2" }
  ];

  var I18N = {
    uk: {
      title: "Бронювання столика", sub: "Оберіть дату, час і столик на схемі — ми зателефонуємо, щоб підтвердити.",
      date: "Дата", time: "Час", guests: "Гостей", hall: "Зал", terrace: "Літній майданчик",
      seats: "місць", seats1: "місця", free: "Вільний", chosen: "Обраний", taken: "Зайнятий", small: "Замалий",
      closed: "Літній майданчик зараз закритий. Відкриємо в теплий сезон ☀️",
      pick: "Оберіть вільний столик на схемі", table: "Столик", name: "Ім’я", phone: "Телефон", comment: "Коментар (необов’язково)",
      commentPh: "Дитячий стілець, день народження…", submit: "Надіслати заявку", close: "Закрити",
      entrance: "Вхід", bar: "Бар", kitchen: "Кухня", street: "вулиця Kotlarska",
      okTitle: "Дякуємо! Заявку надіслано", okText: "Ми зателефонуємо найближчим часом, щоб підтвердити бронювання.",
      done: "Готово", demo: "Демо-версія: заявка зберігається лише у вашому браузері.", summary: "{d}, {t} · {g} гост. · столик {n}"
    },
    pl: {
      title: "Rezerwacja stolika", sub: "Wybierz datę, godzinę i stolik na planie — zadzwonimy, aby potwierdzić.",
      date: "Data", time: "Godzina", guests: "Gości", hall: "Sala", terrace: "Ogródek letni",
      seats: "miejsc", seats1: "miejsca", free: "Wolny", chosen: "Wybrany", taken: "Zajęty", small: "Za mały",
      closed: "Ogródek letni jest teraz zamknięty. Otworzymy go w ciepłym sezonie ☀️",
      pick: "Wybierz wolny stolik na planie", table: "Stolik", name: "Imię", phone: "Telefon", comment: "Komentarz (opcjonalnie)",
      commentPh: "Krzesełko dla dziecka, urodziny…", submit: "Wyślij zgłoszenie", close: "Zamknij",
      entrance: "Wejście", bar: "Bar", kitchen: "Kuchnia", street: "ulica Kotlarska",
      okTitle: "Dziękujemy! Zgłoszenie wysłane", okText: "Wkrótce zadzwonimy, aby potwierdzić rezerwację.",
      done: "Gotowe", demo: "Wersja demo: zgłoszenie zapisuje się tylko w Twojej przeglądarce.", summary: "{d}, {t} · {g} os. · stolik {n}"
    },
    en: {
      title: "Book a table", sub: "Pick a date, time and table on the plan — we’ll call you to confirm.",
      date: "Date", time: "Time", guests: "Guests", hall: "Dining room", terrace: "Summer terrace",
      seats: "seats", seats1: "seats", free: "Free", chosen: "Selected", taken: "Taken", small: "Too small",
      closed: "The summer terrace is closed right now. It opens in the warm season ☀️",
      pick: "Pick a free table on the plan", table: "Table", name: "Name", phone: "Phone", comment: "Comment (optional)",
      commentPh: "High chair, birthday…", submit: "Send request", close: "Close",
      entrance: "Entrance", bar: "Bar", kitchen: "Kitchen", street: "Kotlarska street",
      okTitle: "Thank you! Request sent", okText: "We’ll call you shortly to confirm your booking.",
      done: "Done", demo: "Demo version: the request is stored only in your browser.", summary: "{d}, {t} · {g} guests · table {n}"
    }
  };

  function lang() {
    var l = (document.documentElement.lang || "uk").slice(0, 2);
    return I18N[l] ? l : "uk";
  }
  function T(k) { return I18N[lang()][k]; }

  function load(key, def) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v == null ? def : v; } catch (e) { return def; }
  }
  function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }
  function admin() {
    var a = load(ADMIN_KEY, {});
    return { terraceOpen: a.terraceOpen !== false, off: a.off || {} };
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function today() { var d = new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) | 0; } return Math.abs(h); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  var state = { date: today(), time: "18:00", guests: 2, zone: "hall", table: null, name: "", phone: "", comment: "", sent: false };
  var root, lastFocus;

  function tableStatus(t) {
    var a = admin();
    if (t.zone === "terrace" && !a.terraceOpen) return "off";
    if (a.off[t.id]) return "off";
    if (hash(state.date + state.time + t.id) % 5 === 0) return "taken";
    if (t.seats < state.guests) return "small";
    if (state.table === t.id) return "sel";
    return "free";
  }

  function chairs(t) {
    var c = [], r = 7;
    if (t.shape === "round") {
      for (var i = 0; i < t.seats; i++) {
        var a = (-90 + i * 360 / t.seats) * Math.PI / 180, d = t.r + 11;
        c.push([t.x + Math.cos(a) * d, t.y + Math.sin(a) * d]);
      }
    } else if (t.chairs === "lr") {
      c.push([t.x - t.w / 2 - 11, t.y], [t.x + t.w / 2 + 11, t.y]);
    } else if (t.chairs === "tb") {
      c.push([t.x, t.y - t.h / 2 - 11], [t.x, t.y + t.h / 2 + 11]);
    } else {
      c.push([t.x - 15, t.y - t.h / 2 - 11], [t.x + 15, t.y - t.h / 2 - 11], [t.x - 15, t.y + t.h / 2 + 11], [t.x + 15, t.y + t.h / 2 + 11]);
    }
    return c.map(function (p) { return '<circle class="bk-chair" cx="' + p[0] + '" cy="' + p[1] + '" r="' + r + '"/>'; }).join("");
  }

  function tableSvg(t) {
    var st = tableStatus(t), clickable = st === "free" || st === "sel";
    var body = t.shape === "round"
      ? '<circle class="bk-top" cx="' + t.x + '" cy="' + t.y + '" r="' + t.r + '"/>'
      : '<rect class="bk-top" x="' + (t.x - t.w / 2) + '" y="' + (t.y - t.h / 2) + '" width="' + t.w + '" height="' + t.h + '" rx="6"/>';
    var label = st === "sel" ? T("chosen") : st === "taken" ? T("taken") : st === "small" ? T("small") : st === "off" ? "—" : T("free");
    return '<g class="bk-t bk-' + st + '" data-id="' + t.id + '"' + (clickable ? ' tabindex="0" role="button"' : ' aria-disabled="true"') +
      ' aria-label="' + T("table") + ' ' + t.id + ', ' + t.seats + ' ' + T("seats") + ', ' + label + '">' +
      chairs(t) + body +
      '<text class="bk-tid" x="' + t.x + '" y="' + (t.y - 1) + '">' + t.id + '</text>' +
      '<text class="bk-ts" x="' + t.x + '" y="' + (t.y + 11) + '">' + t.seats + ' ' + (t.seats < 5 && lang() !== "en" ? T("seats1") : T("seats")) + '</text></g>';
  }

  function planSvg() {
    var zone = state.zone, out = '<svg class="bk-plan" viewBox="0 0 420 310" role="group" aria-label="' + T(zone) + '">';
    if (zone === "hall") {
      out += '<rect class="bk-room" x="8" y="8" width="404" height="294" rx="14"/>' +
        '<rect class="bk-fixed" x="22" y="22" width="110" height="40" rx="8"/><text class="bk-lbl" x="77" y="47">' + T("bar") + '</text>' +
        '<rect class="bk-fixed" x="22" y="74" width="40" height="110" rx="8"/><text class="bk-lbl" x="42" y="133" transform="rotate(-90 42 129)">' + T("kitchen") + '</text>' +
        '<path class="bk-door" d="M180 302h60"/><text class="bk-lbl bk-in" x="210" y="292">↑ ' + T("entrance") + '</text>';
    } else {
      out += '<rect class="bk-room bk-terr" x="8" y="8" width="404" height="294" rx="14"/>' +
        '<g class="bk-plant"><circle cx="30" cy="30" r="12"/><circle cx="390" cy="30" r="12"/><circle cx="30" cy="280" r="12"/><circle cx="390" cy="280" r="12"/></g>' +
        '<text class="bk-lbl" x="320" y="70">☀</text>' +
        '<path class="bk-door" d="M8 150v40"/><text class="bk-lbl bk-in" x="24" y="174" style="text-anchor:start">← ' + T("hall") + '</text>' +
        '<text class="bk-lbl bk-street" x="210" y="296">' + T("street") + '</text>';
    }
    TABLES.filter(function (t) { return t.zone === zone; }).forEach(function (t) { out += tableSvg(t); });
    out += "</svg>";
    if (zone === "terrace" && !admin().terraceOpen) out = '<div class="bk-closed">' + T("closed") + "</div>" + out;
    return out;
  }

  function times() {
    var o = "";
    for (var h = 12; h <= 21; h++) for (var m = 0; m < 60; m += 30) {
      var v = pad(h) + ":" + pad(m);
      o += '<option' + (v === state.time ? " selected" : "") + ">" + v + "</option>";
    }
    return o;
  }

  function render() {
    if (!root) return;
    var box = root.querySelector(".bk-box");
    if (state.sent) {
      box.innerHTML = '<button class="bk-x" type="button" aria-label="' + T("close") + '">✕</button>' +
        '<div class="bk-ok"><div class="bk-okicon" aria-hidden="true">✓</div><h2 class="bk-h">' + T("okTitle") + '</h2><p>' + T("okText") + '</p>' +
        '<p class="bk-sum">' + summary() + '</p><button class="bk-btn" type="button" data-close>' + T("done") + '</button><p class="bk-demo">' + T("demo") + "</p></div>";
      bindCommon(box);
      box.querySelector("[data-close]").focus();
      return;
    }
    var g = "";
    for (var i = 1; i <= 8; i++) g += "<option" + (i === state.guests ? " selected" : "") + ">" + i + "</option>";
    var a = admin();
    box.innerHTML =
      '<button class="bk-x" type="button" aria-label="' + T("close") + '">✕</button>' +
      '<h2 class="bk-h" id="bk-title">' + T("title") + '</h2><p class="bk-sub">' + T("sub") + "</p>" +
      '<div class="bk-row3"><label>' + T("date") + '<input type="date" name="date" min="' + today() + '" value="' + state.date + '"></label>' +
      "<label>" + T("time") + '<select name="time">' + times() + "</select></label>" +
      "<label>" + T("guests") + '<select name="guests">' + g + "</select></label></div>" +
      '<div class="bk-tabs" role="tablist">' +
      '<button type="button" role="tab" data-zone="hall" aria-selected="' + (state.zone === "hall") + '">' + T("hall") + "</button>" +
      '<button type="button" role="tab" data-zone="terrace" aria-selected="' + (state.zone === "terrace") + '">' + T("terrace") + (a.terraceOpen ? "" : " · ✕") + "</button></div>" +
      '<div class="bk-planwrap">' + planSvg() + "</div>" +
      '<div class="bk-legend"><span><i class="lg-free"></i>' + T("free") + '</span><span><i class="lg-sel"></i>' + T("chosen") + '</span><span><i class="lg-taken"></i>' + T("taken") + '</span><span><i class="lg-small"></i>' + T("small") + "</span></div>" +
      '<p class="bk-pick' + (state.table ? " ok" : "") + '">' + (state.table ? summary() : T("pick")) + "</p>" +
      '<form class="bk-form" novalidate><div class="bk-row2"><label>' + T("name") + '<input name="name" autocomplete="name" required value="' + esc(state.name) + '"></label>' +
      "<label>" + T("phone") + '<input name="phone" type="tel" autocomplete="tel" required placeholder="+48 …" value="' + esc(state.phone) + '"></label></div>' +
      "<label>" + T("comment") + '<input name="comment" placeholder="' + T("commentPh") + '" value="' + esc(state.comment) + '"></label>' +
      '<button class="bk-btn" type="submit"' + (canSubmit() ? "" : " disabled") + ">" + T("submit") + "</button></form>" +
      '<p class="bk-demo">' + T("demo") + "</p>";
    bindCommon(box);
    bindForm(box);
  }

  function summary() {
    var d = state.date.split("-").reverse().join(".");
    return T("summary").replace("{d}", d).replace("{t}", state.time).replace("{g}", state.guests).replace("{n}", state.table || "—");
  }
  function canSubmit() { return !!(state.table && state.name.trim() && state.phone.replace(/\D/g, "").length >= 7); }

  function bindCommon(box) {
    box.querySelector(".bk-x").addEventListener("click", close);
    var c = box.querySelector("[data-close]");
    if (c) c.addEventListener("click", close);
  }

  function refreshPlan(box) {
    // re-render only the parts that depend on the selection, so inputs keep focus
    if (state.table) {
      var t = TABLES.filter(function (x) { return x.id === state.table; })[0];
      var st = t ? tableStatus(t) : "off";
      if (st !== "sel") state.table = null;
    }
    box.querySelector(".bk-planwrap").innerHTML = planSvg();
    var p = box.querySelector(".bk-pick");
    p.textContent = state.table ? summary() : T("pick");
    p.classList.toggle("ok", !!state.table);
    box.querySelector('.bk-form [type="submit"]').disabled = !canSubmit();
    bindPlan(box);
  }

  function bindPlan(box) {
    box.querySelectorAll(".bk-t[tabindex]").forEach(function (g) {
      function pick() { state.table = state.table === g.dataset.id ? null : g.dataset.id; refreshPlan(box); var n = box.querySelector('.bk-t[data-id="' + g.dataset.id + '"]'); if (n) n.focus(); }
      g.addEventListener("click", pick);
      g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); } });
    });
  }

  function bindForm(box) {
    box.querySelectorAll(".bk-row3 input, .bk-row3 select").forEach(function (el) {
      el.addEventListener("change", function () {
        state[el.name] = el.name === "guests" ? parseInt(el.value, 10) : el.value;
        refreshPlan(box);
      });
    });
    box.querySelectorAll("[data-zone]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.zone = b.dataset.zone;
        box.querySelectorAll("[data-zone]").forEach(function (x) { x.setAttribute("aria-selected", x === b); });
        refreshPlan(box);
      });
    });
    var form = box.querySelector(".bk-form");
    form.querySelectorAll("input").forEach(function (el) {
      el.addEventListener("input", function () { state[el.name] = el.value; form.querySelector('[type="submit"]').disabled = !canSubmit(); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!canSubmit()) return;
      var list = load(BOOKINGS_KEY, []);
      list.unshift({ id: Date.now(), date: state.date, time: state.time, guests: state.guests, table: state.table,
        zone: state.zone, name: state.name.trim(), phone: state.phone.trim(), comment: state.comment.trim(), lang: lang(), status: "new", created: new Date().toISOString() });
      save(BOOKINGS_KEY, list.slice(0, 50));
      try { document.dispatchEvent(new CustomEvent("knajpa:booking")); } catch (err) {}
      state.sent = true;
      render();
    });
    bindPlan(box);
  }

  function open() {
    if (!root) {
      root = document.createElement("div");
      root.className = "bk-overlay";
      root.innerHTML = '<div class="bk-box" role="dialog" aria-modal="true" aria-labelledby="bk-title"></div>';
      root.addEventListener("click", function (e) { if (e.target === root) close(); });
      document.body.appendChild(root);
    }
    lastFocus = document.activeElement;
    state.sent = false;
    if (state.zone === "terrace" && !admin().terraceOpen) state.zone = "hall";
    render();
    root.classList.add("open");
    document.documentElement.classList.add("bk-lock");
    var first = root.querySelector("input, select") || root.querySelector("button");
    if (first) first.focus();
  }

  function close() {
    if (!root) return;
    root.classList.remove("open");
    document.documentElement.classList.remove("bk-lock");
    if (state.sent) { state.table = null; state.comment = ""; state.sent = false; }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.addEventListener("keydown", function (e) {
    if (!root || !root.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "Tab") {
      var f = root.querySelectorAll('button:not([disabled]), input, select, [tabindex="0"]');
      if (!f.length) return;
      var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  });

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[data-i18n="reserve"], [data-booking]');
    if (a) { e.preventDefault(); open(); return; }
    if (e.target.closest && e.target.closest("[data-lang]") && root && root.classList.contains("open")) setTimeout(render, 0);
  });

  if (/[?&]booking=open/.test(location.search)) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", open); else open();
  }
  window.KnajpaBooking = { open: open, close: close, tables: TABLES, keys: { admin: ADMIN_KEY, bookings: BOOKINGS_KEY } };
})();
