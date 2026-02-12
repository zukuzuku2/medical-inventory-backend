const prisma = require("../config/database");

const validateInventoryData = (data) => {
  const errors = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('El nombre es requerido');
  }

  if (!data.category || typeof data.category !== 'string') {
    errors.push('La categoría es requerida');
  }

  const validCategories = ['Preparacion', 'Resinas Fluidas', 'Composite', 'Ionomeros', 'Profilaxis', 'Medicamentos', 'Insumos'];
  if (data.category && !validCategories.includes(data.category)) {
    errors.push('Categoría inválida');
  }

  if (data.quantity === undefined || typeof data.quantity !== 'number' || data.quantity < 0) {
    errors.push('La cantidad debe ser un número mayor o igual a 0');
  }

  if (data.price === undefined || typeof data.price !== 'number' || data.price < 0) {
    errors.push('El precio debe ser un número mayor o igual a 0');
  }

  return errors;
};

exports.getAllInventory = async (req, res) => {
  try {
    const items = await prisma.inventory.findMany();
    res.json(items);
  } catch (error) {
    console.error('Error al obtener inventario:', error);
    res.status(500).json({ error: 'Error al obtener el inventario' });
  }
};

exports.createInventory = async (req, res) => {
  try {
    const errors = validateInventoryData(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const item = await prisma.inventory.create({
      data: {
        name: req.body.name.trim(),
        category: req.body.category,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description?.trim() || null
      }
    });
    res.status(201).json(item);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const errors = validateInventoryData(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const item = await prisma.inventory.update({
      where: { id },
      data: {
        name: req.body.name.trim(),
        category: req.body.category,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description?.trim() || null
      }
    });
    res.json(item);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    await prisma.inventory.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
