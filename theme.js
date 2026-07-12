// Dark mode toggle — shared across index.html, classification.html, universities.html
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  if (toggle) {
    const applyLabel = () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    };

    applyLabel();

    toggle.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      if (isDark) {
        document.documentElement.removeAttribute("data-theme");
        try { localStorage.setItem("theme", "light"); } catch (e) {}
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        try { localStorage.setItem("theme", "dark"); } catch (e) {}
      }
      applyLabel();
    });
  }

  // Mobile hamburger menu
  const navToggle = document.getElementById("navToggle");
  const primaryMenu = document.getElementById("primary-menu");
  if (navToggle && primaryMenu) {
    const closeMenu = () => {
      primaryMenu.classList.remove("nav-open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = primaryMenu.classList.toggle("nav-open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu after tapping a link (but not the dark-mode button)
    primaryMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    // Close the menu if the viewport is resized back to desktop width
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) closeMenu();
    });
  }
});
