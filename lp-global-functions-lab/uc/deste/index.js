var WHITELIST_PHONES_OPERADOR_DESVINCULACION = [
    '5491159575878',
    '5491170355625',
    '5491158396301',
    '5491156262039',
    '5491123449456',
    '5492396487226',
    '5491157281705'
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
    resetVars_DESTE();
    if (!isWhiteListOperadorDesvinculacion()) {
        goNext('T_Funcionalidad apagada @DESTE');
        return;
    }

    goNext('Q_Solicitud DNI y genero @DESTE');
}

//**                                            MANEJO DNI + GENERO                                                                      **


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

function api_integration_desvincularNumeroTercero_DESTE_postProcessMessage() {
    try {
        var httpCode = Number(get_universalStatusCode());
        if (isApiExecutionFail()) {
            logDebug('FALLO LA INTEGRACION Desvinculacion tercero');
            logDebug('HTTP CODE:', Number(httpCode));
            switch (httpCode) {
                case 409:
                    logDebug('RESPUESTA 409 - No se encuentra vinculación con el DNI proporcionado.');
                    goNext('T_Cliente sin numero telefonico @DESTE');
                    break;

                case 401:
                    logDebug('ERROR 401');
                    goNext('T_Error en desvinculacion @DESTE');
                    break;

                case 500:
                    logDebug('ERROR 500 - Falla técnica');
                    goNext('T_Error en desvinculacion @DESTE');
                    break;

                default:
                    logDebug('ERROR inesperado');
                    goNext('T_Error en desvinculacion @DESTE');
            }

        } else {
            logDebug('SE DESVINCULÓ EXITOSAMENTE, código:', httpCode);
            goNext('T_Desvinculacion exitosa @DESTE');
        }

    } catch (error) {
        logDebug('Error inesperado', error);
        goNext('T_Error en desvinculacion @DESTE');
    }
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