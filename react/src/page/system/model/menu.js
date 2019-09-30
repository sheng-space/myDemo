import {post} from '@/service/request';

export default {
  namespace: 'menu',
  state: {
    list: [],
    tree: [],
    menu: {}
  },
  effects: {
    *list({ payload }, { call, put }) {
      const res = yield call(post, payload);
      if(res.code !== '0') return;  
      yield put({
        type: '_setList',
        payload: res.data,
      });
    },
    *tree({ payload }, { call, put }) {
      const res = yield call(post, payload);
      if(res.code !== '0') return; 
      yield put({
        type: '_setTree',
        payload: res.data,
      });
    },
    *get({ payload, callback }, { call, put }) {
      const res = yield call(post, payload);
      if(res.code !== '0') return;  
      yield put({
        type: '_setMenu',
        payload: res.data,
      });
      if(callback)callback(res.data);
    }    
  },
  reducers: {
    _setList(state, action) {    
      return {
        ...state,
        list: action.payload,
      };
    },
    _setTree(state, action) {    
      return {
        ...state,
        tree: action.payload,
      };
    },
    _setMenu(state, action) {    
      return {
        ...state,
        menu: action.payload,
      };
    },
    _clearList(state) {
      return {
        ...state,
        list: []
      };
    },
    _clearTree(state) {
      return {
        ...state,
        tree: []
      };
    },
    _clearList(state) {
      return {
        ...state,
        menu: {}
      };
    }
  }
};
