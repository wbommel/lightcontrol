$(document).ready(function () {
    // testing FancyGrid ***********************************************************************************************
    var gridInstance = null;
    var gridData = [];
    // testing FancyGrid ***********************************************************************************************

    // WebSocket: create connection to server
    var socket = io.connect();

    // remember current mode
    var currentMode = -1;

    // constants
    var MaxDimValue = 255;

    // socket listeners ************************************************************************************************
    //client-initialize event
    socket.on('client-initialize', function (data) {
        currentMode = data.Mode; //remember current mode
        $('#switchDebugInfo').html(data.ShowDebugInfoSwitch ? '&#10004;' : '');
        showMode(data.Mode); //show mode initially
        $('#sliderValueLocal').html(data.CalculatedDimValue);
    });

    //debugInfo event
    socket.on('debugInfo', function (data) {
        //blink server comm
        $('#serverCommBlink').css('background-color', 'green');
        setTimeout(function () {
            $('#serverCommBlink').css('background-color', '#1D568D');
        }, 100);

        //show light status
        $('#lightStatusCalculatedValue').html(getDimValuePercentage(data.CalculatedDimValue) + '%');
        $('#lightStatusHardwareValue').html(getDimValuePercentage(data.HardwareDimValue) + '%');
        $('#lightStatusCalculatedVisual').css('background-color', 'rgb(' + data.CalculatedDimValue + ',' + data.CalculatedDimValue + ',' + data.CalculatedDimValue + ')');
        $('#lightStatusHardwareVisual').css('background-color', 'rgb(' + data.HardwareDimValue + ',' + data.HardwareDimValue + ',' + data.HardwareDimValue + ')');

        //show debug info switch
        $('#switchDebugInfo').html(data.ShowDebugInfoSwitch ? '&#10004;' : '');
        if (data.ShowDebugInfoSwitch) {
            $('#debugInfo').show('scale', {}, 1000); // https://jqueryui.com/show/
        } else {
            $('#debugInfo').hide('highlight', {}, 1000); // https://jqueryui.com/hide/
        }

        //show debug info
        showDebugInfo(data);

        //show mode when applicable
        if (currentMode != data.Mode) {
            currentMode = data.Mode;
            showMode(data.Mode);
            $('#sliderValueLocal').html(data.CalculatedDimValue);
        }

        //show manual values when applicable
        if (currentMode === 0) {
            showManualValues(data.ManualLampOn, data.CalculatedDimValue);
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
            $('#manualControl').show(2000); // https://jqueryui.com/show/
        }
        if (mode === 1) {
            $('#modetext').html('Automatic Mode');
            $('#manualControl').hide('slide', {}, 2000); // https://jqueryui.com/hide/
        }
    }

    /**
     * shows the current manual values
     * @param lightOn
     * @param dimValue
     */
    function showManualValues(lightOn, dimValue) {
        $('#slider').attr('value', dimValue);
        $('#sliderValueServer').html(dimValue);
    }

    /**
     * calculates percentage value
     * @param value
     * @returns {number}
     */
    function getDimValuePercentage(value) {
        if (value > MaxDimValue || value < 0) {
            return -1;
        }
        return Math.trunc((100 / MaxDimValue) * value);
    }

    /**
     * shows the debug info
     * @param data
     */
    function showDebugInfo(data) {
        //simply show message generated by server
        //$('#debugInfo').html(data.ServerStatusMessage);

        //run through data
        var elementParent = '';
        var elementChildDesc = '';
        var elementchildValue = '';
        var value = '';

        for (key in data) {
            //skip ServerStatusMessage
            if (key === 'ServerStatusMessage') {
                continue;
            }

            //create element if not existing
            elementParent = key;
            elementChildDesc = key + 'Desc';
            elementchildValue = key + 'Value';

            if (!$('#' + elementParent).length) {
                $('#debugInfo').append('<div id="' + elementParent + '" class="debugInfoParent"><div id="' + elementChildDesc + '" class="debugInfoChildDesc"></div><div id="' + elementchildValue + '" class="debugInfoChildValue"></div></div>');
                $('#' + elementChildDesc).html(key);
                $('#' + elementchildValue).html(data[key]);
            } else {
                //generate value
                if (key === "CurrentRule") {
                    if (data[key]) {
                        value = 'id:' + data[key].id + ', Priority:' + data[key].Priority + ', From:' + data[key].From + ', To:' + data[key].To + ', DimTime:' + data[key].DimTime + ', Weekdays:' + data[key].Weekdays;
                    } else {
                        value = 'no rule active...';
                    }
                } else {
                    value = data[key].toString();
                }

                //element exists already. just write value when changed
                if ($('#' + elementchildValue).html() !== value) {
                    $('#' + elementchildValue).html(value);
                }
            }
        }
    }

    /**
     * testing slick grid **********************************************************************************************
     * https://github.com/mleibman/SlickGrid
     */

    /**
     * testing slick grid **********************************************************************************************
     * https://github.com/mleibman/SlickGrid
     */

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



