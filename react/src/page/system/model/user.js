import {post} from '@/service/request';

export default {
  namespace: 'user',
  state: {
    list: [],
    user: {}
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
        type: '_setUser',
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
    _setUser(state, action) {    
      return {
        ...state,
        user: action.payload,
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
        user: {}
      };
    }
  }
};
