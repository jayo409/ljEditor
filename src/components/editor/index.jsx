import React from 'react';
import { observer, inject } from 'mobx-react';

import Sel from '../../utils/selection';
import CommandList from '../commandList';

import '../../assets/font/iconfont.css'
import './index.css';
import { editStore } from '../../stores';

@inject('editStore')
@observer
export default class Editor extends React.Component {

  handleEditor = (key, e) => {
    if (key === 'keyup') {
      if (e.keyCode === 13) {
        editStore.enterKeyEvent(e)
      }
    }
    // 保存光标
    Sel.setEditRange()
    editStore.getCommandState()
  }

  render() {
    return (
      <div
        className="m-editor"
        style={this.props.style}
      >
        <div
          className="editor-top"
        >
          <CommandList />
        </div>
        <div
          className="editor-body"
          contentEditable="true"
          onClick={() => this.handleEditor()}
          onSelect={() => this.handleEditor()}
          onKeyUp={(e) => this.handleEditor('keyup', e)}
        />
      </div>
    )
  }
}
