const galeria = document.getElementById("galeriaExposicion");
const filtros = document.querySelector("#filtros .d-flex");
const contador = document.getElementById("contadorObras");
const mensaje = document.getElementById("mensajeGaleria");

const modalElemento = document.getElementById("modalObra");
const modal = new bootstrap.Modal(modalElemento);

let obras = [];
let obrasFiltradas = [];
let indiceActual = 0;

// Elementos de la ficha técnica
const campos = {
  nombre: document.getElementById("obraNombre"),
  anio: document.getElementById("obraAnio"),
  dimensiones: document.getElementById("obraDimensiones"),
  tecnica: document.getElementById("obraTecnica"),
  soporte: document.getElementById("obraSoporte"),
  autores: document.getElementById("obraAutores"),
  imagen: document.getElementById("imagenGrande"),
  posicion: document.getElementById("obraPosicion")
};


// Cargar obras
async function cargarObras() {
  try {
    const respuesta = await fetch("exposicion/obras.json");

    if (!respuesta.ok) {
      throw new Error("No se pudo cargar el archivo JSON.");
    }

    obras = await respuesta.json();

    generarFiltros();
    filtrarObras("all");

  } catch (error) {
    mensaje.hidden = false;
    mensaje.textContent = "No fue posible cargar la exposición.";
    console.error(error);
  }
}


// Generar botones de autores automáticamente
function generarFiltros() {
  const autores = new Map();

  obras.forEach(obra => {
    (obra.autores || []).forEach(autor => {
      autores.set(autor.id, autor.nombre);
    });
  });

  [...autores.entries()]
    .sort((a, b) => a[1].localeCompare(b[1], "es"))
    .forEach(([id, nombre]) => {

      const boton = document.createElement("button");

      boton.className = "btn btn-outline-secondary btn-sm filtro";
      boton.dataset.filtro = id;
      boton.textContent = nombre;

      filtros.appendChild(boton);
    });
}


// Filtrar obras
function filtrarObras(autor) {
  obrasFiltradas = autor === "all"
    ? obras
    : obras.filter(obra =>
        (obra.autores || []).some(persona => persona.id === autor)
      );

  mostrarObras();
}


// Mostrar miniaturas
function mostrarObras() {
  galeria.replaceChildren();

  contador.textContent = `${obrasFiltradas.length} ${
    obrasFiltradas.length === 1 ? "obra" : "obras"
  }`;

  mensaje.hidden = obrasFiltradas.length > 0;

  if (!obrasFiltradas.length) {
    mensaje.textContent = "No hay obras para este autor.";
    return;
  }

  obrasFiltradas.forEach((obra, indice) => {

    const columna = document.createElement("div");
    columna.className = "col-6 col-md-4 col-lg-3";

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "obra-miniatura";
    boton.setAttribute("aria-label", `Ver ${obra.nombre}`);

    const imagen = document.createElement("img");
    imagen.src = obra.imagen;
    imagen.alt = obra.nombre;
    imagen.loading = "lazy";

    boton.appendChild(imagen);
    boton.addEventListener("click", () => abrirObra(indice));

    columna.appendChild(boton);
    galeria.appendChild(columna);
  });
}


// Abrir Lightbox
function abrirObra(indice) {
  indiceActual = indice;
  actualizarModal();
  modal.show();
}


// Actualizar ficha técnica
function actualizarModal() {
  const obra = obrasFiltradas[indiceActual];

  campos.nombre.textContent = obra.nombre;
  campos.anio.textContent = obra.anio;
  campos.dimensiones.textContent = obra.dimensiones;
  campos.tecnica.textContent = obra.tecnica;
  campos.soporte.textContent = obra.soporte;

  campos.imagen.src = obra.imagen;
  campos.imagen.alt = obra.nombre;

  campos.posicion.textContent =
    `${indiceActual + 1} / ${obrasFiltradas.length}`;

  // Enlaces a los autores
  campos.autores.replaceChildren();

  (obra.autores || []).forEach((autor, indice) => {

    const enlace = document.createElement("a");

    enlace.href = `exposicion/${autor.id}.html`;
    enlace.textContent = autor.nombre;
    enlace.className = "enlace-autor";

    if (indice > 0) {
      campos.autores.appendChild(document.createTextNode(", "));
    }

    campos.autores.appendChild(enlace);
  });

  const desactivar = obrasFiltradas.length < 2;

  document.getElementById("obraAnterior").disabled = desactivar;
  document.getElementById("obraSiguiente").disabled = desactivar;
}


// Navegar entre obras
function cambiarObra(direccion) {
  if (obrasFiltradas.length < 2) return;

  indiceActual =
    (indiceActual + direccion + obrasFiltradas.length) %
    obrasFiltradas.length;

  actualizarModal();
}


// Eventos de los filtros
filtros.addEventListener("click", evento => {
  const boton = evento.target.closest(".filtro");

  if (!boton) return;

  filtros.querySelector(".active")?.classList.remove("active");
  boton.classList.add("active");

  filtrarObras(boton.dataset.filtro);
});


// Eventos de navegación
document.getElementById("obraAnterior").addEventListener("click", () => {
  cambiarObra(-1);
});

document.getElementById("obraSiguiente").addEventListener("click", () => {
  cambiarObra(1);
});


// Navegación mediante teclado
document.addEventListener("keydown", evento => {
  if (!modalElemento.classList.contains("show")) return;

  if (evento.key === "ArrowLeft") cambiarObra(-1);
  if (evento.key === "ArrowRight") cambiarObra(1);
});


// Iniciar exposición
cargarObras();