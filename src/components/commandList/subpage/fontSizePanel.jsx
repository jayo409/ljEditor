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
          size={item}
          onClick={() => this.handleEvents('exec', { type: 'fontSize', value: item })}
        >
          FontSize
        </font>
      ))
    }
  </div>
)
export default FontSizePanel