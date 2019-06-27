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

            let strRulePriorityName = 'rulePriority' + rule.id
            let strRuleFromName = 'ruleFrom' + rule.id
            let strRuleToName = 'ruleTo' + rule.id
            let strRuleDimTimeName = 'ruleDimTime' + rule.id
            let strRuleWeekdaysName = 'ruleWeekdays' + rule.id

            //$('#lightrules').append($("<label>").text('Rule:'))
            //$('#lightrules').append($('<input type="text">').attr({ id: strRuleFromName, name: 'from', value: rule.From }))


            let fixture = $([
                "           <div id='", "rule", rule.id, "'>",
                "               <h5>Rule ", rule.id, "</h5>",
                "               <label class='lightrulelabel'>Priority:</label>",
                "               <input id='", strRulePriorityName, "' type='text' value='", rule.Priority, "' onchange='onChangeRulePriority(this)' />",
                "               </br>",
                "               <label class='lightrulelabel'>From:</label>",
                "               <input id='", strRuleFromName, "' type='text' value='", rule.From, "' onchange='onChangeRuleFrom(this)' />",
                "               </br>",
                "               <label class='lightrulelabel'>To:</label>",
                "               <input id='", strRuleToName, "' type='text' value='", rule.To, "' onchange='onChangeRuleTo(this)' />",
                "               </br>",
                "               <label class='lightrulelabel'>DimTime:</label>",
                "               <input id='", strRuleDimTimeName, "' type='text' value='", rule.DimTime, "' onchange='onChangeRuleDimTime(this)' />",
                "               </br>",
                "               <label class='lightrulelabel'>Weekdays:</label>",
                "               <input id='", strRuleWeekdaysName, "' type='text' value='", rule.Weekdays, "' onchange='onChangeRuleWeekdays(this)' />",
                "           </div>"
            ].join("\n"))
            $('#lightrules').append(fixture)
        }
    })

    socket.on('config_changed_on_server', function (data) {
    })

    socket.on('client_message', function (data) {
        alert(data.message)
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
    if (socket !== undefined) {
        socket.emit('set_logging_UseUnixTimestamp', { value: $('#settingsLoggingUseUnixTimestamp').prop("checked") })
    }
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

function onChangeRulePriority(data) {
    alert('onChangeRulePriority() called... \n' + data.id + '\n' + data.value)
}

function onChangeRuleFrom(data) {
    alert('onChangeRuleFrom() called... \n' + data.id + '\n' + data.value)
}

function onChangeRuleTo(data) {
    alert('onChangeRuleTo() called... \n' + data.id + '\n' + data.value)
}

function onChangeRuleDimTime(data) {
    alert('onChangeRuleDimTime() called... \n' + data.id + '\n' + data.value)
}

function onChangeRuleWeekdays(data) {
    alert('onChangeRuleWeekdays() called... \n' + data.id + '\n' + data.value)
}

