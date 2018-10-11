import React from 'react';
import { observer, inject } from 'mobx-react';

import emojiObj from '../../../configs/emoji';

const getEmojiList = (type, emojiList) => {
  let result = {}
  for (let name in emojiList) {
    let emojiMap = emojiList[name]
    let list = []
    for (let key in emojiMap) {
      list.push({
        type,
        name,
        key,
        img: emojiMap[key].img
      })
    }
    if (list.length > 0) {
      result[name] = {
        type,
        name,
        list,
        album: list[0].img
      }
    }
  }
  return result.emoji.list
}

@inject('editStore')
@observer
export default class EmojiList extends React.Component {

  render() {
    const { editStore } = this.props;
    return (
      <div
        className="m-emoji-body"
        style={{ display: editStore.panelVisible.emoji ? 'block' : 'none' }}
      >
        {
          getEmojiList('emoji', emojiObj.emojiList).map((item, key) => (
            <span
              key={key}
              className="u-emoji-icon"
              onClick={() => editStore.addEmoji(item)}
            >
              <img src={item.img} alt="" />
            </span>
          ))
        }
      </div>
    )
  }
}