const express = require('express');
const router = express.Router();
const { getAllPedidos, getAllPedidosAdmin, getAllPedidoRealizado, nuevoPedido } = require('../../models/pedidos');
const { Router } = require('express');

//PETICION OBTENER TODOS LOS PEDIDOS

router.get('/', async (req, res) => {
    try {
        const pedidos = await getAllPedidos();
        res.json(pedidos);
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

//PETICION PARA OBTENER LOS PEDIDOS REALIZADOS

router.post('/realizado', async (req, res) => {
    try {
        const pedidosRealizados = await getAllPedidoRealizado();
        res.json(pedidosRealizados);
    } catch (error) {
        res.json({ error: error.message })
    }
})

//PETICION PARA CREAR UN NUEVO PEDIDO
router.post('/nuevo', async (req, res) => {
    try {
        const newPedido = await nuevoPedido(req.body);
        console.log(req.body);
        res.json(newPedido);
    } catch (error) {
        res.json({ error: error.message })
    }
})


module.exports = router