export default {
  singular: true,
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      locale: {
        enable: true,
      },
    }],
  ],
  routes: [
    {path: '/login',component: '../login/Login'},
    {
      path: 'exception',
      routes: [          
        { path: '403', component: '../exception/403' },
        { path: '404', component: '../exception/404' },
        { path: '500', component: '../exception/500' }
      ]
    },      
    {
      path: '/',
      component: '../layout/Layout',
      routes: [       
        {path: '/', component: './index/Index'},    
        {path: 'index', component: './index/Index'},         
        {
          path: 'system',
          routes: [          
            { path: 'user', component: './system/user/List' },
            // { path: 'user/list', component: './system/user/List' }, 
            // { path: 'user/edit', component: './system/user/Edit' }, 
            // { path: 'user/view', component: './system/user/View' }, 

            { path: 'menu', component: './system/menu/List' },
            { path: 'menu/list', component: './system/menu/List' }, 
            { path: 'menu/edit', component: './system/menu/Edit' }, 
            { path: 'menu/view', component: './system/menu/View' }, 
            
            { path: 'param', component: './system/param/List' }
            
          ]
        },           
      ]
    } 
  ],
  proxy: {    
    "/api/system": {
      target: "http://localhost:8762/",
      changeOrigin: true ,
      pathRewrite: {
        "^/api": ""
      }
    },
  }
};
