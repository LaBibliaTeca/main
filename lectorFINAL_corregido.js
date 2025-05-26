
function getParametro(nombre) {
  const url = new URL(window.location.href);
  return url.searchParams.get(nombre);
}

const script = document.currentScript;
const archivo = getParametro("texto") || script.getAttribute("data-archivo");

if (archivo) {
  // Detectar si es un ID de Google Docs y construir la URL de exportación
  const esIDdeGoogleDoc = archivo.length > 20 && !archivo.includes("/") && !archivo.includes(".txt");  // línea agregada
  const url = esIDdeGoogleDoc
   // ? `${archivo}/export?format=txt`  
    ? `https://docs.google.com/document/d/${archivo}/export?format=txt`  // línea agregada para Google Docs
    : archivo;  // si no, usar el archivo como está
  fetch(url)
    .then(res => res.ok ? res.text() : "⚠️ No se pudo cargar el archivo.")
    .then(texto => {
      document.getElementById("contenido").innerText = texto;
    });
}

let velocidad = 0.9;

function leerEnVozAlta() {
  const texto = document.getElementById("contenido").innerText;
  const fragmentos = texto.match(/.{1,200}/g);
  let index = 0;

  function hablarFragmento() {
    if (index < fragmentos.length) {
      const mensaje = new SpeechSynthesisUtterance(fragmentos[index]);
      mensaje.lang = 'es-ES';
      mensaje.pitch = 1;
      mensaje.rate = velocidad;

      mensaje.onend = function () {
        index++;
        hablarFragmento();
      };

      window.speechSynthesis.speak(mensaje);
    }
  }

  hablarFragmento();
}

function ajustarVelocidad(cambio) {
  velocidad = Math.max(0.1, Math.min(2.0, velocidad + cambio));
  document.getElementById("velocidadActual").textContent = "Velocidad: " + velocidad.toFixed(1);
}
