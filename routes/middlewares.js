const jwt = require('jsonwebtoken');
const moment = require('moment');

const { getClienteById } = require('../models/cliente')

const checkToken = async (req, res, next) => {

    //1. COMPRUEBO SI LA CABECERA EXISTE
    if (!req.headers['authorization']) {
        return res.status(401).json({ error: 'Es necesaria la cabecera de autorizacion' })
    }

    //2. COMPRUEBO SI EL TIPO DE AUTHORIZATION ES BEARER
    // CREO UNA VARIABLE PARA TRABAJAR MAS COMODAMENTE Y PARTO CON UN SPLIT LA AUTHORIZATION, DADO QUE VENDRA CON EL FORMATO BEARER TOKEN (SEPARADO POR UN ESPACIO)
    const value = req.headers['authorization'];
    const splitValue = value.split(" ");

    if (splitValue.length !== 2 || splitValue[0] !== 'Bearer') {
        return res.status(401).json({ error: 'El valor de la cabecera no tiene el formato correcto', splitValue: splitValue });
    }

    //3. COMPRUEBO SI EL TOKEN ES CORRECTO, ESTO IMPLICA QUE SE PUEDA DESENCRIPTAR  
    const token = splitValue[1];
    const payload = {};

    //DE ESTA FORMA DESENCRIPTAMOS EL TOKEN
    try {
        payload = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        return res.status(401).json({ error: 'El formato del TOKEN es incorrecto' })
    }

    //4. COMPRUEBO SI EL TOKEN ESTA CADUCADO
    const fechaActual = moment().unix();
    if (fechaActual > payload.expiredAt) {
        return res.status(401).json({ error: 'El TOKEN está caducado' })
    }

    //5. RECUPERAMOS EL USUSARIO
    const cliente = await getClienteById(payload.clienteId)

    next();
}


module.exports = { checkToken };