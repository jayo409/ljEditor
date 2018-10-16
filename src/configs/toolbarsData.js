const commandList = [
  {
    type: '表情',
    event: 'visible',
    param: 'emoji',
    icon: 'biaoqing'
  },
  {
    type: '图片',
    event: 'addImg',
    icon: 'plus-pic',
  },
  {
    type: '对齐',
    icon: 'zuoduiqi',
    cls: 'align'
  },
  {
    type: '加粗',
    event: 'exec',
    param: {
      type: 'bold'
    },
    icon: 'jiacu',
    isActiveKey: 'bold'
  },
  {
    type: '斜体',
    event: 'exec',
    param: {
      type: 'italic'
    },
    icon: 'xieti',
    isActiveKey: 'italic'
  },
  {
    type: '字号',
    icon: 'zihao',
    cls: 'fs'
  },
  {
    type: '字体',
    icon: 'ziti',
    cls: 'ff'
  },
  {
    type: '字体颜色',
    icon: 'wenziyanse',
    cls: 'color'
  },
  {
    type: '背景色',
    icon: 'beijingse',
    cls: 'color'
  },
  {
    type: '下划线',
    event: 'exec',
    param: {
      type: 'underline'
    },
    icon: 'xiahuaxian',
    isActiveKey: 'underline'
  },
  {
    type: '删除线',
    event: 'exec',
    param: {
      type: 'strikeThrough'
    },
    icon: 'shanchuxian',
    isActiveKey: 'strikeThrough'
  },
  {
    type: '添加链接',
    event: 'visible',
    param: 'insertLink',
    icon: 'lianjie',
    isActiveKey: 'A'
  },
  {
    type: '删除链接',
    event: 'exec',
    param: {
      type: 'unlink'
    },
    icon: 'quxiaolianjie',
  },
  {
    type: '代码块',
    event: 'addCode',
    icon: 'daimakuai',
    isActiveKey: 'PRE'
  },
  {
    type: '引用',
    event: 'exec',
    param: {
      type: 'formatBlock',
      value: 'blockquote'
    },
    icon: 'yinyong',
    isActiveKey: 'formatBlock'
  },
  {
    type: '撤销',
    event: 'exec',
    param: {
      type: 'undo'
    },
    icon: 'chehui'
  },
  {
    type: '重做',
    event: 'exec',
    param: {
      type: 'redo'
    },
    icon: 'chongzuo'
  }
]

const alignList = [
  {
    title: '左对齐',
    event: 'exec',
    param: {
      type: 'justifyLeft'
    },
    icon: 'zuoduiqi'
  },
  {
    title: '居中',
    event: 'exec',
    param: {
      type: 'justifyCenter'
    },
  },
  {
    title: '右对齐',
    event: 'exec',
    param: {
      type: 'justifyRight'
    },
  },
  {
    title: '两边对齐',
    event: 'exec',
    param: {
      type: 'justifyFull'
    },
  }
]

const colorList = [
  '#666', '#999', '#fff', '#000', '#ffc', '#eee', '#ffb000', '#333', '#ffbccc', '#ccbb22', '#bb2'
]

const fontSizeList = [
  1, 2, 3, 4, 5, 6, 7
]

const fontFamilyList = [
  '宋体', '微软雅黑', 'Arial', 'Tahoma', 'Verdana'
]

const isActiveKeyList = [
  {
    type: 'queryCommand',
    key: 'bold'
  },
  {
    type: 'queryCommand',
    key: 'italic'
  },
  {
    type: 'queryCommand',
    key: 'formatBlock'
  },
  {
    type: 'queryCommand',
    key: 'strikeThrough'
  },
  {
    type: 'queryCommand',
    key: 'underline'
  },
  {
    type: 'queryDom',
    key: 'A'
  },
  {
    type: 'queryDom',
    key: 'PRE'
  }
]

export {
  commandList,
  alignList,
  colorList,
  fontSizeList,
  fontFamilyList,
  isActiveKeyList
}