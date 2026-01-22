function getParametro(nombre) {
  const url = new URL(window.location.href);
  return url.searchParams.get(nombre);
}

const script = document.currentScript;
const archivo = getParametro("texto") || script.getAttribute("data-archivo");

if (archivo) {
  fetch(archivo)
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar: " + archivo);
      return res.text();
    })
    .then(texto => {
      document.getElementById("contenido").innerHTML = texto;
    })
    .catch(err => {
      document.getElementById("contenido").innerHTML = "⚠️ Error: " + err.message;
      console.error(err);
    });
}

let velocidad = 0.8;

function dividirPorOraciones(texto, maxCaracteres = 200) {
  const regex = /(?<!\d)\.(?=\s+[A-ZÁÉÍÓÚÑ])/g;
  const oraciones = texto.split(regex).map(o => o.trim()).filter(Boolean);

  const fragmentos = [];
  let buffer = "";
  for (let i = 0; i < oraciones.length; i++) {
    const agregar = oraciones[i] + ".";
    if ((buffer + " " + agregar).length <= maxCaracteres) {
      buffer += (buffer ? " " : "") + agregar;
    } else {
      fragmentos.push(buffer.trim());
      buffer = agregar;
    }
  }
  if (buffer) fragmentos.push(buffer.trim());

  return fragmentos;
}

function leerEnVozAlta() {
  const texto = document.getElementById("contenido").innerText;
  const fragmentos = dividirPorOraciones(texto, 200);
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
