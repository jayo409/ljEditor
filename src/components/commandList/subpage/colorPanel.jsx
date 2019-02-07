import React from 'react';
// 颜色选择面板
const ColorPanel = (props) => (
  <div
    className="m-editor-panel panel-color"
  >
    {
      props.list.map((item, index) => (
        <div
          key={index}
          style={{ background: item.color }}
          onClick={() => props.handleEvents('exec', { type: props.type, value: item })}
        />
      ))
    }
  </div>
)

export default ColorPanel