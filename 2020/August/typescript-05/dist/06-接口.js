class Component1 {
    constructor(props) {
        this.props = props;
    }
}
class MyComponent1 extends Component1 {
    constructor(props) {
        super(props);
        this.state = {
            x: 1
        };
    }
    render() {
        this.props.val;
        this.state.x;
        return '<myComponent />';
    }
    getInfo() {
        return `组件：MyComponent，props：${this.props}，state：${this.state}`;
    }
}
let myComponent1 = new MyComponent({ val: 1 });
myComponent.render();
// Logger.log( myComponent )
// function log( target ) {
//     target.getInfo();
// }
// log( myComponent );
