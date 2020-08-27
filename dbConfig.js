//IMPORTAMOS LA LIBRERIA MYSQL

const mysql = require('mysql');

//CREAMOS EL METODO CONNECT PARA CREAR EL POOL DE CONEXIONES CON LOS DATOS DE CONEXION
const connect = () => {
    const pool = mysql.createPool({
        host: "127.0.0.1",
        user: "root",
        password: "",
        port: 3306,
        database: "ifruit"
    });

    //VARIABLE GLOBAL PARA UTILIZAR EL POOL EN CUALQUIER LUGAR DEL CODIGO
    global.db = pool;
};

//EXPORTAMOS EL METODO PARA TENERLO DISPONIBLE EN LA APLICACION
module.exports = { connect }