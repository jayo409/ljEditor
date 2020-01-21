/**
 * 编辑框表格dom操作
 */
import { uuid } from './index';
import Sel from './selection';
import { trTemp } from './tableTemp';
import { deleteDom, queryDom, getIndex } from './domUtils';

class TableUtils {

	constructor() {
		this.init();
		this.data = {
			startMove: null,	// 起始选中td
			endMove: null
		}
	}

	init = () => {
		this.handleEvent();
	}

	handleEvent = () => {

		const editorBody = queryDom('.editor-body')[0];
		// 鼠标按下选中起始td
		editorBody.addEventListener('mousedown', (e) => {
			if (e && e.button === 0 && e.target && e.target.nodeName === 'TD') {
				this.data.startMove = {
					col: parseInt(e.target.dataset.col, 10),
					row: parseInt(e.target.dataset.row, 10)
				}
				this.selectTd(e, 1); // 删除所有选中的td
			} else if (e.button === 2) {
				e.preventDefault();
			}
		}, false);

		editorBody.addEventListener('mouseover', (e) => {
			if (this.data.startMove && e && e.target && e.target.nodeName === 'TD') {
				this.data.endMove = {
					col: parseInt(e.target.dataset.col, 10),
					row: parseInt(e.target.dataset.row, 10)
				}
				this.selectTd(e);
			}
		}, false);

		editorBody.addEventListener('mouseup', (e) => {
			this.data.startMove = null;
		}, false);

		editorBody.addEventListener('mouseleave', (e) => {
			this.data.startMove = null;
		}, false);

	}

	// 选中td
	selectTd = (e, remove, cls) => {
		const path = e.path || e.nativeEvent.path;
		const table = path.filter(dom => {
			return dom.nodeName === 'TABLE'
		})[0];
		const { startMove, endMove } = this.data;
		const tds = queryDom('td', table);
		if (remove) {
			[...tds].forEach(dom => {
				dom.classList.remove(cls || 'selected-item');
			});
			return
		}
		// 将已删除的节点映射到最终合并的节点上
		let tdDataList = [];
		[...tds].forEach(dom => {
			const col = parseInt(dom.dataset.col, 10);
			const row = parseInt(dom.dataset.row, 10);
			const colspan = parseInt((dom.getAttribute('colspan') || 1), 10);
			const rowspan = parseInt((dom.getAttribute('rowspan') || 1), 10);
			tdDataList.push({
				col,
				row,
				dom
			});
			for(let i = 1; i < colspan; i++) {
				tdDataList.push({
					col,
					row: row + i,
					dom
				})
			}
			for(let i = 1; i < rowspan; i++) {
				tdDataList.push({
					col: col + i,
					row,
					dom
				})
			}
		});
		let selectedList = [];	// 已选择的dom的uuid
		// 循环列表添加选中状态
		const changeSelect = () => {
			const prevStartMove = {
				col: startMove.col,
				row: startMove.row
			};
			const prevEndMove = {
				col: endMove.col,
				row: endMove.row
			};
			tdDataList.forEach(item => {
				const col = item.col;
				const row = item.row;
				// 判断是否在选中内
				const inCol = startMove.col - endMove.col > 0 ? col >= endMove.col && col <= startMove.col : col <= endMove.col && col >= startMove.col;
				const inRow = startMove.row - endMove.row > 0 ? row >= endMove.row && row <= startMove.row : row <= endMove.row && row >= startMove.row;
				if (inCol && inRow) {
					item.dom.classList.add(cls || 'selected-item');
					selectedList.push(item.dom.getAttribute('data-uuid'));
					Sel.removeAllRanges();
				} else if (!selectedList.includes(item.dom.getAttribute('data-uuid'))) {
					item.dom.classList.remove(cls || 'selected-item');
				}
			});
			tdDataList.forEach(item => {
				var uuid = item.dom.getAttribute('data-uuid');
				if (selectedList.includes(uuid)) {
					const col = item.col;
					const row = item.row;
					const inCol = startMove.col - endMove.col > 0 ? col >= endMove.col && col <= startMove.col : col <= endMove.col && col >= startMove.col;
					const inRow = startMove.row - endMove.row > 0 ? row >= endMove.row && row <= startMove.row : row <= endMove.row && row >= startMove.row;
					// 找出dom选中但col与row不符合的点
					if (!inCol || !inRow) {
						if (col > Math.max(startMove.col, endMove.col)) {
							if (startMove.col > endMove.col) {
								startMove.col = col;	
							} else {
								endMove.col = col;
							}
						}
						if (col < Math.min(startMove.col, endMove.col)) {
							if (startMove.col < endMove.col) {
								startMove.col = col;	
							} else {
								endMove.col = col;
							}
						}
						if (row > Math.max(startMove.row, endMove.row)) {
							if (startMove.row > endMove.row) {
								startMove.row = row;	
							} else {
								endMove.row = row;
							}
						}
						if (row < Math.min(startMove.row, endMove.row)) {
							if (startMove.row < endMove.row) {
								startMove.row = row;	
							} else {
								endMove.row = row;
							}
						}
					}
				}
			});
			if (endMove.col !== prevEndMove.col || endMove.row !== prevEndMove.row || startMove.col !== prevStartMove.col || startMove.row !== prevStartMove.row) {
				changeSelect();
			}
		}
		changeSelect();
	}

