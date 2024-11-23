function actualizarReloj() {
    const reloj = document.getElementById('reloj');
    const fecha = document.getElementById('fecha');

    // Actualizar la hora
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');
    reloj.textContent = `${horas}:${minutos}:${segundos}`;

    // Actualizar la fecha
    const opcionesFecha = { day: 'numeric', month: 'long', year: 'numeric' };
    const fechaFormateada = ahora.toLocaleDateString('es-ES', opcionesFecha);
    fecha.textContent = fechaFormateada;
}

// Actualizar el reloj y la fecha cada segundo
setInterval(actualizarReloj, 1000);

// Ejecutar al cargar la página
actualizarReloj();

document.getElementById('check-btn').addEventListener('click', () => {
    const userId = document.getElementById('userId').value.trim();

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
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            alert('Ocurrió un problema al conectar con el servidor. Por favor, intente más tarde.');
        });
});
