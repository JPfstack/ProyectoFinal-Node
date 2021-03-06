const express = require('express');
const router = express.Router();

const { getAllProductos, getProductoById, insertFavorito, getProdFav, productoSelect, getIdFav, removeFav, addProducto, newDisponibilidad, editProd } = require('./../../models/producto');


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
        console.log(req.body);
        console.log(result['fk_id_producto']);
        res.json(result)
    } catch (error) {
        res.json({ error: error.message })
    }
});

//PETICION PARA ELIMINAR UN PRODUCTO DE FAVORITOS
router.delete('/favoritos/id/:id', async (req, res) => {
    try {
        const result = await removeFav(req.params.id);
        console.log(req.params);
        console.log(result);
        if (result['affectedRows'] === 1) {
            res.json({ sucess: 'Borrado' });
        } else {
            res.json({ error: 'No borrado, comprobar ID' })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
});

//PETICION PARA OBTENER EL ID DE UN FAVORITO
router.post('/favoritos/id', async (req, res) => {
    try {
        const result = await getIdFav(req.body);
        console.log(result);
        res.json(result)
    } catch (error) {
        res.json({ error: error.message })
    }
});


//PETICION PARA INCLUIR UN NUEVO PRODUCTO
router.post('/', async (req, res) => {
    try {
        const newProd = await addProducto(req.body)
        console.log(newProd);
        res.json({ sucess: 'Producto incluido' })
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



//PETICION PARA ACTUALIZAR LA DISPONIBILIDAD DE PRODUCTOS CADA VEZ QUE SE REALIZA UN PEDIDO
router.put('/edit', async (req, res) => {
    try {
        let cantidadActual;
        let cantidadComprada;
        let newDisponible;
        for (let prod of req.body) {
            const detalleProducto = await getProductoById(prod.id_producto);
            cantidadActual = parseFloat(detalleProducto[0].disponibilidad);
            const id_prod = prod.id_producto;
            cantidadComprada = parseFloat(prod.cantidad);
            console.log(cantidadComprada);

            const disponibilidad = (cantidadActual - cantidadComprada);
            console.log(newDisponible);

            const newDisp = await newDisponibilidad({ disponibilidad, id_prod });
            console.log(newDisp);


        }


        res.json(req.body)


    } catch (error) {
        res.json({ error: error.message })
    }
});

//PETICION PARA ACTUALIZAR PRECIO Y DISPONIBILIDAD DE UN PRODUCTO
router.put('/editprecio', async (req, res) => {
    try {
        const prodEditado = await editProd(req.body);
        console.log(prodEditado);
        console.log(req.body);
        res.json(prodEditado)
    } catch (error) {
        res.json({ error: error.message })
    }
});

module.exports = router;





