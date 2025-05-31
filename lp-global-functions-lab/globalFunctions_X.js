// /** Simula el bot context */
// const botContext = (function () {
//   let BOTVARS = {};
//   let BOTNAMESPACE = {};
//   let BOTENV = { env: "LOCAL", env_bot_cb: "DEV", urlAlgo: "google.com" };
//   //https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
//   const LOG_COLORS = {
//     FgBlack: "\x1b[30m",
//     FgRed: "\x1b[31m",
//     FgGreen: "\x1b[32m",
//     FgYellow: "\x1b[33m",
//     FgBlue: "\x1b[34m",
//     FgMagenta: "\x1b[35m",
//     FgCyan: "\x1b[36m",
//     FgWhite: "\x1b[37m",
//     FgGray: "\x1b[90m",
//   };
//   return {
//     isContextApiEnabled: function () {
//       return true;
//     },
//     getAllContext: function () {
//       return { BOTVARS, BOTNAMESPACE };
//     },
//     setAllowMaxTextResponse: function () {},
//     getChatBotId: function () {
//       return "bot ID xxxx";
//     },
//     getUserPlatformId: function () {
//       return "getUserPlatformId ID xxxx";
//     },
//     getConversationId: function () {
//       return "612a8693-f041-4c59-9a4c-f015b2709166";
//     },
//     getLPCustomerInfo: function () {
//       return { customerId: "whatsapp_8914408_5491155555555" };
//     },
//     getUserMessage: function () {
//       console.log("Obteniendo mensaje del usuario");
//       return "Mensaje del usuario";
//     },
//     getIntent: function () {
//       console.log("Obteniendo intención del diálogo");
//       return "Intención del diálogo";
//     },
//     setBotVariable: function (arg, val) {
//       //console.log('Estableciendo variable en el contexto del bot:', arg, val);
//       BOTVARS[arg] = val;
//     },
//     getBotVariable: function (arg) {
//       //console.log('Obteniendo variable del contexto del bot:', arg);
//       return BOTVARS[arg];
//     },
//     getWebVar: function (arg) {
//       console.log("Obteniendo variable de la vista web:", arg);
//       return "Valor de la variable de la vista web";
//     },
//     setTriggerNextMessage: function (arg) {
//       console.log("Avanzando al siguiente mensaje:", arg);
//     },
//     setMessageDelay: function (arg) {
//       console.log("delay: ", arg);
//     },
//     getEnvVariable: function (arg) {
//       return BOTENV[arg];
//     },
//     registerContextNamespace: function (namespace, ttl) {
//       if (!BOTNAMESPACE[namespace]) BOTNAMESPACE[namespace] = {};
//       console.log("namespace creado", namespace);
//       return true;
//     },
//     setContextDataForUser: function (namespace, property, data) {
//       if (!BOTNAMESPACE[namespace])
//         throw new Error("No existe el namspace. Esta registrado ?");
//       BOTNAMESPACE[namespace][property] = data;
//     },
//     getContextDataForUser: function (namespace, property) {
//       if (!BOTNAMESPACE[namespace]) return null;
//       if (!property) return BOTNAMESPACE[namespace]; // si no viene propertie se devuelve todo el namespace
//       if (!BOTNAMESPACE[namespace][property]) return null;
//       return BOTNAMESPACE[namespace][property];
//     },
//     deleteContextDataForUser: function (namespace, property) {
//       if (BOTNAMESPACE[namespace] && BOTNAMESPACE[namespace][property]) {
//         delete BOTNAMESPACE[namespace][property];
//       }
//       if (namespace && !property) {
//         delete BOTNAMESPACE[namespace];
//       }
//     },
//     getGlobalContextData: function (namespace, property) {
//       if (!BOTNAMESPACE[namespace]) return null;
//       if (!property) return BOTNAMESPACE[namespace]; // si no viene propertie se devuelve todo el namespace
//       if (!BOTNAMESPACE[namespace][property]) return null;
//       return BOTNAMESPACE[namespace][property];
//     },
//     setGlobalContextData: function(namespace, property, data) {
//       if (!BOTNAMESPACE[namespace])
//         throw new Error("No existe el namspace. Esta registrado ?");
//       BOTNAMESPACE[namespace][property] = data;
//     },
//     sendMessage: function (arg) {
//       console.log(LOG_COLORS.FgCyan, arg);
//     },
//     logCustomEvent: function (event_name) {
//       console.log(LOG_COLORS.FgBlue, "Registrando evento:", event_name);
//     },
//     printDebugMessage: function (msg) {
//       console.log(LOG_COLORS.FgWhite, msg);
//     },
//     goNext: function(dialog) {
//       console.log('Next dialog: ' + dialog);
//     }

