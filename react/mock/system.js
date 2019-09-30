const menuData = {
  code:"0",
  msg:"",
  data:[
    {
    name: '系统管理',
    icon: 'setting',
    path: 'system',
    children: [
        {
          name: '用户管理',
          path: 'user',
        },
        {
          name: '菜单管理',
          path: 'menu',
        },
        {
          name: '系统参数',
          path: 'param',
        }
      ]
    }
  ]
};
const user = {
  code:"0",
  msg:"",
  data:{
    id:"1",
    account:"admin",
    name:"管理员",
    status:"1",
    phone:"18888888888",
    imgUrl:""
  }
};
export default {
  'post /api/system/menu/getTree': function (req, res) {
    setTimeout(() => {
      res.status(200);
      res.json(menuData);
    }, 1000);
  },
  'post /api/system/user/get': function (req, res) {
    setTimeout(() => {
      res.status(200);
      res.json(user);
    }, 1000);
  },
};