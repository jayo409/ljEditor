import React from 'react';
import { observer, inject } from 'mobx-react';

import { Sel, TableUtils, isChildNode } from '../../utils';
import CommandList from '../commandList';
import ClickMenu from '../clickMenu';

import '../../assets/font/iconfont.css';
import './index.css';

@inject('editStore')
@observer
export default class Editor extends React.Component {

  componentDidMount () {
    this.tableUtils = new TableUtils();
    // document.querySelector('.editor-body').addEventListener('contextmenu', (e) => {
    //   console.log(isChildNode(e.target, 'editor-table'));
    //   return false
    //   if (isChildNode(e.target, 'editor-table')) {
    //     return false
    //   }
    // })
    // document.addEventListener('contextmenu', () => {
    //   return false
    // })
    document.oncontextmenu = function(e) {
      console.log(isChildNode(e, 'editor-table'))
      return false
    }
  }

  handleEditor = (key, e) => {
    const { editStore } = this.props;
    if (key === 'mouseup') {
      e.persist();
      if (e.button === 2) {
        const clickMenuState = {
          visible: true,
          posX: e.clientX,
          posY: e.clientY
        }
        this.tableUtils.showClickMenu(e);
        editStore.updateClickMenuState(clickMenuState); // 显示菜单
        this.clickMenuEvent = e;
        return;
      } else {
        const clickMenuState = {
          visible: false,
          posX: 0,
          posY: 0
        }
        editStore.updateClickMenuState(clickMenuState); // 关闭菜单显示
      }
    }
    if (key === 'keyup') {
      if (e.keyCode === 13) {
        editStore.enterKeyEvent(e);
      }
    } else if (key === 'keydown') {
      if (e.keyCode === 9) {
        e.preventDefault();
        editStore.tabKeyEvent(e);
      }
    }
    // 保存光标
    Sel.setEditRange();
    editStore.getCommandState();
  }

  // 表格事件操作
  handleTableUtils = (type) => {
      this.tableUtils[type] && this.tableUtils[type](this.clickMenuEvent);
  }

  render() {
    return (
      <div
        className="m-editor"
        style={this.props.style}
      >
        <ClickMenu
          handleTableUtils={this.handleTableUtils}
        />
        <div
          className="editor-top"
        >
          <CommandList />
        </div>
        <div
          className="editor-body"
          contentEditable="true"
          onSelect={() => this.handleEditor()}
          onKeyUp={(e) => this.handleEditor('keyup', e)}
          onKeyDown={(e) => this.handleEditor('keydown', e)}
          onMouseUp={(e) => this.handleEditor('mouseup', e)}
        >
        </div>
      </div>
    )
  }
}