//   };
// })();

function compareIgnoreCaseAndSpaces(a, b) {
    if (a && b) return toUpperRemoveWhiteSpaces(noSymbol(a)) == toUpperRemoveWhiteSpaces(noSymbol(b));
    return false;
}
function toUpperRemoveWhiteSpaces(str) {
    if (str) return str.toUpperCase().replace(/\s/g, '');
    return str;
}
function noSymbol(str) {
    var sym = 'ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÑÇáãàäâéëèêíïìîóöòôúüùûñç';
    var clean = 'AAAAAEEEEIIIIOOOOUUUUNCaaaaaeeeeiiiioooouuuunc';

    var symArr = sym.split('');
    var cleanArr = clean.split('');
    var strArr = str.split('');
    var n = 0;
    strArr.forEach(function (e) {
        var a = e;
        var s = 0;
        symArr.forEach(function (e) {
            if (e == a) {
                strArr[n] = cleanArr[s];
            }
            s = s + 1;
        });
        n = n + 1;
    });
    str = strArr.join().replaceAll(',', '');
    return str;
}

function isEmpty(val) {
    var typeOfVal = typeof val;
    switch (typeOfVal) {
        case 'object':
            return val == null || val.length == 0 || !Object.keys(val).length || val == undefined;
        case 'string':
            var str = val.trim();
            return str == '' || str == undefined || str == 'Sin asignar' || str == ' ' || str == '""' || val == null;
        case 'number':
            return val == '' || val == ' ' || val == undefined || val == null;
        default:
            return val == '' || val == undefined || val == ' ' || val == null;
    }
}

//****************************************************************************************************************************************
//**                                            UTILS LIVE PERSON                                                                        **/
//****************************************************************************************************************************************

//* from:https://developers.liveperson.com/conversation-builder-bot-templates-global-helper-functions.html

function getUserMessage() {
    return botContext.getCurrentUserMessage();
}

function getIntent() {
    return botContext.getDialogStarterIntent();
}

function setBotVar(arg, val) {
    botContext.setBotVariable(arg, val, true, false);
}

function getBotVar(arg) {
    return botContext.getBotVariable(arg);
}

function setBotVar_v2(arg, val) {
    var varStr = val;
    if (typeof val != 'string') varStr = JSON.stringify(val);
    botContext.setBotVariable(arg, varStr, true, false);
}

function getBotVar_v2(arg) {
    var val = botContext.getBotVariable(arg);
    if (!isEmpty(val) && isObjectAsString(val)) val = JSON.parse(val);
    return val;
}

function getWebVar(arg) {
    return botContext.getWebViewVariable(arg);
}

function getEnvVar(arg) {
    return botContext.getEnvVariable(arg);
}

function setContextConv(key, value) {
    var success = botContext.setContextDataForConversation(getBotVar('contextNameSpace'), key, value);
    if (success) {
        logDebug('SETTING Context Data: Key: ' + key + '; Value: ' + value);
    } else {
        logDebug('FAILED to Set Context Data: Key: ' + key + '; Value: ' + value);
    }
}

function getContextConv(key) {
    var success = botContext.getContextDataForConversation(getBotVar('contextNameSpace'), key);
    if (success) {
        logDebug('GETTING Context Data: Key: ' + key + '; Value: ' + success);
        return success;
    } else {
        logDebug('FAILED to Get Context Data: Key: ' + key);
    }
}

function debugMsg(arg) {
    botContext.printDebugMessage(arg);
}

function debugMsg_forDEV(arg) {
    if (getEnvVar('env') == 'DEV') botContext.printDebugMessage(arg);
}

function sendMsg(arg) {
    botContext.sendMessage(arg);
}

function logEvent(event_name) {
    botContext.logCustomEvent('', event_name, '');
}

function logEventAdv(user_message, event_name, event_details) {
    botContext.logCustomEvent(user_message, event_name, event_details);
}

function goNext(arg) {
    botContext.setTriggerNextMessage(arg);
}

