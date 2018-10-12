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
      case 'addCode':
        editStore.addCode()
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

    // 返回对应面板
    const curPanel = (type) => {
      switch (type) {
        case '对齐':
          return <AlignPanel list={alignList} />
        case '表情':
          return <EmojiPanel />
        case '背景色':
          return <ColorPanel type='backColor' list={colorList} />
        case '字体颜色':
          return <ColorPanel type='foreColor' list={colorList} />
        case '字号':
          return <FontSizePanel list={fontSizeList} />
        case '字体':
          return <FontFamilyPanel list={fontFamilyList} />
        case '添加链接':
          return <InsertLinkPanel />
        default:
          break;
      }
    }

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
            >
              <i
                className={`u-icon iconfont icon-${item.icon}`}
                onClick={() => this.handleEvents(item.event, item.param)}
              />
              {
                curPanel(item.type)
              }
            </div>
          ))
        }
      </div>
    )
  }
}
