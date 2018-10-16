import React from 'react'
import { observer, inject } from 'mobx-react';

@inject('editStore')
@observer
export default class CodePanel extends React.Component {

  handleCilck = () => {
    this.props.editStore.addCode(this.tr.value)
  }

  render () {
    const { editStore } = this.props;
    return (
      <div
        className='m-editor-panel panel-code'
        style={{ display: editStore.panelVisible.code ? 'block' : 'none' }}
      >
        <textarea
          className='u-ta'
          ref={ref => this.tr = ref}
        />
        <div
          style={{ margin: '15px auto', width: 60, height: 30, background: '#999', color: '#fff', borderRadius: '6px', lineHeight: '30px', textAlign: 'center', cursor: 'pointer' }}
          onClick={this.handleCilck}
        >确定</div>
      </div>
    )
  }
}