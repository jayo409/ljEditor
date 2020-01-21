class Clickout {

    constructor () {
        this.classList = [];
        this.callBackList = {};
    }

    // 添加对象
    addItem = (cls, callBack) => {
        if (!this.classList.includes(cls)) {
            this.classList.push(cls);
            this.callBackList[cls] = callBack;
        }
    }

    // 运行
    runAction = (e) => {
        let hasClassList = [];
        let notNameList = [...this.classList];
        const listIncludes = (name) => {
            let hasName = true;
            this.classList.forEach(item => {
                if (name.includes(item)) {
                    hasName = false
                }
            });
            return false
        }

        const getParentNode = (dom) => {
            
            const name = listIncludes(dom.className);
            if (name) {
                notNameList.filter(item => {
                    return item !== name
                })
            } else if (dom.className === 'mian-container') {
                return false
            } else {
                return getParentNode(dom.parentNode)
            }
        }
        getParentNode(e);
        if (notNameList.length > 0) {
            notNameList.forEach(item => {
                this.callBackList[item] && this.callBackList[item]();
            })
        }
    }

}

export default new Clickout();

