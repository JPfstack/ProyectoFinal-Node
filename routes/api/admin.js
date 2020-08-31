const express = require('express');
const router = express.Router();

const { getAllPedidosAdmin, getAllClientes } = require('./../../models/admin');


// PETICION OBTENER TODOS LOS CLIENTES
router.get('/', async (req, res) => {
    try {
        const clientes = await getAllClientes();
        res.json(clientes);
    } catch (error) {
        res.json({ error: error.message })
    }
});


//PETICION OBTENER TODOS LOS PEDIDOS PENDIENTES DE ENTREGA
router.post('/', async (req, res) => {
    try {
        const pedidosPendientes = await getAllPedidosAdmin();
        res.json(pedidosPendientes);
    } catch (error) {
        res.json({ error: error.message })
    }

});




module.exports = router;

