        document.getElementById('sendWhatsapp').addEventListener('click', function(event) {
            event.preventDefault();

            // Obtener los datos del formulario
            var nombre = document.querySelector('input[name="from_name"]').value;
            var mensaje = document.querySelector('textarea[name="name="message"]').value;

            // Construir el enlace para WhatsApp Web
            var whatsappURL = "https://web.whatsapp.com/send?phone=541156394763&text=" + encodeURIComponent("Mensaje de: " + nombre + "\n" + mensaje);

            // Redirigir al usuario a WhatsApp Web
            window.open(whatsappURL, '_blank');
        });
    </script>