function setDelay(arg) {
    botContext.setMessageDelay(arg);
}
function isApiExecutionSuccessful() {
    return botContext.isApiExecutionSuccessful();
}
function isApiExecutionFail() {
    return !botContext.isApiExecutionSuccessful();
}

function setBotTransferUserMessage(msg) {
    return botContext.setBotTransferUserMessage(msg);
}

// recibe una respuesta de FaaS y devuelve false si la llamada fue exitosa, y devuelve false y setea la variable universalStatusCode en el caso contrario.
function universalErrorHandler_FaaS(res) {
    set_universalStatusCode('');
    reset_subCodeError();
    if (res.success) {
        set_universalStatusCode(200);
        return false;
    }
    logInfo('Error', JSON.stringify(res.error));
    set_universalStatusCode(res.error.code_http);
    return true;
}

function set_universalStatusCode(code) {
    setBotVar_v2('universalStatusCode', '');
    return setBotVar_v2('universalStatusCode', code);
}

function get_universalStatusCode() {
    return getBotVar_v2('universalStatusCode');
}

//recibe un string y deja en mayusculas la prima letra de cada palabra
function capitalizarFrase(frase) {
    return frase
        .toLowerCase()
        .split(' ')
        .map(function (palabra) {
            return palabra.charAt(0).toUpperCase() + palabra.slice(1);
        })
        .join(' ');
}

//****************************************************************************************************************************************
//**                                            FUNCTION INIT                                                                          **/
//****************************************************************************************************************************************

function __initConversation() {
    guardarTimestamp('Init bot');
    setCallbackFlux('cambarUsuario');
    setBotVar('env', ENV);
    setBotVar('botId', botContext.getChatBotId());
    setBotVar('userId', botContext.getUserPlatformId());
    setBotVar('conversationId', botContext.getConversationId());
    setBotVar('urlBiometria', '');
    setBotVar('tipoTarjeta', 'DEBITO');
    setBotVar('consumosElegidosCant', 0);
    setBotVar('url_comprobanteRecarga', '');
    setTarjetasAdicionalesEmpresa(false);
    set_structuredQuestionFallback_paginado(true);
    set_bio_operacion(BIO_OPERACION_RESET);
    setVars_limitesDiariosUI();
    setDataTarjetas('');
    reset_varsUrlBio();
    botContext.setBotVariable('cantidadIntentos', 0, true, false);
    trail('__initConversation');
    load_user_from_namespace();
    initNamepsaceForUser(GENERAL_NAMESPACE, TTL_GENERAL_NAMESPACE);
    initNamepsaceForUser(USER_DATA_NAMESPACE, TTL_NAMEPSACES);
    initNamepsaceForUser(NAMESPACE_PAGO_SERVICIOS, TTL_NAMEPSACES);
    initNamepsaceForUser(NAMESPACE_RECARGAS, TTL_NAMEPSACES);
    initNamepsaceForUser(NAMESPACE_RECARGA_SUBE, TTL_NAMEPSACES);
    initNamepsaceForUser(NAMESPACE_TRANSFERENCIAS, TTL_NAMEPSACES);
    initNamepsaceForUser(NAMESPACE_CONSULTA_CBU, TTL_NAMEPSACES);
    initNamepsaceForUser(TYC_DOLARMEP_NAMESPACE, TTL_NAMEPSACES);
    initNamepsaceForUser(TYC_NAMESPACE, TTL_NAMEPSACES);
    initNamepsaceForUser(ACUMULADO_UMBRALES_NAMESPACE, TTL_NAMEPSACES);
    initNamepsaceForUser(ACUMULADO_LIMITES_DIARIOS_NAMESPACE, TTL_NAMEPSACES);
    initNamepsaceForUser(COUNT_SECOND_TRY_NAMESPACE, TTL_NAMEPSACES);
    guardarTimestamp('end Init bot');
}


//****************************************************************************************************************************************
//**                                            CONFIGS GLOBALES                                                                      **/
//****************************************************************************************************************************************

//****************************************** FUNCIONES FLUJO AVISO DE VIAJE **************************************************/
function T_Intro_AVJE_preProccesMessage() {
    setCallbackConfig('avisoViaje');
    reset_vars_AVJE();
}

function reset_vars_AVJE() {
    reset_tarjetas_AVJE();
    setBuildMenuPrimeraVez(true);
}

