(function () {
  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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
})();
