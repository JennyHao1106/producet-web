
let baseFun = {}
baseFun.chageClassCodeToName = (code) => {
    code = JSON.parse(code)
    let name = '';
    code.forEach(item => {
        switch (item) {
            case 0:
                name += '间隙/搭接 '
                break;
            case 1:
                name += '外来物 '
                break;
            case 2:
                name += '褶皱 '
                break;
            case 3:
                name += '架桥 '
                break;
            case 4:
                name += '缺丝 '
                break;
            case 5:
                name += '翻边 '
                break;
            case 6:
                name += '标记 '
                break;
            case 7:
                name += '气泡 '
                break;
            default:
                break;
        }
    });
    return name
}

export default baseFun;