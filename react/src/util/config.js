module.exports = {
  name: 'myDemo', // 名称
  Copyright: 'Copyright &copy; 2019 qbs', // 版权
  upload: '/sys/file/upload',  // 上传图片的地址
  api: '/api',
  sider_width: 200, // 左边菜单宽度 原本是256
  defaultCount: 20, // 列表默认查询条数
  defaultMxCount: 200, // 明细默认的查询条数
}
/**
 * 获取项目的路径
 */
const getBaseUrl = () => {
  var curWwwPath = window.document.location.href;
  var pathName = window.document.location.pathname;
  var pos = curWwwPath.indexOf(pathName);
  var localhostPaht = curWwwPath.substring(0, pos);
  return localhostPaht;
}
