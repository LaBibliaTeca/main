 // Botón para enviar por WhatsApp
        document.getElementById('sendWhatsapp').addEventListener('click', function() {
            const message = document.getElementById('message').value;
            if (!message) {
                alert('Por favor, escribe un mensaje.');
                return;
            }
            const phoneNumber = '1234567890'; // Número en formato internacional
            const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappLink, '_blank');
        });
