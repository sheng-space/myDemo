import moment from 'moment';
import React from 'react';
import { message } from 'antd';
import { parse, stringify } from 'qs';
import { getDto } from '@/util/cookie';
export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  const year = now.getFullYear();
  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach(node => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}


function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  }
  if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function getQueryPath(path = '', query = {}) {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }
  return path;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function formatWan(val) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = (
      <span>
        {result}
        <span
          styles={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            lineHeight: 20,
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }
  return result;
}

export function isAntdPro() {
  return window.location.hostname === 'preview.pro.ant.design';
}

/**
 * 将img标签转换为【图片】
 * @param {string} str 
 */
export function replaceImg(str){
  if(typeof str === 'string'){
      str = str.replace(/<img(.*?)>/g, "[图片]")
  }
  return str
}

/**
* 图片预加载
* @param arr
* @constructor
*/
export function preloadingImages(arr) {
  if(Array.isArray(arr)){
      arr.forEach(item=>{
          const img = new Image()
          img.src = item
        })
  }
}

/**
 * 加密函数，加密同一个字符串生成的都不相同
 * @param {*} str 
 */
export function encrypt(str) {
  return CryptoJS.AES.encrypt(JSON.stringify(str), SECRETKEY).toString();
}
/**
 * 生成指定区间的随机整数
 * @param min
 * @param max
 * @returns {number}
 */
export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 节流函数
 * @param {*} func 
 * @param {*} interval 
 */
export function throttle(func, interval = 100) {
  let timeout;
  let startTime = new Date();
  return function (event) {
      event.persist && event.persist()   //保留对事件的引用
      clearTimeout(timeout);
      let curTime = new Date();
      if (curTime - startTime <= interval) {
          //小于规定时间间隔时，用setTimeout在指定时间后再执行
          timeout = setTimeout(() => {
              func(event);
          }, interval)
      } else {
          //重新计时并执行函数
          startTime = curTime;
          func(event)
      }
  }
}

/**
 * 防抖函数
 * @param {*} func 
 * @param {*} wait 
 */
export function debounce(func, wait = 500) {
  let timeout;  // 定时器变量
  return function (event) {
      clearTimeout(timeout);  // 每次触发时先清除上一次的定时器,然后重新计时
      event.persist && event.persist()   //保留对事件的引用
      timeout = setTimeout(() => {
          func(event)
      }, wait);  // 指定 xx ms 后触发真正想进行的操作 handler
  };
}
export default class Utils {
  /**
   * 转换成有层级的数组，一般用于树形
   * @param {Array} list
   * @param {String} parm
   * @param {String} fparm
   * @param {String} pval 顶级的值
   */
  static convertArr(list,parm,fparm,pval) {
    parm?parm:parm='id', fparm?fparm:fparm='parent_id', pval?pval:pval='0'
    let arr = [];
    for (let i = 0; i < list.length; i++) {
      if(list[i][fparm] == pval) {
        let obj = list[i];
        obj.childs = Utils.convertArr(list, parm, fparm, list[i][parm])
        arr.push(obj)
      }
    }
    return arr;
  }

  /**
   * 从list中删除一项
   * @param {Array} list
   * @param {String} index 索引
   * @param {String} listParm list的关键字
   * 注意：该方法会改变原始数组
   */
  static arrDeleteOne(list, index, listParm='id') {
    list.splice(list.findIndex(item => item[listParm] === index), 1);
  }

  /**
   * 从list中修改一项
   * @param {Array} list
   * @param {Object} obj
   * @param {String} listParm list的关键字
   * @param {String} listParm obj的关键字
   */
  static arrChangeOne(list, obj, listParm='id', objParm='id') {
    let fdata = list.map(item => {
      if(item[listParm] === obj[objParm]) {
        return {
          ...item,
          ...obj
        }
      }
      return item
    });
    return fdata;
  }

  /**
   * 上传之前的判断
   * @param {Object} file 文件的详细信息
   * @param {Array} fileList
   * @param {String} type 上传类型
   * @param {Number} mb 图片大小
   */
  static beforeUpload(file, fileList, type='image', mb=5) {
    const xlsReg = /.*(.xls|.xlsx)$/; // excel正则
    let isUpload = true; // 是否为该类型文件
    let isLtMB = true; // 图片大小不超过限制
    // 图片
    if(type === 'image') {
      isUpload = file.type === 'image/jpeg'
                || file.type === 'image/jpg'
                || file.type === 'image/png'
                || file.type === 'image/gif'
                || file.type === 'image/ico';
      isLtMB = file.size / 1024 / 1024 < mb;
    }
    // excel
    if(type === 'excel') {
      if(!xlsReg.test(file.name)){
        isUpload = false;
      }
    }
    if (!isUpload) {
      if(type === 'image') {
        message.error('请上传图片类型的文件');
      }
      if(type === 'excel') {
        message.error('请上传excel文件');
      }
    }

    if (!isLtMB) {
      message.error(`图片大小需要小于${mb}MB！`);
    }
    return isUpload && isLtMB;
  }

