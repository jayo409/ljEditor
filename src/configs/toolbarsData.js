const commandList = [
  {
		type: '表格',
		event: 'visible',
		param: 'table',
		icon: 'biaoge'
	},
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
  {
    title: '暗玉紫',
    color: '#5c2223'
  },
  {
    title: '粟紫',
    color: '#5a191b'
  },
  {
    title: '葡菊酱紫',
    color: '#5a1216'
  },
  {
    title: '金鱼紫',
    color: '#500a16'
  },
  {
    title: '甘蔗紫',
    color: '#621624'
  },
  {
    title: '枣红',
    color: '#7c1823'
  },
  {
    title: '高粱红',
    color: '#c02c38'
  },
  {
    title: '殷红',
    color: '#82111f'
  },
  {
    title: '茶花红',
    color: '#ee3f4d'
  },
  {
    title: '烟红',
    color: '#894e54'
  },
  {
    title: '满天星蓝',
    color: '#2e317c'
  },
  {
    title: '尼罗蓝',
    color: '#2474b5'
  },
  {
    title: '柏林蓝',
    color: '#126bae'
  },
  {
    title: '晴山蓝',
    color: '#8fb2c9'
  },
  {
    title: '釉蓝',
    color: '#1781b5'
  },
  {
    title: '苍绿',
    color: '#223e36'
  },
  {
    title: '亚丁绿',
    color: '#428675'
  },
  {
    title: '竹绿',
    color: '#1ba784'
  },
  {
    title: '石绿',
    color: '#57c3c2'
  },
  {
    title: '浪花绿',
    color: '#92b3a5'
  },
  {
    title: '姜黄',
    color: '#e2c027'
  },
  {
    title: '藤黄',
    color: '#ffd111'
  },
  {
    title: '柠檬黄',
    color: '#fcd337'
  },
  {
    title: '栀子黄',
    color: '#ebb10d'
  },
  {
    title: '淡密黄',
    color: '#f9d367'
  },
  {
    title: '拃叶棕',
    color: '#692a1b'
  },
  {
    title: '橡树棕',
    color: '#773d31'
  },
  {
    title: '可可棕',
    color: '#652b1c'
  },
  {
    title: '火山棕',
    color: '#482522'
  },
  {
    title: '铁棕',
    color: '#d85916'
  }
]

const fontSizeList = [
  1, 2, 3, 4, 5, 6, 7,
  {
    size: 1,
    title: 'x-small'
  },
  {
    size: 2,
    title: 'small'
  },
  {
    size: 3,
    title: 'normal'
  },
  {
    size: 4,
    title: 'large'
  },
  {
    size: 5,
    title: 'x-large'
  },
  {
    size: 6,
    title: 'xx-large'
  },
  {
    size: 7,
    title: 'xxx-large'
  }
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