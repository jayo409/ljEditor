import React from 'react';
// 字号选择面板
const FontSizePanel = (props) => (
  <div
    className="m-editor-panel panel-fs"
  >
    {
      props.list.map((item, index) => (
        <font
          key={index}
          onClick={() => props.handleEvents('exec', { type: 'fontSize', value: item.size })}
          className="panel-fs-item"
        >
          {item.title}
        </font>
      ))
    }
  </div>
)
export default FontSizePanel