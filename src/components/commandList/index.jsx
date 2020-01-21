import React from 'react';
import { observer, inject } from 'mobx-react';

import { AlignPanel, ColorPanel, FontSizePanel, FontFamilyPanel, EmojiPanel, InsertLinkPanel, CodePanel, TablePanel } from './subpage';
import { commandList, alignList, colorList, fontSizeList, fontFamilyList } from '../../configs/toolbarsData';

import './index.css';

@inject('editStore')
@observer
export default class CommandList extends React.Component {

  handleEvents = (event, param) => {
    const { editStore } = this.props
    switch (event) {
      // 面板显示控制
      case 'visible':
        editStore.changeVisible(param)
        break;
      // 简单的命令 
      case 'exec':
        editStore.execCommands(param)
        break;
      // 插入图片
      case 'addImg':
        this.noneIp.click()
        break;
      // 添加代码块
      case 'addCode':
        editStore.addCode()
        break;
      default:
        break;
    }
  }

  // 返回对应面板
  _curPanel = (type) => {
    switch (type) {
      case '对齐':
        return <AlignPanel list={alignList} handleEvents={this.handleEvents} />
      case '表情':
        return <EmojiPanel />
      case '背景色':
        return <ColorPanel type='backColor' list={colorList} handleEvents={this.handleEvents} />
      case '字体颜色':
        return <ColorPanel type='foreColor' list={colorList} handleEvents={this.handleEvents} />
      case '字号':
        return <FontSizePanel list={fontSizeList} handleEvents={this.handleEvents} />
      case '字体':
        return <FontFamilyPanel list={fontFamilyList} handleEvents={this.handleEvents} />
      case '添加链接':
        return <InsertLinkPanel />
      case '代码块':
        return <CodePanel />
      case '表格':
        return <TablePanel />
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
              // title={item.type}
            >
              <i
                className={`u-icon iconfont icon-${item.icon}${editStore.curCommandState.indexOf(item.isActiveKey) > -1 ? ' z-sel' : ''}`}
                onClick={() => this.handleEvents(item.event, item.param)}
              />
              {
                this._curPanel(item.type)
              }
            </div>
          ))
        }
      </div>
    )
  }
}
