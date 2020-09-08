const router = require("../routes");

//METODO PARA OBTENER TODOS LOS PEDIDOS
function getAllPedidos() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM ifruit.pedidos', (error, rows) => {
            if (error) return reject(error);
            resolve(rows);
        })
    })
}

//METODO PARA OBTENER TODO EL LISTADO DE PEDIDOS PENDIENTES DE ENTREGA

function getAllPedidosAdmin() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM ifruit.pedidos WHERE estado="pendiente"', (error, rows) => {
            if (error) return reject(error);
            resolve(rows)
        })
    })
};

//METODO PARA OBTENER LOS PEDIDOS REALIZADOS

function getAllPedidoRealizado() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM ifruit.pedidos WHERE estado="realizado"', (error, rows) => {
            if (error) return reject(error);
            resolve(rows)
        })
    })
};


//METODO PARA CREAR UN NUEVO PEDIDO DESDE EL CLIENTE

const nuevoPedido = ({ cantidad, fecha_entrega, precio_total, id_cliente, direccion, descripcion }) => {

    return new Promise((resolve, reject) => {
        db.query('insert into ifruit.pedidos (cantidad, fecha_entrega, precio_total, id_cliente, direccion, descripcion) values (?,?,?,?,?,?)',
            [cantidad, fecha_entrega, precio_total, id_cliente, direccion, descripcion], (error, result) => {
                if (error) {
                    return reject(error);
                } else {
                    resolve(result);
                    console.log(result.insertId);
                }

            });
    });

}



module.exports = { getAllPedidos, getAllPedidosAdmin, getAllPedidoRealizado, nuevoPedido }
