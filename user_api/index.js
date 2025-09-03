const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const INSTANCE = process.env.INSTANCE || "default";

const users = [
  { id: 1, nombre: 'Juan', edad: 30 },
  { id: 2, nombre: 'Ana', edad: 25 },
  { id: 3, nombre: 'Carlos', edad: 35 }
];

app.get("/api/users", (req, res) => {
  res.json({
    from: `User API - Instance ${INSTANCE}`,
    users
  });
});

app.listen(PORT, () => {
  console.log(`User API Instance ${INSTANCE} corriendo en http://localhost:${PORT}`);
});
