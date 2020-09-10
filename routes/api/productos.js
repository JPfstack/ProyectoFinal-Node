const express = require('express');
const router = express.Router();

const { getAllProductos, getProductoById, insertFavorito } = require('./../../models/producto');


//PETICION PARA OBTENER TODOS LOS PRODUCTOS
router.get('/', async (req, res) => {
    try {
        const productos = await getAllProductos();
        res.json(productos);
    } catch (error) {
        res.json({ error: error.message })
    }
});


//PETICION PARA OBTENER PRODUCTO POR ID
router.get('/:productoId', async (req, res) => {
    try {
        const prodById = await getProductoById(req.params.productoId);
        res.json(prodById);
    } catch (error) {
        res.json({ error: error.message })
    }
});

//PETICION PARA INCLUIR UN PRODUCTO EN FAVORITOS
router.post('/favoritos', async (req, res) => {
    try {
        const respuesta = await insertFavorito(req.body)
        console.log(req.body);
        console.log(respuesta);
        res.json(respuesta)
    } catch (error) {
        res.json({ error: error.message })
    }
});

module.exports = router;