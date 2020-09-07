const express = require('express');
const router = express.Router();

const { registroCliente, getClienteById, getAllPedidosClientes, getIdByEmail } = require('../../models/cliente');

//PETICION OBTENER DATOS DE UN CLIENTE
router.get('/:clienteId', async (req, res) => {
  try {
    const detalleCliente = await getClienteById(req.params.clienteId);
    res.json(detalleCliente);
  } catch (error) {
    res.json({ error: error.message })
  }
});


//PETICION REGISTRAR NUEVO CLIENTE
router.post('/', async (req, res) => {
  try {
    const result = await registroCliente(req.body);
    console.log(result);
    const nuevoCliente = await getClienteById(result['insertId']);
    console.log(nuevoCliente);
    res.json(nuevoCliente)
  } catch (error) {
    res.json({ error: error.message })
  }
});


//PETICION LOGIN DEL CLIENTE POR EMAIL
router.post('/login', async (req, res) => {
  try {
    const cliente = await getIdByEmail(req.body.email);
    console.log(req.body.password)
    console.log(cliente.password)
    if (req.body.password == cliente.password) {
      res.json(cliente);
    } else {
      res.json({ error: error.message });
    }
  } catch (error) {
    console.log(error);
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
