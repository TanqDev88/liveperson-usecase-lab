var WHITELIST_PHONES_IA = [
    '5493547598775',
    '5491127711369',
    '5491137557078',
];

function isWhiteList() {
    var res = false;
    for (var e in WHITELIST_PHONES) {
        if (WHITELIST_PHONES[e] == getTelefonoFromBot()) res = true;
    }
    return res;
}