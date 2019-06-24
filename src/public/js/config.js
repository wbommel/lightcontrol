/**
 * connect, initialize and create all relevant listeners when document is loaded
 */
let socket

$(document).on('ready', function () {
    // WebSocket: create connection to server
    socket = io.connect()

    //create socket listeners
    socket.on('initialize_config_editor', function (data) {
        $('#settingsGeneralPort').val(data.port)

        $('#settingsLoggingLogLevel').val(data.logging.LogLevel)
        $('#settingsLoggingUseUnixTimestamp').prop("checked", data.logging.UseUnixTimeStampPrefix)
        $('#settingsLoggingLogMessages').prop("checked", data.logging.DoLogMessages)
        $('#settingsLoggingOutputToConsole').prop("checked", data.logging.OutputToConsole)
        $('#settingsLoggingOutputToCallback').prop("checked", data.logging.OutputToCallback)

        $('#settingsHardwarePcf8591Address').val(data.hardware.Pcf8591Address)

        $('#settingsHardwareGpioRelais1').val(data.hardware.gpios.Relais1)
        $('#settingsHardwareGpioRelais2').val(data.hardware.gpios.Relais2)
        $('#settingsHardwareGpioButtonAutomatic').val(data.hardware.gpios.ButtonAutomatic)
        $('#settingsHardwareGpioButtonLightOn').val(data.hardware.gpios.ButtonManualLightOn)
        $('#settingsHardwareGpioButtonLightOff').val(data.hardware.gpios.ButtonManualLightOff)

        let rules = data.rules
        let rule
        for (var idx = 0; idx < rules.length; idx++) {
            rule = rules[idx]
            $('#lightrules').append($("<label>").text('Rule:'))
            let input = $('<input type="text">').attr({ id: 'from', name: 'from', value: rule.from })
            //input.val(rule.from)
            $('#lightrules').append(input)
        }
    })

    socket.on('config_changed_on_server', function (data) {
    })
})



/**
 * all relevant functions go here
 */
function onChangePort() {
    // alert("onChangePort called. " + $('#settingsGeneralPort').val())
}

function onChangeLogLevel() {
    // alert("onChangeLogLevel called. " + $('#settingsLoggingLogLevel').val())
}

function onChangeUseUnixTimestamp() {
    //alert("onChangeUseUnixTimestamp called. '" + $('#settingsLoggingUseUnixTimestamp').val() + "'")
    socket.emit('set_logging_UseUnixTimestamp', { value: $('#settingsLoggingUseUnixTimestamp').prop("checked") })
}

function onChangeLogMessages() {
    // alert("onChangeLogMessages called. '" + $('#settingsLoggingLogMessages').val() + "'")
}

function onChangeOutputToConsole() {
    // alert("onChangeOutputToConsole called. '" + $('#settingsLoggingOutputToConsole').val() + "'")
}

function onChangeOutputToCallback() {
    // alert("onChangeOutputToCallback called. '" + $('#settingsLoggingOutputToCallback').val() + "'")
}

function onChangePcf8591Address() {

}


