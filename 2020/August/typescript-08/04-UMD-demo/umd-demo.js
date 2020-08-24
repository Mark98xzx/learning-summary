(function(root, factory) {
    if(typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory()
    } else if (typeof define === "function" && define.amd) {
        define(factory)
    }else {
        root.kkb = factory;
    }
})(this, function() {
    let a = 1
    let b = 2

    return {
        x: a,
        y: b
    }
})