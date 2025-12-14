document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebarMobile");
  const toggle = document.getElementById("sidebarToggle");

  toggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("open");
    toggle.textContent = isOpen ? "<" : ">";
  });
});




// Filtros de galería
document.addEventListener('DOMContentLoaded', () => {
  const filtros = document.querySelectorAll('.filtro');
  const items = document.querySelectorAll('.galeria-item');

  filtros.forEach(btn => {
    btn.addEventListener('click', () => {
      const categoria = btn.dataset.filtro;

      // Estado activo
      filtros.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filtrado
      items.forEach(item => {
        if (categoria === 'all' || item.dataset.categoria === categoria) {
          item.classList.remove('d-none');
        } else {
          item.classList.add('d-none');
        }
      });
    });
  });
});
