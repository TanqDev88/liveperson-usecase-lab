function buildMenuTarjetas_SEGTA() {
    try {
        var tarjetas = get_piezasOrdenadas();
        logDebug('Tarjetas ordenadas', tarjetas);
        var data = 0;
        var choice = 1;
        tarjetas.forEach(function (e) {
            e.choice = choice++;
            var info = {
                choice: e.choice,
                id: '',
                title: e.ProductoNegocio,
                subtitle: e.EstadoNegocio + ' - Nro de referencia: ' + e.IdPieza.slice(-6),
            };
            if (isEmpty(data)) {
                data = [info];
            } else {
                data.push(info);
            }
        });
        setDataTarjetas(tarjetas);
        dataMenuDinamico(data);
        setearPaginadoMenu();
        botContext.logCustomEvent('', 'Seguimiento De Tarjeta', 'UsuarioPosee_' + tarjetas.length + '_TarjetasEnEnvio');
    } catch (error) {
        logDebug(error);
        goCallbackFail('consultaEnvioPiezas');
    }
}