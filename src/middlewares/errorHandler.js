exports.notFound = (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
};

exports.errorHandler = (err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
};
