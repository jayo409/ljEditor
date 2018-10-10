import React from 'react';
import { observer, inject } from 'mobx-react';

import CommandList from '../commandList';

import '../../assets/font/iconfont.css'
import './index.css';

@inject('editStore')
@observer
export default class Editor extends React.Component {

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
          onKeyUp={() => editStore.setEditRange()}
        />
      </div>
    )
  }
}