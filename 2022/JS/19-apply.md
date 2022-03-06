### apply 的模拟实现

apply 的实现跟 call 类似，在这里直接给代码

```js
    Function.prototype.applay = function(context, arr) {
        let context = Object(context) || window;
        context.fn = this;

        let result = null;
        if (!arr) {
            result = context.fn();
        } else {
            let args = [];
            for (let i = 0, len = arr.length; i < len; i++) {
                args.push('arr[' + i + ']');
            };
            result = eval('context.fn(' + args + ')');
        }

        delete context.fn;
        return result;
    }
```