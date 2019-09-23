import {post} from '@/service/request';

export default {
  namespace: 'system',
  state: {
    
  },
  effects: {
    *requestPost({ payload, callBack }, { call }) {
      const res = yield call(post, payload);
      if(res.code !== '0') return;  
      if(callBack) return callBack(res.data);
    },   
  },
  reducers: {   

  }
};