function T_check_estado_prev_avje() {
    var tarjetasAVJE = getBotVar('tarjetasAVJE');
    var fechaInicioAVJE = getBotVar('fechaInicioAVJE');
    var fechaFinAVJE = getBotVar('fechaFinAVJE');
    var paisesAVJE = getBotVar('paisesAVJE');
    var emailUsuario = getBotVar('emailUsuario');

    if (!isEmpty(tarjetasAVJE) && !isEmpty(fechaInicioAVJE) && !isEmpty(fechaFinAVJE) && !isEmpty(paisesAVJE) && !isEmpty(emailUsuario)) {
        goNext('Datos previa');
    } else if (!isEmpty(tarjetasAVJE) && !isEmpty(fechaInicioAVJE) && !isEmpty(fechaFinAVJE) && !isEmpty(paisesAVJE)) {
        goNext('Tarj + F.I. + F.F. + países previa');
    } else if (!isEmpty(tarjetasAVJE) && !isEmpty(fechaInicioAVJE) && !isEmpty(fechaFinAVJE)) {
        goNext('Tarj + F.I. + F.F. previa');
    } else if (!isEmpty(tarjetasAVJE) && !isEmpty(fechaInicioAVJE)) {
        goNext('Tarj + Fecha inicio previa');
    } else if (!isEmpty(tarjetasAVJE)) {
        goNext('Selección tarjetas previa');
    } else {
        goNext('Intro');
    }
}

//////////////////// FECHA INICIO
/** Constantes de rutas y configuraciones */
var RUTA_FORMATO_INVALIDO = 'T _ Formato fecha inicio invalido @AVJE';
var RUTA_FECHA_INVALIDA = 'T _ Fecha inicio invalida @AVJE';
var RUTA_NO_DISPONIBLE = 'T _ No disponible @AVJE';
var RUTA_FECHA_FIN = 'Q _ Fecha fin @AVJE';
var UN_DIA_MILISEGUNDOS = 86400000;
/**
 * Parsea una fecha en formato DD/MM/YYYY.
 *
 * @param {string} dateString - Fecha en formato DD/MM/YYYY.
 * @returns {Object} - Objeto con:
 *                     - isValid: Indica si la fecha es válida.
 *                     - date: Objeto Date o null.
 */
function parseDateDDMMYYYY(dateString) {
    var parts = dateString.split('/');
    if (parts.length !== 3) {
        return { isValid: false, date: null };
    }

    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return { isValid: false, date: null };
    }

    var date = new Date(year, month - 1, day);
    var isValid = date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;

    return {
        isValid: isValid,
        date: isValid ? date : null,
    };
}
/**
 * Valida la fecha de inicio del viaje (AVJE) y devuelve el destino.
 *
 * - Debe ser válida y mayor o igual a hoy.
 * - No debe superar los 30 días desde hoy.
 *
 * @returns {string} - Ruta a seguir en el flujo.
 */
function validarFechaInicioViaje_AVJE() {
    var result = parseDateDDMMYYYY(getBotVar('fecha_inicio'));

    if (!result.isValid) {
        return RUTA_FORMATO_INVALIDO;
    }

    var fechaInicio = result.date;
    var hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaInicio < hoy) {
        return RUTA_FECHA_INVALIDA;
    }

    var diferenciaDias = (fechaInicio - hoy) / UN_DIA_MILISEGUNDOS;

    if (diferenciaDias > 30) {
        return RUTA_NO_DISPONIBLE;
    }

    return RUTA_FECHA_FIN;
}
/**
 * Ejecuta el goNext con la ruta obtenida de validarFechaInicioViaje_AVJE.
 */
function validarFechaInicioViaje_AVJEgoNext() {
    goNext(validarFechaInicioViaje_AVJE());
}
//////////////////// FECHA FIN
/** Constantes de rutas y configuraciones */
var RUTA_AVISO_FECHA_FIN_FORMATO_INVALIDO = 'T _ Formato fecha fin invalido @AVJE';
var RUTA_AVISO_FECHA_FIN_INVALIDA_ANTERIOR_A_HOY = 'T _ Fecha fin invalida @AVJE';
var RUTA_AVISO_EXCESO_DIAS_VIAJE = 'T _ Exceso dias de viaje @AVJE';
var RUTA_AVISO_FECHA_FIN_VALIDA = 'Q _ Paises destino @AVJE';
var RUTA_AVISO_FECHA_FIN_ANTERIOR_A_INICIO = 'T _ Fecha fin anterior a inicio @AVJE';
/**
 * Valida la fecha de fin del viaje (AVJE) y devuelve el destino.
 *
 * - Debe ser válida y mayor o igual a hoy.
 * - No debe superar los 180 días desde la fecha de inicio.
 * - No debe ser anterior a la fecha de inicio.
 *
 * @returns {string} - Ruta a seguir en el flujo.
 */
