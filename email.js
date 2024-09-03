<!-- Incluir EmailJS SDK -->
    <script type="text/javascript" src="https://cdn.emailjs.com/dist/email.min.js"></script>
    <script type="text/javascript">
        (function() {
            emailjs.init("_vmfJzPaAfLKlio-k"); // Reemplaza con tu User ID de EmailJS
        })();
    </script>

    <script type="text/javascript">
        document.getElementById('contact-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Previene la acción por defecto del formulario

            // Enviar el formulario usando EmailJS
            emailjs.sendForm('service_2ajarrr', 'template_biqdvfi', this)
                .then(function() {
                    alert('Correo enviado exitosamente!');
                }, function(error) {
                    alert('Error al enviar el correo: ' + JSON.stringify(error));
                });
        });
    </script>
