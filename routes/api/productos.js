const express = require('express');
const router = express.Router();

const { getAllProductos } = require('./../../models/producto');


//PETICION PARA OBTENER TODOS LOS PRODUCTOS
router.get('/', async (req, res) => {
    try {
        const productos = await getAllProductos();
        res.json(productos);
    } catch (error) {
        res.json({ error: error.message })
    }
});



module.exports = router;