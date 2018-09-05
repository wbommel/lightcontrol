


var uiColors = ['bg-blue-1', 'bg-blue-2', 'bg-blue-3', 'bg-blue-4', 'bg-green-1', 'bg-green-2', 'bg-green-3', 'bg-green-4'];

//Template for the Bracket Element
var bracket = {
        type: 'wrapper', class: 'sdk bracket typeA', children: [
                { type: 'wrapper', class: 'content' },
                { type: 'elbow', version: 'top-left', size: 'small', color: LCARS.colorGen(uiColors), children: [{ type: 'bar' }], noEvent: true },
                { type: 'elbow', version: 'top-right', size: 'small', color: LCARS.colorGen(uiColors), children: [{ type: 'bar' }], noEvent: true },
                { type: 'elbow', version: 'bottom-left', size: 'small', color: LCARS.colorGen(uiColors), children: [{ type: 'bar' }], noEvent: true },
                { type: 'elbow', version: 'bottom-right', size: 'small', color: LCARS.colorGen(uiColors), children: [{ type: 'bar' }], noEvent: true },
                {
                        type: 'column', flex: 'v', children: [
                                { type: 'bar', flexC: 'v', color: LCARS.colorGen(uiColors) },
                                { type: 'bar', flexC: 'v', color: LCARS.colorGen(uiColors), children: [{ type: 'bar', color: 'bg-white' }] },
                                { type: 'bar', flexC: 'v', color: LCARS.colorGen(uiColors) }
                        ]
                },
                {
                        type: 'column', flex: 'v', children: [
                                { type: 'bar', flexC: 'v', color: LCARS.colorGen(uiColors) },
                                { type: 'bar', flexC: 'v', color: LCARS.colorGen(uiColors) },
                                { type: 'bar', flexC: 'v', color: LCARS.colorGen(uiColors) }
                        ]
                },
                {
                        type: 'column', flex: 'v', children: [
                                { type: 'bar', flexC: 'v', color: LCARS.colorGen(uiColors) },
                                { type: 'bar', flexC: 'v', color: LCARS.colorGen(uiColors), children: [{ type: 'bar', color: 'bg-white' }] },
                                { type: 'bar', flexC: 'v', color: LCARS.colorGen(uiColors) }
                        ]
                },
                {
                        type: 'column', flex: 'v', children: [
                                { type: 'bar', flexC: 'v', color: LCARS.colorGen(uiColors) },
                                { type: 'bar', flexC: 'v', color: LCARS.colorGen(uiColors) },
                                { type: 'bar', flexC: 'v', color: LCARS.colorGen(uiColors) }
                        ]
                }
        ]
};









var bommelLightControlUI = {
        type: 'wrapper', id: 'wpr_viewport', version: 'row', flex: 'h', arrive: function () { $(this).viewport('zoom', { width: 1920, height: 1080 }); }, children: [
                //Elbow & Button
                {
                        type: 'column', flex: 'v', children: [
                                { type: 'button', color: LCARS.colorGen(uiColors), size: 'step-two', label: labelGen() },
                                { type: 'elbow', version: 'bottom-left', color: LCARS.colorGen(uiColors), label: labelGen(), width: 500 },
                                { type: 'elbow', version: 'top-left', color: LCARS.colorGen(uiColors), label: labelGen(), width: 300 },
                                { type: 'button', color: LCARS.colorGen(uiColors), size: 'step-three', label: labelGen() },
                                { type: 'button', color: LCARS.colorGen(uiColors), size: 'step-one', label: labelGen() },
                                { type: 'button', color: LCARS.colorGen(uiColors), size: 'step-two', label: labelGen() },
                                { type: 'button', color: LCARS.colorGen(uiColors), size: 'step-three', label: labelGen() },
                        ]
                },

                {
                        type: 'wrapper', flexC: 'h', flex: 'v', children: [

                                //Header Content Area
                                {
                                        type: 'wrapper', version: 'content', flexC: 'v', children: [

                                                //Header Title
                                                { type: 'title', text: 'Light Control' },

                                                //Header Pill Button Group
                                                {
                                                        type: 'wrapper', flex: 'h', class: 'button-wrap', children: [
                                                                { type: 'button', color: LCARS.colorGen(uiColors), version: 'pill', label: 'Test', click: function () { alert('Test was clicked'); } },
                                                                { type: 'button', color: LCARS.colorGen(uiColors), version: 'pill', label: labelGen(), flex: 'h' },
                                                                { type: 'button', color: LCARS.colorGen(uiColors), version: 'pill', label: 'Docs', state: 'blink', href: 'https://github.com/Aricwithana/LCARS-SDK/wiki' }
                                                        ]
                                                },
                                        ]
                                },
                        ]
                },

                /*
                //Header Bottom Bars
                {
                        type: 'row', version: 'frame', flexC: 'h', children: [
                                { type: 'bar', color: LCARS.colorGen(uiColors) },
                                { type: 'bar', color: LCARS.colorGen(uiColors) },
                                { type: 'bar', color: LCARS.colorGen(uiColors) },
                                { type: 'bar', color: LCARS.colorGen(uiColors), flexC: 'h' },
                                { type: 'bar', color: LCARS.colorGen(uiColors) },
                                { type: 'bar', color: LCARS.colorGen(uiColors) },
                                { type: 'bar', color: LCARS.colorGen(uiColors) }
                        ]
                },
*/
                // {

                //         type: 'wrapper', version: 'column', style: 'width:350px;', flex: 'v', children: [
                //                 { type: 'checkbox', text: 'Off', template: LCARS.templates.sdk.buttons.checkboxText.typeBR, colors: LCARS.colorGroupGen(uiColors, 3), label: 'Type BR' }
                //         ]
                // }
        ]
};

