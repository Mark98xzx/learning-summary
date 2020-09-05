import React from "react";
export default class List extends React.Component {
  render() {
    let {data,remove} = this.props;
    // console.log(data)
    return <ul className="messageList">
        {data.map((item, index) => {
          return <li key={index}>
            <h3>{item.name}</h3>
            <p>{item.content}</p>
            <a onClick={()=>{
              remove(item.id)
            }}>删除</a>
          </li>
        })}
      </ul>
  }
}