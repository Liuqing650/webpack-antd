/**
 * 计算节点内容长度
 * @param {*string} text 段落文本
 * @param {*number} fontSize 字体大小 = 14
 * @param {*number} width 行宽 = 760
 * @param {*number} maxLine 行数 = 1
 */
export const caclulateTextLength = (text, fontSize = 14, width = 760, maxLine = 1) => {
  let length = 0;
  let splitIndex = 0;
  let lastText = '';
  const maxWidth = width * maxLine;
  const tempArr = text.split('') || [];
  const chartDict = {
    num: 8.2,
    symbol: 11,
    lower: 11,
    capitals: 9.35,
  };
  tempArr.map((chart, index) => {
    if (length < maxWidth) {
      splitIndex = index;
      lastText = chart;
      if (/[0-9]/g.test(chart)) {
        length += chartDict.num;
      } else if (/[.:,\s()]/g.test(chart)) {
        length += chartDict.symbol;
      } else if (/[a-z]/g.test(chart)) {
        length += chartDict.lower;
      } else if (/[A-Z]/g.test(chart)) {
        length += chartDict.capitals;
      } else {
        length += fontSize;
      }
    }
  });
  return {
    maxLength: length,
    index: splitIndex,
    lastText
  };
};
