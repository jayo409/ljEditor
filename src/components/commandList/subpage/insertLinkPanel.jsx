import React from 'react'
import { observer, inject } from 'mobx-react';

@inject('editStore')
@observer
export default class InsertLinkPanel extends React.Component {

  handleClick = () => {
    const { editStore } = this.props;
    editStore.execCommands({ type: 'createLink', value: this.ip.value })
    editStore.changeVisible('insertLink')
  }

  render () {
    const { editStore } = this.props;
    return (
      <div
        className="m-editor-panel panel-il"
        style={{ display: editStore.panelVisible.insertLink ? 'block' : 'none'}}
      >
        <input 
          type="text"
          className="u-ip"
          placeholder="输入链接地址"
          style={{width: '88%', height: '40px', margin: '20px auto 0'}}
          ref={ref => this.ip = ref}
        />
        <div
          style={{margin: '15px auto', width: 60, height: 30, background: '#999', color: '#fff', borderRadius: '6px', lineHeight: '30px', textAlign: 'center', cursor: 'pointer'}}
          onClick={() => this.handleClick()}
        >
          确定
        </div>
      </div>
    )
  }
}