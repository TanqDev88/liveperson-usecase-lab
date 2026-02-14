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
