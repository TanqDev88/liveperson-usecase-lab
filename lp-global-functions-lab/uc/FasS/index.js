// function buildUrl(state, config) {
//     return `${config.url_base_link}/?id=${state}&canal=LP`;
// }

// ===============================
// TEST buildUrl()
// ===============================

function testBuildUrl() {

    // Mock config
    const config = {
        url_base_link: 'https://biometria-test.macro.com.ar'
    };

    // Mock state
    const state = '123456-test-state';

    // Resultado esperado
    const expectedUrl =
        'https://biometria-test.macro.com.ar/?id=123456-test-state&canal=LP';

    // Ejecutar función
    const result = buildUrl(state, config);

    console.log('Resultado obtenido:');
    console.log(result);

    console.log('Resultado esperado:');
    console.log(expectedUrl);

    // Validación simple
    if (result === expectedUrl) {
        console.log('✅ TEST OK - buildUrl funciona correctamente');
    } else {
        console.log('❌ TEST FAIL - buildUrl devolvió un valor inesperado');
    }
}

// Ejecutar test
testBuildUrl();