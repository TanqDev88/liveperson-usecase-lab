function __initConversation() {
    try {
        setSessionData();
        set_bio_operacion(BIO_OPERACION_RESET);
        initNamepsaceForUser(USER_DATA_NAMESPACE, TTL_NAMESPACES);
        initNamepsaceForUser(GENERAL_NAMESPACE, TTL_GENERAL_NAMESPACE);
        load_user_from_namespace();
    } catch (error) {
        logDebug(error);
    }
}

function setSessionData() {
    setBotVar('env', ENV);
    setBotVar('env_bot_cb'.ENV_BOT_CB);
    setBotVar('botId', botContext.getChatBotId());
    setBotVar('userId', botContext.getUserPlatformId());
    setBotVar('conversationId', botContext.getConversationId());
}
function set_bio_operacion(bioOperacionReset) {
    setBotVar('bio_operacion', bioOperacionReset);
}
function load_user_from_namespace() {
    try {
        logInfo('INICIO - CARGA DE DATOS DEL CLIENTE DESDE EL NAMESPACE');
        var namespace = botContext.getContextDataForUser(USER_DATA_NAMESPACE);
        saveTelefonoToBot();
        resetGender();
        if (namespace === null) {
            logInfo('USER_DATA_NAMESPACE VACIO');
            return;
        }

        var cliente = namespace.bio_data ? namespace.bio_data : getDataFromNamespace(USER_DATA_NAMESPACE, 'bio_data');

        if (cliente) {
            logDebug('DATOS PERSONALES CLIENTE FROM LOAD', cliente);
            set_varsBioDataCliente(JSON.parse(cliente));

            var bio_refresh_token = namespace.bio_refresh_token ? namespace.bio_refresh_token : getDataFromNamespace(USER_DATA_NAMESPACE, 'bio_refresh_token');
            var bio_access_token = namespace.bio_access_token ? namespace.bio_access_token : getDataFromNamespace(USER_DATA_NAMESPACE, 'bio_access_token');
            var genero = namespace.genero ? namespace.genero : getDataFromNamespace(USER_DATA_NAMESPACE, 'genero');

            set_bioRefreshToken(JSON.parse(bio_refresh_token));
            set_bioAccessToken(JSON.parse(bio_access_token));
            set_clienteGenero(JSON.parse(genero));

            logInfo('FIN - CARGA DE DATOS DEL CLIENTE DESDE EL NAMESPACE');
        } else {
            logInfo('EL CLIENTE NO TIENE DATOS PERSONALES GUARDADOS');
        }
    } catch (error) {
        logDebug('FALLO LA CARGA DE DATOS DEL CLIENTE DESDE EL NAMESPACE', error);
    }
}

function set_varsBioDataCliente(cliente) {
    try {
        set_clienteData(cliente);
        setNombreUsuario(cliente);
        set_nombreYapellidoUI(cliente);
        set_documento_tributario(cliente.documento_tributario);
        setNroDocumento(cliente.documento_tributario.split('').slice(2, -1).join(''));
        set_clienteState(cliente.state);
        var bioClient_hash = isEmpty(cliente.referencias.client_hash) ? '' : cliente.referencias.client_hash;
        set_clientHash(bioClient_hash);
        var bioClient_id = isEmpty(cliente.referencias.client_id) ? '' : cliente.referencias.client_id;
        set_clientId(bioClient_id);
        setEnroladoBiometria(cliente.enroladobiometria);
    } catch (error) {
        logDebug(error);
    }
}

// Setters & Getters telefonoUsuario
function saveTelefonoToBot() {
    var customerInfo = botContext.getLPCustomerInfo();
    if (customerInfo) {
        var customerId = customerInfo.customerId.split('_');
        setBotVar('telefonoUsuario', customerId[2]);
        setBotVar('telefonoUsuarioUI', customerId[2].slice(3));
    }
}
function getTelefonoFromBot() {
    return getBotVar('telefonoUsuario');
}

// Setters & Getters genero
function get_clienteGenero() {
    return getBotVar('genero');
}
function resetGender() {
    setBotVar('genero', '');
}
function set_clienteGenero(genero) {
    return setBotVar('genero', genero);
}
// Setters & Getters ErrorSubCode
function set_subCodeError(val) {
    var codeInfo = validateText(val);
    setBotVar('ErrorSubCode', codeInfo);
}
function reset_subCodeError() {
    setBotVar('ErrorSubCode', '');
}
// Setters & Getters clienteData
function set_clienteData(cliente) {
    return setBotVar_v2('clienteData', cliente);
}
function get_clienteData() {
    return getBotVar_v2('clienteData');
}
function reset_clienteData() {
    return setBotVar_v2('clienteData', '');
}
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

function api_integration_identificacion_universal_terceros_DESTE() {
    try {

        var input = getUserMessage();
        var datos = obtenerDniYGeneroDesdeString(input);

        if (!datos) {
            goNext('B_Input invalido @DESTE');
            return;
        }

        // Setear directamente las variables que usa la integración
        setBotVar('terceroDNI_JUPRO', datos.dniNumerico);
        setBotVar('terceroGenero_JUPRO', datos.genero);

        logDebug('DNI Y GENERO VALIDADOS CORRECTAMENTE');

    } catch (error) {
        logDebug(error);
        goNext('T_Error generico identificacion @DESTE');
    }
}


// api_integration_identificacion_universal_terceros 
function api_integration_identificacion_universal_terceros_DESTE_postProcessMessage() {
    try {

        if (isApiExecutionFail()) {
            logDebug('FALLÓ LA INTEGRACION IDENTIFICACION - DESTE');
            goNext('T_Error generico identificacion @DESTE');
            return;
        }

        var httpCode = Number(get_universalStatusCode());
        logDebug('HTTP CODE IDENTIFICACION: ' + httpCode);

        if (httpCode === 200) {

    setDatosPersonales_DESTE();

    goNext('B_Cliente encontrado @DESTE');
    return;
}

        if (httpCode === 404) {
            logDebug('SIN DATO - DNI NO ENCONTRADO');
            goNext('B_Sin dato @DESTE');
            return;
        }

        if (httpCode === 403) {
            logDebug('TELEFONO EN BLACKLIST');
            goNext('T_Telefono en blacklist @DESTE');
            return;
        }

        if (httpCode === 400 || 
            httpCode === 401 || 
            httpCode === 412 || 
            httpCode === 500) {

            logDebug('ERROR IDENTIFICACION - HTTP ' + httpCode);
            goNext('T_Error generico identificacion @DESTE');
            return;
        }

        logDebug('CODIGO NO MAPEADO - ERROR GENERICO');
        goNext('T_Error generico identificacion @DESTE');

    } catch (error) {
        logDebug(error);
        goNext('T_Error generico identificacion @DESTE');
    }
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