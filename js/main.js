document.getElementById('check-btn').addEventListener('click', () => {
    const userId = document.getElementById('userId').value.trim();

    // Validar que el ID sea un número positivo
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
        .then(response => {
            // Manejar errores HTTP
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.message || `Error ${response.status}: ${response.statusText}`);
                });
            }
            return response.json();
        })
        .then(data => {
            // Mostrar mensaje del backend si la respuesta es exitosa
            if (data.error) {
                alert(data.error);
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            // Manejo general de errores
            console.error('Error en la solicitud:', error);
            alert(error.message || "Ocurrió un problema al conectar con el servidor. Por favor, intente más tarde.");
        });
});
