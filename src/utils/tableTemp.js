import { uuid } from './index';

// 根据传入行列数生成表格
const tableTemp = (row, col) =>{
    let tableStr = '';
    for (let i = 0; i < col; i++) {
        tableStr += '<tr>';
        for (let j = 0; j < row; j++) {
            tableStr += `<td contenteditable="true" data-uuid="${uuid()}" data-col="${i}" data-row="${j}"></td>`
        }
        tableStr += '</tr>'
    }
    const temp = `<table class="editor-table" οncοntextmenu="return false" data-cols="${col}" data-rows="${row}" border="0" width="100%" cellpadding="0" cellspacing="0">
    <tbody>
        ${tableStr}
    </tbody>
    </table>`;
    return temp
}

// 根据传入列数及所在行数生成tr
export const trTemp = (row, col) => {
    let trStr = '';
    trStr += '<tr>';
    for (let i = 0; i < row; i++) {
        trStr += `<td contenteditable="true" data-uuid="${uuid()}" data-col="${col}" data-row="${i}"></td>`
    }
    trStr += '</tr>';
    return trStr;
}

export default tableTemp;
