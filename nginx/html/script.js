document.getElementById('loadUsers').addEventListener('click', function() {
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            const result = document.getElementById('result');
            result.innerHTML = `<h3>Usuarios:</h3><pre>${JSON.stringify(data, null, 2)}</pre>`;
        })
        .catch(error => {
            const result = document.getElementById('result');
            result.innerHTML = `<p style="color: red;">Error cargando usuarios: ${error}</p>`;
        });
});

document.getElementById('loadProducts').addEventListener('click', function() {
    fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            const result = document.getElementById('result');
            result.innerHTML = `<h3>Productos:</h3><pre>${JSON.stringify(data, null, 2)}</pre>`;
        })
        .catch(error => {
            const result = document.getElementById('result');
            result.innerHTML = `<p style="color: red;">Error cargando productos: ${error}</p>`;
        });
});
