//METODO PARA OBTENER TODO EL LISTADO DE PEDIDOS PENDIENTES DE ENTREGA

function getAllPedidosAdmin() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM ifruit.gestion_pedidos WHERE entregado="no"', (error, rows) => {
            if (error) return reject(error);
            resolve(rows)
        })
    })
};

//METODO PARA OBTENER TODO EL LISTADO DE CLIENTES

function getAllClientes() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM ifruit.clientes', (error, rows) => {
            if (error) return reject(error);
            resolve(rows);
        })
    })
};


module.exports = { getAllPedidosAdmin, getAllClientes }