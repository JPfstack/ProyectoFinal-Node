//IMPORTAMOS LA LIBRERIA MYSQL

const mysql = require('mysql');

//CREAMOS EL METODO CONNECT PARA CREAR EL POOL DE CONEXIONES CON LOS DATOS DE CONEXION
const connect = () => {
    const pool = mysql.createPool({
        host: "f80b6byii2vwv8cx.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
        user: "o33xhoqfat1zhbb5",
        password: "ttu80e9u0ib26hws",
        port: 3306,
        database: "gknhsgxnv7hln1y2"
    });

    //VARIABLE GLOBAL PARA UTILIZAR EL POOL EN CUALQUIER LUGAR DEL CODIGO
    global.db = pool;
};

//EXPORTAMOS EL METODO PARA TENERLO DISPONIBLE EN LA APLICACION
module.exports = { connect }