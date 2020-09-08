const express = require('express');
const router = express.Router();

const { getAllClientes } = require('./../../models/admin');

// PETICION OBTENER TODOS LOS CLIENTES
router.get('/', async (req, res) => {
    try {
        const clientes = await getAllClientes();
        res.json(clientes);
    } catch (error) {
        res.json({ error: error.message })
    }
});




module.exports = router;

