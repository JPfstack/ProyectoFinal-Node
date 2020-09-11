//METODO PARA OBTENER TODOS LOS PRODUCTOS

function getAllProductos() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM ifruit.productos', (error, rows) => {
            if (error) return reject(error);
            resolve(rows)
        })
    })
};

// METODO PARA OBTENER UN PRODUCTO POR ID
function getProductoById(pProductoId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM ifruit.productos WHERE id_prod=?',
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
        db.query('INSERT INTO ifruit.tbi_cliente_producto (fk_id_cliente, fk_id_producto) VALUES (?,?)',
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
function removeFav(fk_id_cliente, fk_id_producto) {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM ifruit.tbi_cliente_producto WHERE fk_id_cliente=? AND fk_id_producto=?',
            [fk_id_cliente, fk_id_producto],
            (error, result) => {
                if (error) { return reject(error) }
                else {
                    resolve(result);
                }
            })
    })
};


module.exports = { getAllProductos, getProductoById, insertFavorito, getProdFav, removeFav }