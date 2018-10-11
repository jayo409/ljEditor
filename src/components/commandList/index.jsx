import React from 'react';
import { observer, inject } from 'mobx-react';

import { AlignPanel, ColorPanel, FontSizePanel, FontFamilyPanel, EmojiPanel, InsertLinkPanel } from './subpage';
import { commandList, alignList, colorList, fontSizeList, fontFamilyList } from '../../configs/commandData';

import './index.css';

@inject('editStore')
@observer
export default class CommandList extends React.Component {

  handleEvents = (event, param) => {
    const { editStore } = this.props
    switch (event) {
      case 'visible':
        editStore.changeVisible(param)
        break;
      case 'exec':
        editStore.execCommands(param)
        break;
      case 'addImg':
        this.noneIp.click()
        break;
      default:
        break;
    }
  }

  render () {
    const { editStore } = this.props

    // 打开图片input
    const InputPanel = () => (
      <input 
        type="file"
        ref={ref => this.noneIp = ref}
        className="u-none-ip"
        onChange={(e) => editStore.addImg(e.target.files[0])}
      />
    )

    return (
      <div
        className="m-editor-cl"
      >
        <InputPanel />
        {
          commandList.map((item, index) => (
            <div
              key={index}
              className={`command-item${item.cls ? ' item-' + item.cls : ''}`}
              title={item.type}
              onClick={() => this.handleEvents(item.event, item.param)}
            >
              <i 
                className={`u-icon iconfont icon-${item.icon}`}
              />
              {
                item.type === '对齐' ?
                <AlignPanel list={alignList}/> : item.type === '表情' ?
                <EmojiPanel /> : item.type === '背景色' ?
                <ColorPanel type='backColor' list={colorList} /> : item.type === '字体颜色' ?
                <ColorPanel type='foreColor' list={colorList} /> : item.type === '字号' ? 
                <FontSizePanel list={fontSizeList} /> : item.type === '字体' ? 
                <FontFamilyPanel list={fontFamilyList} /> : item.type === '添加链接' ?
                <InsertLinkPanel /> : null
              }
            </div>
          ))
        }
      </div>
    )
  }
}
