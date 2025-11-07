const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';

app.post('/api/auth', (req, res) => {
  let reqAuthorization = req.headers.authorization;
  if (!reqAuthorization) {
    res.json({
      message: "No tienes un token de autorización",
    });
    return;
  }
  if (reqAuthorization === TOKEN) {
    res.json({
      message: "Login exitoso! :D",
    });
  } else {
    res.json({
      message: "El token de autorización no es correcto! D:",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Auth api corriendo en http://localhost:${PORT}`);
});