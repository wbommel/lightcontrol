var uiColors = ['bg-blue-1', 'bg-blue-2', 'bg-blue-3', 'bg-blue-4', 'bg-green-1', 'bg-green-2', 'bg-green-3', 'bg-green-4'];

var bommelLightControlUI = {
    id: 'wpr_viewport',
    type: 'wrapper',
    version: 'row',
    flex: 'h',
    /*color: 'bg-grey-2',*/
    arrive: function () {
        $(this).viewport('zoom', { width: 1920, height: 1080 });
    },
    children: [


        /********************** header **********************/
        {
            type: 'row',
            version: 'header',
            /*color: 'bg-blue-2',*/
            height: 400,
            flex: 'h',
            children: [


                {
                    type: 'column',
                    color: 'bg-blue-3',
                    style: 'width:150px;',
                    flex: 'v',
                    children: [

                        { type: 'elbow', version: 'top-left', color: LCARS.colorGen(uiColors), flex: 'v', label: labelGen() },
                        { type: 'button', color: 'bg-blue-1', size: 'step-two', label: 'Server activity', id: 'serverCommBlink' },
                        { type: 'elbow', version: 'bottom-left', color: LCARS.colorGen(uiColors), flex: 'v', label: labelGen() },

                    ]
                },
                {
                    type: 'wrapper',
                    color: 'bg-green-2',
                    flexC: 'h',
                    flex: 'v',
                    children: [

                        {
                            type: 'wrapper', version: 'content', flexC: 'v', children: [

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
                        },

                    ]
                },


                /*                 //Header Bottom Bars
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
                                },
                 */

                {
                    type: 'row',
                    color: 'bg-green-4',
                    flexC: 'h',
                    flex: 'v',
                    children: [

                        {
                            type: 'column',
                            /*color: 'bg-blue-3',*/
                            style: 'width:150px;',
                            flex: 'v',
                            children: [

                                { type: 'elbow', version: 'top-left', color: LCARS.colorGen(uiColors), flex: 'v', label: labelGen() },
                                { type: 'button', color: LCARS.colorGen(uiColors), flexC: 'v', label: labelGen() },

                            ]
                        }

                    ]
                }


            ]
        }


    ]
};



$(document).on('ready', function () {
    $(bommelLightControlUI).createObject({ appendTo: 'body' });
});


function labelGen() {
    return Math.floor(999 * Math.random()) + '-' + Math.floor(999 * Math.random());
};














/* old stuff:
$(window).on('resize orientationChange', function (event) {
    var width = $(window).width();
    var height = $(window).height();
    $('#Teststring').html('viewport<br/>width: ' + width + '<br/>height: ' + height);
    //$('body').prepend('TEST'+width+height);
});
*/