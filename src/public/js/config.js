function onChangePort() {
    alert("onChangePort called. " + $('#settingsGeneralPort').val())
}

function onChangeLogLevel() {
    alert("onChangeLogLevel called. " + $('#settingsLoggingLogLevel').val())
}

$(document).on('ready', function () {
    $('#settingsGeneralPort').val("8083")
    $('#settingsLoggingLogLevel').val("ALLES UND ÜBERHAUPT!")
})