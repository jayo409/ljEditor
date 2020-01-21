import React from 'react'
import { observer, inject } from 'mobx-react';

import { isChildNode } from '../../../utils';

@inject('editStore')
@observer
export default class InsertLinkPanel extends React.Component {

  componentDidMount () {
		document.addEventListener('click', this.handleHiddenPanle);
	}

	componentWillUnmount () {
		document.removeEventListener('click', this.handleHiddenPanle);
	}

	// 隐藏面板
	handleHiddenPanle = (e) => {
    const { editStore } = this.props;
    console.log(this.props.editStore.panelVisible.code);
		if (!isChildNode(e.target, 'panel-il') && !isChildNode(e.target, 'command-item')) {
			editStore.changeVisible('insertLink', 1);
		}
	}

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
          style={{width: '100%', height: '36px', margin: '20px auto 0'}}
          ref={ref => this.ip = ref}
        />
        <div
          className="button"
          onClick={() => this.handleClick()}
        >
          确定
        </div>
      </div>
    )
  }
}