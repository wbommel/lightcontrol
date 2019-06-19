/**
 * connect, initialize and create all relevant listeners when document is loaded
 */
$(document).on('ready', function () {
    // WebSocket: create connection to server
    var socket = io.connect()

    //create socket listeners
    socket.on('initialize_config_editor', function (data) {
        $('#settingsGeneralPort').val(data.port)

        $('#settingsLoggingLogLevel').val(data.logging.LogLevel)
        $('#settingsLoggingUseUnixTimestamp').val(data.logging.UseUnixTimeStampPrefix)
        $('#settingsLoggingLogMessages').val(data.logging.DoLogMessages)
        $('#settingsLoggingOutputToConsole').val(data.logging.OutputToConsole)
        $('#settingsLoggingOutputToCallback').val(data.logging.OutputToCallback)
    })

    socket.on('config_changed_on_server', function (data) {
    })
})



/**
 * all relevant functions go here
 */
function onChangePort() {
    alert("onChangePort called. " + $('#settingsGeneralPort').val())
}

function onChangeLogLevel() {
    alert("onChangeLogLevel called. " + $('#settingsLoggingLogLevel').val())
}

function onChangeUseUnixTimestamp() {
    alert("onChangeUseUnixTimestamp called. " + $('#settingsLoggingUseUnixTimestamp').val())
}

function onChangeLogMessages() {
    alert("onChangeLogMessages called. " + $('#settingsLoggingLogMessages').val())
}

function onChangeOutputToConsole() {
    alert("onChangeOutputToConsole called. " + $('#settingsLoggingOutputToConsole').val())
}

function onChangeOutputToCallback() {
    alert("onChangeOutputToCallback called. " + $('#settingsLoggingOutputToCallback').val())
}

