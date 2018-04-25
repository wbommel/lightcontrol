$(document).ready(function () {
    // WebSocket
    var socket = io.connect();

    // neue Nachricht
    socket.on('chat', function (data) {
        var zeit = new Date(data.zeit);
        $('#content').append(
            $('<li></li>').append(
                // Uhrzeit
                $('<span>').text('[' +
                    (zeit.getHours() < 10 ? '0' + zeit.getHours() : zeit.getHours())
                    + ':' +
                    (zeit.getMinutes() < 10 ? '0' + zeit.getMinutes() : zeit.getMinutes())
                    + '] '),
                // Name
                $('<b>').text(typeof(data.name) != 'undefined' ? data.name + ': ' : ''),
                // Text
                $('<span>').text(data.text)));

        // nach unten scrollen
        $('body').scrollTop($('body')[0].scrollHeight);
    });

    // Nachricht senden
    function senden() {
        // Eingabefelder auslesen
        var name = $('#name').val();
        var text = $('#text').val();

        // Socket senden
        socket.emit('chat', {
            name: name,
            text: text
        });
        // Text-Eingabe leeren
        $('#text').val('');
    }

    // bei einem Klick
    $('#senden').click(senden);

    // oder mit der Enter-Taste
    $('#text').keypress(function (e) {
        if (e.which == 13) {
            senden();
        }
    });

    $('#requestcontent').click(requestcontent);

    function requestcontent() {
        socket.emit('webtest', 'This is the data...');
    }


    socket.on('contentsent', function (data) {
        /* write content to #dest div */
        if (data.destination === 'dest') {
            $('#dest').html(data.content);
            /* This would be a more flexible approach, so you can specify on server side which destination you wish
                $('#' + data.destination).append(data.content);
            */
        }

        /* write content to #rule div */
        if (data.destination === 'rule') {
            $('#rule').html(data.content);
        }

        /* also show value of debug switch */
        if (data.debug) {
            $('#rule').show(2000);
            //$('#rule').toggle();
            //$('#rule').removeAttr("style").hide().fadeIn();
        } else {
            var effect = 'slide';
            var options = {};
            $('#rule').hide(effect, options, 2000);
            //$('#rule').toggle();
        }
    });


    $('#removecontent').click(removecontent);

    function removecontent() {
        $('#dest').empty();
    }


    /* receive server status info */
    socket.on('status', function (data) {
        $('#dest').html('current mode: ' + data.mode);
    });


    /* testing purposes. show desired information refreshing every second */
    setInterval(_debugInfo, 1000);

    function _debugInfo() {
        //$('#dest').html($('#rule').is(":visible"));
    }


});

