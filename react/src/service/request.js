import {requestPost, requestGet} from '@/util/request';

/**
 * @功能：发送post请求
 * @param {*} params 
 */
export async function post(params) {
  return requestPost(params.url, params);
}

/**
 * @功能：发送get请求
 * @param {*} params 
 */
export async function get(params) {
  return requestGet(params.url, params);
}
