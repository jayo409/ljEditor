// 保存用户信息
import { observable, configure, action } from 'mobx';

configure({
  enforceActions: 'always'
})

class EditStore {

  // 表情框显示
  @observable emojiVisible = ''
  // 光标最后位置
  @observable lastEditRange = null

  @action.bound changeVisible = (param) => {
    this[`${param}Visible`] = !this[`${param}Visible`]
  }

  @action.bound addEmoji = (emoji) => {
    this.getEditRange()
    document.execCommand('insertHTML', false, `<img data-obj="[${emoji.key}]" src="${emoji.img}" style="width: 15px;height: 15px;margin: 0px 3px;"/>`)
    this.setEditRange()
  }

  @action.bound setEditRange() {
    let selection = getSelection()
    // 设置最后光标对象
    this.lastEditRange = selection.getRangeAt(0)
  }

  // 设置光标位置
  @action.bound getEditRange = () => {
    let selection = getSelection()
    if (this.lastEditRange) {
      // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
      selection.removeAllRanges()
      selection.addRange(this.lastEditRange)
    } else {
      // 创建selection
      let selection = window.getSelection()
      // selection 选择obj下所有子内容
      selection.selectAllChildren(document.querySelector('.editor-body'))
      // 光标移至最后
      selection.collapseToEnd()
    }
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
      this.getEditRange()
      let reader = new FileReader()
      reader.onload = (event) => {
        // event.target.result 即为图片的Base64编码字符串
        let base64Str = event.target.result
        document.execCommand('insertHTML', false, `<img src="${base64Str}" style="max-width: 300px;max-height: 300px;margin-right: 10px;"/>`)
        this.setEditRange()
      }
      reader.readAsDataURL(imageFile)
    }
  }

  @action.bound execCommands = (obj) => {
    const { type, value = null } = obj
    this.getEditRange()
    // 采用css设置样式
    document.execCommand('styleWithCSS', false, null)
    // 按下enter键时分开两个块
    document.execCommand('insertBrOnReturn', false, null)
    document.execCommand(type, false, value)
  }

}
export const editStore = new EditStore()