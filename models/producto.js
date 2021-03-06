//METODO PARA OBTENER TODOS LOS PRODUCTOS

function getAllProductos() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM gknhsgxnv7hln1y2.productos', (error, rows) => {
            if (error) return reject(error);
            resolve(rows)
        })
    })
};

// METODO PARA OBTENER UN PRODUCTO POR ID
function getProductoById(pProductoId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM gknhsgxnv7hln1y2.productos WHERE id_prod=?',
            [pProductoId],
            (error, row) => {
                if (error) return reject(error)
                resolve(row)
            })
    })
};

//METODO PARA INLCUIR UN PRODUCTO EN FAVORITOS
function insertFavorito({ fk_id_cliente, fk_id_producto }) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO gknhsgxnv7hln1y2.tbi_cliente_producto (fk_id_cliente, fk_id_producto) VALUES (?,?)',
            [fk_id_cliente, fk_id_producto],
            (error, result) => {
                if (error) { reject(error) }
                else {
                    resolve(result)
                    /* console.log(result); */
                }

            })
    })
};

//METODO PARA OBTENER LOS PRODUCTOS FAVORITOS DE UN CLIENTE
function getProdFav(fk_id_cliente) {
    return new Promise((resolve, reject) => {
        db.query('SELECT clientes.id_cliente, productos.* FROM clientes INNER JOIN tbi_cliente_producto ON clientes.id_cliente = tbi_cliente_producto.fk_id_cliente INNER JOIN productos ON tbi_cliente_producto.fk_id_producto = productos.id_prod ORDER by tbi_cliente_producto.fk_id_cliente',
            [fk_id_cliente],
            (error, rows) => {
                if (error) { return reject(error) }
                else {
                    resolve(rows);
                    console.log(rows);
                }
            })
    })
};

//METODO PARA ELIMINAR PRODUCTO DE FAVORITOS
function removeFav(pId) {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM gknhsgxnv7hln1y2.tbi_cliente_producto WHERE id=?',
            [pId],
            (error, result) => {
                if (error) { reject(error) }
                else {
                    resolve(result);
                    console.log(result);
                }
            })
    })
};

//METODO PARA OBTENER EL ID DE UN FAVORITO
function getIdFav({ fk_id_cliente, fk_id_producto }) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM gknhsgxnv7hln1y2.tbi_cliente_producto WHERE fk_id_cliente=? AND fk_id_producto=?',
            [fk_id_cliente, fk_id_producto],
            (error, result) => {
                if (error) { return reject(error) }
                else { resolve(result) }
            })
    })
};

//METODO PARA AÑADIR NUEVO PRODUCTO
function addProducto({ nombre, precio, disponibilidad, est, imagen, descripcion }) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO gknhsgxnv7hln1y2.productos (nombre,precio,disponibilidad,est,imagen,descripcion) VALUES (?,?,?,?,?,?)',
            [nombre, precio, disponibilidad, est, imagen, descripcion],
            (error, result) => {
                if (error) { return reject(error) }
                else {
                    resolve(result)
                    console.log(result);
                }
            })
    })

};

//METODO PARA AGREGAR UN NUEVO PRODUCTO A EL CARRITO A TRAVES DEL ID_CLIENTE

const productoSelect = ({ fk_id_producto, fk_id_pedido, cantidad }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into gknhsgxnv7hln1y2.tbi_pedido_producto (fk_id_producto, fk_id_pedido, cantidad) values (?,?,?)',
            [fk_id_producto, fk_id_pedido, cantidad], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                    console.log(result);
                }
            })

    })

};

//METODO PARA ACTUALIZAR LA DISPONIBILIDAD DE PRODUCTO
function newDisponibilidad({ disponibilidad, id_prod }) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE gknhsgxnv7hln1y2.productos SET disponibilidad=? WHERE id_prod=?',
            [disponibilidad, id_prod],
            (error, rows) => {
                if (error) {
                    return reject(error)
                } else {
                    resolve(rows)
                    console.log(rows);
                }
            }
        )
    })
};


//METODO PARA ACTUALIZAR DATOS DE UN PRODUCTO
function editProd({ id_prod, precio, disponibilidad }) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE gknhsgxnv7hln1y2.productos SET productos.precio=?, productos.disponibilidad=? WHERE productos.id_prod=?',
            [precio, disponibilidad, id_prod],
            (error, row) => {
                if (error) { return reject(error) }
                else {
                    resolve(row);
                    console.log(row);
                }
            }
        )
    })
};


module.exports = { getAllProductos, getProductoById, insertFavorito, getProdFav, getIdFav, removeFav, addProducto, newDisponibilidad, editProd }
