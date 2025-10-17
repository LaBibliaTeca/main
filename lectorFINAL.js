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

let velocidad = 0.8;

function dividirPorOraciones(texto, maxCaracteres = 200) {
  const fragmentos = [];
  let restante = texto.trim();

  while (restante.length > 0) {
    // Busca el último punto dentro del límite de caracteres
    let corte = restante.lastIndexOf('.', maxCaracteres);

    // Si no hay punto, busca signos de cierre alternativos
    if (corte === -1) {
      const signos = ['?', '!', ';'];
      for (const s of signos) {
        const pos = restante.lastIndexOf(s, maxCaracteres);
        if (pos > corte) corte = pos;
      }
    }

    // Si no encontró nada, busca espacio cercano
    if (corte === -1) corte = restante.lastIndexOf(' ', maxCaracteres);

    // Si aún no hay corte válido, corta en el límite exacto
    if (corte === -1 || corte < 0) corte = maxCaracteres;

    // Si hay un punto más adelante pero cerca, lo incluye (para no cortar una oración)
    const siguientePunto = restante.indexOf('.', maxCaracteres);
    if (siguientePunto !== -1 && siguientePunto - maxCaracteres < 80) {
      corte = siguientePunto;
    }

    const fragmento = restante.slice(0, corte + 1).trim();
    fragmentos.push(fragmento);
    restante = restante.slice(corte + 1).trim();
  }

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

