const express = require("express");
const cors = require("cors");
const inventoryRoutes = require("./routes/inventory");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const { PORT = 3000 } = process.env;

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  optionsSuccessStatus: 200
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// Rutas
app.use("/", inventoryRoutes);

// Manejo de errores
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
