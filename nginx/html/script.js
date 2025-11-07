const tokenInput = document.getElementById('inToken');
const result = document.getElementById('result');

document.getElementById('loadUsers').addEventListener('click', function() {
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            result.innerHTML = `<h3>Usuarios:</h3><pre>${JSON.stringify(data, null, 2)}</pre>`;
        })
        .catch(error => {
            result.innerHTML = `<p style="color: red;">Error cargando usuarios: ${error}</p>`;
        });
});

document.getElementById('loadProducts').addEventListener('click', function() {
    fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            result.innerHTML = `<h3>Productos:</h3><pre>${JSON.stringify(data, null, 2)}</pre>`;
        })
        .catch(error => {
            result.innerHTML = `<p style="color: red;">Error cargando productos: ${error}</p>`;
        });
});

document.getElementById('sendToken').addEventListener('click', function() {
    fetch('/api/auth', {
        method: 'POST',
        headers: {
            Authorization: tokenInput.value,
        }
    })
    .then(response => response.json())
    .then(data => {
        result.innerHTML = `<h3>Autenticación:</h3><pre>${JSON.stringify(data, null, 2)}</pre>`;
    })
    .catch(error => {
        result.innerHTML = `<p style="color: red;">Error comparando el token: ${error}</p>`;
    });
});