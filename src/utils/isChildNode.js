// 获取该className是否是点击的dom的子节点
const getParentNode = (dom, clsName) => {
    if (dom && dom.className && typeof(dom.className) === 'string' && dom.className.includes(clsName)) {
        return true;
    } else if (dom && dom.className === 'mian-container') {
        return false;
    } else {
        if (dom && dom.parentNode) {
            return getParentNode(dom.parentNode, clsName);
        } else {
            return false;
        }
        
    }
}

const isChildNode = (dom, clsName) => {
    return getParentNode(dom, clsName);
}

export default isChildNode;