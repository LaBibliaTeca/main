// Incluir la biblioteca de EmailJS
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdn.emailjs.com/dist/email.min.js';
document.head.appendChild(script);

script.onload = function() {
    // Iniciar EmailJS
    emailjs.init("_vmfJzPaAfLKlio-k"); // Reemplaza "YOUR_PUBLIC_KEY" con tu clave pública

    // Asignar evento click al botón "Enviar Email"
    document.getElementById('send-email-button').addEventListener('click', function() {
        // Obtener el formulario
        var form = document.getElementById('contact-form');

        // Enviar el formulario usando EmailJS
        emailjs.sendForm('service_2ajarrr', 'template_biqdvfi', form)
            .then(function() {
                alert('Correo enviado exitosamente!');
            }, function(error) {
                alert('Error al enviar el correo: ' + JSON.stringify(error));
            });
    });
};


        // Botón para enviar por WhatsApp
        document.getElementById('sendWhatsapp').addEventListener('click', function() {
            const message = document.getElementById('message').value;
            if (!message) {
                alert('Por favor, escribe un mensaje.');
                return;
            }
            const phoneNumber = '541156394763'; // Número en formato internacional
            const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappLink, '_blank');
        });
