import {post} from '@/service/request';

export default {
  namespace: 'param',
  state: {
    list: [],
    param: {}
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
    *get({ payload }, { call, put }) {
      const res = yield call(post, payload);
      if(res.code !== '0') return;  
      yield put({
        type: '_setParam',
        payload: res.data,
      });
    }    
  },
  reducers: {
    _setList(state, action) {    
      return {
        ...state,
        list: action.payload,
      };
    },
    _setParam(state, action) {    
      return {
        ...state,
        param: action.payload,
      };
    },
    _clearList(state) {
      return {
        ...state,
        list: []
      };
    },
    _clearList(state) {
      return {
        ...state,
        param: {}
      };
    }
  }
};
