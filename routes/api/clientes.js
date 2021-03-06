const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const { registroCliente, getClienteById, getAllPedidosClientes, getIdByEmail, editCliente } = require('../../models/cliente');


//PETICION PARA OBTENER ID A PARTIR DEL TOKEN
router.post('/token', async (req, res) => {

  console.log(process.env.SECRET_KEY)
  console.log('HOLA')
  const payload = jwt.verify(req.body.token, process.env.SECRET_KEY);
  console.log(payload)

  console.log(payload.clienteId);
  res.json({ userid: payload.clienteId })

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


//PETICION REGISTRAR NUEVO CLIENTE
router.post('/', async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    const result = await registroCliente(req.body);
    const nuevoCliente = await getClienteById(result['insertId']);
    res.json(nuevoCliente)
  } catch (error) {
    res.json({ error: error.message })
  }
});


//PETICION LOGIN DEL CLIENTE POR EMAIL
router.post('/login', async (req, res) => {
  try {
    const cliente = await getIdByEmail(req.body.email);
    /* console.log(cliente); */
    if (cliente) {
      const passOK = bcrypt.compareSync(req.body.password, cliente.password);
      if (passOK) {
        console.log('juan', passOK);
        res.json({ success: 'Login OK', cliente, token: createToken(cliente) });

      } else {
        res.json({ error: error.message });
      }
    } else {
      res.json(error.message);
    }
  } catch (error) {
    res.json(error.message);
  }
});

//PETICION OBTENER TODOS LOS PEDIDOS DE UN CLIENTE
router.get('/pedidos/:clienteId', async (req, res) => {
  try {
    const historicoPedidos = await getAllPedidosClientes(req.params.clienteId);
    console.log(req.params.clienteId);
    console.log(historicoPedidos);
    res.json(historicoPedidos);
  } catch (error) {
    res.json({ error: error.message })
  }
});

//PETICION ACTUALIZAR DATOS CLIENTE
router.put('/', async (req, res) => {
  try {
    const result = await editCliente(req.body);
    /*    console.log(result); */
    res.json(result);
  } catch (error) {
    res.json({ error: error.message })
  }
});


// TOKEN
function createToken(pCliente) {
  const payload = {
    clienteId: pCliente.id_cliente,
    createdAt: moment().unix(),
    expiredAt: moment().add(15, 'minutes').unix(),

  }
  /*   console.log(pCliente.id_cliente, payload.clienteId);
   */
  return jwt.sign(payload, 'En un lugar de la Mancha');
};


module.exports = router;
