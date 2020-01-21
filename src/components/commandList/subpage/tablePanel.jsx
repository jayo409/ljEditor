import React from 'react'
import { observer, inject } from 'mobx-react';

import { isChildNode } from '../../../utils';

@inject('editStore')
@observer
class App extends React.Component {

    state = {
        row: 5,
        col: 5
    }

	componentDidMount () {
		document.addEventListener('click', this.handleHiddenPanle);
	}

	componentWillUnmount () {
		document.removeEventListener('click', this.handleHiddenPanle);
	}

	// 隐藏面板
	handleHiddenPanle = (e) => {
		const { editStore } = this.props;
		if (!isChildNode(e.target, 'panel-table') && !isChildNode(e.target, 'command-item')) {
			editStore.changeVisible('table', 1);
		}
    }
    
    // 点击插入表格
    handleClick = () => {
        this.props.editStore.insertTable(this.state);
    }

    // 选中更新行列数
    handleSelect = (key, value) => {
        this.setState({
            [key]: value
        })
    }

	render() {

        const { editStore } = this.props;
        
		return (
			<div
				className='m-editor-panel panel-table'
                style={{ display: editStore.panelVisible.table ? 'block' : 'none' }}
                ref={ref => this.panelTable = ref}
			>
				<div className="table-wrap">
                    <span>
                        创建
                    </span>
                    <select
                        defaultValue="5"
                        // getPopupContainer={() => this.panelTable}
                        ref={ref => this.rowSel = ref}
                        onChange={(v) => this.handleSelect('row', v)}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <span>
                        行
                    </span>
                    <select
                        defaultValue="5"
                        // getPopupContainer={() => this.panelTable}
                        ref={ref => this.colSel = ref}
                        onChange={(v) => this.handleSelect('col', v)}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <span>
                        列 的表格
                    </span>
                </div>
                <div className="table-btn">
                    <div className="button" onClick={this.handleClick}>
                        确定
                    </div>
                </div>
			</div>
		)
	}
}

export default App