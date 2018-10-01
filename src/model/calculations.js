/**
 *
 */
let maxValue = 255;
let logger
let isInitialized = false


module.exports = {
    Init: function (diContainer) {
        logger = diContainer.logger;
        
        isInitialized = logger !== undefined
        return this;
    },
    CalcDimValueByRule: function (rule) {
        if (!isInitialized) { throw NotInitializedException(this) }

        //no rule active -> quit
        if (!rule) {
            return 0;
        }

        //for the sake of readability, generate all needed times first (now, from, fromDim, to, toDim)
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
        var isDimUp = now >= from && now <= fromDim;    //dim up phase
        var isDimDown = now >= to && now <= toDim;      //dim down phase
        var isMaxValue = now >= fromDim && now <= to;   //max phase

        toLogger('CalcDimValueByRule.isMaxValue = ' + isMaxValue, logger.LogLevelInformation);

        //we really only need calculation if we are in dim up or dim down phase
        if (isDimUp || isDimDown) {
            var fac = maxValue / (rule.DimTime * 60);//get value per second

            if (isDimUp) {
                return parseInt(((parseInt(now.getTime()) - parseInt(from.getTime())) / 1000) * fac);
            } else {
                return parseInt(((parseInt(toDim.getTime()) - parseInt(now.getTime())) / 1000) * fac);
            }
        }

        //if we are in between dim times, return max value
        if (isMaxValue) {
            return maxValue;
        }

        //other than that return 0
        return 0;
    }
}



/**
 * logs everything to the logger callback function if exists
 * wrapper of the callback delegate
 * @param {*} message
 * @param {*} level 
 */
function toLogger(message, level) {
    if (logger) {
        logger.LogIt(message, level)
    }
}
