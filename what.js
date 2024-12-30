

  // Botón para enviar por EmailJS
        document.getElementById('sendEmail').addEventListener('click', function() {
            const message = document.getElementById('message').value;
            if (!message) {
                alert('Por favor, escribe un mensaje.');
                return;
            }
            // Aquí iría tu código de EmailJS
            console.log(`Mensaje enviado por Email: ${message}`);
            alert('Simulando envío por EmailJS...');
        });

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
