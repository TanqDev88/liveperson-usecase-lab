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