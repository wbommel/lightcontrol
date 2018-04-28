$(document).ready(function () {
    //alert('document ready');

    // WebSocket: create connection to server
    var socket = io.connect();

    //client-initialize event
    socket.on('client-initialize', function (data) {
        $("#debugInfo").prop("checked", data.ShowDebugInfoSwitch);
    });

    //server-status event
    socket.on('server-status', function (data) {
        $('#server-status').html(data.ServerStatusMessage);
    });


    //checkbox click event
    $('#debugInfo').change(function () {
        //alert('hooray');
        socket.emit('debugInfoChanged', {
            ShowDebugInfoSwitch: this.checked
        });
    });
});

