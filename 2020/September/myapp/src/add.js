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
            
            {/* <div className="sum">
                <label>
                    <input type="checkbox" />
                    <span>选中全部</span>
                </label>
                <a>删除选中项</a>
                <p>当前选中0项，共3条留言</p>
            </div> */}
    </Fragment>
  }
}

export default Add;
