const express = require('express');
const router = express.Router();

const { getAllPedidosAdmin, getAllClientes, getAllPedidos, nuevoPedido } = require('./../../models/admin');
const { Router } = require('express');

// PETICION OBTENER TODOS LOS CLIENTES
router.get('/', async (req, res) => {
    try {
        const clientes = await getAllClientes();
        res.json(clientes);
    } catch (error) {
        res.json({ error: error.message })
    }
});

//PETICION OBTENER TODOS LOS PEDIDOS

router.post('/', async (req, res) => {
    try {
        const pedidos = await getAllPedidos();
        res.json(pedidos);
    } catch (error) {
        res.json({ error: error.message })
    }
})

//PETICION PARA CREAR UN NUEVO PEDIDO
router.post('/', async (req, res) => {
    try {
        const newPedido = await nuevoPedido();
        res.json(newPedido);
    } catch (error) {
        res.json({ error: error.message })
    }
})


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

