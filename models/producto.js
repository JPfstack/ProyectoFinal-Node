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
                    console.log(result);
                }

            })
    })
};



module.exports = { getAllProductos, getProductoById, insertFavorito }