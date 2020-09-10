const express = require('express');
const router = express.Router();

const { getAllProductos, getProductoById, insertFavorito, getProdFav, productoSelect } = require('./../../models/producto');


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

//PETICION PARA OBTENER LOS PRODUCTOS FAVORITOS DE UN CLIENTE
router.get('/favoritos/:clienteId', async (req, res) => {

    try {
        const result = await getProdFav(req.params.clienteId);
        /*   const listaProductos = await getProductoById() */
        console.log(req.body);
        console.log(result['fk_id_producto']);
        res.json(result)
    } catch (error) {
        res.json({ error: error.message })
    }
});



//PETICION PARA AGREGAR UN NUEVO PRODUCTO AL CARRITO A TRAVES DEL ID_CLIENTE
router.post('/anadir', async (req, res) => {
    try {
        const prodSelect = await productoSelect(req.body);
        console.log(req.body);
        res.json(prodSelect);
    } catch (error) {
        res.json({ error: error.message })
    }
})
module.exports = router;