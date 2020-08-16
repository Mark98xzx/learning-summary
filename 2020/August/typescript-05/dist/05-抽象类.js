class Component {
    constructor(props) {
        this.props = props;
    }
}
class MyComponent extends Component {
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
}
let myComponent = new MyComponent({ val: 1 });
myComponent.render();
