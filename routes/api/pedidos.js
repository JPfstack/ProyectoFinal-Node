const express = require('express');
const { getClienteById } = require('../../models/cliente');
const router = express.Router();
const { getAllPedidos, getAllPedidosAdmin, getAllPedidoRealizado, nuevoPedido, changeToRealizado, addProdPedido } = require('../../models/pedidos');
const { getProductoById, newDisponibilidad } = require('../../models/producto');


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
router.post('/pendientes', async (req, res) => {
    try {
        const pedidosPendientes = await getAllPedidosAdmin();
        res.json(pedidosPendientes);
    } catch (error) {
        res.json({ error: error.message })
    }

});

//PETICION PARA OBTENER LOS PEDIDOS REALIZADOS

router.post('/realizados', async (req, res) => {
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
        const pedido = {
            id_cliente: req.body[0].id_cliente,
            fecha_entrega: new Date(),
            estado: "pendiente"
        }
        pedido.direccion = (await getClienteById(pedido.id_cliente)).direccion;

        let descripcion = "";
        let cantidadTotal = 0;
        let precioTotal = 0;
        let cantidadProd = 0;
        for (let producto of req.body) {
            precioTotal += producto.precio * producto.cantidad;
            cantidadTotal = cantidadTotal + parseFloat(producto.cantidad);
            const prod = await getProductoById(producto.id_producto)
            const nombre = prod[0].nombre;
            descripcion += `${producto.cantidad}Kg: ${nombre}\n`;



        }




        //
        pedido.precio_total = precioTotal;
        pedido.cantidad = cantidadTotal;
        pedido.descripcion = descripcion;

        await nuevoPedido(pedido);
        res.json(req.body)
    } catch (error) {
        res.json({ error: error.message })
    }
});

//PETICION PARA AGREGAR PRODUCTOS A UN PEDIDO
router.post('/nuevoPedido', async (req, res) => {
    try {
        const prodPedido = await addProdPedido(req.body);
        console.log(req.body);
        res.json(prodPedido);
    } catch (error) {
        res.json({ error: error.message })
    }
})

//PETICION PARA CAMBIAR PEDIDO A REALIZADO
router.put('/realizados', async (req, res) => {
    try {
        const changePedido = await changeToRealizado(req.body.id_pedido);
        console.log(req.body);
        res.json({ changePedido })

    } catch (error) {
        res.json({ error: error.message })
    }
})



module.exports = router