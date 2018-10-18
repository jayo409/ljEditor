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

  state = {
    src: ''
  }

  componentDidMount = () => {
    var img = document.querySelector('.img');
    var cs = document.createElement('canvas');
    cs.getContext('2d').drawImage(img, 100, 100, 100, 100, 0, 0, 100, 100);
    var base64 = cs.toDataURL('image/jpeg')
    console.log(base64)
    this.setState({
      src: base64
    })
  }
  
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
      [
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
          onSelect={() => this.handleEditor()}
          onKeyUp={(e) => this.handleEditor('keyup', e)}
        />
      </div>,
      <img src={require('./img.png')} className="img" alt="" style={{width: 20, height: 20}} />,
      <img src={this.state.src} alt=""/>
      ]
    )
  }
}
