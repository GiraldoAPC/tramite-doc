// Año footer
document.getElementById("year").textContent = new Date().getFullYear();

// Drawer móvil
const burger = document.getElementById("burger");
const drawer = document.getElementById("drawer");
const closeDrawer = document.getElementById("closeDrawer");

function openMenu() {
  document.body.classList.add("menu-open");
  burger?.setAttribute("aria-expanded", "true");
  drawer?.setAttribute("aria-hidden", "false");
}
function closeMenu() {
  document.body.classList.remove("menu-open");
  burger?.setAttribute("aria-expanded", "false");
  drawer?.setAttribute("aria-hidden", "true");
}

burger?.addEventListener("click", () => {
  document.body.classList.contains("menu-open") ? closeMenu() : openMenu();
});
closeDrawer?.addEventListener("click", closeMenu);
drawer?.addEventListener("click", (e) => {
  if (e.target === drawer) closeMenu();
});

// Dropdown desktop
document.querySelectorAll("[data-dropdown]").forEach((dd) => {
  const btn = dd.querySelector(".dropbtn");
  const menu = dd.querySelector(".dropmenu");

  btn?.addEventListener("click", () => {
    const isOpen = dd.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Click fuera
  document.addEventListener("click", (e) => {
    if (!dd.contains(e.target)) {
      dd.classList.remove("open");
      btn?.setAttribute("aria-expanded", "false");
    }
  });

  // Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dd.classList.remove("open");
      btn?.setAttribute("aria-expanded", "false");
    }
  });
});

// Reveal on scroll (IntersectionObserver)
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) en.target.classList.add("show");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
