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