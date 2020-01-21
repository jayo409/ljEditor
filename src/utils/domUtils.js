// 传入类名或id返回dom
export function queryDom(sel, parentNode) {
    if (parentNode) {
        if (typeof (parentNode) === 'string') {
            return document.querySelector(parentNode).querySelectorAll(sel);
        } else {
            return parentNode.querySelectorAll(sel);
        }
    } else {
        return document.querySelectorAll(sel);
    }
}

// 传入需要删除的dom
export function deleteDom(dom) {
    if (dom.length) {
        [...dom].forEach(item => {
            item.parentNode.removeChild(item);
        })
    } else {
        dom.parentNode && dom.parentNode.removeChild(dom);
    }
}

// 获取dom的序号
export function getIndex(dom) {
    const parentNode = dom.parentNode;
    const all = parentNode.children;
    const index = [].indexOf.call(all, dom);
    return index;
}


const domUtils = {
    queryDom,
    deleteDom,
    getIndex
}

export default domUtils;
