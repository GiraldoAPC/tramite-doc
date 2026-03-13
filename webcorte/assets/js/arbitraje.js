const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");

burger?.addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
});

mobileMenu?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => document.body.classList.remove("menu-open"));
});

const copyBtn = document.getElementById("copyClause");
const clauseText = document.getElementById("clauseText");

copyBtn?.addEventListener("click", async () => {
  try {
    const text = clauseText?.innerText?.trim() || "";
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = "Copiado";
    setTimeout(() => {
      copyBtn.textContent = "Copiar clausula";
    }, 1400);
  } catch (e) {
    alert("No se pudo copiar. Seleccione el texto y copie manualmente.");
  }
});

const openModal = (modal) => {
  if (!modal) return;
  modal.classList.remove("is-closing");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeModal = (modal) => {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.classList.add("is-closing");
  window.setTimeout(() => {
    modal.classList.remove("is-closing");
    modal.setAttribute("aria-hidden", "true");
    if (!document.querySelector(".modal.is-open")) {
      document.body.style.overflow = "";
    }
  }, 340);
};

document.querySelectorAll("[data-modal-open]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const id = trigger.getAttribute("data-modal-open");
    openModal(document.getElementById(id));
  });
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.querySelectorAll("[data-modal-close]").forEach((node) => {
    node.addEventListener("click", () => closeModal(modal));
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  document.querySelectorAll(".modal.is-open").forEach((modal) => closeModal(modal));
});

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) en.target.classList.add("show");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
