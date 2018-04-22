/**
 *
 */

var maxValue = 255;


exports.CalcDimValueByRule = function (rule) {
    if (!rule) {
        return 0;
    }

    var now = new Date(new Date().toLocaleString());
    var from = new Date(new Date().toLocaleString());
    var to = new Date(new Date().toLocaleString());
    from.setHours(parseInt(rule.From.split(';')[3]));
    from.setMinutes(parseInt(rule.From.split(';')[4]));
    from.setSeconds(0);
    from.setMilliseconds(0);
    to.setHours(parseInt(rule.To.split(';')[3]));
    to.setMinutes(parseInt(rule.To.split(';')[4]));
    to.setSeconds(0);
    to.setMilliseconds(0);
    var fromDim = new Date(from.getTime());
    fromDim.setMinutes(fromDim.getMinutes() + rule.DimTime);
    var toDim = new Date(to.getTime());
    toDim.setMinutes(toDim.getMinutes() + rule.DimTime);

    //prepare calculation vars
    var isDimUp = now >= from && now <= fromDim;
    var isDimDown = now >= to && now <= toDim;

    if (isDimUp || isDimDown) {
        var fac = maxValue / (rule.DimTime * 60);//get value per second

        if (isDimUp) {
            return parseInt(((parseInt(now.getTime()) - parseInt(from.getTime())) / 1000) * fac);
        } else {
            return parseInt(((parseInt(toDim.getTime()) - parseInt(now.getTime())) / 1000) * fac);
        }
    }

    return maxValue;
};