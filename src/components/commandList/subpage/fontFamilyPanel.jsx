import React from 'react';
// 字体选择面板
const FontFamilyPanel = (props) => (
  <div
    className="m-editor-panel panel-ff"
  >
    {
      props.list.map((item, index) => (
        <div
          key={index}
          size={item}
          onClick={() => props.handleEvents('exec', { type: 'fontName', value: item })}
        >
          {item}
        </div>
      ))
    }
  </div>
)
export default FontFamilyPanel