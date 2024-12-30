document.getElementById('sendWhatsapp').addEventListener('click', function() {
    const message = document.getElementById('message').value.trim();
    if (!message) {
        alert('Por favor, escribe un mensaje.');
        return;
    }

    const phoneNumber = '541156394763'; // Número en formato internacional
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Redirecciona directamente al enlace, lo cual suele funcionar mejor para WhatsApp
    // Crear un enlace dinámicamente y simular clic
    const link = document.createElement('a');
    link.href = whatsappLink;
    link.target = '_blank'; // Abrir en nueva pestaña si es necesario
    link.click();
});
