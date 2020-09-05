import React from "react";
import "./css/index.css";
import Add from './add'
import List from "./list";
/*
  1. 构建静态布局
  2. 拆分组件
  3. 关联数据
  4. 添加交互

  props 父组件向子组件传递数据
    1. 父级调用子组件时，将要传递数据添加在 子组件的属性中
    2. 在子组件中获取 this.props 就可以获取到父级传递过来的数据
*/
export default class App extends React.Component {
  state = {
    data: [
      {
        id: 0,
        name: "昵称",
        content: "留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容"
      },
      {
        id: 1,
        name: "昵称",
        content: "留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容"
      }
    ]
  }
  addTodo=(newTodoName, newTodoCont)=>{
    let {data} = this.state;
    data.push({
      id: Date.now(),
      name: newTodoName,
      content: newTodoCont
    })
    this.setState({
      data
    })
  }
  remove=(id)=>{
    let {data} = this.state;
    this.setState({
      data: data.filter(item=>id!==item.id)
    })
  }
  render() {
    let {data} = this.state;
    return <div className="wrap">
      <div className="addMessage">
          <Add addTodo={this.addTodo}/>

          <List
            remove={this.remove}
            data = {data}
          />
        </div>
    </div>;
  }
}