function validarFechaFinViaje_AVJE() {
    var fechaFinStr = getBotVar('fecha_fin');
    var fechaInicioStr = getBotVar('fecha_inicio');

    debugMsg(fechaInicioStr + ' ' + fechaFinStr);

    var fechaInicio = parseDateDDMMYYYY(fechaInicioStr);
    var fechaFin = parseDateDDMMYYYY(fechaFinStr);

    if (!fechaFin.isValid) {
        return RUTA_AVISO_FECHA_FIN_FORMATO_INVALIDO;
    }

    var hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaFin.date < hoy) {
        return RUTA_AVISO_FECHA_FIN_INVALIDA_ANTERIOR_A_HOY;
    }

    if (fechaFin.date < fechaInicio.date) {
        return RUTA_AVISO_FECHA_FIN_ANTERIOR_A_INICIO;
    }

    var diferenciaDias = (fechaFin.date - fechaInicio.date) / UN_DIA_MILISEGUNDOS;

    if (diferenciaDias > 180) {
        return RUTA_AVISO_EXCESO_DIAS_VIAJE;
    }

    return RUTA_AVISO_FECHA_FIN_VALIDA;
}
/**
 * Formatea una fecha en DD/MM/YYYY.
 */
function formatearFecha(fecha) {
    var dia = String(fecha.getDate()).padStart(2, '0');
    var mes = String(fecha.getMonth() + 1).padStart(2, '0');
    var anio = fecha.getFullYear();
    return dia + '/' + mes + '/' + anio;
}
/**
 * Devuelve la fecha de hoy más 3 días en formato DD/MM/YYYY.
 *
 * @returns {string} - Fecha formateada en DD/MM/YYYY.
 */
function obtenerFechaMasTresDias() {
    var hoy = new Date();
    hoy.setDate(hoy.getDate() + 3);
    var dia = String(hoy.getDate()).padStart(2, '0');
    var mes = String(hoy.getMonth() + 1).padStart(2, '0');
    var anio = hoy.getFullYear();
    return dia + '/' + mes + '/' + anio;
}
//?---------------- HANDLERS ----------
function res_consultaTarjetasAvisoViaje(data, statusCode) {
    logDebug('input res_consultaTarjetasAvisoViaje', data);
    setBotVar_v2('demo_response', data);
    set_universalStatusCode(statusCode);
    if (statusCode == 200) {
        setDataTarjetas(data.Tarjetas);
    }
}
function res_consultaAvisosViaje(data, statusCode) {
    logDebug('input res_consultaTarjetasAvisoViaje', data);
    set_universalStatusCode(statusCode);
    if (statusCode == 200) {
        setBotVar_v2('res_avisosDeViaje', data.viajes);
    }
}
function res_eliminarAvisoViaje(data, statusCode) {
    logDebug('input res_eliminarAvisoViaje', data);
    set_universalStatusCode(statusCode);
}
function res_generarAvisoViaje(data, statusCode) {
    logDebug('input res_generarAvisoViaje', data);
    setBotVar_v2('demo_response', data);
    set_universalStatusCode(statusCode);
}
// ? ---------- UTILS GENERAR AVISO -------------

