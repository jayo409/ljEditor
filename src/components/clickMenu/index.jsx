import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './index.css';

@inject('editStore')
@observer
class App extends Component {

    handleClick = (type, closeMenu) => {
        const { editStore, handleTableUtils } = this.props;
        if (closeMenu) {
            editStore.updateClickMenuState({
                visible: false,
                posX: -1,
                posY: -1
            });
        }

        handleTableUtils(type);
    }

    render () {
        const list = [
            {
                title: '合并行',
                key: 'mergeTd'
            }, {
                title: '拆分行',
                key: 'splitTd'
            }, {
                title: '添加行',
                key: 'addTd'
            }, {
                title: '删除行',
                key: 'deleteTd'
            }
        ]
        const { clickMenuState } = this.props.editStore;
        return (
            <div
                className="clickMenu-container"
                style={{ display: clickMenuState.visible ? 'flex' : 'none', left: clickMenuState.posX + 'px', top: clickMenuState.posY + 'px' }}
            >
                {
                    list.map(item => (
                        <div
                            className="menu-item"
                            key={item.key}
                            onClick={() => this.handleClick(item.key, 1)}
                            onMouseOver={() => this.handleClick(item.key + 'Over')}
                            onMouseLeave={() => this.handleClick(item.key + 'Leave')}
                        >
                            {item.title}
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default App;