


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
                                                                        { type: 'button', color: LCARS.colorGen(uiColors), label: labelGen(), version: 'left', },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors), label: labelGen(), },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors), label: labelGen(), version: 'left', },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors), label: labelGen(), },
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
                                                                        {
                                                                                type: 'button',
                                                                                color: LCARS.colorGen(uiColors),
                                                                                label: 'Manual On',
                                                                                version: 'left',
                                                                                click: function () { socket.emit('ManualValue_100', {}) }
                                                                        },
                                                                        {
                                                                                type: 'button',
                                                                                color: LCARS.colorGen(uiColors),
                                                                                label: 'Manual Off',
                                                                                click: function () { socket.emit('ManualValue_0', {}) }
                                                                        },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors), label: labelGen(), version: 'left' },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors), label: labelGen() },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors), label: labelGen(), version: 'left', state: 'ra_g1' },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors), label: labelGen() }
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
                                                                        {
                                                                                type: 'elbow',
                                                                                version: 'top-left',
                                                                                color: LCARS.colorGen(uiColors),
                                                                                class: 'step-two',
                                                                                label: 'Toggle Automatic Mode',
                                                                                click: function () { socket.emit('AutomaticMode_Toggle', {}) }
                                                                        },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors) },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors), size: 'step-two' },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors) },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors), size: 'step-two' },
                                                                        { type: 'button', color: LCARS.colorGen(uiColors), flexC: 'v' }
                                                                ]
                                                        },

                                                        {
                                                                type: 'column', flexC: 'h', flex: 'v', children:
                                                                        [
                                                                                //Top Bars Group
                                                                                {
                                                                                        type: 'row', flex: 'h', class: 'frame', children:
                                                                                                [
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
                                                                                                {
                                                                                                        type: 'dialog',
                                                                                                        style: 'width:100%;  ',
                                                                                                        template: LCARS.templates.sdk.dialog.typeT,
                                                                                                        content: [
                                                                                                                {
                                                                                                                        type: 'htmlTag',
                                                                                                                        tag: 'p',
                                                                                                                        id: 'debugMessages',
                                                                                                                        text: 'P Tag 24px Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 1234567890!@#$%^&*()-=_+/?\|[]{}`~',
                                                                                                                        color: 'text-green-1'
                                                                                                                }]
                                                                                                }
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
        socket.on('heartbeat', function (data) {
                //blink server comm
                $('#serverCommBlink').objectSettings({ color: 'bg-green-2' });
                setTimeout(function () {
                        $('#serverCommBlink').objectSettings({ color: 'bg-blue-1' });
                }, 200);
        })

        socket.on('debugLogMessage', function (data) {
                $('#debugMessages').append(data.Message + '<br/>');
        });
        // socket listeners ************************************************************************************************



        // frontend events *************************************************************************************************
        // frontend events *************************************************************************************************



        // functions *******************************************************************************************************
        // functions *******************************************************************************************************
});


function labelGen() {
        return Math.floor(999 * Math.random()) + '-' + Math.floor(999 * Math.random());
};


