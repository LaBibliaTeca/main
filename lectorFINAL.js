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

// 🔧 Divide texto sin cortar oraciones por abreviaturas o decimales
function dividirPorOraciones(texto, maxCaracteres = 200) {
  const fragmentos = [];
  const abreviaturas = [
    "Sr", "Sra", "Srta", "Dr", "Dra", "Ing", "Lic", "Arq", "Pág", "etc", "p.ej", "Ud", "Uds"
  ];

  // Limpia texto y unifica saltos de línea
  texto = texto.replace(/\s+/g, ' ').trim();

  // Divide por oraciones, respetando los casos especiales
  const regex = /(?<!\b(?:Sr|Sra|Srta|Dr|Dra|Ing|Lic|Arq|Pág|etc|p\.ej|Ud|Uds))(?<!\d)\.(?=\s+[A-ZÁÉÍÓÚÑ])/g;
  // Explicación:
  // - (?<!abreviatura) no corta después de abreviaturas
  // - (?<!\d)\. evita cortar decimales
  // - (?=\s+[A-Z]) requiere una mayúscula después → inicio probable de nueva oración

  const oraciones = texto.split(regex).map(o => o.trim()).filter(Boolean);

  // Combina oraciones para no pasar el límite de caracteres
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
