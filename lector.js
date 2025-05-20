// Obtener nombre de archivo desde el atributo 'data-archivo'
const scriptTag = document.currentScript;
const archivo = scriptTag.getAttribute('data-archivo') || 'archivo.txt';

let velocidad = 0.9;

window.onload = async function cargarArchivo() {
    try {
        const response = await fetch(archivo);
        if (!response.ok) throw new Error('Error al cargar el archivo');
        const texto = await response.text();
        document.getElementById('contenido').innerText = texto;
    } catch (error) {
        console.error('Error:', error.message);
    }
};

function ajustarVelocidad(cambio) {
    velocidad = Math.max(0.1, Math.min(2.0, velocidad + cambio));
    document.getElementById('velocidadActual').innerText = `Velocidad: ${velocidad.toFixed(1)}`;
}

function leerEnVozAlta() {
    const texto = document.getElementById('contenido').innerText;
    const fragmentos = texto.match(/.{1,100}/g);
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
