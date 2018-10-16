// 保存用户信息
import { observable, configure, action } from 'mobx';

import Sel from '../utils/selection';
import { isActiveKeyList } from '../configs/toolbarsData';

configure({
  enforceActions: 'always'
})

class EditStore {

  // 面板显示
  @observable panelVisible = {
    emoji: false,
    insertLink: false,
    code: false
  }

  @observable curCommandState = []

  // 更改面板显示
  @action.bound changeVisible = (param) => {
    this.panelVisible[param] = !this.panelVisible[param]
  }

  @action.bound getCommandState = () => {
    this.curCommandState = []
    isActiveKeyList.forEach((item) => {
      if (item.type === 'queryCommand') {
        if (document.queryCommandState(item.key)) {
          this.curCommandState.push(item.key)
        }
      } else if (item.type === 'queryDom') {
        let getParentNode = (name, dom) => {
          if (dom.nodeName === name) {
            return true
          }
          if (dom.className === 'editor-body') {
            return false
          }
          getParentNode(name, dom.parentNode)
        }
        const isActive = getParentNode(item.key, Sel.getSelectionContainerElem())
        if (isActive) {
          this.curCommandState.push(item.key)
        }
      }
    })
  }


  // 添加表情
  @action.bound addEmoji = (emoji) => {
    Sel.getEditRange()
    document.execCommand('insertHTML', false, `<img data-obj="[${emoji.key}]" src="${emoji.img}" class="emoji" />`)
    Sel.setEditRange()
  }

  // 添加图片
  @action.bound addImg = (imageFile) => {
    if (imageFile.name) {
      if (!/\.(png|jpg|bmp|jpeg|gif)$/i.test(imageFile.name)) {
        return
      }
      if (imageFile.size > 5 * 1024 * 1024) {
        console.log('图片不能大于5M')
        return
      }
      Sel.getEditRange()
      let reader = new FileReader()
      reader.onload = (event) => {
        // event.target.result 即为图片的Base64编码字符串
        let base64Str = event.target.result
        document.execCommand('insertHTML', false, `<img src="${base64Str}" style="max-width: 300px;max-height: 300px;margin-right: 10px;"/>`)
        Sel.setEditRange()
      }
      reader.readAsDataURL(imageFile)
    }
  }

  // 添加代码块
  @action.bound addCode = (value) => {
    Sel.getEditRange()
    if (value) {
      document.execCommand('insertHTML', false, `<pre><code>${value}</code></pre>`)
      Sel.setEditRange()
      this.panelVisible.code = !this.panelVisible.code
      return
    }
    if (!Sel.isSelectionEmpty()) {
      document.execCommand('insertHTML', false, `<code>${Sel.getSelectionText()}</code>`)
    } else {
      this.panelVisible.code = !this.panelVisible.code
    }
    Sel.setEditRange()
  }

  // 回车键事件
  @action.bound enterKeyEvent = () => {
    // 按下enter键时分开两个块
    document.execCommand('insertBrOnReturn', false, true)
    const selectionElem = Sel.getSelectionContainerElem()
    const parentElem = selectionElem.parentNode
    // 选区为code块时做特殊处理
    if (parentElem.nodeName === 'PRE') {
      return
    } else if (parentElem.innerHTML === '<code><br></code>') {
      // 回车时code块外层会包裹一个div
      parentElem.parentNode.removeChild(parentElem)
      document.execCommand('insertHTML', false, '<p><br></p>')
    } else {
      document.execCommand('formatBlock', false, 'p')
    }
  }

  @action.bound execCommands = (obj) => {
    const { type, value = null } = obj
    Sel.getEditRange()
    // 采用css设置样式
    document.execCommand('styleWithCSS', false, null)
    document.execCommand(type, false, value)
  }

}
export const editStore = new EditStore()