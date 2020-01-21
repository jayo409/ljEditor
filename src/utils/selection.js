// 光标选区处理
class Selection {
	constructor() {
		this.lastEditRange = null;
	}

	// 设置光标最后位置
	setEditRange() {
		let selection = window.getSelection();
		// 设置最后光标对象
		this.lastEditRange = selection.getRangeAt && selection.getRangeAt(0);
	}

	// 获取光标位置
	getEditRange() {
		let selection = window.getSelection();
		if (this.lastEditRange) {
			// 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
			selection.removeAllRanges();
			selection.addRange(this.lastEditRange);
		} else {
			// selection 选择obj下所有子内容
			selection.selectAllChildren(document.querySelector('.editor-body'));
			// 光标移至最后
			selection.collapseToEnd()
		}
	}

	removeAllRanges() {
		const selection = window.getSelection();
		// selection 选择obj下所有子内容
		selection.selectAllChildren(document.querySelector('.editor-body'));
		// 光标移至最后
		selection.collapseToEnd()
	}

	// 获取选区的 Elem
	getSelectionContainerElem(range) {
		range = range || this.lastEditRange
		let elem
		if (range) {
			elem = range.commonAncestorContainer
			return elem.nodeType === 1 ? elem : elem.parentNode
		}
	}

	// 获取选区内容
	getSelectionText() {
		return window.getSelection().toString()
	}

	// 判断选区是否为空
	isSelectionEmpty() {
		const range = this.lastEditRange
		if (!range) {
			return true
		}
		if (range && range.startContainer) {
			if (range.startContainer === range.endContainer) {
				if (range.startOffset === range.endOffset) {
					return true
				}
			}
		}
		return false
	}

}

const Sel = new Selection()

export default Sel 