var WHITELIST_PHONES_IA = [
    '5493547598775',
    '5491127711369',
    '5491137557078',
];

function isWhiteList() {
    var res = false;
    for (var e in WHITELIST_PHONES) {
        if (WHITELIST_PHONES[e] == getTelefonoFromBot()) res = true;
    }
    return res;
}

function isWhiteListIA() {
    if (
        isEmpleado() ||
        isMercadoAbierto() ||
        WHITELIST_PHONES_IA.indexOf(getTelefonoFromBot()) !== -1
    ) {
        return true;
    }
    return false;
}

function isEmpleado() {
    var cliente = get_clienteData();
    logDebug('ClientData en isEmpleado', cliente);
    return cliente && cliente.clasificacion && cliente.clasificacion.subsegmento === '09';
}

function isMercadoAbierto() {
    var cliente = get_clienteData();
    logDebug('ClientData en isMercadoAbierto', cliente);

    if (!cliente || !cliente.clasificacion) return false;

    var segmento = cliente.clasificacion.segmento;
    var subsegmento = cliente.clasificacion.subsegmento;

    var SUBSEGMENTOS_MERCADO_ABIERTO = [
        '15', '19', '20', '21', '22',
        '24', '57', '62', '67', '91', '102'
    ];

    return segmento === '04' &&
           SUBSEGMENTOS_MERCADO_ABIERTO.indexOf(subsegmento) !== -1;
}