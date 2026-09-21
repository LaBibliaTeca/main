function getParametro(nombre) {
  const url = new URL(window.location.href);
  return url.searchParams.get(nombre);
}

const script = document.currentScript;
const archivo = getParametro("texto") || script.getAttribute("data-archivo");

// Cambiar el título de la pestaña
if (archivo) {
  const nombre = archivo.split("/").pop();
  document.title = nombre.replace(/\.(md|txt|html)$/i, "");
}
// Fin Cambiar titulo

if (archivo) {
  // ✨ TRUCO ANTI-CACHÉ AUTOMÁTICO:
  // Añade un código de tiempo al final del archivo para obligar a Chrome a descargar la versión más nueva.
  const archivoLimpio = archivo + (archivo.includes('?') ? '&' : '?') + 'nocache=' + new Date().getTime();

  fetch(archivoLimpio)
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar: " + archivo);
      return res.text();
    })
    .then(texto => {
  
    const contenido = document.getElementById("contenido");
  
    if (archivo.toLowerCase().endsWith(".md")) {
      contenido.innerHTML = marked.parse(texto);
  
    } else if (archivo.toLowerCase().endsWith(".html")) {
      contenido.innerHTML = texto;
  
    } else {
      contenido.textContent = texto;
    }

    })
    .catch(err => {
      document.getElementById("contenido").innerHTML = "⚠️ Error: " + err.message;
      console.error(err);
    });
}

let velocidad = 0.7;

//agrego
function limpiarTextoLectura(texto) {
  return texto
    // Quitar encabezados Markdown (#, ##, ###...)
    .replace(/^#+\s*/gm, "")

    // Quitar marcadores de negrita y cursiva
    .replace(/\*/g, "")
    .replace(/_/g, "")

    // Eliminar espacios repetidos
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n") // colapsa saltos múltiples

    .trim();
}
//termina agrego

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
  //const texto = document.getElementById("contenido").innerText;
  const texto = limpiarTextoLectura(
    document.getElementById("contenido").textContent
  );
  
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
  // Corregido un pequeño punto extra que causaba error de sintaxis en el toFixed
  document.getElementById("velocidadActual").textContent = "Velocidad: " + velocidad.toFixed(1);
}
///
// Copiar selección conservando formato HTML
document.addEventListener("copy", function (e) {
  const seleccion = window.getSelection();

  if (!seleccion.rangeCount || seleccion.isCollapsed) return;

  const rango = seleccion.getRangeAt(0);

  // Solo actuar si la selección está dentro de #contenido
  const contenido = document.getElementById("contenido");
  if (!contenido.contains(rango.commonAncestorContainer)) return;

  // Texto plano
  const textoPlano = seleccion.toString();

  // HTML de la selección
  const contenedor = document.createElement("div");
  contenedor.appendChild(rango.cloneContents());
  const textoHTML = contenedor.innerHTML;

  e.clipboardData.setData("text/plain", textoPlano);
  e.clipboardData.setData("text/html", textoHTML);

  e.preventDefault();
});
