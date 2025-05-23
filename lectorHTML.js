function getParametro(nombre) {
  const url = new URL(window.location.href);
  return url.searchParams.get(nombre);
}

const script = document.currentScript;
const archivo = getParametro("texto") || script.getAttribute("data-archivo");

if (archivo) {
  fetch(archivo)
    .then(res => res.ok ? res.text() : "⚠️ No se pudo cargar el archivo.")
    .then(texto => {
      document.getElementById("contenido").innerHTML = texto;
    });
}

// Función para leer en voz alta con limpieza de etiquetas
let velocidad = 0.9;

function leerEnVozAlta() {
  const rawHTML = document.getElementById("contenido").innerHTML;
  const parser = new DOMParser();
  const parsed = parser.parseFromString(rawHTML, 'text/html');
  const texto = parsed.body.textContent;

  const voz = new SpeechSynthesisUtterance(texto);
  voz.rate = velocidad;
  speechSynthesis.speak(voz);
}

function ajustarVelocidad(cambio) {
  velocidad = Math.max(0.1, Math.min(2.0, velocidad + cambio));
  document.getElementById("velocidadActual").textContent = "Velocidad: " + velocidad.toFixed(1);
}
