//METODO PARA REGISTRAR NUEVO CLIENTE
function registroCliente({ nombre, apellidos, telefono, direccion, email, password }) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO ifruit.clientes (nombre,apellidos,telefono,direccion,email,password) VALUES (?,?,?,?,?,?)',
            [nombre, apellidos, telefono, direccion, email, password],
            (error, result) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                } else {
                    resolve(result);
                    console.log(result);
                }
            })
    })
};

//METODO PARA OBTENER LOS DATOS DE UN CLIENTE
function getClienteById(pClienteId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM ifruit.clientes WHERE id_cliente=?',
            [pClienteId],
            (error, rows) => {
                if (error) { return reject(error) }
                if (rows.length === 0) { resolve(null) }
                else {
                    resolve(rows[0]);
                }
            })
    })
};

//METODO PARA OBTENER EL HISTORICO DE PEDIDOS DE UN CLIENTE
function getAllPedidosClientes(pClienteId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM ifruit.pedidos WHERE id_cliente=?',
            [pClienteId],
            (error, rows) => {
                if (error) { return reject(error) }
                if (rows.length === 0) { resolve(null) }
                else {
                    resolve(rows);
                    console.log(rows);
                }
            })
    })
};

//METODO PARA LOGIN, OBTENER EL ID DE UN CLIENTE A PARTIR DEL EMAIL
function getIdByEmail(pEmail) {
    return new Promise((resolve, reject) => [
        db.query('SELECT * FROM ifruit.clientes WHERE email=?',
            [pEmail],
            (error, rows) => {
                if (error) { return reject(error) }
                if (rows.length !== 1) { resolve(null) }

                resolve(rows[0]);
                console.log(rows[0])
            })
    ])
};

//METODO PARA EDITAR DATOS DE UN CLIENTE
function editCliente({ nombre, apellidos, direccion, telefono, email, id_cliente }) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE ifruit.clientes SET nombre=?, apellidos=?, direccion=?, telefono=?, email=? WHERE id_cliente=?',
            [nombre, apellidos, direccion, telefono, email, id_cliente],
            (error, result) => {
                if (error) { return reject(error) }
                else {
                    resolve(result)
                    console.log(result)
                }
            })
    })
};


module.exports = { registroCliente, getClienteById, getAllPedidosClientes, getIdByEmail, editCliente }