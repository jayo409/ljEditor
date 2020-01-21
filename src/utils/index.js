import Sel from './selection';
import isChildNode from './isChildNode';
import tableTemp from './tableTemp';
import TableUtils from './tableUtils';

// 生成指定长度随机字符串
const randomStr = (length) => {
	let str = Math.random().toString(36).substr(2);
	if (str.length >= length) {
		return str.substr(0, length);
	}
	str += Math.random(length - str.length);
	return str;
}

const uuid = () => {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";
	var uuid = s.join("");
	return uuid;
}

export {
	randomStr,
	uuid,
	Sel,
	isChildNode,
	tableTemp,
	TableUtils
}