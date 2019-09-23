import {post} from '@/service/request';

export default {
  namespace: 'layout',
  state: {
    menuList: [],
    user:{}
  },
  effects: {
    *getMenuList({ payload }, { call, put }) {
      const res = yield call(post, payload);
      if(res.code !== '0') return;  
      yield put({
        type: '_setMenuList',
        payload: res.data,
      });
    },
    *getUser({ payload }, { call, put }) {
      const res = yield call(post, payload);
      if(res.code !== '0') return;  
      yield put({
        type: '_setUser',
        payload: res.data,
      });
    }
  },
  reducers: {
    _setMenuList(state, action) {    
      return {
        ...state,
        menuList: formatter(action.payload),
      };
    },
    _setUser(state, action) {    
      return {
        ...state,
        user: action.payload,
      };
    },
  }
};
/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
function isUrl(path) {
  return reg.test(path);
}
function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}