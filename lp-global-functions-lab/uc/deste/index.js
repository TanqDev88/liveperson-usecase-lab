var WHITELIST_PHONES_OPERADOR_DESVINCULACION = [
    '5491159575879',
    '5491130000002'
];
function isWhiteListOperadorDesvinculacion() {
    var res = false;
    for (var e in WHITELIST_PHONES_OPERADOR_DESVINCULACION) {
        if (WHITELIST_PHONES_OPERADOR_DESVINCULACION[e] == getTelefonoFromBot()) {
            res = true;
        }
    }
    return res;
}
function T_Intro__DESTE_preProcessMessage() {

    if (!isWhiteListOperadorDesvinculacion()) {
        goNext('T_Error en desvinculacion @DESTE');//Esta interaccion esta incorrecta solo es para probar el listado de nuemeros
        return;
    }
    goNext('Q_Solicitud_DNI__DESTE');
}
function obtenerDniYGeneroDesdeString(input) {
    if (!input || typeof input !== 'string') {
        return null;
    }
  
    var valor = input.replace(/\s+/g, '').replace('-', '').trim();

    var match = valor.match(/^(\d{7,8})([a-zA-Z])$/);

    if (!match) {
        return null;
    }

    return {
        dniNumerico: match[1],
        genero: match[2].toUpperCase()
    };
}
function setDatosPersonales_DESTE() {
    var data = getBotVar('dataTercero');

    if (!data) {
        logDebug('dataTercero no existe');
        return;
    }

    setBotVar('nombre_DESTE', data.nombre);
    setBotVar('apellido_DESTE', data.apellido);
}
function B_ClienteEncontrado_DESTE_postprocessMessage() {
    var input = getUserMessage();
    if (compareIgnoreCaseAndSpaces(input, 'Sí, desvincular')) {
        logInfo('Si, desvincularrr.');
        goNext('Q_Solicitud de numero de reclamo @DESTE'); 
        return;
    }
}


function resetVars_DESTE() {
    setBotVar('dataTercero', '');
    setBotVar('nombre_DESTE', '');
    setBotVar('apellido_DESTE', '');
}