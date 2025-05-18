// === PRUEBAS ===
console.log(validarPaises_AVJE("ALEMANIA, AFGANISTAN, ARGENTINA"));
console.log(validarPaises_AVJE("ALBANIA, DE, MEXICO"));
console.log(validarPaises_AVJE("PERU, BOLIVIA"));
console.log("--------")
var resultado1 = validarPaises_AVJE("ALEMANIA, AFGANISTAN, ARGENTINA");
console.log(determinarRutaPaises_AVJE(resultado1));

var resultado3 = validarPaises_AVJE("PERU, BOLIVIA");
console.log(determinarRutaPaises_AVJE(resultado3));

var resultado4 = validarPaises_AVJE(" A L b a n i a ");
console.log(determinarRutaPaises_AVJE(resultado4));

var resultado2 = validarPaises_AVJE("ALBANIA, DE, México");
console.log(determinarRutaPaises_AVJE(resultado2));

console.log("--------")

guardarValidacionPaises_AVJE(resultado1);

console.log(getBotVar("lista_paises_validos_JSON")); 
console.log(getBotVar("lista_paises_validos"));
console.log(getBotVar("lista_paises_invalidos"));