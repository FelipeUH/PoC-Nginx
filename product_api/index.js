const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;
const INSTANCE = process.env.INSTANCE || "default";

const products = [
  { id: 1, nombre: 'Camiseta', precio: 15, cantidad: 100, descripcion: 'Camiseta de algodón' },
  { id: 2, nombre: 'Pantalón', precio: 25, cantidad: 50, descripcion: 'Pantalón de mezclilla' },
  { id: 3, nombre: 'Zapatos', precio: 45, cantidad: 75, descripcion: 'Zapatos deportivos' }
];

app.get("/api/products", (req, res) => {
  res.json({
    from: `Product API - Instance ${INSTANCE}`,
    products
  });
});

app.listen(PORT, () => {
  console.log(`Product API Instance ${INSTANCE} corriendo en http://localhost:${PORT}`);
});
