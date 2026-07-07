(function () {
  "use strict";

  /* One-time fade-up reveals — first, so a failure elsewhere can never
     leave content hidden. */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* Header gains a cream background after the hero starts to scroll away. */
  var header = document.getElementById("header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Mobile nav toggle */
  var toggle = header && header.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Inquiry form — AJAX submit with inline confirmation. Falls back to a
     normal POST (FormSubmit's hosted thank-you page) if fetch fails.
     novalidate is set here, not in the HTML, so browsers still enforce
     required fields when JavaScript is unavailable. */
  var form = document.getElementById("inquiry-form");
  var note = document.getElementById("form-note");
  if (form && note) {
    form.setAttribute("novalidate", "");
    var sending = false;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (sending || !form.reportValidity()) return;
      sending = true;

      var button = form.querySelector("button[type=submit]");
      note.classList.remove("error");
      note.textContent = "Sending…";

      fetch("https://formsubmit.co/ajax/manager@144duke.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed");
          return res.json();
        })
        .then(function () {
          form.querySelectorAll(".field, button[type=submit]").forEach(function (el) {
            el.style.display = "none";
          });
          note.textContent =
            "Thank you — we’ll be in touch within one business day.";
          note.focus();
        })
        .catch(function () {
          sending = false;
          note.classList.add("error");
          note.textContent =
            "Something went wrong. Please email us directly at manager@144duke.com.";
          note.focus();
        });
    });
  }
})();
