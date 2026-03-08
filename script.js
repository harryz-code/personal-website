(function () {
  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme: dark / light
  var THEME_KEY = "portfolio-theme";
  var html = document.documentElement;

  function getPreferredTheme() {
    var stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
    return "dark";
  }

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    var btn = document.querySelector(".theme-toggle");
    if (btn) btn.setAttribute("aria-label", theme === "light" ? "Switch to dark mode" : "Switch to light mode");
  }

  setTheme(getPreferredTheme());

  document.querySelector(".theme-toggle")?.addEventListener("click", function () {
    setTheme(html.getAttribute("data-theme") === "light" ? "dark" : "light");
  });

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  // Optional: close mobile menu when a link is clicked
  if (navLinks && toggle) {
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Optional: highlight current section in nav (minimal version)
  var sections = document.querySelectorAll("section[id]");
  var navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

  function updateActiveLink() {
    var scrollY = window.scrollY;
    var headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;

    sections.forEach(function (section) {
      var id = section.getAttribute("id");
      var top = section.offsetTop - headerHeight;
      var height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(function (a) {
          if (a.getAttribute("href") === "#" + id) {
            a.style.color = "var(--text)";
          } else {
            a.style.color = "";
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();

  // Experience/Volunteer: set logo from data-domain (favicon), toggle expand/collapse
  document.querySelectorAll(".exp-item[data-domain]").forEach(function (item) {
    var domain = item.getAttribute("data-domain");
    var logo = item.querySelector(".exp-logo");
    if (domain && logo) {
      logo.src = "https://www.google.com/s2/favicons?domain=" + encodeURIComponent(domain) + "&sz=64";
    }
  });

  document.querySelectorAll(".exp-item .exp-header").forEach(function (header) {
    header.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;
      var item = header.closest(".exp-item");
      if (item) item.classList.toggle("collapsed");
    });
  });
})();
