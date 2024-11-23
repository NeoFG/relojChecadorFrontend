document.getElementById('check-btn').addEventListener('click', () => {
    const userId = document.getElementById('userId').value.trim();

    // Validar y eliminar espacios
    if (!userId || isNaN(userId) || parseInt(userId) <= 0) {
        alert("Por favor, ingrese un ID válido. El ID debe ser un número positivo.");
        return;
    }

    // Cambia la ruta al servidor en Render
    fetch('https://relojchecadorbackend.onrender.com/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                // Mensaje de error lógico desde el backend
                alert(data.message);
            } else {
                // Acción exitosa
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            alert("Ocurrió un problema al conectar con el servidor. Por favor, intente más tarde.");
        });
});
