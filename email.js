// Incluir la biblioteca de EmailJS
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdn.emailjs.com/dist/email.min.js';
document.head.appendChild(script);

script.onload = function() {
    // Iniciar EmailJS
    emailjs.init("YOUR_PUBLIC_KEY"); // Reemplaza "YOUR_PUBLIC_KEY" con tu clave pública

    // Asignar evento click al botón "Enviar Email"
    document.getElementById('send-email-button').addEventListener('click', function() {
        // Obtener el formulario
        var form = document.getElementById('contact-form');

        // Enviar el formulario usando EmailJS
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
            .then(function() {
                alert('Correo enviado exitosamente!');
            }, function(error) {
                alert('Error al enviar el correo: ' + JSON.stringify(error));
            });
    });
};
