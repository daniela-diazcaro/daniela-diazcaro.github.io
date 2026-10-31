(function () {
  var body = document.body;
  var button = document.getElementById("theme-toggle");

  // ---------- Dark mode ----------
  function apply(theme) {
    var dark = theme === "dark";
    body.classList.toggle("dark", dark);
    if (button) {
      button.querySelector(".icon").textContent = dark ? "☀" : "☾";
      button.querySelector(".label").textContent = dark ? "Light" : "Dark";
      button.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  apply(saved || (prefersDark ? "dark" : "light"));

  if (button) {
    button.addEventListener("click", function () {
      var next = body.classList.contains("dark") ? "light" : "dark";
      apply(next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // ---------- Current page in navbar ----------
  var page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navigation a").forEach(function (link) {
    if (link.getAttribute("href") === page) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // ---------- Header border once you scroll ----------
  var header = document.querySelector(".header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Gentle fade-in as sections appear ----------
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { observer.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("visible"); });
  }

  // ---------- Footer year ----------
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
