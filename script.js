// -----------------------------
// ELEMENTOS
// -----------------------------
const sidebar = document.getElementById("sidebarMobile");
const sidebarToggle = document.getElementById("sidebarToggle");

const navbarCollapse = document.getElementById("menu");
const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });

// -----------------------------
// FUNCIONES COMUNES
// -----------------------------
function closeSidebar() {
  sidebar.classList.remove("open");
  sidebarToggle.textContent = ">";
}

function openSidebar() {
  // Cerrar navbar si está abierto
  if (navbarCollapse.classList.contains("show") || navbarCollapse.classList.contains("collapsing")) {
    bsCollapse.hide();
  }

  sidebar.classList.add("open");
  sidebarToggle.textContent = "×";
}

function toggleSidebar() {
  sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
}

function closeNavbar() {
  bsCollapse.hide();
}

function toggleNavbar() {
  // Si sidebar está abierto, cerrarlo
  if (sidebar.classList.contains("open")) {
    closeSidebar();
  }
  // Bootstrap se encarga del toggle
}

// -----------------------------
// EVENTOS
// -----------------------------

// Sidebar toggle
sidebarToggle.addEventListener("click", toggleSidebar);

// Navbar toggle (si tienes botón de toggle específico)
const navbarToggle = document.querySelector('[data-bs-toggle="collapse"]');
if (navbarToggle) {
  navbarToggle.addEventListener("click", toggleNavbar);
}

// Cuando el navbar se abre, cerrar sidebar
navbarCollapse.addEventListener("show.bs.collapse", closeSidebar);

// Cerrar ambos al hacer click en cualquier link
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    closeSidebar();
    closeNavbar();
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
