import React, { Component, Fragment } from 'react';
class Add extends Component {
    state={
        nameVal: '',
        contentVal: ''
    }
  render() {
      let {nameVal, contentVal} = this.state
      let {addTodo} = this.props;
    return <Fragment>
        <input 
            type="text"
            placeholder="请输入昵称"
            value={nameVal}
            onChange={({target})=>{
                this.setState({
                    nameVal: target.value
                })
            }} />

            <textarea
            placeholder="请输入留言"
            value={contentVal}
            onChange={({target})=>{
                this.setState({
                    contentVal:target.value
                })
            }}></textarea>
            <button onClick={()=> {
                // console.log(nameVal)
                // console.log(contentVal)
                if (nameVal.trim()&&contentVal.trim()) {
                    addTodo(nameVal, contentVal)
                    this.setState({
                        nameVal: '',
                        contentVal: ''
                    })
                } else {
                    alert("昵称和内容不可为空！")
                }
                
            }}>
                提交留言
            </button>
    </Fragment>
  }
}

export default Add;
