const { get } = require("../routes");

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
        db.query('SELECT * FROM ifruit.gestion_pedidos WHERE entregado="no"', (error, rows) => {
            if (error) return reject(error);
            resolve(rows)
        })
    })
};

//METODO PARA CREAR UN NUEVO PEDIDO

const nuevoPedido = ({ id_pedido, cantidad, fecha_entrega, precio_total, id_cliente }) => {

    return new Promise((resolve, reject) => {
        db.query('insert into pedidos(id_pedido, cantidad, fecha_entrega, precio_total, id_cliente values(?,?,?,?,?))',
            [id_pedido, cantidad, fecha_entrega, precio_total, id_cliente], (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
    });

}

//METODO PARA OBTENER TODO EL LISTADO DE CLIENTES

function getAllClientes() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM ifruit.clientes', (error, rows) => {
            if (error) return reject(error);
            resolve(rows);
        })
    })
};


module.exports = { getAllPedidosAdmin, getAllClientes, getAllPedidos, nuevoPedido }