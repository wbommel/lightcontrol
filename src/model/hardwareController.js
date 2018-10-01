'use strict'



let mainController = {
    Init: function (diContainer) {
        this.I2CDAC = diContainer.I2CDAC
        this.GPIO = diContainer.GPIO
        return this
    },

    SwitchOn: function () { },

    SwitchOff: function () { },

    SetValue: function () { },


}