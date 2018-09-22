let address

let cat = {
    init: function (name, addressOf) {
        this.name = name
        address = addressOf
        _testthis()
        return this
    }
}


//let mark = Object.create(cat).init('mark')


module.exports = cat


function _testthis() {
    console.log('_testthis:', address)
}