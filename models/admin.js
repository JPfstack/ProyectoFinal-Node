
//METODO PARA OBTENER TODO EL LISTADO DE CLIENTES

function getAllClientes() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM gknhsgxnv7hln1y2.clientes', (error, rows) => {
            if (error) return reject(error);
            resolve(rows);
        })
    })
};


module.exports = { getAllClientes }