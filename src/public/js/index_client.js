$(document).ready(function () {
    // testing FancyGrid ***********************************************************************************************
    var gridInstance = null;
    var gridData = [];
    // testing FancyGrid ***********************************************************************************************

    // WebSocket: create connection to server
    var socket = io.connect();

    // remember current mode
    var currentMode = -1;


    // socket listeners ************************************************************************************************
    //client-initialize event
    socket.on('client-initialize', function (data) {
        currentMode = data.Mode; //remember current mode
        $('#switchDebugInfo').html(data.ShowDebugInfoSwitch ? '&#10004;' : '');
        showMode(data.Mode); //show mode initially
        $('#sliderValueLocal').html(data.CurrentDimValue);
    });

    //server-status event
    socket.on('server-status', function (data) {
        //blink server comm
        $('#serverCommBlink').css('background-color', 'green');
        setTimeout(function () {
            $('#serverCommBlink').css('background-color', '#1D568D');
        }, 100);

        //show debug info switch
        $('#switchDebugInfo').html(data.ShowDebugInfoSwitch ? '&#10004;' : '');

        //show server status info
        $('#server-status').html(data.ServerStatusMessage);

        //show mode when applicable
        if (currentMode != data.Mode) {
            currentMode = data.Mode;
            showMode(data.Mode);
            $('#sliderValueLocal').html(data.CurrentDimValue);
        }

        //show manual values when applicable
        if (currentMode === 0) {
            showManualValues(data.ManualLampOn, data.CurrentDimValue);
        }
    });

    socket.on('returnLightrulesData', function (data) {
        //alert('data: '+ data.AllRules);
        gridData = data.AllRules;
        //$('#info-bar').html(gridData.toString());
        //gridInstance.update();
        if (gridInstance) {
            destroyGrid();
            createGrid();
        } else {
            createGrid();
        }
    });
    // socket listeners ************************************************************************************************



    // frontend events *************************************************************************************************
    $('#debugInfoSwitch').change(function () {
        socket.emit('debugInfoChanged', {
            ShowDebugInfoSwitch: this.checked
        });
    });

    $('#switchDebugInfo').click(function () {
        socket.emit('debugInfoChanged', {
            ShowDebugInfoSwitch: $('#switchDebugInfo').html() != '' ? false : true
        });
    });

    $('#toggleMode').click(function () {
        socket.emit('toggleMode', {});
    });

    slider.oninput = function () {
        $('#sliderValueLocal').html(this.value);
        socket.emit('manualSliderValueChanged', {
            SliderValue: this.value
        });
    };

    $('#switchLight').click(function () {
        socket.emit('manualToggleLampOnOff', {});
    });

    $('#showLightrulePopup').click(function () {
        //socket.emit('getLightrulesData', {});
        $('#lightRulePopup').css('display', 'block');
        socket.emit('getLightrulesData', {});
    });

    $('#lightRulePopupClose').click(function () {
        //TODO: Ask if really to be closed when unsaved datachanges exist
        destroyGrid();
        $('#lightRulePopup').css('display', 'none');
    });
    // frontend events *************************************************************************************************



    // functions *******************************************************************************************************
    /**
     * shows the server-mode
     * @param mode
     */
    function showMode(mode) {
        $('#mode-bar').attr('datamode', mode);
        if (mode === 0) {
            $('#modetext').html('Manual Mode');
            $('#manualControl').show(2000);
        }
        if (mode === 1) {
            $('#modetext').html('Automatic Mode');
            $('#manualControl').hide('slide', {}, 2000);
        }
    }

    /**
     * shows the current manual values
     * @param lightOn
     * @param dimValue
     */
    function showManualValues(lightOn, dimValue) {
        if (lightOn) {
            $('#switchLight').css('background-color', 'white');
        } else {
            $('#switchLight').css('background-color', 'black');
        }
        $('#slider').attr('value', dimValue);
        $('#sliderValueServer').html(dimValue);
    }

    /**
     * testing FancyGrid ***********************************************************************************************
     */
    function createGrid() {
        gridInstance = $('#fancyContainer').FancyGrid({
            /*window: true,
            model: true,*/
            renderTo: 'fancyContainer',
            resizeable: true,

            title: {
                text: 'Lightrules'
            },
            titleHeight: 50,

            theme: 'gray',

            width: 800,
            height: 500,
            /*            width: 'fit',
                        height: 'fit',*/


            tbar: [{
                type: 'button',
                text: 'Add',
                handler: function () {

                }
            }, {
                type: 'button',
                text: 'Delete',
                handler: function () {
                    alert('delete me');
                    //gridInstance.selected(e);
                    //socket.emit('lightRule_Delete', {Id:})
                }
            }, {
                type: 'button',
                text: 'refresh',
                handler: function () {
                    socket.emit('getLightrulesData', {});
                }
            }],

            events: [{
                rowclick: function (grid, o) {
                    alert(o.item.get('From'));
                    //grid.update();
                },
                rowdblclick: function (grid, o) {
                    alert(o.item.get('To'));
                },
                scope: {}// not required
            }],

            selModel: {
                type: 'rows',
                allowDeselect: true
            },

            data: gridData,
            columns: [{
                index: 'id',
                title: 'ID',
                type: 'number',
                width: 50
            }, {
                index: 'Priority',
                title: 'Priority',
                type: 'number',
                width: 60
            }, {
                index: 'From',
                title: 'From',
                type: 'string',
                width: 120
            }, {
                index: 'To',
                title: 'To',
                type: 'string',
                width: 120
            }, {
                index: 'DimTime',
                title: 'DimTime',
                type: 'number',
                width: 65
            }, {
                index: 'Weekdays',
                title: 'Weekdays',
                type: 'number',
                width: 100
            }]
        });
    }

    function destroyGrid() {
        gridInstance.destroy();
        gridInstance = null;
    }

    // testing FancyGrid ***********************************************************************************************

    // functions *******************************************************************************************************
});



