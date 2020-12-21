const router = require("../routes");

//METODO PARA OBTENER TODOS LOS PEDIDOS
function getAllPedidos() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM gknhsgxnv7hln1y2.pedidos ORDER BY pedidos.estado', (error, rows) => {
            if (error) return reject(error);
            resolve(rows);
        })
    })
}

//METODO PARA OBTENER TODO EL LISTADO DE PEDIDOS PENDIENTES DE ENTREGA

function getAllPedidosAdmin() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM gknhsgxnv7hln1y2.pedidos WHERE estado="pendiente"', (error, rows) => {
            if (error) return reject(error);
            resolve(rows)
        })
    })
};

//METODO PARA OBTENER LOS PEDIDOS REALIZADOS

function getAllPedidoRealizado() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM gknhsgxnv7hln1y2.pedidos WHERE estado="realizado"', (error, rows) => {
            if (error) return reject(error);
            resolve(rows)
        })
    })
};


//METODO PARA CREAR UN NUEVO PEDIDO DESDE EL CLIENTE

const nuevoPedido = ({ cantidad, fecha_entrega, precio_total, id_cliente, direccion, descripcion, estado }) => {

    return new Promise((resolve, reject) => {
        db.query('insert into gknhsgxnv7hln1y2.pedidos (cantidad, fecha_entrega, precio_total, id_cliente, direccion, descripcion, estado) values (?,?,?,?,?,?,?)',
            [cantidad, fecha_entrega, precio_total, id_cliente, direccion, descripcion, estado], (error, result) => {
                if (error) {
                    return reject(error);
                } else {
                    resolve(result);
                    console.log(result.insertId);
                }

            });
    });

};

//METODO PARA AGREGAR PRODUCTOS A UN PEDIDO
const addProdPedido = ({ fk_id_producto, fk_id_pedido, cantidad }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into gknhsgxnv7hln1y2.tbi_pedido_producto (fk_id_producto, fk_id_pedido, cantidad) values (?,?,?)', [
            fk_id_producto, fk_id_pedido, cantidad], (error, result) => {
                if (error) {
                    return reject(error);
                } else {
                    resolve(result);
                    console.log(result);
                }
            })
    })
}

//METODO PARA CAMBIAR UN PEDIDO DE PENDIENTE A REALIZADO
function changeToRealizado(id_pedido) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE gknhsgxnv7hln1y2.pedidos SET pedidos.estado = "realizado" WHERE id_pedido=?',
            [id_pedido],
            (error, result) => {
                if (error) { return reject(error) }
                else {
                    resolve(result)
                    console.log(result);
                }
            })

    })

};




module.exports = { getAllPedidos, getAllPedidosAdmin, getAllPedidoRealizado, nuevoPedido, changeToRealizado, addProdPedido }
