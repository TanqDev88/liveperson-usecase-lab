/** Simula el bot context */
const botContext = (function () {
  let BOTVARS = {};
  let BOTNAMESPACE = {};
  let BOTENV = { env: "LOCAL", env_bot_cb: "DEV", urlAlgo: "google.com" };
  //https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
  const LOG_COLORS = {
    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",
    FgGray: "\x1b[90m",
  };
  return {
    isContextApiEnabled: function () {
      return true;
    },
    getAllContext: function () {
      return { BOTVARS, BOTNAMESPACE };
    },
    setAllowMaxTextResponse: function () {},
    getChatBotId: function () {
      return "bot ID xxxx";
    },
    getUserPlatformId: function () {
      return "getUserPlatformId ID xxxx";
    },
    getConversationId: function () {
      return "612a8693-f041-4c59-9a4c-f015b2709166";
    },
    getLPCustomerInfo: function () {
      return { customerId: "whatsapp_8914408_5491155555555" };
    },
    getUserMessage: function () {
      console.log("Obteniendo mensaje del usuario");
      return "Mensaje del usuario";
    },
    getIntent: function () {
      console.log("Obteniendo intención del diálogo");
      return "Intención del diálogo";
    },
    setBotVariable: function (arg, val) {
      //console.log('Estableciendo variable en el contexto del bot:', arg, val);
      BOTVARS[arg] = val;
    },
    getBotVariable: function (arg) {
      //console.log('Obteniendo variable del contexto del bot:', arg);
      return BOTVARS[arg];
    },
    getWebVar: function (arg) {
      console.log("Obteniendo variable de la vista web:", arg);
      return "Valor de la variable de la vista web";
    },
    setTriggerNextMessage: function (arg) {
      console.log("Avanzando al siguiente mensaje:", arg);
    },
    setMessageDelay: function (arg) {
      console.log("delay: ", arg);
    },
    getEnvVariable: function (arg) {
      return BOTENV[arg];
    },
    registerContextNamespace: function (namespace, ttl) {
      if (!BOTNAMESPACE[namespace]) BOTNAMESPACE[namespace] = {};
      console.log("namespace creado", namespace);
      return true;
    },
    setContextDataForUser: function (namespace, property, data) {
      if (!BOTNAMESPACE[namespace])
        throw new Error("No existe el namspace. Esta registrado ?");
      BOTNAMESPACE[namespace][property] = data;
    },
    getContextDataForUser: function (namespace, property) {
      if (!BOTNAMESPACE[namespace]) return null;
      if (!property) return BOTNAMESPACE[namespace]; // si no viene propertie se devuelve todo el namespace
      if (!BOTNAMESPACE[namespace][property]) return null;
      return BOTNAMESPACE[namespace][property];
    },
    deleteContextDataForUser: function (namespace, property) {
      if (BOTNAMESPACE[namespace] && BOTNAMESPACE[namespace][property]) {
        delete BOTNAMESPACE[namespace][property];
      }
      if (namespace && !property) {
        delete BOTNAMESPACE[namespace];
      }
    },
    getGlobalContextData: function (namespace, property) {
      if (!BOTNAMESPACE[namespace]) return null;
      if (!property) return BOTNAMESPACE[namespace]; // si no viene propertie se devuelve todo el namespace
      if (!BOTNAMESPACE[namespace][property]) return null;
      return BOTNAMESPACE[namespace][property];
    },
    setGlobalContextData: function(namespace, property, data) {
      if (!BOTNAMESPACE[namespace])
        throw new Error("No existe el namspace. Esta registrado ?");
      BOTNAMESPACE[namespace][property] = data;
    },
    sendMessage: function (arg) {
      console.log(LOG_COLORS.FgCyan, arg);
    },
    logCustomEvent: function (event_name) {
      console.log(LOG_COLORS.FgBlue, "Registrando evento:", event_name);
    },
    printDebugMessage: function (msg) {
      console.log(LOG_COLORS.FgWhite, msg);
    },
    goNext: function(dialog) {
      console.log('Next dialog: ' + dialog);
    },
    isApiExecutionSuccessful : function(){
      return true
    }
  };
})();
