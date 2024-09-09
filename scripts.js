let musicaIniciada = false;

// Detecta la primera interacción del usuario en la página
function iniciarMusica() {
    if (!musicaIniciada) {
        const audio = document.getElementById('melodia');
        audio.play().then(() => {
            musicaIniciada = true; // Marca que la música ya ha sido iniciada
        }).catch((error) => {
            console.log('Error al reproducir la música:', error);
        });
    }
}

// Detecta cualquier interacción del usuario en la página
document.addEventListener('click', iniciarMusica);
document.addEventListener('touchstart', iniciarMusica);

// Previene la recarga de la página al enviar el formulario
const form = document.getElementById('question-form');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue

    // Aquí puedes agregar la lógica para enviar el correo
    // Por ejemplo, llamando a las funciones de email.js
    console.log('Se envía la pregunta, pero la página no se recarga.');

    // (Opcional) Agregar código para mostrar mensaje de éxito o procesar el formulario
});
