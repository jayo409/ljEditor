import React from 'react'
import { observer, inject } from 'mobx-react';

@inject('editStore')
@observer
export default class InsertLinkPanel extends React.Component {

  render () {
    const { editStore } = this.props;
    return (
      <div
        className="m-editor-panel panel-il"
        style={{ display: editStore.panelVisible.insertLink ? 'block' : 'none'}}
      >
        <input type="text"/>
        <div

        >确定</div>
      </div>
    )
  }
}