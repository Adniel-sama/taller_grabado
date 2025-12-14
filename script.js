document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebarMobile');
  const toggle = document.getElementById('sidebarToggle');

  if (!sidebar || !toggle) return;

  const sidebarWidth = getComputedStyle(document.documentElement)
    .getPropertyValue('--sidebar-mobile-width');

  sidebar.addEventListener('show.bs.offcanvas', () => {
    toggle.innerHTML = '&lt;';
    toggle.style.left = sidebarWidth;
  });

  sidebar.addEventListener('hidden.bs.offcanvas', () => {
    toggle.innerHTML = '&gt;';
    toggle.style.left = '0';
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
