//****************************************** EVENTOS FLUJO INTEGRACOIN QUALTRICS **************************************************/
function api_integration_qualtrics_postProcessMessage() {
    if (isApiExecutionFail()) {
        var statusCode = Number(getApiStatusCode());

        switch (statusCode) {
            case 401:
                botContext.logCustomEvent('', 'Encuesta', 'TokenAplicacionInvalido');
                break;
            case 404:
                botContext.logCustomEvent('', 'Encuesta', 'IdEncuestaInexistente');
                break;
            case 412:
                botContext.logCustomEvent('', 'Encuesta', 'ErrorDatos');
                break;
            case 500:
                botContext.logCustomEvent('', 'Encuesta', 'ErrorInterno');
                break;
            default:
                botContext.logCustomEvent('', 'Encuesta', 'ErrorGenerico');
                break;
        }
    } else {

        botContext.logCustomEvent('', 'Encuesta', 'RespuestaOkQualtrics');
    }
}

//****************************************** EVENTOS FLUJO DESVINCULACION **************************************************/
function api_integration_desvincularNumero_DESCE_postProcessMessage() {
    if (isApiExecutionFail()) {
        var statusCode = Number(getApiStatusCode());
        switch (statusCode) {
            case 400:
                botContext.logCustomEvent('', 'Desvinculacion', 'ErrorDesvinculacionLP');
                break;
            case 409:
                goNext('T _ Desvinculado 1 @DESCE');
                break;
            default:
                botContext.logCustomEvent('', 'Desvinculacion', 'ErrorDesvinculacionBio');
                break;
        }
    }
}

function logEventApiIntegration(nameAPIIntegration, eventName, success) {
    var eventDetail = {
        dataFaaS: [
            {
                ts: {
                    i: getBotVar('initTimestamp'),
                    e: Date.now(),
                },
                n: nameAPIIntegration,
                Code: success ? Number(get_universalStatusCode()) : 500,
            },
        ],
        user: {
            dni: getNroDocumento(),
            tel: getTelefonoFromBot(),
        },
    };
    var eventNameTec = eventName + ' Tec';
    botContext.logCustomEvent(nameAPIIntegration, eventNameTec, JSON.stringify(eventDetail));
}

function customEventByUserMessagge(userMessage, userText, eventName, eventDetails) {
    if (getUserMessage() == userMessage) botContext.logCustomEvent(userText, eventName, eventDetails);
    return;
}