$(document).on('ready', function () {
        //UI Framing.  Uses the Arrive event to trigger the Viewport scaling.
        var nemesisUI = {
                type: 'wrapper', id: 'wpr_viewport', version: 'row', flex: 'h', arrive: function () { $(this).viewport('zoom', { width: 1920, height: 1080 }); }, children: [

                        //Left Column Wrapper
                        {
                                type: 'column', flex: 'v', children: [
                                        {
                                                type: 'wrapper', children: [

                                                        //Bracket
                                                        { type: 'bracket', template: bracket, id: 'bracketTest' },

                                                        //Top Button Group
                                                        {
                                                                type: 'wrapper', flex: 'h', version: 'button-wrap', children: [
                                                                        {
                                                                                type: 'button',
                                                                                color: LCARS.colorGen(uiColors),
                                                                                label: 'show bracket',
                                                                                version: 'left',
                                                                                click: function () { $('#bracketTest').showObject({}); }
                                                                        },
                                                                        {
                                                                                type: 'button',
                                                                                color: LCARS.colorGen(uiColors),
                                                                                label: 'hide bracket',
                                                                                click: function () { $('#bracketTest').hideObject({}); }
                                                                        },
                                                                        {
                                                                                type: 'button',
                                                                                color: LCARS.colorGen(uiColors),
                                                                                label: 'debug on',
                                                                                version: 'left',
                                                                                click: function () { socket.emit('debugInfoChanged', { ShowDebugInfoSwitch: true }); }
                                                                        },
                                                                        {
                                                                                type: 'button',
                                                                                color: LCARS.colorGen(uiColors),
                                                                                label: 'debug off',
                                                                                click: function () { socket.emit('debugInfoChanged', { ShowDebugInfoSwitch: false }); }
                                                                        },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors), version: 'left' },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors) },
                                                                        {
                                                                                type: 'column', style: 'justify-content: flex-end;', flexC: 'v', flex: 'v', children: [
                                                                                        {
                                                                                                type: 'checkbox',
                                                                                                id: 'switchDebugInfo',
                                                                                                template: LCARS.templates.sdk.buttons.checkboxText.typeBR,
                                                                                                name: 'samples112',
                                                                                                text: '00',
                                                                                                label: 'debug status',
                                                                                                color: LCARS.colorGen(uiColors)
                                                                                        },]
                                                                        },

                                                                ]
                                                        },

                                                        //Bottom Button Group
                                                        {
                                                                type: 'wrapper', flex: 'h', version: 'button-wrap', children: [
                                                                        { type: 'button', color: LCARS.colorGen(uiColors), version: 'left' },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors) },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors), version: 'left' },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors) },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors), version: 'left', state: 'ra_g1' },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors) }
                                                                ]
                                                        }
                                                ]
                                        },

                                        {
                                                type: 'column', style: 'justify-content: flex-end;', flexC: 'v', flex: 'v', children: [
                                                        {
                                                                type: 'checkbox',
                                                                id: 'switchDebugInfo__ORG',
                                                                template: LCARS.templates.sdk.buttons.checkboxText.typeBR,
                                                                name: 'samples11',
                                                                text: '00',
                                                                label: 'debug status',
                                                                color: LCARS.colorGen(uiColors),
                                                                click: function switchDebugInfo() {
                                                                        socket.emit('debugInfoChanged', {
                                                                                ShowDebugInfoSwitch: $('#switchDebugInfo').objectSettings('checked')
                                                                        });
                                                                }
                                                        },
                                                ]
                                        }

                                ]
                        },

                        //Column Buttons
                        {
                                type: 'wrapper', version: 'column', style: 'width:50px;', flex: 'v', children: [
                                        { type: 'button', color: LCARS.colorGen(uiColors) },
                                        { type: 'button', color: LCARS.colorGen(uiColors) },
                                        { type: 'button', color: LCARS.colorGen(uiColors), size: 'step-two' },
                                        { type: 'button', color: LCARS.colorGen(uiColors), size: 'step-three' },
                                        { type: 'button', color: LCARS.colorGen(uiColors), size: 'step-three' },
                                        { type: 'button', color: LCARS.colorGen(uiColors) },
                                        { type: 'button', color: LCARS.colorGen(uiColors) },
                                        { type: 'button', color: LCARS.colorGen(uiColors) },
                                        { type: 'button', color: LCARS.colorGen(uiColors), flexC: 'v' }
                                ]
                        },

                        //Main Area
                        {
                                type: 'wrapper', version: 'column', id: 'wpr_mainView', flex: 'v', flexC: 'h', children: [

                                        //Header
                                        {
                                                type: 'row', version: 'header', flex: 'h', children: [

                                                        //Elbow & Button
                                                        {
                                                                type: 'column', flex: 'v', children: [
                                                                        { type: 'button', color: 'bg-blue-1', size: 'step-two', label: 'Server activity', id: 'serverCommBlink' },
                                                                        { type: 'elbow', version: 'bottom-left', color: LCARS.colorGen(uiColors), flexC: 'v', label: '821-553', width: 500 }
                                                                ]
                                                        },
 
                                                        {
                                                                type: 'wrapper', flexC: 'h', flex: 'v', children: [

                                                                        //Header Content Area
                                                                        {
                                                                                type: 'wrapper', version: 'content', flexC: 'v', children: [

                                                                                        //Header Title
                                                                                        { type: 'title', text: 'Light Control' },

                                                                                        //Header Pill Button Group
                                                                                        {
                                                                                                type: 'wrapper', flex: 'h', class: 'button-wrap', children: [
                                                                                                        { type: 'button', color: LCARS.colorGen(uiColors), version: 'pill', label: 'Test', click: function () { alert('Test was clicked'); } },
                                                                                                        { type: 'button', color: LCARS.colorGen(uiColors), version: 'pill' },
                                                                                                        { type: 'button', color: LCARS.colorGen(uiColors), version: 'pill' },
                                                                                                        { type: 'button', color: LCARS.colorGen(uiColors), version: 'pill' },
                                                                                                        { type: 'button', color: LCARS.colorGen(uiColors), version: 'pill' },
                                                                                                        { type: 'button', color: LCARS.colorGen(uiColors), version: 'pill', label: 'Docs', state: 'blink', href: 'https://github.com/Aricwithana/LCARS-SDK/wiki' }
                                                                                                ]
                                                                                        },
                                                                                ]
                                                                        },

                                                                        //Header Bottom Bars
                                                                        {
                                                                                type: 'row', version: 'frame', flex: 'h', children: [
                                                                                        { type: 'bar', color: LCARS.colorGen(uiColors) },
                                                                                        { type: 'bar', color: LCARS.colorGen(uiColors) },
                                                                                        { type: 'bar', color: LCARS.colorGen(uiColors) },
                                                                                        { type: 'bar', color: LCARS.colorGen(uiColors), flexC: 'h' },
                                                                                        { type: 'bar', color: LCARS.colorGen(uiColors) },
                                                                                        { type: 'bar', color: LCARS.colorGen(uiColors) },
                                                                                        { type: 'bar', color: LCARS.colorGen(uiColors) }
                                                                                ]
                                                                        }

                                                                ]
                                                        }

                                                ]
                                        },

                                        //Main Content Area
                                        {
                                                type: 'wrapper', class: 'main', flex: 'h', flexC: 'v', children: [

                                                        //Left Columns & Elbow
                                                        {
                                                                type: 'wrapper', version: 'column', flex: 'v', children: [
                                                                        { type: 'elbow', version: 'top-left', color: LCARS.colorGen(uiColors), class: 'step-two' },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors) },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors), size: 'step-two' },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors) },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors), size: 'step-two' },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors), flexC: 'v' }
                                                                ]
                                                        },

                                                        {
                                                                type: 'column', flexC: 'h', flex: 'v', children: [
                                                                        //Top Bars Group
                                                                        {
                                                                                type: 'row', flex: 'h', class: 'frame', children: [
                                                                                        { type: 'bar', color: LCARS.colorGen(uiColors) },
                                                                                        { type: 'bar', color: LCARS.colorGen(uiColors), version: 'small' },
                                                                                        { type: 'bar', color: LCARS.colorGen(uiColors) },
                                                                                        { type: 'bar', color: LCARS.colorGen(uiColors), flexC: 'h' },
                                                                                        { type: 'bar', color: LCARS.colorGen(uiColors) },
                                                                                        { type: 'bar', color: LCARS.colorGen(uiColors) },
                                                                                        { type: 'bar', color: LCARS.colorGen(uiColors) }
                                                                                ]
                                                                        },

                                                                        //Main Content Wrapper
                                                                        {
                                                                                type: 'wrapper', class: 'content', flexC: 'v', style: ' overflow:auto;', children: [
                                                                                        { type: 'htmlTag', tag: 'p', id: 'debugMessages', text: '', color: LCARS.colorGen(uiColors).replace('bg-', 'text-') }
                                                                                ]
                                                                        }
                                                                ]
                                                        }
                                                ]
                                        }
                                ]
                        }
                ]
        };

        $(nemesisUI).createObject({ appendTo: 'body' });
        //$(bommelLightControlUI).createObject({ appendTo: 'body' });




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

                //$('#switchDebugInfo').html(data.ShowDebugInfoSwitch ? '&#10004;' : '');
                $('#switchDebugInfo').objectSettings({ checked: data.ShowDebugInfoSwitch, text: data.ShowDebugInfoSwitch ? 'on ' : 'off' })

                showMode(data.Mode); //show mode initially
                $('#sliderValueLocal').html(data.CalculatedDimValue);
        });

        //debugInfo event
        socket.on('debugInfo', function (data) {
                //blink server comm
                $('#serverCommBlink').objectSettings({ color: 'bg-green-2' });
                setTimeout(function () {
                        $('#serverCommBlink').objectSettings({ color: 'bg-blue-1' });
                }, 200);

                //show debug info switch
                $('#switchDebugInfo').objectSettings({ checked: data.ShowDebugInfoSwitch, text: data.ShowDebugInfoSwitch ? 'on ' : 'off' });




                //show light status
                $('#lightStatusCalculatedValue').html(getDimValuePercentage(data.CalculatedDimValue) + '%');
                $('#lightStatusHardwareValue').html(getDimValuePercentage(data.HardwareDimValue) + '%');
                $('#lightStatusCalculatedVisual').css('background-color', 'rgb(' + data.CalculatedDimValue + ',' + data.CalculatedDimValue + ',' + data.CalculatedDimValue + ')');
                $('#lightStatusHardwareVisual').css('background-color', 'rgb(' + data.HardwareDimValue + ',' + data.HardwareDimValue + ',' + data.HardwareDimValue + ')');


                if (data.ShowDebugInfoSwitch) {
                        $('#debugInfo').show('scale', {}, 1000); // https://jqueryui.com/show/
                        $('#debugMessages').show('scale', {}, 1000); // https://jqueryui.com/show/
                } else {
                        $('#debugInfo').hide('highlight', {}, 1000); // https://jqueryui.com/hide/
                        $('#debugMessages').hide('highlight', {}, 1000); // https://jqueryui.com/hide/
                }

                //show debug info
                showDebugInfo(data);

                //show mode when applicable
                if (currentMode != data.Mode) {
                        currentMode = data.Mode;
                        showMode(data.Mode);
                        $('#sliderValueLocal').html(data.CalculatedDimValue);

                        //set background after ACK from server
                        //$('#toggleMode,#modeToggle').css('background-color', '#aaaaaa');
                        //set responsive background
                        $('#modeToggle').attr('backgroundmode', 0);

                }

                //show manual values when applicable
                if (currentMode === 0) {
                        showManualValues(data.ManualLampOn, data.CalculatedDimValue);
                }
        });

        //
        socket.on('returnLightrulesData', function (data) {
                //testing SlickGrid
                slickGridData = data.AllRules;
                createSlickGrid();

                //testing FancyGrid
                // fancyGridData = data.AllRules;
                // if (fancyGridInstance) {
                //     destroyFancyGrid();
                //     createFancyGrid();
                // } else {
                //     createFancyGrid();
                // }
        });

        socket.on('debugLogMessage', function (data) {
                $('#debugMessages').append(data.Message + '<br/>');
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

        $('#toggleMode,#modeToggle').click(function () {
                socket.emit('toggleMode', {});

                //set responsive background
                $('#modeToggle').attr('backgroundmode', 1);
        });

        // slider.oninput = function () {
        //         $('#sliderValueLocal').html(this.value);
        //         socket.emit('manualSliderValueChanged', {
        //                 SliderValue: this.value
        //         });
        // };

        $('#showLightrulePopup').click(function () {
                //socket.emit('getLightrulesData', {});
                $('#lightRulePopup').css('display', 'block');
                socket.emit('getLightrulesData', {});
        });

        $('#lightRulePopupClose').click(function () {
                //TODO: Ask if really to be closed when unsaved datachanges exist

                //testing SlickGrid


                //testing FancyGrid
                //destroyFancyGrid();

                //close div
                $('#lightRulePopup').css('display', 'none');
        });


        /**
         * change styles on the fly
         */
        $('#styleSelectNormal').click(function () {
                changeCSS('styles/index.css', 0)
        });
        $('#styleSelectLCARS').click(function () {
                changeCSS('styles/index_lcars.css', 0)
        });

        function changeCSS(cssFile, cssLinkIndex) {

                var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

                var newlink = document.createElement("link");
                newlink.setAttribute("rel", "stylesheet");
                newlink.setAttribute("type", "text/css");
                newlink.setAttribute("href", cssFile);

                document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
        }    // frontend events *************************************************************************************************



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
         * https://github.com/6pac/SlickGrid (fork of: https://github.com/mleibman/SlickGrid)
         */
        // var slickGridInstance;
        // var slickGridData = [];
        // var slickGridColumns = [
        //         { id: "id", name: "ID", field: "id", width: 30 },
        //         {
        //                 id: "Priority",
        //                 name: "Priority",
        //                 field: "Priority",
        //                 editor: Slick.Editors.Integer,
        //                 validator: priorityFieldValidator
        //         },
        //         { id: "From", name: "From", field: "From" },
        //         { id: "To", name: "To", field: "To" },
        //         { id: "DimTime", name: "DimTime", field: "DimTime" },
        //         { id: "Weekdays", name: "Weekdays", field: "Weekdays" }
        // ];
        // var slickGridOptions = {
        //         editable: true,
        //         enableAddRow: true,
        //         asyncEditorLoading: false,
        //         autoEdit: false,
        //         enableCellNavigation: true,
        //         enableColumnReorder: false
        // };

        // function priorityFieldValidator(value) {
        //         if (value == null || value == undefined || value > 9999 || value < 0) {
        //                 return { valid: false, msg: "Please insert a priority between 0 and 9999" };
        //         } else {
        //                 return { valid: true, msg: null };
        //         }
        // }

        // function createSlickGrid() {
        //         if (!slickGridInstance) {
        //                 slickGridInstance = new Slick.Grid("#gridContainer", slickGridData, slickGridColumns, slickGridOptions);

        //                 slickGridInstance.onValidationError.subscribe(function (e, args) {
        //                         alert(args.validationResults.msg);
        //                 });
        //         }
        // }

        /**
         * testing slick grid **********************************************************************************************
         * https://github.com/6pac/SlickGrid (fork of: https://github.com/mleibman/SlickGrid)
         */

        /**
         * testing FancyGrid ***********************************************************************************************
         */
        var fancyGridInstance = null;
        var fancyGridData = [];

        function createFancyGrid() {
                fancyGridInstance = $('#gridContainer').FancyGrid({
                        /*window: true,
                        model: true,*/
                        renderTo: 'gridContainer',
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

                        data: fancyGridData,
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

        function destroyFancyGrid() {
                fancyGridInstance.destroy();
                fancyGridInstance = null;
        }

        // testing FancyGrid ***********************************************************************************************

        // functions *******************************************************************************************************
});


function labelGen() {
        return Math.floor(999 * Math.random()) + '-' + Math.floor(999 * Math.random());
};