  /**
   * 按钮权限
   * @param {String} name 按钮名称
   * @param {Object} props this.props
   * @param {String} code 按钮标识
   * @returns {Boolean}
   */
  static userBtnRight(name, props, code) {
    const {
      location: { pathname },
      userBtn: rightArr, // 权限的数组
    } = props;
    for(let i = 0; i < rightArr.length; i++) {
      if(code) { // 是否有标识
        if(rightArr[i].menu_code === code && rightArr[i].btn_code === name) {
          if(rightArr[i].checkd === 1) {
            return true;
          }
        }
      }else {
        if(rightArr[i].menu_url === pathname && rightArr[i].btn_code === name) {
          if(rightArr[i].checkd === 1) {
            return true;
          }
        }
      }
      continue
    }
    return false;
  }

  /**
   * 字段权限
   * @param {key} 字段的关键字
   * @returns {Boolean} 是否有该字段的权限
   */
  static userFieldRight = (key) => {
    const userFields = (getDto('fields') || '').split(',');
    let flag = false;
    userFields.forEach(item => {
      if(item === key) {
        flag = true;
      }
    });
    return flag;
  }

  /**
   * 日期处理 （年月日）
   * @param {String} date 日期
   * @param {Number} type 为1时，转成moment
   */
  static dateDeal = (date, type=0) => {
    if(type == 1) {
      if(!date) return undefined;
      return moment(date, 'YYYY-MM-DD');
    }
    if(!date) return '';
    if(typeof(date) === 'string') {
      return date.split(' ')[0];
    }else {
      return date.format('YYYY-MM-DD');
    }
  }

  /**
   * 处理日期段
   * @param {Array} date 日期
   * @param {Number} index 取日期的那个值
   * @returns {String} 日期
   */
  static dateRangeDeal = (date, index=0) => {
    if(!date) return '';
    if(date.length <= 0) {
      return '';
    }
    if(index === 1) {
      if(!date[1]) return '';
      return date[1].format('YYYY-MM-DD');
    }
    if(!date[0]) return '';
    return date[0].format('YYYY-MM-DD');
  }

  /**
   * 处理金额
   * @param {Number} price 金额
   * @param {Number} num 保留几位小数
   * @returns {String} 数
   */
  static priceDeal = (price, num=4) => {
    const fPrice = price * 1;
    if(!fPrice) {
      return 0;
    }
    if(fPrice.toString().indexOf('.') >= 0) {
      if(fPrice.toString().split(".")[1].length > num) {
        return fPrice.toFixed(num);
      }
    }
    return fPrice;
  }

  /**
   * 处理金额，有格式
   * @param {Number} price 金额
   * @param {Number} num 保留几位小数
   * @returns {String} 有格式的数
   */
  static priceFormatDeal = (price, num=4) => {
    const fPrice = price * 1;
    if(!fPrice) {
      return 0;
    }
    if(fPrice.toString().indexOf('.') >= 0) {
      const fInteger = ((fPrice.toString().split(".")[0])*1).toLocaleString(); // 小数点前面的整数
      const decimal = fPrice.toString().split(".")[1]; // 小数点后面的数
      let fDecimal = decimal;
      if(decimal.length > num) {
        fDecimal = fPrice.toFixed(num).toString().split(".")[1];
      }
      return `${fInteger}.${fDecimal}`;
    }
    return fPrice.toLocaleString();
  }

  /**
   * 显示是否
   * @param {Number} 0 1 ''
   * @returns {String} 否 是
   */
  static showYN = (num) => {
    if(num == 0) {
      return '否';
    }if(num == 1) {
      return '是';
    }else {
      return '';
    }
  }

  /**
   * 去掉前后空格
   * @param {word}
   */
  static trim(word) {
    if(!word) return word;
    return word.replace(/^\s+|\s+$/gm,'');
  }

  /**
   * 获取时间
   * @returns {String} 时间 YYYY-MM-DD
   */
  static getDate = () => {
    return moment().format('YYYY-MM-DD');
  }

  /**
   * 设置最大高度
   * @returns {String} 最大高度的样式
   */
  static setHeight = (num=0) => {
    return { maxHeight: `calc(100vh - ${num}px)` }
  }

  /**
   * 保存用户的浏览记录
   * @param {params} 参数
   * @param {name} 模块名
   */
  static saveUserField = (params, name) => {
    window.g_app._store.dispatch({
      type: 'user/field',
      payload: { name, params }
    });
  }

  /**
   * 重置浏览记录
   * @param {form} form
   */
  static resetUserField = (form) => {
    const formValues = form.getFieldsValue();
    const obj = {};
    Object.keys(formValues).forEach(key => {
      // obj[key] = null;
      obj[key] = undefined;
    });
    form.setFieldsValue(obj);
  }
}
