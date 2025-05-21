// ===========================================================
// TESTING PARA LAS FUNCIONES:
// - validarFechaInicioViaje_AVJE()
// - validarFechaFinViaje_AVJE()
// - validarFechaInicioViaje_AVJEgoNext()
// - parseDateDDMMYYYY(dateString)
// - formatearFecha(fecha)
// - obtenerFechaMasTresDias()
// ===========================================================

// === PRUEBAS FECHA INICIO  ===

setBotVar("fecha_inicio" , "15-05/2025");
console.log(validarFechaInicioViaje_AVJE() === RUTA_FORMATO_INVALIDO); // true

setBotVar("fecha_inicio" , "14/05/2025");
console.log(validarFechaInicioViaje_AVJE() === RUTA_FECHA_INVALIDA); // true

setBotVar("fecha_inicio" , "17/06/3025");
console.log(validarFechaInicioViaje_AVJE() === RUTA_NO_DISPONIBLE); // true

setBotVar("fecha_inicio" , obtenerFechaMasTresDias());
console.log(validarFechaInicioViaje_AVJE() === RUTA_FECHA_FIN); // true

validarFechaInicioViaje_AVJEgoNext()

// === PRUEBAS  FECHA FIN ===

var hoy = new Date();

// Fecha de inicio es hoy
setBotVar("fecha_inicio", formatearFecha(hoy));

// Formato inválido
setBotVar("fecha_fin", "15-05-2025");
console.log(validarFechaFinViaje_AVJE() === RUTA_AVISO_FECHA_FIN_FORMATO_INVALIDO); // true

// Fecha fin anterior a hoy
var ayer = new Date(hoy);
ayer.setDate(hoy.getDate() - 1);
setBotVar("fecha_fin", formatearFecha(ayer));
console.log(validarFechaFinViaje_AVJE() === RUTA_AVISO_FECHA_FIN_INVALIDA_ANTERIOR_A_HOY); // true

// Fecha fin anterior a la fecha de inicio
var fechaInicio = new Date(hoy);
fechaInicio.setDate(hoy.getDate() + 1);
setBotVar("fecha_inicio", formatearFecha(fechaInicio));

var unDiaAntes = new Date(fechaInicio);
unDiaAntes.setDate(fechaInicio.getDate() - 1);
setBotVar("fecha_fin", formatearFecha(unDiaAntes));
console.log(validarFechaFinViaje_AVJE() === RUTA_AVISO_FECHA_FIN_ANTERIOR_A_INICIO); // true

// Fecha fin excede 180 días
var fechaInicioExceso = new Date(hoy);
fechaInicioExceso.setDate(hoy.getDate() - 1);
setBotVar("fecha_inicio", formatearFecha(fechaInicioExceso));

var masDe180 = new Date(fechaInicioExceso);
masDe180.setDate(fechaInicioExceso.getDate() + 181);
setBotVar("fecha_fin", formatearFecha(masDe180));
console.log(validarFechaFinViaje_AVJE() === RUTA_AVISO_EXCESO_DIAS_VIAJE); // true

// Fecha fin válida
var valida = new Date(hoy);
valida.setDate(hoy.getDate() + 10);
setBotVar("fecha_fin", formatearFecha(valida));
console.log(validarFechaFinViaje_AVJE() === RUTA_AVISO_FECHA_FIN_VALIDA); // true