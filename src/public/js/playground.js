$(window).on('resize orientationChange', function (event) {
    var width = $(window).width();
    var height = $(window).height();
    $('#Teststring').html('viewport<br/>width: ' + width + '<br/>height: ' + height);
    //$('body').prepend('TEST'+width+height);
});