	// 获取当前点击表格选中td
	getSelectTd(e) {
		const path = e.path || e.nativeEvent.path;
		const table = path.filter(dom => {
			return dom.nodeName === 'TABLE'
		})[0];
		const tds = queryDom('td.selected-item', table);
		return tds;
	}

	// 合并行
	mergeTd (e) {
		const selTds = this.getSelectTd(e);
		if (selTds.length < 1) {
			return
		}
		const firstDataset = selTds[0].dataset;
		let colSize = 0;
		let rowSize = 0;
		let lastColDom = null;	// 同一行最后一个节点
		let firstColParentDom = selTds[0].parentNode;
		// 循环相加所选中的行数和列数
		[...selTds].forEach(item => {
			if (item.dataset.col === firstDataset.col) {
				const colspan = parseInt((item.getAttribute('colspan') || 1), 10);
				colSize += colspan;
				lastColDom = item;
			}
			if (item.dataset.row === firstDataset.row) {
				const rowspan = parseInt((item.getAttribute('rowspan') || 1), 10);
				rowSize += rowspan;
			}
		});
		const nextSiblingDom = lastColDom.nextSibling; // 判断是否是行内最后一个节点
		deleteDom(selTds);
		// 创建新节点
		const newDom = document.createElement("td");
		newDom.setAttribute('data-col', firstDataset.col);
		newDom.setAttribute('data-row', firstDataset.row);
		newDom.setAttribute('data-uuid', uuid());
		newDom.setAttribute('colspan', colSize);
		newDom.setAttribute('rowspan', rowSize);
		if (nextSiblingDom) {
			firstColParentDom.insertBefore(newDom, nextSiblingDom);
		} else {
			firstColParentDom.appendChild(newDom);
		}
	}

	// 拆分单元格
	splitTd (e) {
		const td = e.target;
		const col = parseInt(td.getAttribute('data-col'), 10);
		const row = parseInt(td.getAttribute('data-row'), 10);
		const colspan = parseInt((td.getAttribute('colspan') || 1), 10);
		const rowspan = parseInt((td.getAttribute('rowspan') || 1), 10);
		const path = e.path || e.nativeEvent.path;
		const table = path.filter(dom => {
			return dom.nodeName === 'TABLE'
		})[0];
		let dataList = [];
		deleteDom(td);	// 删除原节点
		// 根据原节点的坐标和所占行列生成新节点的坐标
		for(let i = col; i < col + rowspan; i++) {
			for(let j = row; j < row + colspan; j++) {
				dataList.push({
					col: i,
					row: j
				})
			}
		}
		// 循环插入新节点
		dataList.forEach(item => {
			const newDom = document.createElement("td");
			newDom.setAttribute('data-col', item.col);
			newDom.setAttribute('data-row', item.row);
			newDom.setAttribute('data-uuid', uuid());
			const tr = table.querySelectorAll('tr')[item.col];
			const nextNode = tr.querySelectorAll('td') ? tr.querySelectorAll('td')[item.row] : null;
			// 判断是否是行内最后一个节点
			if (nextNode) {
				tr.insertBefore(newDom, nextNode);
			} else {
				tr.appendChild(newDom);
			}
		})
	}

