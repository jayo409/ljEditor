import React from 'react';
// 对齐方式面板
const AlignPanel = (props) => (
  <div
    className="m-editor-panel panel-align"
  >
    {
      props.list.map((item, index) => (
        <div
          key={index}
          onClick={() => props.handleEvents(item.event, item.param)}
          className="panel-align-item"
        >
          {item.title}
        </div>
      ))
    }
  </div>
)

export default AlignPanel