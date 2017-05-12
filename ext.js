var insertCSS = require("insert-css")

module.exports = {
    css: function(styles, name) {
        insertCSS(styles)
        return name.s
    },
    x: function(source, target) {
        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
        return target;
    }
}
