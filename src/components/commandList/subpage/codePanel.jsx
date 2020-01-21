import React from 'react'
import { observer, inject } from 'mobx-react';

import { isChildNode } from '../../../utils';

@inject('editStore')
@observer
export default class CodePanel extends React.Component {

  componentDidMount () {
		document.addEventListener('click', this.handleHiddenPanle);
	}

	componentWillUnmount () {
		document.removeEventListener('click', this.handleHiddenPanle);
	}

	// 隐藏面板
	handleHiddenPanle = (e) => {
    const { editStore } = this.props;
		if (!isChildNode(e.target, 'panel-code') && !isChildNode(e.target, 'command-item')) {
			editStore.changeVisible('code', 1);
		}
	}

  handleCilck = () => {
    this.props.editStore.addCode(this.tr.value);
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
          placeholder="添加代码块..."
        />
        <div
          className="button"
          onClick={this.handleCilck}
        >确定</div>
      </div>
    )
  }
}
