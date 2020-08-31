var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function d1(target) {
    console.log(typeof target, target);
}
function d11(target) {
    console.log(typeof target, target, '1111111');
}
function d2(target, name) {
    console.log(typeof target, name);
}
function d3(target, name, descriptor) {
    console.log(typeof target, name, descriptor);
}
function d4(target, name, descriptor) {
    console.log(typeof target, name, descriptor);
}
function d5(target, name, index) {
    // name : 当前参数所在的方法
    console.log(typeof target, name, index);
}
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    Object.defineProperty(MyClass.prototype, "b", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MyClass, "c", {
        get: function () {
            return 2;
        },
        enumerable: false,
        configurable: true
    });
    MyClass.prototype.method1 = function (x, y) { };
    MyClass.method2 = function () { };
    __decorate([
        d2,
        __metadata("design:type", Number)
    ], MyClass.prototype, "a", void 0);
    __decorate([
        d3,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], MyClass.prototype, "b", null);
    __decorate([
        d4,
        __param(0, d5), __param(1, d5),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number]),
        __metadata("design:returntype", void 0)
    ], MyClass.prototype, "method1", null);
    __decorate([
        d2,
        __metadata("design:type", Number)
    ], MyClass, "property1", void 0);
    __decorate([
        d3,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], MyClass, "c", null);
    __decorate([
        d4,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MyClass, "method2", null);
    MyClass = __decorate([
        d1,
        d11
    ], MyClass);
    return MyClass;
}());
