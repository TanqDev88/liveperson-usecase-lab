// Simulación del entorno de pruebas
function resetMockState() {
    global.logs = [];
    global.actions = [];
    global.botVars = {};
}

function logDebug(label, value) {
    global.logs.push({ label, value });
}
function get_universalStatusCode() {
    return global.statusCode;
}
function isApiExecutionSuccessful() {
    return global.apiSuccess;
}
function getBotVar_v2(name) {
    return global.botVars[name];
}
function set_infoTarjetas_AVJE(value) {
    global.infoTarjetas = value;
}
function isEmpty(arr) {
    return !arr || arr.length === 0;
}
function goCallbackNoMatch(label) {
    global.actions.push(`goCallbackNoMatch(${label})`);
}
function goCallbackOk(label) {
    global.actions.push(`goCallbackOk(${label})`);
}
function goCallbackFail(label) {
    global.actions.push(`goCallbackFail(${label})`);
}
function goNext(label) {
    global.actions.push(`goNext(${label})`);
}
function sendMsg(msg) {
    global.sentMessages = msg;
}
function addTarjetasEnLista(lista) {
    global.tarjetasSeleccionadas = lista;
}
function ordenarPorCategoria(cat) {
    const orden = { GOLD: 1, PLATINUM: 2, BLACK: 3 };
    return orden[cat] || 99;
}
function _setCallbackInteraction(value) {}
function _setCallbackInteractionFAIL(value) {}
function getCallbackFail(v) { return `FAIL_${v}`; }
function getCallbackOk(v) { return `OK_${v}`; }
const BIO_VENCIDA_INICIO_DIALOGO = 'bio_vencida';

function filtrarTarjetasAvisoViaje(data) {
    return data || [];
}

// FUNCIÓN A TESTEAR (copiada directamente)
function api_integration_consultaTarjetasAvisoViaje_AVJE_postProcessMessage() {
    try {
        var statusCode = Number(get_universalStatusCode());
        if (isApiExecutionSuccessful()) {
            switch (statusCode) {
                case 200:
                    logDebug('SE OBTUVIERON TARJETAS DESDE EL SERVICIO');
                    var data = getBotVar_v2('data_tarjetas');
                    var tarjetas = filtrarTarjetasAvisoViaje(data);
                    logDebug('Tarjetas Filtradas', tarjetas);
                    set_infoTarjetas_AVJE(tarjetas);
                    if (isEmpty(tarjetas)) {
                        logDebug('NO POSEE TARJETAS VALIDAS');
                        goCallbackNoMatch('obtenerTarjetas');
                        return;
                    }
                    if (tarjetas.length == 1) {
                        logDebug('EL USUARIO TIENE UNA SOLA TARJETA');
                        addTarjetasEnLista([tarjetas[0]]);
                        goNext('B _ Tarjeta unica @AVJE');
                        return;
                    }
                    if (tarjetas.length > 1) {
                        tarjetas.forEach(function (e) { e.isSelected = false; });
                        tarjetas.sort((a, b) => ordenarPorCategoria(a.categoria) - ordenarPorCategoria(b.categoria));
                        set_infoTarjetas_AVJE(tarjetas);
                        logDebug('EL USUARIO TIENE MÁS DE UNA TARJETA - SE DIRIJE AL MENU DE TARJETAS');
                        sendMsg('💳 Elegí las tarjetas sobre las que quieras dar aviso de viaje. Cuando termines, apretá *Confirmar*.');
                        goCallbackOk('obtenerTarjetas');
                    }
                    break;
                default:
                    logDebug('CODIGO NO MAPEADO - VA A LA FALLA POR DEFECTO');
                    goCallbackFail('obtenerTarjetas');
                    break;
            }
        } else {
            logDebug('FALLÓ LA CONSULTA DE TARJETAS');
            switch (statusCode) {
                case 401:
                    logDebug('ACCESS TOKEN VENCIDO - SE DIRIJE A RENOVARLO');
                    _setCallbackInteraction('api_integration_consultaTarjetasAvisoViaje');
                    _setCallbackInteractionFAIL(getCallbackFail('obtenerTarjetas'));
                    goNext('api_integration_refreshToken @AVJE');
                    break;
                case 403:
                    logDebug('REFRESH TOKEN VENCIDO - SE TRANSFIERE A BIOMETRIA');
                    _setCallbackInteraction(getCallbackOk('biometria'));
                    _setCallbackInteractionFAIL(getCallbackFail('obtenerTarjetas'));
                    goNext(BIO_VENCIDA_INICIO_DIALOGO);
                    break;
                case 404:
                    logDebug('NO SE OBTUVIERON TARJETAS DESDE EL SERVICIO');
                    goCallbackNoMatch('obtenerTarjetas');
                    break;
                default:
                    logDebug('CODIGO NO MAPEADO - VA A LA FALLA POR DEFECTO');
                    goCallbackFail('obtenerTarjetas');
                    break;
            }
        }
    } catch (error) {
        logDebug('Error inesperado', error);
    }
}

// CASOS DE PRUEBA
function ejecutarTests() {
    console.log('\n🧪 Test 1: tarjetas vacías');
    resetMockState();
    global.apiSuccess = true;
    global.statusCode = 200;
    global.botVars['data_tarjetas'] = [];
    api_integration_consultaTarjetasAvisoViaje_AVJE_postProcessMessage();
    console.log(global.actions); // Debería contener goCallbackNoMatch('obtenerTarjetas')

    console.log('\n🧪 Test 2: una tarjeta válida');
    resetMockState();
    global.apiSuccess = true;
    global.statusCode = 200;
    global.botVars['data_tarjetas'] = [{ id: 1, categoria: 'GOLD' }];
    api_integration_consultaTarjetasAvisoViaje_AVJE_postProcessMessage();
    console.log(global.actions); // Debería contener goNext('B _ Tarjeta unica @AVJE')

    console.log('\n🧪 Test 3: varias tarjetas');
    resetMockState();
    global.apiSuccess = true;
    global.statusCode = 200;
    global.botVars['data_tarjetas'] = [
        { id: 1, categoria: 'PLATINUM' },
        { id: 2, categoria: 'GOLD' }
    ];
    api_integration_consultaTarjetasAvisoViaje_AVJE_postProcessMessage();
    console.log(global.actions); // Debería contener goCallbackOk('obtenerTarjetas')

    console.log('\n🧪 Test 4: error 401');
    resetMockState();
    global.apiSuccess = false;
    global.statusCode = 401;
    api_integration_consultaTarjetasAvisoViaje_AVJE_postProcessMessage();
    console.log(global.actions); // Debería contener goNext('api_integration_refreshToken @AVJE')

    console.log('\n🧪 Test 5: error 404');
    resetMockState();
    global.apiSuccess = false;
    global.statusCode = 404;
    api_integration_consultaTarjetasAvisoViaje_AVJE_postProcessMessage();
    console.log(global.actions); // Debería contener goCallbackNoMatch('obtenerTarjetas')
}

ejecutarTests();
