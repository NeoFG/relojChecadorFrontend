document.getElementById('check-btn').addEventListener('click', () => {
    const userId = document.getElementById('userId').value;

    if (!userId || isNaN(userId)) {
        alert("Por favor, ingrese un ID válido.");
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
            if (data.error) {
                alert(data.error);
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
});
