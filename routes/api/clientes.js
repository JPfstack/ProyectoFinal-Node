const express = require('express');
const router = express.Router();

const { registroCliente, getClienteById, getAllPedidosClientes } = require('../../models/cliente');


//PETICION REGISTRAR NUEVO CLIENTE
router.post('/', async (req, res) => {
  try {
    const result = await registroCliente(req.body);
    console.log(result);
    res.json({ sucess: 'Cliente registrado' })
  } catch (error) {
    res.json({ error: error.message })
  }
});


//PETICION OBTENER DATOS DE UN CLIENTE
router.get('/:clienteId', async (req, res) => {
  try {
    const detalleCliente = await getClienteById(req.params.clienteId);
    res.json(detalleCliente);
  } catch (error) {
    res.json({ error: error.message })
  }
});


//PETICION OBTENER TODOS LOS PEDIDOS DE UN CLIENTE
router.post('/:clienteId', async (req, res) => {
  try {
    const historicoPedidos = await getAllPedidosClientes(req.params.clienteId);
    res.json(historicoPedidos);
  } catch (error) {
    res.json({ error: error.message })
  }
});

module.exports = router;
