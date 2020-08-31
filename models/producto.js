//METODO PARA OBTENER TODOS LOS PRODUCTOS

function getAllProductos() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM ifruit.productos', (error, rows) => {
            if (error) return reject(error);
            resolve(rows)
        })
    })
};


module.exports = { getAllProductos }