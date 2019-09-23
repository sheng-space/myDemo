import { getDto } from '@/util/dto';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  const id = getDto('id');
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? id : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  authority += '';
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['user'];
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}
