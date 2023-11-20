const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const AGENDA_API_URL = 'http://www.raydelto.org/agenda.php';

// Ruta para obtener todos los contactos
app.get('/contactos', async (req, res) => {
  try {
    const response = await axios.get(AGENDA_API_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los contactos.' });
  }
});

// Ruta para almacenar un nuevo contacto
app.post('/contactos', async (req, res) => {
  try {
    const { nombre, apellido, telefono } = req.body;

    if (!nombre || !apellido || !telefono) {
      return res.status(400).json({ error: 'Nombre, apellido y teléfono son obligatorios.' });
    }

    const response = await axios.post(AGENDA_API_URL, { nombre, apellido, telefono });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al almacenar el contacto.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
