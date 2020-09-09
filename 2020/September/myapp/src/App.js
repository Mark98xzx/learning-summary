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
        content: "留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容",
        check: true,
      },
      {
        id: 1,
        name: "昵称",
        content: "留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容",
        check: false,
      }
    ]
  }
  addTodo=(newTodoName, newTodoCont)=>{
    let {data} = this.state;
    data.push({
      id: Date.now(),
      name: newTodoName,
      content: newTodoCont,
      check: false
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
  changeSelect=(id,check)=>{
    // console.log(id,check)
    let {data} = this.state;
    data.forEach(item=>{
      if(item.id===id){
        item.check=check
      }
    })
    // console.log(data)
    this.setState({
      data
    })
  }
  removeBatch=()=>{
    let {data} = this.state;
    this.setState({
      data: data.filter(item=>!item.check)
    })
  }
  
  render() {
    let {data} = this.state;
    return <section className="wrap">
    <h2 className="title">留言板</h2>
      <div className="addMessage">
          <Add addTodo={this.addTodo}/>

      </div>
      <List
            remove={this.remove}
            changeSelect={this.changeSelect}
            data = {data}
          />
      <div className="sum">
          <label>
              <input type="checkbox"
              onClick={({target})=>{
                // console.log(target.checked)
                // this.selectAll()
                if (target.checked==true||target.checked==false){
                  data.forEach(item=>{
                    item.check=target.checked
                  })
                }
                this.setState({
                  data
                })
              }} />
              <span>选中全部</span>
          </label>
          <a onClick={()=>{
            this.removeBatch()
          }}>删除选中项</a>
          <p>当前选中{data.filter(item=>item.check).length}项，共{data.length}条留言</p>
      </div>
    </section>;
  }
}