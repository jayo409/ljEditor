import React from 'react';
import { observer, inject } from 'mobx-react';

import CommandList from '../commandList';

import '../../assets/font/iconfont.css'
import './index.css';

@inject('editStore')
@observer
export default class Editor extends React.Component {

  handleKeyUp = (e) => {
    const { editStore } = this.props
    editStore.setEditRange()
    if (e.keyCode === 13) {
      document.execCommand('formatBlock', false, 'p')
    }
  }

  render() {
    const { editStore } = this.props
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
          onClick={() => editStore.setEditRange()}
          onKeyUp={(e) => this.handleKeyUp(e)}
        />
      </div>
    )
  }
}