function filtrarTarjetasAvisoViaje(data) {
    logDebug('SE FILTRAN LAS TARJETAS OBTENIDAS DESDE EL SERVICIO');
    var tarjetas = data.filter(function (tarjeta) {
        var partes = tarjeta.marca.split('-');
        return (partes[0] === 'VI' || partes[0] === 'AM') && (partes[1] === 'DB' || partes[1] === 'CR') && (tarjeta.categoria == 0 || tarjeta.categoria == 1 || tarjeta.categoria === 'E');
    });
    tarjetas.forEach(function (e) {
        e.titleUI = obtenerTituloTarj_AVJE(e.marca);
    });
    return tarjetas;
}
function obtenerTituloTarj_AVJE(marca) {
    var partes = marca.split('-');
    var marcas = {
        VI: 'VISA',
        AM: 'AMEX',
    };
    var tipos = {
        CR: 'CRÉDITO',
        DB: 'DÉBITO',
    };
    return marcas[partes[0]] + ' ' + tipos[partes[1]];
}
function addTarjetasEnLista(tarjetas) {
    var list = [];
    var listUI = [];
    tarjetas.forEach(function (e) {
        listUI.push(e.titleUI + ' XXXX-' + e.ultimoscuatrodigitos);
        list.push({ hash: e.hash });
    });
    setBotVar('tarjetas_seleccionadas', listUI.join(', '));
    return set_listaHashTarjetas_AVJE(list);
}
function set_infoTarjetas_AVJE(val) {
    setBotVar_v2('infoTarjetas_AVJE', val);
}
function get_infoTarjetas_AVJE() {
    return getBotVar_v2('infoTarjetas_AVJE');
}
function set_listaHashTarjetas_AVJE(list) {
    setBotVar_v2('listaHashTarjetas_AVJE', list);
}
function get_listaHashTarjetas_AVJE() {
    return getBotVar_v2('listaHashTarjetas_AVJE');
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Funciones para validar paises - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
/** Constantes de rutas y configuraciones */
// Lista de países válidos // TODO completar con la lista entera 
var LISTA_PAISES_AVJE = {
    "Paises": [
        { "codigo": "AF", "descripcion": "AFGANISTAN" },
        { "codigo": "AL", "descripcion": "ALBANIA" },
        { "codigo": "DE", "descripcion": "ALEMANIA" }
    ]
};

function Q_Paisesdestino_AVJE_processUserResponse() {
    var paisesJSON = validarPaises_AVJE(getUserMessage());
    var goNextVar = determinarRutaPaises_AVJE(paisesJSON);
    guardarValidacionPaises_AVJE(paisesJSON);
    goNext(goNextVar);
}


// Constantes de rutas
var RUTA_AVISO_PAISES_MIXTOS = 'T _ Confirmacion con paises invalidos @AVJE';
var RUTA_AVISO_PAISES_INVALIDOS = 'B _ Todos los paises invalidos @AVJE';
var RUTA_AVISO_PAISES_VALIDOS = 'T _ Confirmacion sin paises invalidos @AVJE';
var RUTA_AVISO_NINGUN_PAIS_INGRESADO = 'B _ Todos los paises invalidos @AVJE';

/**
 * Valida los países ingresados contra la lista permitida.
 *
 * @param {string} paises - Lista de países separados por coma.
 * @returns {Object} - Objeto con dos listas: válidos e inválidos.
 */
function validarPaises_AVJE(paises) {
    var listaPaises = paises.split(',');
    var paisesValidosJson = [];
    var paisesValidos = [];
    var paisesInvalidos = [];

    listaPaises.forEach(function(pais) {
        var encontrado = LISTA_PAISES_AVJE.Paises.find(function(p) {
            return compareIgnoreCaseAndSpaces(p.descripcion, pais);
        });
        if (encontrado) {
            paisesValidos.push(encontrado.descripcion);
            paisesValidosJson.push(encontrado);
        } else {
            paisesInvalidos.push(pais.trim());
        }
    });

    return {
        validosJson : paisesValidosJson,
        validos: paisesValidos,
        invalidos: paisesInvalidos
    };
}

/**
 * Lógica para determinar la interacción dependiendo de los países encontrados.
 *
 * @param {Object} resultado - Objeto con los países válidos e inválidos.
 * @returns {string} - Ruta a seguir en el flujo.
 */
function determinarRutaPaises_AVJE(resultado) { 
    if (resultado.invalidos.length > 0 && resultado.validos.length > 0) {
        return RUTA_AVISO_PAISES_MIXTOS;
    }
    if (resultado.invalidos.length > 0) {
        return RUTA_AVISO_PAISES_INVALIDOS;
    }
    if (resultado.validos.length > 0) {
        return RUTA_AVISO_PAISES_VALIDOS;
    }
    return RUTA_AVISO_NINGUN_PAIS_INGRESADO;
}

function guardarValidacionPaises_AVJE(resultado){
    setBotVar('lista_paises_validos_JSON', resultado.validosJson)
    setBotVar('lista_paises_validos', capitalizarFrase(resultado.validos.join(', ')));
    setBotVar('lista_paises_invalidos',capitalizarFrase( resultado.invalidos.join(', ') ));
}