	// 新增行
	addTd (e) {
		const path = e.path || e.nativeEvent.path;
		let table = null;
		let tbody = null;
		let tr = null;
		let td = null;
		path.forEach(dom => {
			if (dom.nodeName === 'TABLE') {
				table = dom;
			}
			if (dom.nodeName === 'TBODY') {
				tbody = dom;
			}
			if (dom.nodeName === 'TR') {
				tr = dom;
			}
			if (dom.nodeName === 'TD') {
				td = dom;
			}
		});
		const rows = parseInt(table.dataset.rows, 10);
		const cols = parseInt(table.dataset.cols, 10);
		const col = parseInt(td.dataset.col, 10);
		this.data.startMove = {col, row: 0};
		this.data.endMove = {col, row: rows - 1};
		this.selectTd(e);
		const bottomTrIndex = this.data.startMove.col < this.data.endMove.col ? this.data.endMove.col : this.data.startMove.col;	// 获取选中最后一行的坐标
		const trIndex = bottomTrIndex;
		if (trIndex < cols - 1) {	// 判断是否是最后一行
			const nextNode = tr.parentNode.children[trIndex + 1];
			if (nextNode.nodeName === 'TR') {
				// 更改后面的tr中td的data-col值
				for(let i = trIndex + 1; i < tr.parentNode.children.length; i++) {
					const beforeTr = tr.parentNode.children[i]
					for(let j = 0; j < beforeTr.children.length; j++) {
						beforeTr.children[j].dataset.col = parseInt(beforeTr.children[j].dataset.col, 10) + 1;
					}
				}
				nextNode.insertAdjacentHTML('beforebegin', trTemp(rows, trIndex + 1));
				table.dataset.cols = cols + 1;
			}
		} else {	// tbody末尾直接append
			-tbody.insertAdjacentHTML('beforeend', trTemp(rows, cols));
			table.dataset.cols = cols + 1;
		}
		this.selectTd(e, 1);
		this.data.startMove = null;
		this.data.endMove = null;
	}

	// 删除行
	deleteTd (e) {
		const path = e.path || e.nativeEvent.path;
		const table = path.filter(dom => {
			return dom.nodeName === 'TABLE'
		})[0];
		const trs = table.querySelectorAll('tr');
		let deleteTrs = [];
		[...trs].forEach(tr => {
			if (!tr.querySelector('td') || tr.querySelector('td').classList.contains('delete-item')) {
				deleteTrs.push(tr)
			}
		});
		deleteDom(deleteTrs);
		const tds = table.querySelectorAll('td');
		[...tds].forEach(td => {
			const col = getIndex(td.parentNode);
			td.dataset.col = col;
		})
	}

	deleteTdOver (e) {
		const path = e.path || e.nativeEvent.path;
		let table = null;
		let td = null;
		path.forEach(dom => {
			if (dom.nodeName === 'TABLE') {
				table = dom;
			}
			if (dom.nodeName === 'TD') {
				td = dom;
			}
		});
		const rows = parseInt(table.dataset.rows, 10);
		const col = parseInt(td.dataset.col, 10);
		this.data.startMove = {col, row: 0};
		this.data.endMove = {col, row: rows - 1};
		this.selectTd(e, null, 'delete-item');
	}

	deleteTdLeave (e) {
		this.selectTd(e, 1, 'delete-item');
		this.data.startMove = null;
		this.data.endMove = null;
	}

	showClickMenu (e) {
		if (e.target.nodeName === 'TD') {
			if (e.target.classList.contains('selected-item')) {

			} else {
				this.selectTd(e.nativeEvent, 1);
			}
		}
	}

}

export default TableUtils;