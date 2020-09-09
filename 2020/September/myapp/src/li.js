import React from "react";
export default class Li extends React.Component {
  state={
    edit: false
  }
  render() {
    let {data,remove,changeSelect} = this.props;
    let {edit} = this.state
    // console.log(data)
    return <ul className="messageList">
        {data.map((item, index) => {
          return <li key={index} className={edit?"editing":""}>
            <h3>{item.name}</h3>
            <input 
              type="checkbox"
              checked={item.check}
              onChange={({target})=>{
                console.log(target.checked)
                changeSelect(item.id,target.checked)
              }} />
            <p onDoubleClick={()=>{
              this.setState({
                edit
              })
            }}>{item.content}</p>
            <textarea></textarea>
            <a onClick={()=>{
              remove(item.id)
            }}>删除</a>
          </li>
        })}
      </ul>
  }
}