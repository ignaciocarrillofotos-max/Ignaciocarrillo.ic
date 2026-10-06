document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".menu-toggle").forEach((button) => {
    const nav = button.parentElement.querySelector(".navlinks");
    if (!nav) return;
    button.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Abrir menú");
    }));
  });

  // Avoid leaving an open mobile menu when rotating/resizing to desktop.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 950) {
      document.querySelectorAll(".navlinks.is-open").forEach(n => n.classList.remove("is-open"));
      document.querySelectorAll(".menu-toggle").forEach(b => b.setAttribute("aria-expanded", "false"));
    }
  }, {passive:true});
});
