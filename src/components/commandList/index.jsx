import React from 'react';
import { observer, inject } from 'mobx-react';

import EmojiList from '../emoji';

import './index.css';
const commands = [
  {
    type: '表情',
    event: 'visible',
    param: 'emoji',
    icon: 'biaoqing'
  },
  {
    type: '图片',
    event: 'addImg',
    icon: 'plus-pic',
  },
  {
    type: '对齐',
    icon: 'zuoduiqi',
    cls: 'align'
  },
  {
    type: '加粗',
    event: 'exec',
    param: {
      type: 'bold'
    },
    icon: 'zuoduiqi'
  },
  {
    type: '斜体',
    event: 'exec',
    param: {
      type: 'italic'
    },
    icon: 'zuoduiqi'
  },
  {
    type: '字号',
    icon: 'comiisyanseshezhi',
    cls: 'fs'
  },
  {
    type: '字体颜色',
    icon: 'Font-color',
    cls: 'color'
  },
  {
    type: '背景色',
    icon: 'zitibeijingse',
    cls: 'color'
  },
  {
    type: '撤销',
    event: 'exec',
    param: {
      type: 'undo'
    },
    icon: 'chehui'
  },
  {
    type: '重做',
    event: 'exec',
    param: {
      type: 'redo'
    },
    icon: 'zhongzuo'
  }
]

const alignList = [
  {
    title: '左对齐',
    event: 'exec',
    param: {
      type: 'justifyLeft'
    },
    icon: 'zuoduiqi'
  },
  {
    title: '居中',
    event: 'exec',
    param: {
      type: 'justifyCenter'
    },
  },
  {
    title: '右对齐',
    event: 'exec',
    param: {
      type: 'justifyRight'
    },
  },
  {
    title: '两边对齐',
    event: 'exec',
    param: {
      type: 'justifyFull'
    },
  }
]

const colorList = [
  '#666', '#999', '#fff', '#000', '#ffc', '#eee', '#ffb000', '#333', '#ffbccc', '#ccbb22', '#bb2'
]

const fontSizeList = [
  1, 2, 3, 4, 5, 6, 7
]

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
    const AlignPanel = () => (
      <div
        className="m-editor-panel panel-align"
      >
        {
          alignList.map((item, index) => (
            <div
              key={index}
              onClick={() => this.handleEvents(item.event, item.param)}
            >
              {item.title}
            </div>
          ))
        }
      </div>
    )
    const InputPanel = () => (
      <input 
        type="file"
        ref={ref => this.noneIp = ref}
        className="u-none-ip"
        onChange={(e) => editStore.addImg(e.target.files[0])}
      />
    )
    const ColorPanel = (type) => (
      <div
        className="m-editor-panel panel-color"
      >
        {
          colorList.map((item, index) => (
            <div
              key={index}
              style={{background: item}}
              onClick={() => this.handleEvents('exec', {type: type.type, value: item})}
            />
          ))
        }
      </div>
    )
    const FontSizePanel = () => (
      <div
        className="m-editor-panel panel-fs"
      >
        {
          fontSizeList.map((item, index) => (
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
    return (
      <div
        className="m-editor-cl"
      >
        <InputPanel />
        {
          commands.map((item, index) => (
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
                <AlignPanel /> : item.type === '表情' ?
                <EmojiList /> : item.type === '背景色' ?
                <ColorPanel type='backColor' /> : item.type === '字体颜色' ?
                <ColorPanel type='foreColor' /> : item.type === '字号' ? 
                <FontSizePanel /> : null
              }
            </div>
          ))
        }
      </div>
    )
  }
}
